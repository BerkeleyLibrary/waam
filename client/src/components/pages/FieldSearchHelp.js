import React from 'react';

import { Link } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import Breadcrumb from '../shared/Breadcrumb';

const messages = defineMessages({
    title: {
        id: 'app.page.field.help.title',
        defaultMessage:
            'Searching for authors and subjects (and other fields) in AMMS records',
    },
    searchingRecords: {
        id: 'app.page.field.help.searching.records',
        defaultMessage: 'Searching records',
    },
    searchingAuthors: {
        id: 'app.page.field.help.searching.authors',
        defaultMessage: 'Searching authors',
    },
    searchingSubjects: {
        id: 'app.page.field.help.searching.subjects',
        defaultMessage: 'Searching subjects',
    },
    searchingNisbas: {
        id: 'app.page.field.help.searching.nisbas',
        defaultMessage: 'Searching nisbas',
    },
    searchingTitles: {
        id: 'app.page.field.help.searching.titles',
        defaultMessage: 'Searching titles',
    },
    searchingDates: {
        id: 'app.page.field.help.searching.dates',
        defaultMessage: 'Searching dates',
    },
    searchingAka: {
        id: 'app.page.field.help.searching.aka',
        defaultMessage: 'Searching author known as',
    },
    backToHome: {
        id: 'app.page.field.help.back.to.home',
        defaultMessage: 'back to home',
    },
});

const Help = ({ intl: { formatMessage } }) => {
    return (
        <div>
            <Breadcrumb
                items={[
                    { link: '/', label: 'home' },
                    { link: '', label: 'Searching for authors and subjects' },
                ]}
            />
            <div className="row">
                <div className="col-sm-8">
                    <h1>{formatMessage(messages.title)}</h1>
                </div>
                <div className="col-sm-4">
                    <div className="text-right">
                        <Link className="btn btn-outline-info" to="/">
                            <i className="fas fa-chevron-left" />{' '}
                            {formatMessage(messages.backToHome)}
                        </Link>
                    </div>
                </div>
            </div>

            <p>
                The up-dated (2017) version of AMMS provides users with four
                interactive data sets for initiating searches:{' '}
                <strong>author</strong> names (or partial names), author{' '}
                <strong>
                    <i>nisbas</i>
                </strong>{' '}
                (tribal, residential or ethnic tags frequently found in personal
                names), <strong>subject</strong> matter (initiated by entering a
                subject or by selecting a subject from the “subject headings”
                tab at the top of the screen), and the <strong>records</strong>{' '}
                themselves. Up to three of the 30-odd fields that make up a
                record, from titles to author death-dates to author nick-names
                to the contents of individual collections, can be searched in
                Latin or Arabic characters in an advanced search (see “Download
                the AMMS data input form” tab for a complete list of fields).{' '}
            </p>
            <p>
                <strong>Searching partial names:</strong> An author search in
                AMMS is sensitive to any element of an author name and will
                provide results for all instances in which it appears (“Ahmad”
                will provide 927 names in the db in which ‘Ahmad’ appears;
                “Ahmad Baba” will show 30 names in which both ‘Ahmad’ and ‘Baba’
                appear; “Ahmad Baba Tinbukti” will produce the author Aḥmad Bāba
                b. Aḥmad b. `Umar b. Muḥammad 'Aqīt al-Tinbuktī and the 66
                records of his work). For manuscripts and documents in which
                only partial names of authors are known (frequently in
                correspondence), they have been retained as the original
                cataloguers have identified them. The records with these
                unidentified, partial names are relatively few (perhaps 100-200
                entries in 2017), and they can be found in author searches, but
                searches by subject matter for these citations may be more
                helpful. Where the cataloguers’ partial names have been
                identified with authors who appear elsewhere in the database,
                their full names have been provided.
            </p>
            <p>
                <strong>Author name spellings:</strong> AMMS records are drawn
                from catalogues and compilations of manuscript collections that
                have been made available to us in the form of hand-lists and
                published works in Arabic, French, English and German (explained
                in the “Collections included” tab). In 2009 a consolidation of
                differing spellings for the same name was undertaken (in Arabic
                as well as in Latin transliteration), and in 2017 a field for
                entering names that appear in the Library of Congress name
                authority system was added. At that time the cross-referencing
                of name citations was introduced (a work in progress) to
                identify variants in author names and nisbas. The
                standardization of names and addition of cross-reference
                variants will be an on-going process; as an interim measure our
                name authority file has been based on the{' '}
                <i>Arabic Literature of Africa</i> volumes (Brill).
            </p>
            <p>
                <strong>Secondary authors and multiple-author entries:</strong>{' '}
                Where cataloguers have entered two names as the author of a
                work, they appear in AMMS records as the author and ‘secondary
                author’ so as not to corrupt the original cataloguers’
                specification of a manuscript’s writers. ‘Secondary author’ has
                also been used to identify authors upon whose work the primary
                author has commented. In some instances, such as compilations of
                pre-Islamic poets, the original cataloguing reflects local usage
                for author names, and this has been retained to be sensitive to
                regional cultures; subject searches, in this case, for
                ‘pre-Islamic,’ will find the differing orthography for author
                names found in different collections.
            </p>
        </div>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

Help.propTypes = propTypes;

export default injectIntl(Help);
