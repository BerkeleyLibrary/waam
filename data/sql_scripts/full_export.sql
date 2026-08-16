-- 04-05-2026
-- ID	Collection	Arabic Title	Title	Alternative Title	Arabic Alternative Title	Attributed Title	Arabic Attributed Title	Documentation	Arabic Documentation	Form	Arabic Form	Recipient	Arabic Recipient	Recipient Group	Arabic Recipient Group	Requester	Arabic Requester	Copyist	Arabic Copyist	Location Copied	Arabic Location Copied	Date Copied	Arabic Date Copied	Composed	Owner	Arabic Owner	Pages	Dimensions	Language	Condition	Arabic Condition	Miscellaneous	Arabic Miscellaneous	Arabic First Line	Arabic Last Line	Sponsor Logo	Login Required	Added By	Approved	Online Copy	Group ID	Subject ID	Source	Reference Number	Online Label	Hidden	Primary Author ID	Secondary Author IDs

SELECT 
    m.id, m.collection, m.aTitle, m.title, m.altTitle, m.aAltTitle, 
    m.attrTitle, m.aAttrTitle, m.documentation, m.aDocumentation, 
    m.form, m.aForm, m.recp, m.aRecp, m.recpGrp, m.aRecpGrp, 
    m.req, m.aReq, m.copyist, m.aCopyist, m.copiedAt, m.aCopiedAt, 
    m.copiedDate, m.aCopiedDate, m.composed, m.owner, m.aOwner, 
    m.pages, m.dims, m.lang, m.`condition`, m.aCondition, 
    m.misc, m.aMisc, m.aFirstLine, m.aLastLine, m.sponsorLogo, 
    m.login, m.added_by, m.approved, m.onlineCopy, m.groupId, 
    m.subjectId, m.source, m.ref_number, m.onlineLabel, m.hidden,
    -- Conditional aggregation for author roles
    MAX(CASE WHEN ma.status = 'primary' THEN ma.authorId END) AS primary_author_id,
    GROUP_CONCAT(CASE WHEN ma.status != 'primary' OR ma.status IS NULL THEN ma.authorId END) AS secondary_author_ids
FROM manuscripts m
LEFT JOIN manuscriptAuthors ma ON m.id = ma.manuscriptId
WHERE m.deletedAt IS NULL
GROUP BY m.id LIMIT 20000 OFFSET 0;


-- ID	Name	Arabic Name	Alternative Name	Arabic Alternative Name	Library of Congress Name	Arabic Library of Congress Name	Also Known As	Arabic Also Known As	Documentation	Arabic Documentation	All Nisba IDs	Date of Death	Arabic Date of Death	Date of Birth	Arabic Date of Birth	Group ID	Reference Number	Hidden
SELECT 
    a.id, a.name, a.aName, a.altName, a.aAltName, a.LCName, a.ALCName, 
    a.aka, a.aAka, a.documentation, a.aDocumentation, a.nisbaId, 
    a.secNisbaId, a.dateDied, a.aDateDied, a.dateBorn, a.aDateBorn, 
    a.groupId, a.ref_number, a.hidden,
    GROUP_CONCAT(DISTINCT CONCAT('[', an.nisbaId, ']') SEPARATOR '') AS all_nisba_ids
FROM authors a
LEFT JOIN authorNisbas an ON a.id = an.authorId
WHERE a.deletedAt IS NULL
GROUP BY a.id;

-- ID	Nisba	Arabic Nisba
SELECT 
    id, nisba, aNisba
FROM nisba
WHERE deletedAt IS NULL;


-- ID	Parent ID	Subject	Arabic Subject
SELECT 
    id, parentId, subject, aSubject
FROM subjects
WHERE deletedAt IS NULL;