import React from 'react';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
    resultInfo: {
        id: 'app.components.result.info.text',
        defaultMessage: 'Showing {shownStart} to {shownEnd} of {total}',
    },
});

const ResultCountInfo = ({
    pagination,
    currentResultCount,
    intl: { formatMessage },
}) => {
    return (
        <div className="card">
            <div className="card-body">
                {formatMessage(messages.resultInfo, {
                    shownStart: pagination.current * pagination.perPage + 1,
                    shownEnd:
                        pagination.current * pagination.perPage +
                        currentResultCount,
                    total: pagination.total,
                })}
            </div>
        </div>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

ResultCountInfo.propTypes = propTypes;

export default injectIntl(ResultCountInfo);
