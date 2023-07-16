import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import {
    intlShape,
    injectIntl,
    defineMessages,
    FormattedMessage,
} from 'react-intl';

import { cleanUpManuscripts } from '../../actions/manuscripts';

import Breadcrumb from '../../components/shared/Breadcrumb';

import Loader from '../../components/shared/Loader';

import Form from './Form';

const messages = defineMessages({
    pageTitle: {
        id: 'app.titles.add.title',
        defaultMessage: 'New record',
    },
    backToSearch: {
        id: 'app.titles.add.back.link',
        defaultMessage: 'back to search',
    },
});

class AddRecord extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(cleanUpManuscripts());
    }

    render() {
        const {
            manuscripts: { isFetching, newRecord },
            user,
            intl: { formatMessage },
        } = this.props;

        if (!user) {
            return null;
        }

        return (
            <div>
                <Breadcrumb
                    items={[
                        { link: '/', label: 'home' },
                        { link: '/titles', label: 'titles' },
                        { link: '', label: formatMessage(messages.pageTitle) },
                    ]}
                />

                <h1>{formatMessage(messages.pageTitle)}</h1>
                {isFetching && <Loader />}
                {newRecord && (
                    <div className="alert alert-info">
                        <FormattedMessage
                            id="app.titles.add.success.message"
                            defaultMessage="Success! a new record was added, click the link to see it: {link}"
                            values={{
                                link: (
                                    <Link to={`/titles/${newRecord.id}`}>
                                        {newRecord.aTitle || 'here'}
                                    </Link>
                                ),
                            }}
                        />
                    </div>
                )}
                {!newRecord && <Form enableReinitialize={true} />}
            </div>
        );
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

AddRecord.propTypes = propTypes;

export default connect(({ manuscripts, auth: { user } }) => ({
    manuscripts,
    user,
}))(injectIntl(AddRecord));
