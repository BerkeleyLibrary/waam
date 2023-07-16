import React from 'react';

import InfoDialog from './InfoDialog';

export default () => {
    return (
        <InfoDialog titleKey="nisba">
            <p>
                Most authors’s names contain one or more referents to their
                kinship (usually putative ancestor) [al-Hasani for descendents
                of Hasan] or their residence (town or region) [al-Kanawi for a
                resident of Kano; al-Tishiti [from Tishit], al-Timbuktu,
                al-Salghawi (from Salagha); al-Burnawi (from Bornu), etc. or
                spiritual or academic affiliation [al-Tijani [for an advocate of
                that Sufi ṭarīqa, or al-Maliki (for a jurist)], or ethnicity
                [al-Fudi; al-Hawsi]. Searching for a nisba may thus be a quick
                way to locate a class of authors. Nisbas appear in variant
                spellings, whether in Latin characters or Arabic script, and
                cross-references have been inserted to guide the user to the
                most common alternate spellings.
            </p>
            <p>
                The distance of a writer from his referent may also influence a
                nisba: a Mauritanian author in Northern Nigeria or Ghana may be
                known as ‘al-Shinqiti,’ a generic geographic indicator there for
                someone from today’s Mauritania, but at home he will be known by
                his tribal name, say, “`Alawi.” Or the attribution of a form of
                a nisba may vary by region: a “al-Fudi” in one part of the Sahel
                may be known as a “al-Fulani” elsewhere, or al-Fallati, or
                al-Futi. Where several nisbas frequently appear, they are
                entered in the record, separated by a slash (/); the search
                engine is sensitive to finding multiple nisbas.
            </p>
        </InfoDialog>
    );
};
