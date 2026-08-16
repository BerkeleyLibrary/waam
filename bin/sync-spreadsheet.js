#!/usr/bin/env node

require('dotenv').config();
require('../initDockerSecrets')();
const fs = require('fs');
const path = require('path');
const sequelize = require('../server/app/sequelize-factory');
const { Nisba, Subject, Group, Author, Manuscript } = require('../server/app/models/index');
const AuthorNisba = require('../server/app/models/authorNisba');
const ManuscriptAuthor = require('../server/app/models/manuscriptAuthor');

// Self-contained CSV parser (handles commas inside quotes, multi-line values, etc.)
function parseCSV(content, filename = '') {
    const rawLines = [];
    let row = [];
    let cell = '';
    let inQuotes = false;
    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        const nextChar = content[i + 1];
        if (inQuotes) {
            if (char === '"') {
                if (nextChar === '"') {
                    cell += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                cell += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                row.push(cell.trim());
                cell = '';
            } else if (char === '\n' || char === '\r') {
                if (char === '\r' && nextChar === '\n') {
                    i++;
                }
                row.push(cell.trim());
                rawLines.push(row);
                row = [];
                cell = '';
            } else {
                cell += char;
            }
        }
    }
    if (cell || row.length > 0) {
        row.push(cell.trim());
        rawLines.push(row);
    }

    if (rawLines.length < 2) return [];

    // Normalize headers (lowercase, alphanumeric only). Defaults first column to 'id' if empty.
    const headers = rawLines[0].map((h, idx) => {
        if (idx === 0 && h.trim() === '') return 'id';
        return h.toLowerCase().replace(/[^a-z0-9]/g, '');
    });

    const data = [];

    for (let i = 1; i < rawLines.length; i++) {
        const line = rawLines[i];
        if (line.length === 0 || (line.length === 1 && line[0] === '')) continue;

        // Warn if column counts do not match headers
        if (line.length !== headers.length) {
            console.warn(`[WARNING] In file ${filename}, row ${i + 1} has ${line.length} columns, expected ${headers.length}. Columns are likely shifted!`);
        }

        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = line[index] !== undefined ? line[index] : '';
        });
        data.push(obj);
    }
    return data;
}

// Maps temporary IDs (e.g. 'temp-1') to generated auto-increment IDs
const idMaps = {
    nisba: {},
    subjects: {},
    groups: {},
    authors: {},
};

// Caches of valid database IDs
const existingNisbaIds = new Set();
const existingSubjectIds = new Set();
const existingGroupIds = new Set();
const existingAuthorIds = new Set();

// Tracks missing IDs referenced in the spreadsheet
const missingNisbas = [];
const missingSubjects = [];
const missingGroups = [];
const missingAuthors = [];

function resolveId(val, typeMap) {
    if (!val) return null;
    val = val.trim();
    if (typeMap && typeMap[val]) return typeMap[val];
    const num = Number(val);
    return isNaN(num) ? null : num;
}

function resolveIdList(val, typeMap) {
    if (!val) return [];
    let ids = [];
    if (val.includes('[')) {
        // Extract all numbers inside brackets, e.g. [1924][268]
        const matches = val.match(/\d+/g);
        if (matches) {
            ids = matches.map(Number);
        }
    } else {
        // Otherwise parse as standard comma-separated list
        ids = val.split(',')
            .map(x => x.trim())
            .filter(Boolean)
            .map(Number);
    }
    return ids
        .map(x => (typeMap && typeMap[x] ? typeMap[x] : x))
        .filter(x => !isNaN(x) && x > 0);
}

// Excludes empty values (null, undefined, '') from update payloads to keep original DB values
function filterUpdateFields(fields) {
    const cleanFields = {};
    for (const [k, v] of Object.entries(fields)) {
        if (v !== null && v !== undefined && v !== '') {
            cleanFields[k] = v;
        }
    }
    return cleanFields;
}

// Helper for columns that ALLOW NULL (empty cell -> null)
function toNullableString(val, maxLength = 255) {
    if (val === undefined || val === null || val.trim() === '') return null;
    return val.trim().slice(0, maxLength);
}

// Helper for columns defined as NOT NULL (empty cell -> '')
function toNotNullString(val, maxLength = 255) {
    if (val === undefined || val === null || val.trim() === '') return '';
    return val.trim().slice(0, maxLength);
}

