import React from 'react';

import InfoDialog from './InfoDialog';

export default () => {
    const emailSubject = decodeURIComponent('AMMS: AUTHOR errors/corrections');
    const emailTo = 'stewartcharles99@yahoo.com,ouagadoo@yahoo.com';
    const emailBody = `%0D%0A%0D%0A-----%0D%0APage URL: ${
        document.location.href
    }`;

    return (
        <InfoDialog titleKey="author">
            <p>
                The Author search consolidates all instances of a name across
                the database. Author names are famous for their variant forms
                and searches have been made as simple as possible, first, by
                eliminating diacritical points on Latin characters as well as
                the <i>`ain</i> <i>and hamza’</i>. Three author fields provide
                1) the name as known locally and 2) the name as it appears (if
                established) in the Library of Congress name authority file, and
                3) a secondary author, if the author has written a commentary or
                a gloss or abbreviation on another’s work. If additional
                authorities are cited and catalogued, they will appear as a note
                in the ‘miscellaneous’ field. A search for particular records
                initiated while in an ‘Author’ search will automatically
                transfer you to the ‘Search records’ screen.
            </p>
            <p>
                Searches are recommended to begin at a general level before
                proceeding to more specific name(s) for authors. For instance, a
                search for the 16th century luminary Aḥmad Bāba b. Aḥmad b.
                `Umar b. Muḥammad 'Aqīt al-Tinbuktī (if his full name as
                recorded in this database is not known) might begin with his{' '}
                <i>nisba</i>, al-Tinbukti, then proceed to ‘Ahmad Baba’. A
                search for only ‘Ahmad Baba’ will yield over 200 instances of
                that name in the database; Tinbukti , likewise, will yield over
                200, but a simultaneous search for both will show fewer than 100
                records; add ‘Aqit’ and the search will display the 66 records
                in the database for your author. Searching for the two most
                prolific Sokoto writers might begin with the <i>nisba</i>,
                “al-Fudi”, then continue with Abd Allah, or Muhammad Bello.
            </p>

            <p>
                In the name authority file established for AMMS where an
                identification was uncertain we have retained the name exactly
                as given by the original cataloguer. Where possible, however,
                variant spellings or forms have been standardized, and
                mis-identified or incompletely-identified authors have been
                given their full name, based usually on the title of a work.
            </p>
            <p>
                Cross-reference suggestions for spellings and name forms appear
                in response to specific searches. For instance, “Mohamed” will
                refer the user to “Muhammad” and that spelling will alert the
                reader to other forms of the name that are commonly found in
                these manuscripts (Sidi Muhammad, Mhammad, Muhammadhan,
                Muhammadhun, etc.)
            </p>
            <p>
                For users who finds especially egregious errors and
                misapplications of author names, thank you in advance for noting
                it here:{' '}
                <a
                    href={`mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    AUTHOR errors/corrections
                </a>
            </p>
        </InfoDialog>
    );
};
