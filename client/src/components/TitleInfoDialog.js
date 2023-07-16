import React from 'react';

import InfoDialog from './InfoDialog';

export default () => {
    const emailSubject = decodeURIComponent('AMMS: TITLE errors/corrections');
    const emailTo = 'stewartcharles99@yahoo.com,ouagadoo@yahoo.com';
    const emailBody = `%0D%0A%0D%0A-----%0D%0APage URL: ${
        document.location.href
    }`;

    return (
        <InfoDialog titleKey="title">
            <p>
                Record searches can be for a single item (the ‘basic search’) or
                for multiple fields in the manuscript records. In some records
                detail of the manuscript content is noted in the ‘miscellaneous’
                field, and to tap this detail, search for a keyword in the ‘any
                field’ search option. Keywords can be entered in either Arabic
                or Latin characters (an Arabic keyboard is at the end of each
                entry box). Arabic font must be used for title searches (only).
            </p>
            <p>
                For example, using the advanced search option, a search might
                include one or two words from a title in Arabic, the subject,
                the <i>nisba</i> or familiar name of the author, or, if seeking
                works written in a particular year, or manuscripts with
                illumination, insert the year, or the word ‘illumination’ in an
                ‘any field’ search. Or, if looking for Ajami texts in Hausa, the
                word ‘Hausa’ may be entered a search in ‘any field.’
            </p>
            <p>
                The AMMS search engine is sensitive to complete words as well as
                word fragments which can be problematical when a complete word
                also triggers other instances in which it is a fragment. For
                instance, a search for the word ‘blood-money’ in a title, دية ,
                will also bring up the word المحمدية. Titles in West African
                manuscripts are notoriously imprecise as well as variable for
                the same work, but the search for keywords can be helpful if,
                for short words, sometimes frustrating.
            </p>
            <p>
                For users who finds especially egregious errors or confusions in
                titles, thank you in advance for noting it here.{' '}
                <a
                    href={`mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    TITLE errors/corrections
                </a>
            </p>
        </InfoDialog>
    );
};