async function syncNisba(transaction) {
    console.log('Syncing Nisba table...');
    const csvPath = path.join(__dirname, '../data/spreadsheet_imports/nisba.csv');
    if (!fs.existsSync(csvPath)) return console.warn('nisba.csv not found, skipping.');
    const rows = parseCSV(fs.readFileSync(csvPath, 'utf8'), 'nisba.csv');

    for (const row of rows) {
        const idStr = row['id'];
        const fields = {
            nisba: toNullableString(row['nisba'], 255),
            aNisba: toNullableString(row['arabicnisba'] || row['anisba'], 255),
        };
        const numericId = Number(idStr);
        let finalId;

        if (idStr && !isNaN(numericId) && numericId > 0) {
            const existing = await Nisba.findByPk(numericId, { transaction, paranoid: false });
            if (existing) {
                if (existing.deletedAt) await existing.restore({ transaction });
                await existing.update(filterUpdateFields(fields), { transaction });
                finalId = numericId;
            } else {
                const created = await Nisba.create({ id: numericId, ...fields }, { transaction });
                finalId = created.id;
            }
        } else {
            const created = await Nisba.create(fields, { transaction });
            finalId = created.id;
            if (idStr) idMaps.nisba[idStr] = finalId;
        }
        existingNisbaIds.add(finalId);
    }
}

async function syncSubjects(transaction) {
    console.log('Syncing Subjects table...');
    const csvPath = path.join(__dirname, '../data/spreadsheet_imports/subjects.csv');
    if (!fs.existsSync(csvPath)) return console.warn('subjects.csv not found, skipping.');
    const rows = parseCSV(fs.readFileSync(csvPath, 'utf8'), 'subjects.csv');

    for (const row of rows) {
        const idStr = row['id'];
        const fields = {
            parentId: resolveId(row['parentid']),
            subject: toNotNullString(row['subject'], 255),
            aSubject: toNullableString(row['arabicsubject'] || row['asubject'], 255),
        };
        const numericId = Number(idStr);
        let finalId;

        if (idStr && !isNaN(numericId) && numericId > 0) {
            const existing = await Subject.findByPk(numericId, { transaction, paranoid: false });
            if (existing) {
                if (existing.deletedAt) await existing.restore({ transaction });
                await existing.update(filterUpdateFields(fields), { transaction });
                finalId = numericId;
            } else {
                const created = await Subject.create({ id: numericId, ...fields }, { transaction });
                finalId = created.id;
            }
        } else {
            const created = await Subject.create(fields, { transaction });
            finalId = created.id;
            if (idStr) idMaps.subjects[idStr] = finalId;
        }
        existingSubjectIds.add(finalId);
    }
}

async function syncGroups(transaction) {
    console.log('Syncing Groups table...');
    const csvPath = path.join(__dirname, '../data/spreadsheet_imports/groups.csv');
    if (!fs.existsSync(csvPath)) return console.warn('groups.csv not found, skipping.');
    const rows = parseCSV(fs.readFileSync(csvPath, 'utf8'), 'groups.csv');

    for (const row of rows) {
        const idStr = row['id'];
        const fields = {
            parentId: resolveId(row['parentid']),
            name: toNotNullString(row['name'], 50),
            aName: toNullableString(row['arabicname'] || row['aname'], 255),
            logo: toNullableString(row['logo'], 255),
            desc: toNotNullString(row['desc'] || row['description'], 255),
            aDesc: toNullableString(row['arabicdesc'] || row['adesc'] || row['arabicdescription'], 255),
            lat: toNullableString(row['lat'], 20),
            lng: toNullableString(row['lng'], 20),
            path: toNullableString(row['path'], 20),
            hidden: toNullableString(row['hidden'], 1),
        };
        const numericId = Number(idStr);
        let finalId;

        if (idStr && !isNaN(numericId) && numericId > 0) {
            const existing = await Group.findByPk(numericId, { transaction, paranoid: false });
            if (existing) {
                if (existing.deletedAt) await existing.restore({ transaction });
                await existing.update(filterUpdateFields(fields), { transaction });
                finalId = numericId;
            } else {
                const created = await Group.create({ id: numericId, ...fields }, { transaction });
                finalId = created.id;
            }
        } else {
            const created = await Group.create(fields, { transaction });
            finalId = created.id;
            if (idStr) idMaps.groups[idStr] = finalId;
        }
        existingGroupIds.add(finalId);
    }
}

