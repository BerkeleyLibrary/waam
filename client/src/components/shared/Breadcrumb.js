import React from 'react';

import { Link } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

const labels = defineMessages({
    home: {
        id: 'app.component.breadcrumb.home',
        defaultMessage: 'Home',
    },
    collections: {
        id: 'app.component.breadcrumb.collections',
        defaultMessage: 'Manuscript Collections included',
    },
    history: {
        id: 'app.component.breadcrumb.history',
        defaultMessage: 'History',
    },
    titles: {
        id: 'app.component.breadcrumb.titles',
        defaultMessage: 'Records',
    },
    dashboard: {
        id: 'app.component.breadcrumb.dashboard',
        defaultMessage: 'Dashboard',
    },
    'x-references': {
        id: 'app.component.breadcrumb.dashboard.xref',
        defaultMessage: 'X-references',
    },
    users: {
        id: 'app.component.breadcrumb.dashboard.users',
        defaultMessage: 'Users',
    },
    help: {
        id: 'app.component.breadcrumb.help',
        defaultMessage: 'Help',
    },
});

const Breadcrumb = ({ items, intl: { formatMessage } }) => {
    return (
        <ol className="breadcrumb">
            {items.map(
                ({ link, label }) =>
                    link ? (
                        <li className="breadcrumb-item" key={label}>
                            <Link to={link}>
                                {labels[label]
                                    ? formatMessage(labels[label])
                                    : label}
                            </Link>
                        </li>
                    ) : (
                        <li className="breadcrumb-item active" key={label}>
                            {labels[label]
                                ? formatMessage(labels[label])
                                : label}
                        </li>
                    )
            )}
        </ol>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

Breadcrumb.propTypes = propTypes;

export default injectIntl(Breadcrumb);
