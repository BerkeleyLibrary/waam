#!/usr/bin/env node

require('dotenv').config();
require('../initDockerSecrets')();
const fs = require('fs');
const path = require('path');
const { QueryTypes } = require('sequelize');
const sequelize = require('../server/app/sequelize-factory');
const XLSX = require('xlsx');

const numericColumns = new Set([
    'id', 'login', 'added_by', 'approved', 'groupId', 'subjectId', 'primary_author_id', 'parentId'
]);

// Cleans values by removing leading/trailing spaces, newlines, tabs, and &nbsp; entities.
// It also escapes internal newlines.
function cleanValue(val, key) {
    if (val === null || val === undefined) return '';

    let str = String(val);
    
    // Check if the value is purely whitespace or literal 'null'
    const trimmed = str.trim().toLowerCase();
    if (trimmed === 'null' || trimmed === '') return '';

    // Keep numeric fields as numbers for proper Excel formatting
    if (numericColumns.has(key)) {
        const num = Number(str);
        if (!isNaN(num)) return num;
    }

    // 1. Remove leading/trailing whitespaces, tabs, newlines, and HTML &nbsp; from both sides
    str = str.replace(/^(?:\s|&nbsp;)+|(?:\s|&nbsp;)+$/gi, '');

    // 2. Escape internal newlines and backslashes
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\r/g, '\\r');
    str = str.replace(/\n/g, '\\n');

    return str;
}

const manuscriptHeaders = {
    id: 'ID',
    collection: 'Collection',
    aTitle: 'Arabic Title',
    title: 'Title',
    altTitle: 'Alternative Title',
    aAltTitle: 'Arabic Alternative Title',
    attrTitle: 'Attributed Title',
    aAttrTitle: 'Arabic Attributed Title',
    documentation: 'Documentation',
    aDocumentation: 'Arabic Documentation',
    form: 'Form',
    aForm: 'Arabic Form',
    recp: 'Recipient',
    aRecp: 'Arabic Recipient',
    recpGrp: 'Recipient Group',
    aRecpGrp: 'Arabic Recipient Group',
    req: 'Requester',
    aReq: 'Arabic Requester',
    copyist: 'Copyist',
    aCopyist: 'Arabic Copyist',
    copiedAt: 'Location Copied',
    aCopiedAt: 'Arabic Location Copied',
    copiedDate: 'Date Copied',
    aCopiedDate: 'Arabic Date Copied',
    composed: 'Composed',
    owner: 'Owner',
    aOwner: 'Arabic Owner',
    pages: 'Pages',
    dims: 'Dimensions',
    lang: 'Language',
    condition: 'Condition',
    aCondition: 'Arabic Condition',
    misc: 'Miscellaneous',
    aMisc: 'Arabic Miscellaneous',
    aFirstLine: 'Arabic First Line',
    aLastLine: 'Arabic Last Line',
    sponsorLogo: 'Sponsor Logo',
    login: 'Login Required',
    added_by: 'Added By',
    approved: 'Approved',
    onlineCopy: 'Online Copy',
    groupId: 'Group ID',
    subjectId: 'Subject ID',
    source: 'Source',
    ref_number: 'Reference Number',
    onlineLabel: 'Online Label',
    hidden: 'Hidden',
    primary_author_id: 'Primary Author ID',
    secondary_author_ids: 'Secondary Author IDs'
};

const authorHeaders = {
    id: 'ID',
    name: 'Name',
    aName: 'Arabic Name',
    altName: 'Alternative Name',
    aAltName: 'Arabic Alternative Name',
    LCName: 'Library of Congress Name',
    ALCName: 'Arabic Library of Congress Name',
    aka: 'Also Known As',
    aAka: 'Arabic Also Known As',
    documentation: 'Documentation',
    aDocumentation: 'Arabic Documentation',
    all_nisba_ids: 'All Nisba IDs',
    dateDied: 'Date of Death',
    aDateDied: 'Arabic Date of Death',
    dateBorn: 'Date of Birth',
    aDateBorn: 'Arabic Date of Birth',
    groupId: 'Group ID',
    ref_number: 'Reference Number',
    hidden: 'Hidden'
};

