import React from 'react';

import {
    intlShape,
    injectIntl,
    defineMessages,
    FormattedMessage,
} from 'react-intl';

import { Route, Redirect } from 'react-router-dom';

import Collections from '../../containers/Collections';

import History from './History';

import Breadcrumb from '../shared/Breadcrumb';

const propTypes = {
    intl: intlShape.isRequired,
};

const messages = defineMessages({
    pageTitle: {
        id: 'app.about.page.title',
        defaultMessage: 'What is WAAMD?',
    },
    title: {
        id: 'app.about.title',
        defaultMessage: 'What is WAAMD (formerly AMMS)?',
    },
    subTitle: {
        id: 'app.about.subtitle',
        defaultMessage: '[The West African Arabic Manuscript Database]',
    },
    content2: {
        id: 'app.about.content.p2',
        defaultMessage:
            'The database software was re-written in 2017/18 and is now comprised of five interactive data sets: the manuscript records, their authors, the authors’ nisbas, subjects, and the collections themselves. It has a search engine designed to identify manuscripts and authors when only fragmentary information is available, in Arabic or Latin characters or a combination of both. Where digital images of manuscript texts are available, url links to the images appear in the records.',
    },
    content3: {
        id: 'app.about.content.p3',
        defaultMessage:
            'The database is publicly available at no cost to users; and the WAAMD cataloguing app is free to be downloaded for local use. Thirty-odd fields in Arabic and English cover all the descriptors normally employed in manuscript work and users may customize the input fields for the needs of particular collections. We encourage the inclusion of newly-catalogued material into the main database and ask readers to contact the editors to help facilitate this.',
    },
    content4: {
        id: 'app.about.content.p4',
        defaultMessage:
            'Funding for the development and elaboration of AMMS, now WAAMD, began with support from the National Endowment for the Humanities in 1991 and has since received support from the University of Illinois at Urbana-Champaign, The Johns Hopkins University, Duke University, al-Furqan Islamic Heritage Foundation, and the University of California at Berkeley. For more information contact:',
    },
    charles2: {
        id: 'app.about.content.charles2',
        defaultMessage:
            'Department of History, University of Illinois at Urbana-Champaign, and Institute for the Study of Islamic Thought in Africa, Northwestern University',
    },
    bruce2: {
        id: 'app.about.content.bruce2',
        defaultMessage:
            'Department of History, University of California, Berkeley',
    },
    bruceOrCharles: {
        id: 'app.about.content.bruceOrCharles',
        defaultMessage: 'Or',
    },
});

const About = ({ match, intl: { formatMessage } }) => {
    const pageTitle = formatMessage(messages.pageTitle);

    return (
        <div>
            <Route path={`${match.url}/collections`} component={Collections} />
            <Route path={`${match.url}/history`} component={History} />
            <Route
                exact
                path={`${match.url}/index`}
                render={() => (
                    <div>
                        <Breadcrumb
                            items={[
                                { link: '/', label: 'home' },
                                { link: '', label: pageTitle },
                            ]}
                        />
                        <h1>{formatMessage(messages.title)}</h1>
                        <h3>{formatMessage(messages.subTitle)}</h3>
                        <p>
                            <FormattedMessage
                                id="app.about.content.p1"
                                defaultMessage="WAAMD is a bi-lingual database that was developed at the University of Illinois in the late 1980s to describe a collection of Arabic manuscripts in southern Mauritania (Boutilimit). It subsequently has been used to compile a union catalogue of other West African collections, including manuscript libraries in West Africa, Europe and the United States. Beginning in 2018 inventories from the SAVAMA-DCI project in Timbuktu {timbuktu} are being added. This is a work in progress that will be expanding as additional library data from West Africa is being made available. WAAMD is hosted by the Library of the University of California, Berkeley."
                                values={{
                                    furqan: (
                                        <a
                                            href={'https://www.al-furqan.com'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            http://www.al-furqan.com
                                        </a>
                                    ),
                                    timbuktu: (
                                        <a
                                            href={
                                                'https://www.manuscript-cultures.uni-hamburg.de/timbuktu/index_e.html'
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            www.manuscript-cultures.uni-hamburg.de/timbuktu/index_e.html
                                        </a>
                                    ),
                                }}
                            />
                        </p>
                        <p>{formatMessage(messages.content2)}</p>
                        <p>{formatMessage(messages.content3)}</p>
                        <p>{formatMessage(messages.content4)}</p>
                        <div>
                            <h4>
                                <FormattedMessage
                                    id="app.about.content.bruce1"
                                    defaultMessage="Bruce Stewart Hall, General Editor ({email})"
                                    values={{
                                        email: (
                                            <a
                                                href={
                                                    'mailto:ouagadoo@yahoo.com'
                                                }
                                            >
                                                ouagadoo@yahoo.com
                                            </a>
                                        ),
                                    }}
                                />
                            </h4>
                            <p>{formatMessage(messages.bruce2)}</p>
                        </div>
                        <p>{formatMessage(messages.bruceOrCharles)}</p>
                        <div>
                            <h4>
                                <FormattedMessage
                                    id="app.about.content.charles1"
                                    defaultMessage="Charles Stewart, Editor ({email})"
                                    values={{
                                        email: (
                                            <a
                                                href={
                                                    'mailto:stewartcharles99@yahoo.com'
                                                }
                                            >
                                                stewartcharles99@yahoo.com
                                            </a>
                                        ),
                                    }}
                                />
                            </h4>
                            <p>{formatMessage(messages.charles2)}</p>
                        </div>
                    </div>
                )}
            />
            <Route
                exact
                path={match.url}
                render={props => (
                    <Redirect
                        to={{
                            pathname: `${match.url}/index`,
                            state: { from: props.location },
                        }}
                    />
                )}
            />
        </div>
    );
};

About.propTypes = propTypes;

export default injectIntl(About);
