import React from 'react';

import { Link } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

const labels = defineMessages({
    title: {
        id: 'app.help.link.label',
        defaultMessage: 'Help',
    },
});

const HelpButton = ({ intl: { formatMessage } }) => {
    return (
        <Link to="/help" className="btn btn-outline-info btn-sm">
            <i className="fas fa-info-circle" /> {formatMessage(labels.title)}
        </Link>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

HelpButton.propTypes = propTypes;

export default injectIntl(HelpButton);