const nisbaHeaders = {
    id: 'ID',
    nisba: 'Nisba',
    aNisba: 'Arabic Nisba'
};

const subjectHeaders = {
    id: 'ID',
    parentId: 'Parent ID',
    subject: 'Subject',
    aSubject: 'Arabic Subject'
};

async function fetchManuscripts() {
    console.log('Fetching Manuscripts...');
    const batchSize = 5000;
    let offset = 0;
    const records = [];

    while (true) {
        const query = `
            SELECT 
                m.id, m.collection, m.aTitle, m.title, m.altTitle, m.aAltTitle, 
                m.attrTitle, m.aAttrTitle, m.documentation, m.aDocumentation, 
                m.form, m.aForm, m.recp, m.aRecp, m.recpGrp, m.aRecpGrp, 
                m.req, m.aReq, m.copyist, m.aCopyist, m.copiedAt, m.aCopiedAt, 
                m.copiedDate, m.aCopiedDate, m.composed, m.owner, m.aOwner, 
                m.pages, m.dims, m.lang, m.\`condition\`, m.aCondition, 
                m.misc, m.aMisc, m.aFirstLine, m.aLastLine, m.sponsorLogo, 
                m.login, m.added_by, m.approved, m.onlineCopy, m.groupId, 
                m.subjectId, m.source, m.ref_number, m.onlineLabel, m.hidden,
                MAX(CASE WHEN ma.status = 'primary' THEN ma.authorId END) AS primary_author_id,
                GROUP_CONCAT(CASE WHEN ma.status != 'primary' OR ma.status IS NULL THEN ma.authorId END) AS secondary_author_ids
            FROM manuscripts m
            LEFT JOIN manuscriptAuthors ma ON m.id = ma.manuscriptId
            WHERE m.deletedAt IS NULL
            GROUP BY m.id
            ORDER BY m.id ASC
            LIMIT :limit OFFSET :offset;
        `;
        const rows = await sequelize.query(query, {
            replacements: { limit: batchSize, offset: offset },
            type: QueryTypes.SELECT
        });
        if (rows.length === 0) break;

        for (const row of rows) {
            const cleanedRow = {};
            for (const [key, header] of Object.entries(manuscriptHeaders)) {
                cleanedRow[header] = cleanValue(row[key], key);
            }
            records.push(cleanedRow);
        }
        console.log(`Fetched ${rows.length} manuscripts. Total so far: ${records.length}`);
        if (rows.length < batchSize) break;
        offset += batchSize;
    }
    return records;
}

async function fetchAuthors() {
    console.log('Fetching Authors...');
    const batchSize = 5000;
    let offset = 0;
    const records = [];

    while (true) {
        const query = `
            SELECT 
                a.id, a.name, a.aName, a.altName, a.aAltName, a.LCName, a.ALCName, 
                a.aka, a.aAka, a.documentation, a.aDocumentation, a.nisbaId, 
                a.secNisbaId, a.dateDied, a.aDateDied, a.dateBorn, a.aDateBorn, 
                a.groupId, a.ref_number, a.hidden,
                GROUP_CONCAT(DISTINCT CONCAT('[', an.nisbaId, ']') SEPARATOR '') AS all_nisba_ids
            FROM authors a
            LEFT JOIN authorNisbas an ON a.id = an.authorId
            WHERE a.deletedAt IS NULL
            GROUP BY a.id
            ORDER BY a.id ASC
            LIMIT :limit OFFSET :offset;
        `;
        const rows = await sequelize.query(query, {
            replacements: { limit: batchSize, offset: offset },
            type: QueryTypes.SELECT
        });
        if (rows.length === 0) break;

        for (const row of rows) {
            const cleanedRow = {};
            for (const [key, header] of Object.entries(authorHeaders)) {
                cleanedRow[header] = cleanValue(row[key], key);
            }
            records.push(cleanedRow);
        }
        console.log(`Fetched ${rows.length} authors. Total so far: ${records.length}`);
        if (rows.length < batchSize) break;
        offset += batchSize;
    }
    return records;
}

