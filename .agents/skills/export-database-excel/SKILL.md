---
name: export-database-excel
description: Exports the entire database (Manuscripts, Authors, Nisbas, Subjects) into a consolidated, compressed, multi-sheet Excel file.
---

# Export Database Excel Skill

Use this skill when you need to export the complete database to a compressed spreadsheet format suitable for Google Sheets import.

## When to use this skill
- The user requests an export of the entire database.
- Generating a full backup spreadsheet of the synced tables.

## Execution Steps for the AGENT
1. Run the database export script:
   ```bash
   node bin/export-database.js
   ```

## Expected Results
- A dated, compressed Excel workbook generated at `data/spreadsheet_imports/waamdb-MM-DD-YYYY.xlsx` containing worksheets:
  - `Manuscripts`
  - `Authors`
  - `Nisbas`
  - `Subjects`
- All text fields are cleaned of edge spaces/diacritics/entities, and internal newlines are escaped.
- File size is compressed to ~40-50MB (below Google Sheets' 100MB conversion limit).
