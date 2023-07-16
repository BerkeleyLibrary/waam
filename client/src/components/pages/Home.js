import React from 'react';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const propTypes = {
    intl: intlShape.isRequired,
};

const messages = defineMessages({
    title: {
        id: 'app.home.title',
        defaultMessage:
            'Welcome to the West African Arabic Manuscript Database (WAAMD)',
    },
    lead: {
        id: 'app.home.lead',
        defaultMessage:
            'An interactive database and union catalogue of Arabic manuscripts and documents from across West Africa',
    },
    searchTitles: {
        id: 'app.home.search.titles',
        defaultMessage: 'Search records',
    },
    searchAuthors: {
        id: 'app.home.search.authors',
        defaultMessage: 'Search authors',
    },
    searchSubjects: {
        id: 'app.home.search.subjects',
        defaultMessage: 'Search subjects',
    },
    searchNisbas: {
        id: 'app.home.search.nisbas',
        defaultMessage: 'Search nisbas',
    },
    about: {
        id: 'app.home.page.about',
        defaultMessage: 'What is WAAMD?',
    },
    collections: {
        id: 'app.home.page.collections',
        defaultMessage: 'Manuscript Collections included',
    },
    history: {
        id: 'app.home.page.history',
        defaultMessage: 'History of the project',
    },
    entryForm: {
        id: 'app.home.page.entry.form',
        defaultMessage:
            'See the AMMS data input form and download for your own use',
    },
    titleAndSubjects: {
        id: 'app.home.page.titles.and.subjects.search',
        defaultMessage: 'Searching for authors and subjects',
    },
});

const homeSections = [
    { url: '/about', name: 'about' },
    { url: '/about/collections', name: 'collections' },
    { url: '/about/history', name: 'history' },
    { url: '/field-help', name: 'titleAndSubjects' },
    { url: '/authors', name: 'searchAuthors' },
    { url: '/nisbas', name: 'searchNisbas' },
    { url: '/subjects', name: 'searchSubjects' },
    { url: '/titles', name: 'searchTitles' },
];

const Home = props => {
    const { intl: { formatMessage } } = props;

    return (
        <div className="home-page">
            <div className="jumbotron">
                <div style={{ textAlign: 'center' }}>
                    <img
                        src="/img/logo.gif"
                        alt={formatMessage(messages.title)}
                    />
                </div>
                <h1>{formatMessage(messages.title)}</h1>
                <p className="lead">{formatMessage(messages.lead)}</p>
            </div>
            <ul className="list-group">
                {homeSections.map(item => (
                    <li key={item.name} className="list-group-item">
                        <Link to={item.url}>
                            {formatMessage(messages[item.name])} »
                        </Link>
                    </li>
                ))}
                <li className="list-group-item">
                    <a href="/files/amms-data-input-form.xlsx">
                        {formatMessage(messages.entryForm)} »
                    </a>
                </li>
            </ul>
        </div>
    );
};

Home.propTypes = propTypes;

export default injectIntl(Home);
