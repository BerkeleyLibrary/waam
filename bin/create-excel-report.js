const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Generate date string
const today = new Date();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const yyyy = today.getFullYear();
const dateStr = `${mm}-${dd}-${yyyy}`;

// Load the JSON report with date in filename
const jsonPath = path.join(__dirname, `../data/spreadsheet_imports/missing_references_report-${dateStr}.json`);
if (!fs.existsSync(jsonPath)) {
    console.error(`JSON report not found at: ${jsonPath}. Please run the sync script first.`);
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Create a workbook
const wb = XLSX.utils.book_new();

// 1. manuscripts-subjects
const subjectsData = data.missingSubjectReferences.map(x => ({
    'Manuscript ID': x.referencedByManuscriptId,
    'Arabic Manuscript Title': x.arabicTitle || '',
    'English Manuscript Title': x.englishTitle || '',
    'Missing Subject ID': x.missingSubjectId
}));
const wsSubjects = XLSX.utils.json_to_sheet(subjectsData);
XLSX.utils.book_append_sheet(wb, wsSubjects, 'manuscripts-subjects');

// 2. manuscripts-authors
const authorsData = data.missingAuthorReferences.map(x => ({
    'Manuscript ID': x.referencedByManuscriptId,
    'Arabic Manuscript Title': x.arabicTitle || '',
    'English Manuscript Title': x.englishTitle || '',
    'Missing Author ID': x.missingAuthorId,
    'Role': x.type
}));
const wsAuthors = XLSX.utils.json_to_sheet(authorsData);
XLSX.utils.book_append_sheet(wb, wsAuthors, 'manuscripts-authors');

// 3. manuscripts-groups
const groupsData = data.missingGroupReferences.map(x => ({
    'Manuscript ID': x.referencedByManuscriptId || '',
    'Arabic Manuscript Title': x.arabicTitle || '',
    'English Manuscript Title': x.englishTitle || '',
    'Author ID': x.referencedByAuthorId || '',
    'Author Name': x.authorName || '',
    'Missing Group ID': x.missingGroupId,
    'Source Table': x.source
}));
const wsGroups = XLSX.utils.json_to_sheet(groupsData);
XLSX.utils.book_append_sheet(wb, wsGroups, 'manuscripts-groups');

// 4. authors-nisbas
const nisbasData = data.missingNisbaReferences.map(x => ({
    'Author ID': x.referencedByAuthorId,
    'Author Name': x.authorName || '',
    'Missing Nisba ID': x.missingNisbaId,
    'Type': x.type
}));
const wsNisbas = XLSX.utils.json_to_sheet(nisbasData);
XLSX.utils.book_append_sheet(wb, wsNisbas, 'authors-nisbas');

// Save the workbook with date in filename
const outputPath = path.join(__dirname, `../data/spreadsheet_imports/missing_references_report-${dateStr}.xlsx`);
XLSX.writeFile(wb, outputPath);
console.log(`Excel report successfully generated at: ${outputPath}`);
