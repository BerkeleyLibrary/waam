import React from 'react';

import { Link } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import Breadcrumb from '../shared/Breadcrumb';

const messages = defineMessages({
    title: {
        id: 'app.page.help.title',
        defaultMessage: 'Help',
    },
    searchingRecords: {
        id: 'app.page.help.searching.records',
        defaultMessage: 'Searching records',
    },
    searchingAuthors: {
        id: 'app.page.help.searching.authors',
        defaultMessage: 'Searching authors',
    },
    searchingSubjects: {
        id: 'app.page.help.searching.subjects',
        defaultMessage: 'Searching subjects',
    },
    searchingNisbas: {
        id: 'app.page.help.searching.nisbas',
        defaultMessage: 'Searching nisbas',
    },
    searchingTitles: {
        id: 'app.page.help.searching.titles',
        defaultMessage: 'Searching titles',
    },
    searchingDates: {
        id: 'app.page.help.searching.dates',
        defaultMessage: 'Searching dates',
    },
    searchingAka: {
        id: 'app.page.help.searching.aka',
        defaultMessage: 'Searching author known as',
    },
    backToSearch: {
        id: 'app.page.help.back.to.search',
        defaultMessage: 'back to search',
    },
});

const emailSubject = decodeURIComponent('AMMS: TITLE errors/corrections');
const emailTo = 'stewartcharles99@yahoo.com,ouagadoo@yahoo.com';

