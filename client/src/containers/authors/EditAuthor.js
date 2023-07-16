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
    cleanUpSingleAuthor,
    fetchSingleAuthorIfNeeded,
    cleanUpAuthors,
} from '../../actions/authors';

import Breadcrumb from '../../components/shared/Breadcrumb';

import Loader from '../../components/shared/Loader';

import Form from './AuthorForm';

const messages = defineMessages({
    pageTitle: {
        id: 'app.authors.edit.title',
        defaultMessage: 'Edit author',
    },
    backToSearch: {
        id: 'app.authors.edit.back.link',
        defaultMessage: 'back to search',
    },
});

class EditAuthor extends React.Component {
    componentDidMount() {
        const { match: { params: { id } }, dispatch } = this.props;

        dispatch(cleanUpSingleAuthor());

        dispatch(fetchSingleAuthorIfNeeded(parseInt(id, 10)));
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(cleanUpAuthors());
    }

    render() {
        const {
            authors: { isFetching, newRecord },
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
                        { link: '/authors', label: 'authors' },
                        { link: '', label: formatMessage(messages.pageTitle) },
                    ]}
                />

                <h1>{formatMessage(messages.pageTitle)}</h1>
                {isFetching && <Loader />}
                {newRecord && (
                    <div className="alert alert-info">
                        <FormattedMessage
                            id="app.authors.edit.success.message"
                            defaultMessage="Success! a new author was updated, click the link to see it: {link}"
                            values={{
                                link: (
                                    <Link to={`/authors/${newRecord.id}`}>
                                        {newRecord.name}
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

EditAuthor.propTypes = propTypes;

export default connect(({ authors, auth: { user } }) => ({ authors, user }))(
    injectIntl(EditAuthor)
);