async function fetchNisbas() {
    console.log('Fetching Nisbas...');
    const batchSize = 5000;
    let offset = 0;
    const records = [];

    while (true) {
        const query = `
            SELECT id, nisba, aNisba
            FROM nisba
            WHERE deletedAt IS NULL
            ORDER BY id ASC
            LIMIT :limit OFFSET :offset;
        `;
        const rows = await sequelize.query(query, {
            replacements: { limit: batchSize, offset: offset },
            type: QueryTypes.SELECT
        });
        if (rows.length === 0) break;

        for (const row of rows) {
            const cleanedRow = {};
            for (const [key, header] of Object.entries(nisbaHeaders)) {
                cleanedRow[header] = cleanValue(row[key], key);
            }
            records.push(cleanedRow);
        }
        console.log(`Fetched ${rows.length} nisbas. Total so far: ${records.length}`);
        if (rows.length < batchSize) break;
        offset += batchSize;
    }
    return records;
}

async function fetchSubjects() {
    console.log('Fetching Subjects...');
    const batchSize = 5000;
    let offset = 0;
    const records = [];

    while (true) {
        const query = `
            SELECT id, parentId, subject, aSubject
            FROM subjects
            WHERE deletedAt IS NULL
            ORDER BY id ASC
            LIMIT :limit OFFSET :offset;
        `;
        const rows = await sequelize.query(query, {
            replacements: { limit: batchSize, offset: offset },
            type: QueryTypes.SELECT
        });
        if (rows.length === 0) break;

        for (const row of rows) {
            const cleanedRow = {};
            for (const [key, header] of Object.entries(subjectHeaders)) {
                cleanedRow[header] = cleanValue(row[key], key);
            }
            records.push(cleanedRow);
        }
        console.log(`Fetched ${rows.length} subjects. Total so far: ${records.length}`);
        if (rows.length < batchSize) break;
        offset += batchSize;
    }
    return records;
}

async function run() {
    console.log('Connecting to database...');
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }

    const manuscripts = await fetchManuscripts();
    const authors = await fetchAuthors();
    const nisbas = await fetchNisbas();
    const subjects = await fetchSubjects();

    // Generate output filename
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    const filename = `waamdb-${mm}-${dd}-${yyyy}.xlsx`;
    const outputPath = path.join(__dirname, `../data/spreadsheet_imports/${filename}`);

    console.log(`Writing records to Excel workbook: ${outputPath}...`);
    const wb = XLSX.utils.book_new();

    // Sheet 1: Manuscripts
    const wsManuscripts = XLSX.utils.json_to_sheet(manuscripts, { header: Object.values(manuscriptHeaders) });
    XLSX.utils.book_append_sheet(wb, wsManuscripts, 'Manuscripts');

    // Sheet 2: Authors
    const wsAuthors = XLSX.utils.json_to_sheet(authors, { header: Object.values(authorHeaders) });
    XLSX.utils.book_append_sheet(wb, wsAuthors, 'Authors');

    // Sheet 3: Nisbas
    const wsNisbas = XLSX.utils.json_to_sheet(nisbas, { header: Object.values(nisbaHeaders) });
    XLSX.utils.book_append_sheet(wb, wsNisbas, 'Nisbas');

    // Sheet 4: Subjects
    const wsSubjects = XLSX.utils.json_to_sheet(subjects, { header: Object.values(subjectHeaders) });
    XLSX.utils.book_append_sheet(wb, wsSubjects, 'Subjects');

    XLSX.writeFile(wb, outputPath, { compression: true });
    console.log(`Workbook generated successfully: ${filename}`);
    process.exit(0);
}

run().catch(err => {
    console.error('Error executing export script:', err);
    process.exit(1);
});
