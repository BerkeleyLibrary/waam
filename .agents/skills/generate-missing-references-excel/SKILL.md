---
name: generate-missing-references-excel
description: Takes the dated missing references JSON report and compiles it into a dated, multi-tab Excel spreadsheet separating missing subjects, authors, and groups.
---

# Generate Missing References Excel Skill

Use this skill when you need to compile a validation report of missing references (foreign keys referenced in manuscripts but not present in the database tables) into a readable Excel format for editors.

## When to use this skill
- Generating Excel spreadsheets for missing foreign key references after running a spreadsheet sync.
- A spreadsheet sync script has created a dated JSON report file in `data/spreadsheet_imports/`.

## Execution Steps for the AGENT
1. Ensure the dated JSON file exists (e.g. `data/spreadsheet_imports/missing_references_report-MM-DD-YYYY.json`).
2. Run the Excel compilation script:
   ```bash
   node bin/create-excel-report.js
   ```
   *Note: This script automatically reads the dated JSON report and generates the matching dated Excel report in `data/spreadsheet_imports/`.*

## Expected Results
- A dated Excel workbook generated in `data/spreadsheet_imports/missing_references_report-MM-DD-YYYY.xlsx` containing sheets:
  - `manuscripts-subjects`
  - `manuscripts-authors`
  - `manuscripts-groups`
  - `authors-nisbas`
- The file has custom headers (such as `Manuscript ID`, `Arabic Manuscript Title`, `English Manuscript Title`) with cleaned values.
