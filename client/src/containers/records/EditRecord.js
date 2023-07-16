import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import {
    intlShape,
    injectIntl,
    defineMessages,
    FormattedMessage,
} from 'react-intl';

import {
    cleanUpSingleManuscript,
    fetchSingleManuscriptIfNeeded,
    cleanUpManuscripts,
} from '../../actions/manuscripts';

import Breadcrumb from '../../components/shared/Breadcrumb';

import Loader from '../../components/shared/Loader';

import Form from './Form';

const messages = defineMessages({
    pageTitle: {
        id: 'app.titles.edit.title',
        defaultMessage: 'Edit record',
    },
    backToSearch: {
        id: 'app.titles.edit.back.link',
        defaultMessage: 'back to search',
    },
});

class EditRecord extends React.Component {
    componentDidMount() {
        const { match: { params: { id } }, dispatch } = this.props;

        dispatch(cleanUpSingleManuscript());

        dispatch(fetchSingleManuscriptIfNeeded(parseInt(id, 10)));
    }

    componentWillUnmount() {
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
                            id="app.titles.edit.success.message"
                            defaultMessage="Success! a new record was updated, click the link to see it: {link}"
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
                {!newRecord && (
                    <Form enableReinitialize={true} hiddenFields="true" />
                )}
            </div>
        );
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

EditRecord.propTypes = propTypes;

export default connect(({ manuscripts, auth: { user } }) => ({
    manuscripts,
    user,
}))(injectIntl(EditRecord));
