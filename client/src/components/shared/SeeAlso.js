import React from 'react';

import { Link } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { getQueryString } from '../../utils/utils';

const messages = defineMessages({
    seeAlso: {
        id: 'app.component.see.also.see.also',
        defaultMessage: 'see also:',
    },
    see: {
        id: 'app.component.see.also.see',
        defaultMessage: 'see:',
    },
    includes: {
        id: 'app.component.see.also.includes',
        defaultMessage: 'includes:',
    },
});

const LinksFromCommaSeparated = (
    commaSeparatedText,
    query = {},
    pathname = ''
) => {
    const linksArray = commaSeparatedText.split(',');
    const linksLength = linksArray.length;

    return linksArray.map((cs, index) => (
        <span key={cs}>
            <Link
                className="alert-link"
                to={{
                    pathname,
                    search: getQueryString(
                        Object.assign({}, query, { page: 0, query: cs.trim() })
                    ),
                }}
            >
                {cs}
            </Link>
            {index < linksLength - 1 ? ', ' : ''}
        </span>
    ));
};

const getCrossReferenceQuery = (
    query,
    crossReferences,
    pathname,
    formatMessage
) => {
    const searchKeyword = query.query || '';

    return crossReferences.map(ref => {
        switch (ref.type) {
            case 'see-also':
            case 'includes':
                return (
                    searchKeyword.toLowerCase() ===
                        ref.keyword.toLowerCase() && (
                        <div
                            key={ref.keyword + ref.type}
                            className="alert alert-info"
                            role="alert"
                        >
                            {ref.type === 'see-also'
                                ? formatMessage(messages.seeAlso)
                                : formatMessage(messages.includes)}{' '}
                            {LinksFromCommaSeparated(
                                ref.target,
                                query,
                                pathname
                            )}
                        </div>
                    )
                );
            default:
                return (
                    new RegExp(ref.keyword, 'ig').test(searchKeyword) && (
                        <div
                            key={ref.keyword + ref.type}
                            className="alert alert-warning"
                            role="alert"
                        >
                            {formatMessage(messages.see)}{' '}
                            {LinksFromCommaSeparated(
                                ref.target,
                                query,
                                pathname
                            )}
                        </div>
                    )
                );
        }
    });
};

const SeeAlso = ({ pathname, query, refList, intl: { formatMessage } }) => {
    if (!refList.length) {
        return null;
    }

    return (
        <div>
            {getCrossReferenceQuery(query, refList, pathname, formatMessage)}
        </div>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

SeeAlso.propTypes = propTypes;

export default injectIntl(SeeAlso);
