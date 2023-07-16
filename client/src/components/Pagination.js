import React from 'react';

import { Link } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { getQueryString } from '../utils/utils';

const messages = defineMessages({
    next: {
        id: 'app.shared.pagination.next',
        defaultMessage: 'next',
    },
    prev: {
        id: 'app.shared.pagination.prev',
        defaultMessage: 'previous',
    },
});

const Pagination = props => {
    const {
        pagination: { previous, next },
        query,
        pathname,
        intl: { formatMessage },
    } = props;
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-end">
                {previous !== null && (
                    <li className="page-item">
                        <Link
                            className="page-link"
                            to={{
                                pathname,
                                search: getQueryString(
                                    Object.assign({}, query, {
                                        page: previous,
                                    })
                                ),
                            }}
                        >
                            &lt; {formatMessage(messages.prev)}
                        </Link>
                    </li>
                )}{' '}
                {next !== null && (
                    <li className="page-item">
                        <Link
                            className="page-link"
                            to={{
                                pathname,
                                search: getQueryString(
                                    Object.assign({}, query, { page: next })
                                ),
                            }}
                        >
                            {formatMessage(messages.next)} &gt;
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

Pagination.propTypes = propTypes;

export default injectIntl(Pagination);