async function syncAuthors(transaction) {
    console.log('Syncing Authors table...');
    const csvPath = path.join(__dirname, '../data/spreadsheet_imports/authors.csv');
    if (!fs.existsSync(csvPath)) return console.warn('authors.csv not found, skipping.');
    const rows = parseCSV(fs.readFileSync(csvPath, 'utf8'), 'authors.csv');

    for (const row of rows) {
        const idStr = row['id'];

        // Resolve Primary Nisba ID and validate
        let primaryNisbaId = resolveId(row['primarynisbaid'] || row['nisbaid'], idMaps.nisba);
        if (primaryNisbaId && !existingNisbaIds.has(primaryNisbaId)) {
            missingNisbas.push({
                missingNisbaId: primaryNisbaId,
                referencedByAuthorId: idStr || 'NEW',
                authorName: row['name'] || row['arabicname'] || '',
                type: 'primary'
            });
            console.warn(`[WARNING] Author ID ${idStr || 'NEW'} references primary Nisba ID ${primaryNisbaId} which does not exist. Setting to NULL.`);
            primaryNisbaId = null;
        }

        // Resolve Secondary Nisba ID and validate
        let secNisbaId = resolveId(row['secondarynisbaid'] || row['secnisbaid'], idMaps.nisba);
        if (secNisbaId && !existingNisbaIds.has(secNisbaId)) {
            missingNisbas.push({
                missingNisbaId: secNisbaId,
                referencedByAuthorId: idStr || 'NEW',
                authorName: row['name'] || row['arabicname'] || '',
                type: 'secondary'
            });
            console.warn(`[WARNING] Author ID ${idStr || 'NEW'} references secondary Nisba ID ${secNisbaId} which does not exist. Setting to NULL.`);
            secNisbaId = null;
        }

        // Resolve Group ID and validate
        let groupId = resolveId(row['groupid']);
        if (groupId && !existingGroupIds.has(groupId)) {
            missingGroups.push({
                missingGroupId: groupId,
                referencedByAuthorId: idStr || 'NEW',
                authorName: row['name'] || row['arabicname'] || '',
                source: 'author'
            });
            console.warn(`[WARNING] Author ID ${idStr || 'NEW'} references Group ID ${groupId} which does not exist. Setting to NULL.`);
            groupId = null;
        }

        const fields = {
            name: toNullableString(row['name'], 65535),
            aName: toNullableString(row['arabicname'] || row['aname'], 65535),
            altName: toNullableString(row['alternativename'] || row['altname'], 65535),
            aAltName: toNullableString(row['arabicalternativename'] || row['aaltname'], 65535),
            LCName: toNullableString(row['libraryofcongressname'] || row['lcname'], 65535),
            ALCName: toNullableString(row['arabiclibraryofcongressname'] || row['alcname'], 65535),
            aka: toNullableString(row['alsoknownas'] || row['aka'], 65535),
            aAka: toNullableString(row['arabicalsoknownas'] || row['aaka'], 65535),
            documentation: toNullableString(row['documentation'], 65535),
            aDocumentation: toNullableString(row['arabicdocumentation'] || row['adocumentation'], 65535),
            nisbaId: primaryNisbaId,
            secNisbaId: secNisbaId,
            dateDied: toNullableString(row['dateofdeath'] || row['datedied'], 255),
            aDateDied: toNullableString(row['arabicdateofdeath'] || row['adatedied'], 255),
            dateBorn: toNullableString(row['dateofbirth'] || row['dateborn'], 255),
            aDateBorn: toNullableString(row['arabicdateofbirth'] || row['adateborn'], 255),
            groupId: groupId,
            ref_number: toNullableString(row['referencenumber'], 255),
            hidden: toNullableString(row['hidden'], 1),
        };

        const numericId = Number(idStr);
        let finalAuthorId;

        if (idStr && !isNaN(numericId) && numericId > 0) {
            const existing = await Author.findByPk(numericId, { transaction, paranoid: false });
            if (existing) {
                if (existing.deletedAt) await existing.restore({ transaction });
                await existing.update(filterUpdateFields(fields), { transaction });
                finalAuthorId = numericId;
            } else {
                const created = await Author.create({ id: numericId, ...fields }, { transaction });
                finalAuthorId = created.id;
            }
        } else {
            const created = await Author.create(fields, { transaction });
            finalAuthorId = created.id;
            if (idStr) idMaps.authors[idStr] = finalAuthorId;
        }

        existingAuthorIds.add(finalAuthorId);

        // Sync Author Nisbas Junction Table (supports both 'All Associated Nisba IDs' and 'All Nisba IDs')
        const nisbaIds = resolveIdList(row['allassociatednisbaids'] || row['allnisbaids'], idMaps.nisba);
        await AuthorNisba.destroy({ where: { authorId: finalAuthorId }, transaction });

        for (const nId of nisbaIds) {
            if (existingNisbaIds.has(nId)) {
                await AuthorNisba.create({ authorId: finalAuthorId, nisbaId: nId }, { transaction });
            } else {
                missingNisbas.push({
                    missingNisbaId: nId,
                    referencedByAuthorId: idStr || finalAuthorId,
                    authorName: row['name'] || row['arabicname'] || '',
                    type: 'associated'
                });
                console.warn(`[WARNING] Author ID ${idStr || finalAuthorId} references Nisba ID ${nId} in allassociatednisbaids/allnisbaids which does not exist. Skipping relationship.`);
            }
        }
    }
}