const Help = ({ intl: { formatMessage }, history }) => {
    return (
        <div>
            <Breadcrumb
                items={[
                    { link: '/', label: 'home' },
                    { link: '', label: 'help' },
                ]}
            />
            <div className="row">
                <div className="col-sm-6">
                    <h1>{formatMessage(messages.title)}</h1>
                </div>
                <div className="col-sm-6">
                    <div className="text-right">
                        <button
                            className="btn btn-outline-info"
                            onClick={history.goBack}
                        >
                            <i className="fas fa-chevron-left" />{' '}
                            {formatMessage(messages.backToSearch)}
                        </button>
                    </div>
                </div>
            </div>

            <h2>{formatMessage(messages.searchingRecords)}</h2>
            <p>
                Record searches can be for a single item (the ‘basic search’) or
                simultaneously for multiple fields in the manuscript records.
                These will usually include the author, author’s <i>nisba</i>,
                title and subject, but may be any of the other fields noted in
                the drop-down menu. In some records, detail of the manuscript
                content is noted in the ‘miscellaneous’ field, and to tap this
                detail, search for a keyword in the ‘any field’ search option.
                Keywords can be entered in either Arabic or Latin characters (an
                Arabic keyboard is at the end of each entry box). For title
                searches, Arabic font must be used.
            </p>
            <p>
                For example, using the advanced search option, a search might
                begin with one or two words from a title in Arabic, followed by
                the subject, and one or two elements of the author’s name.
            </p>
            <p>
                <strong>Any field searches:</strong> If seeking works written in
                a particular year, or manuscripts with illumination, or an Ajami
                work written in Hausa, this kind of information is generally
                found in the miscellaneous field. Use an{' '}
                <strong>any field</strong> search and enter a key word (a year
                in either <i>Hijra</i> or Common Era form; the word
                ‘illumination’; the word ‘Hausa’).
            </p>

            <h2>Help for searches in specific fields is noted below:</h2>
            <h3>{formatMessage(messages.searchingAuthors)}</h3>
            <p>
                The Author search will locate all instances of a name entered
                across the entire database. Author names are famous for their
                variant forms and searches have been made as simple as possible,
                first, by eliminating diacritical points on Latin characters as
                well as the <i>`ain</i> and <i>hamza’</i>. Three author fields
                provide 1) the name as known locally and 2) the name as it
                appears (if established) in the Library of Congress name
                authority file, and 3) a secondary author, if the author has
                written a commentary or a gloss or abbreviation on another’s
                work. If additional authorities are cited and catalogued, they
                will appear as a note in the ‘miscellaneous’ field.
            </p>
            <p>
                Searches are recommended to begin at a general level before
                proceeding to more specific name(s) for authors. For instance, a
                search for the 16<sup>th</sup> century luminary Aḥmad Bāba b.
                Aḥmad b. `Umar b. Muḥammad 'Aqīt al-Tinbuktī (if his full name
                as recorded in this database is not known) might begin with his{' '}
                <i>nisba</i>, al-Tinbukti, then proceed to ‘Ahmad Baba’. A
                search for only ‘<strong>Ahmad Baba</strong>’ will yield 195
                instances of that name in the database;{' '}
                <strong>Tinbukti</strong> , likewise, will yield over 226
                records, but a simultaneous search for both will show 96
                records; add ‘<strong>Aqit</strong>’ or either of his death
                dates <strong>(1034/1624)</strong> and the search will display
                the 66 records in the database for your author. In another
                example, searching for the two most prolific Sokoto writers
                might begin with the <i>nisba</i>, “al-Fudi”, then continue with
                Abd Allah, or Muhammad Bello.
            </p>
            <p>
                Where an author identification was uncertain in the name
                authority file established for AMMS, we have retained the name
                exactly as given by the original cataloguer. Where possible,
                however, variant spellings or name forms have been standardized,
                and mis-identified or incompletely-identified authors have been
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

            <h3>{formatMessage(messages.searchingSubjects)}</h3>
            <p>
                The full set of Subject headings used in the database can be
                reviewed{' '}
                <strong>
                    <Link to={'/subject-headings'}>here</Link>
                </strong>. They have been developed from the manuscripts
                themselves rather than borrowed from a standard bibliographic
                system, and therefore they reflect the categories of knowledge
                as practiced in much of Islamic West Africa. A number of
                overlapping subject areas reflect the multiple ways individual
                catalogers understood their manuscripts and their tasks. For
                instance, the same devotional literature might appear under the
                Prophet as well as ‘Belief: prayer” or a work in jurisprudence
                on correct conduct might appear under “Ethics”, or “Conduct” or
                “Jurisprudence.” For this reason, the subject classifications
                are not rigid and cross-references (‘see …’, ‘see also …’, and
                ‘includes…’) will prompt the user to related subject searches.
            </p>

            <h3>{formatMessage(messages.searchingNisbas)}</h3>
            <p>
                Most authors’s names contain one or more referents to their
                identity that oftentimes also become their nickname. This may
                include kinship (usually a putative ancestor) [al-Hasani for
                descendents of Hasan] <strong>or</strong> residence (town or
                region) [al-Kanawi for a resident of Kano, al-Tinbukti,
                al-Salghawi (from Salagha); al-Burnawi (from Bornu), etc.{' '}
                <strong>or</strong> spiritual or academic affiliation [al-Tijani
                [for an advocate of that Sufi ṭarīqa, or al-Maliki (for a
                jurist)], <strong>or</strong> ethnicity [al-Fudi; al-Hawsi].
                Searching for a <i>nisba</i> may thus be a quick way to locate a
                class of authors. Like author names, <i>nisbas</i> appear in
                variant spellings, whether in Latin characters or Arabic script,
                and cross-references have been inserted to guide the user to the
                most common alternate spellings.
            </p>
            <p>
                The distance of a writer from his referent may also influence a{' '}
                <i>nisba</i>: a Mauritanian author in Northern Nigeria or Ghana
                may be known as ‘al-Shinqiti,’ a generic geographic indicator
                there for someone from today’s Mauritania, but at home he will
                be known by his tribal name, say, “`Alawi.” The attribution of a
                form of a <i>nisba</i> may also vary by region: a “al-Fudi” in
                one part of the Sahel may be known as a “al-Fulani” elsewhere,
                or al-Fallati, or al-Futi. Where several <i>nisbas</i> are
                frequently used for an author, they are entered in the record,
                separated by a slash (/); the search engine is sensitive to
                finding multiple <i>nisbas</i>.
            </p>
            <p>
                Some overlap exists in the ways cataloguers have used the{' '}
                <i>nisba</i> and the ‘author known as’ fields.
            </p>

            <h3>{formatMessage(messages.searchingTitles)}</h3>
            <p>
                The title field is the only one that is searched exclusively in
                Arabic font. Titles are widely variant in West African usage,
                and successful title searches generally begin with only a few
                keywords in the title and, using the advanced search option,
                combined with elements of the author’s name or subject of the
                work.
            </p>

            <h3>{formatMessage(messages.searchingDates)}</h3>
            <p>
                Dates can be searched in AH or CE form; information about the
                date of a manuscript copy or other chronological data has been
                entered in a record can be found through an “<strong>
                    any field
                </strong>” search.{' '}
            </p>

            <h3>{formatMessage(messages.searchingAka)}</h3>
            <p>
                The ‘Author Known As’ field is the familiar name by which
                particularly popular authors are frequently known, in Arabic,
                the <strong>اسم الشهرة</strong>. Some overlap exists in the ways
                cataloguers have used the <i>nisba</i> and the ‘author known as’
                fields.
            </p>

            <p>
                To users who find errors or confusions in entries: thank you in
                advance for noting it here.{' '}
                <strong>
                    <a
                        href={`mailto:${emailTo}?subject=${emailSubject}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        RECORD errors/corrections
                    </a>
                </strong>{' '}
                for the editor’s attention.
            </p>
        </div>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

Help.propTypes = propTypes;

export default injectIntl(Help);
