---
name: sync-database
description: Synchronises the local database with spreadsheet CSV files. Instructs on production backup, database seeding, CSV placement, running the sync script, and updating search indexes.
---

# Sync Database Skill

Use this skill when you need to synchronize the local database with the editor's spreadsheet data.

## When to use this skill
- The user requests to import, sync, or update the database with new CSV exports.
- A spreadsheet sync needs to be executed alongside search index regeneration.

## Prerequisites and Instructions to show the USER
Before executing the sync, explicitly ask/instruct the user to perform the following:
1. **Back up Production Database**: Always request the user to take a dump/backup of the production database first.
2. **Seed Local Database**: Instruct the user to seed the local database with the latest production backup so that the sync operates on fresh production-equivalent records.
3. **Download CSV Exports**: Prompt the user to export the editor's Google Sheets tabs as CSV files and save them to `data/spreadsheet_imports/` as:
   - `manuscripts.csv`
   - `authors.csv`
   - `nisba.csv`
   - `subjects.csv`

## Execution Steps for the AGENT
1. Run the synchronization script:
   ```bash
   node bin/sync-spreadsheet.js
   ```
   *Note: This will check for missing references and output a dated JSON report `data/spreadsheet_imports/missing_references_report-MM-DD-YYYY.json`.*

2. Rebuild search indexes:
   ```bash
   node -r dotenv/config ./bin/generate-authors-search-indexes.js && node -r dotenv/config ./bin/generate-manuscripts-search-indexes.js
   ```

## Expected Results
- Updated database tables containing the new CSV data.
- A dated JSON report containing missing references generated in `data/spreadsheet_imports/missing_references_report-MM-DD-YYYY.json`.
- Refreshed search indexes for authors and manuscripts.