async function syncManuscripts(transaction) {
    console.log('Syncing Manuscripts table...');
    const csvPath = path.join(__dirname, '../data/spreadsheet_imports/manuscripts.csv');
    if (!fs.existsSync(csvPath)) return console.warn('manuscripts.csv not found, skipping.');
    const rows = parseCSV(fs.readFileSync(csvPath, 'utf8'), 'manuscripts.csv');

    for (const row of rows) {
        const idStr = row['id'];

        // Resolve Group ID and validate
        let groupId = resolveId(row['groupid']);
        if (groupId && !existingGroupIds.has(groupId)) {
            missingGroups.push({
                missingGroupId: groupId,
                referencedByManuscriptId: idStr || 'NEW',
                arabicTitle: row['arabictitle'] || row['atitle'] || '',
                englishTitle: row['title'] || '',
                source: 'manuscript'
            });
            console.warn(`[WARNING] Manuscript ID ${idStr || 'NEW'} references Group ID ${groupId} which does not exist. Setting to NULL.`);
            groupId = null;
        }

        // Resolve Subject ID and validate
        let subjectId = resolveId(row['subjectid'], idMaps.subjects);
        if (subjectId && !existingSubjectIds.has(subjectId)) {
            missingSubjects.push({
                missingSubjectId: subjectId,
                referencedByManuscriptId: idStr || 'NEW',
                arabicTitle: row['arabictitle'] || row['atitle'] || '',
                englishTitle: row['title'] || ''
            });
            console.warn(`[WARNING] Manuscript ID ${idStr || 'NEW'} references Subject ID ${subjectId} which does not exist. Setting to NULL.`);
            subjectId = null;
        }

        const fields = {
            collection: toNotNullString(row['collection'], 255),
            aTitle: toNotNullString(row['arabictitle'] || row['atitle'], 1023),
            title: toNullableString(row['title'], 255),
            altTitle: toNullableString(row['alternativetitle'] || row['alternatetitle'] || row['alttitle'], 65535),
            aAltTitle: toNullableString(row['arabicalternativetitle'] || row['aalttitle'] || row['arabicalternatetitle'], 65535),
            attrTitle: toNullableString(row['attributedtitle'] || row['attrtitle'], 65535),
            aAttrTitle: toNullableString(row['arabicattributedtitle'] || row['arabicaltributedtitle'] || row['aattrtitle'], 65535),
            documentation: toNullableString(row['documentation'], 65535),
            aDocumentation: toNullableString(row['arabicdocumentation'] || row['adocumentation'], 65535),
            form: toNotNullString(row['form'], 255),
            aForm: toNotNullString(row['arabicform'] || row['aform'], 255),
            recp: toNotNullString(row['recipient'] || row['recp'], 255),
            aRecp: toNotNullString(row['arabicrecipient'] || row['arecp'], 255),
            recpGrp: toNotNullString(row['recipientgroup'] || row['recpgrp'], 255),
            aRecpGrp: toNotNullString(row['arabicrecipientgroup'] || row['arecpgrp'], 255),
            req: toNotNullString(row['requester'] || row['req'], 255),
            aReq: toNotNullString(row['arabicrequester'] || row['areq'], 255),
            copyist: toNotNullString(row['copyist'], 255),
            aCopyist: toNotNullString(row['arabiccopyist'] || row['acopyist'], 255),
            copiedAt: toNotNullString(row['locationcopied'] || row['copiedat'], 255),
            aCopiedAt: toNullableString(row['arabiclocationcopied'] || row['acopiedat'], 255),
            copiedDate: toNotNullString(row['datecopied'] || row['copieddate'], 255),
            aCopiedDate: toNullableString(row['arabicdatecopied'] || row['acopieddate'], 255),
            composed: toNotNullString(row['composed'], 255),
            owner: toNullableString(row['owner'], 65535),
            aOwner: toNullableString(row['arabicowner'] || row['aowner'], 65535),
            pages: toNotNullString(row['pages'], 255),
            dims: toNotNullString(row['dimensions'] || row['dims'], 255),
            lang: toNotNullString(row['language'] || row['lang'], 255),
            condition: toNotNullString(row['condition'], 255),
            aCondition: toNullableString(row['arabiccondition'] || row['acondition'], 255),
            misc: toNullableString(row['miscellaneous'] || row['misc'], 65535),
            aMisc: toNullableString(row['arabicmiscellaneous'] || row['amisc'], 65535),
            aFirstLine: toNullableString(row['arabicfirstline'] || row['afirstline'], 65535),
            aLastLine: toNullableString(row['arabiclastline'] || row['alastline'], 65535),
            sponsorLogo: toNotNullString(row['sponsorlogo'], 128),
            login: row['loginrequired'] ? (isNaN(Number(row['loginrequired'])) ? 0 : Number(row['loginrequired'])) : 0,
            added_by: row['addedby'] ? (isNaN(Number(row['addedby'])) ? null : Number(row['addedby'])) : null,
            approved: row['approved'] ? (isNaN(Number(row['approved'])) ? 0 : Number(row['approved'])) : 0,
            onlineCopy: toNullableString(row['onlinecopy'], 65535),
            groupId: groupId,
            subjectId: subjectId,
            source: toNotNullString(row['source'], 255) || 'amms',
            ref_number: toNullableString(row['referencenumber'], 255),
            onlineLabel: toNullableString(row['onlinelabel'], 255),
            hidden: toNullableString(row['hidden'], 1),
        };
        const numericId = Number(idStr);
        let finalManuscriptId;

        if (idStr && !isNaN(numericId) && numericId > 0) {
            const existing = await Manuscript.findByPk(numericId, { transaction, paranoid: false });
            if (existing) {
                if (existing.deletedAt) await existing.restore({ transaction });
                await existing.update(filterUpdateFields(fields), { transaction });
                finalManuscriptId = numericId;
            } else {
                const created = await Manuscript.create({ id: numericId, ...fields }, { transaction });
                finalManuscriptId = created.id;
            }
        } else {
            const created = await Manuscript.create(fields, { transaction });
            finalManuscriptId = created.id;
        }

        // Sync Manuscript Authors Junction Table
        const primaryAuthorId = resolveId(row['primaryauthorid'], idMaps.authors);
        const secondaryAuthorIds = resolveIdList(row['secondaryauthorids'], idMaps.authors);

        await ManuscriptAuthor.destroy({ where: { manuscriptId: finalManuscriptId }, transaction });

        if (primaryAuthorId) {
            if (existingAuthorIds.has(primaryAuthorId)) {
                await ManuscriptAuthor.create({
                    manuscriptId: finalManuscriptId,
                    authorId: primaryAuthorId,
                    status: 'primary'
                }, { transaction });
            } else {
                missingAuthors.push({
                    missingAuthorId: primaryAuthorId,
                    referencedByManuscriptId: idStr || finalManuscriptId,
                    arabicTitle: row['arabictitle'] || row['atitle'] || '',
                    englishTitle: row['title'] || '',
                    type: 'primary'
                });
                console.warn(`[WARNING] Manuscript ID ${idStr || finalManuscriptId} references primary Author ID ${primaryAuthorId} which does not exist. Skipping relation.`);
            }
        }

        for (const authorId of secondaryAuthorIds) {
            if (existingAuthorIds.has(authorId)) {
                await ManuscriptAuthor.create({
                    manuscriptId: finalManuscriptId,
                    authorId,
                    status: 'secondary'
                }, { transaction });
            } else {
                missingAuthors.push({
                    missingAuthorId: authorId,
                    referencedByManuscriptId: idStr || finalManuscriptId,
                    arabicTitle: row['arabictitle'] || row['atitle'] || '',
                    englishTitle: row['title'] || '',
                    type: 'secondary'
                });
                console.warn(`[WARNING] Manuscript ID ${idStr || finalManuscriptId} references secondary Author ID ${authorId} which does not exist. Skipping relation.`);
            }
        }
    }
}

