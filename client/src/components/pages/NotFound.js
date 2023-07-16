import React from 'react';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
    notFound: {
        id: 'app.pages.not.found.text',
        defaultMessage: 'Page not found:',
    },
});

const propTypes = {
    intl: intlShape.isRequired,
};

const NotFound = ({ location, intl: { formatMessage } }) => {
    return (
        <div className="alert alert-danger">
            {formatMessage(messages.notFound)} <code>{location.pathname}</code>
        </div>
    );
};

NotFound.propTypes = propTypes;

export default injectIntl(NotFound);
