import React from 'react';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
    noResults: {
        id: 'app.page.no.results.text',
        defaultMessage: 'Sorry, no results found.',
    },
    noSearch: {
        id: 'app.page.no.search.text',
        defaultMessage: 'Start by typing a keyword in the search box.',
    },
});

const NoResults = ({ intl: { formatMessage }, noSearch }) => (
    <div className="card">
        <div className="card-body">
            {formatMessage(noSearch ? messages.noSearch : messages.noResults)}
        </div>
    </div>
);

const propTypes = {
    intl: intlShape.isRequired,
};

NoResults.propTypes = propTypes;

export default injectIntl(NoResults);