async function run() {
    // Populate caches of existing IDs already in database to validate incoming references
    const initCaches = async () => {
        const nisbas = await Nisba.findAll({ attributes: ['id'], raw: true, paranoid: false });
        nisbas.forEach(n => existingNisbaIds.add(n.id));

        const subjects = await Subject.findAll({ attributes: ['id'], raw: true, paranoid: false });
        subjects.forEach(s => existingSubjectIds.add(s.id));

        const groups = await Group.findAll({ attributes: ['id'], raw: true, paranoid: false });
        groups.forEach(g => existingGroupIds.add(g.id));

        const authors = await Author.findAll({ attributes: ['id'], raw: true, paranoid: false });
        authors.forEach(a => existingAuthorIds.add(a.id));
    };

    const t = await sequelize.transaction();
    try {
        await initCaches();

        await syncNisba(t);
        await syncSubjects(t);
        await syncGroups(t);
        await syncAuthors(t);
        await syncManuscripts(t);

        await t.commit();
        console.log('\nSpreadsheet synchronization completed successfully!');

        const uniqueNisbas = Array.from(new Set(missingNisbas.map(x => x.missingNisbaId)));
        const uniqueSubjects = Array.from(new Set(missingSubjects.map(x => x.missingSubjectId)));
        const uniqueGroups = Array.from(new Set(missingGroups.map(x => x.missingGroupId)));
        const uniqueAuthors = Array.from(new Set(missingAuthors.map(x => x.missingAuthorId)));

        console.log('\n=============================================');
        console.log('            DATA VALIDATION REPORT            ');
        console.log('=============================================');

        if (uniqueNisbas.length > 0) {
            console.log(`❌ Missing Nisba IDs (referenced but not found):`);
            console.log(`   ${uniqueNisbas.sort((a,b)=>a-b).join(', ')}`);
        } else {
            console.log(`✅ All referenced Nisba IDs are valid.`);
        }

        if (uniqueSubjects.length > 0) {
            console.log(`\n❌ Missing Subject IDs (referenced but not found):`);
            console.log(`   ${uniqueSubjects.sort((a,b)=>a-b).join(', ')}`);
        } else {
            console.log(`✅ All referenced Subject IDs are valid.`);
        }

        if (uniqueGroups.length > 0) {
            console.log(`\n❌ Missing Group IDs (referenced but not found):`);
            console.log(`   ${uniqueGroups.sort((a,b)=>a-b).join(', ')}`);
        } else {
            console.log(`✅ All referenced Group IDs are valid.`);
        }

        if (uniqueAuthors.length > 0) {
            console.log(`\n❌ Missing Author IDs (referenced but not found):`);
            console.log(`   ${uniqueAuthors.sort((a,b)=>a-b).join(', ')}`);
        } else {
            console.log(`✅ All referenced Author IDs are valid.`);
        }
        console.log('=============================================\n');

        // Write the detailed validation mapping to a file with the current date
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        const reportFilename = `missing_references_report-${mm}-${dd}-${yyyy}.json`;
        const reportPath = path.join(__dirname, `../data/spreadsheet_imports/${reportFilename}`);
        const reportContent = {
            missingNisbaReferences: missingNisbas,
            missingSubjectReferences: missingSubjects,
            missingGroupReferences: missingGroups,
            missingAuthorReferences: missingAuthors
        };
        fs.writeFileSync(reportPath, JSON.stringify(reportContent, null, 2), 'utf8');
        console.log(`Detailed missing references report written to: ${reportPath}\n`);

        process.exit(0);
    } catch (err) {
        await t.rollback();
        console.error('Error during synchronization. Database rolled back.', err);
        process.exit(1);
    }
}

run();