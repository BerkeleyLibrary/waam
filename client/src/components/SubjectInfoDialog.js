import React from 'react';

import { Link } from 'react-router-dom';

import InfoDialog from './InfoDialog';

export default () => {
    const emailSubject = decodeURIComponent('AMMS: SUBJECT error/correction');
    const emailTo = 'stewartcharles99@yahoo.com,ouagadoo@yahoo.com';
    const emailBody = `%0D%0A%0D%0A-----%0D%0APage URL: ${
        document.location.href
    }`;

    return (
        <InfoDialog titleKey="subject">
            <p>
                The full set of Subject headings used in the database can be
                reviewed <Link to={'/subject-headings'}>here</Link>. They have
                been developed from the manuscripts themselves rather than
                borrowed from a standard bibliographic system, and therefore
                they reflect the categories of knowledge as practiced in much of
                Islamic West Africa. A number of overlapping subject areas
                reflect the multiple ways individual catalogers understood their
                manuscripts and their tasks. For instance, the same devotional
                literature might appear under the Prophet as well as ‘Belief:
                prayer” or a work in jurisprudence on correct conduct might
                appear under “Ethics”, or “Conduct” or “Jurisprudence”. For this
                reason, the subject classifications are not rigid and
                cross-references (‘see …’, ‘see also …’, and ‘includes…’) should
                prompt the user to related subject searches.
            </p>
            <p>
                For users who finds especially egregious errors and
                misapplications of subject categories, thank you in advance for
                noting it here:{' '}
                <a
                    href={`mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    SUBJECT error/correction
                </a>
            </p>
        </InfoDialog>
    );
};
