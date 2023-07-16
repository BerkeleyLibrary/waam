import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import {
    intlShape,
    injectIntl,
    defineMessages,
    FormattedMessage,
} from 'react-intl';

import { cleanUpAuthors } from '../../actions/authors';

import Breadcrumb from '../../components/shared/Breadcrumb';

import Loader from '../../components/shared/Loader';

import Form from './AuthorForm';

const messages = defineMessages({
    pageTitle: {
        id: 'app.authors.add.title',
        defaultMessage: 'New author',
    },
    backToSearch: {
        id: 'app.authors.add.back.link',
        defaultMessage: 'back to search',
    },
});

class AddAuthor extends React.Component {
    componentDidMount() {
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
                            id="app.authors.add.success.message"
                            defaultMessage="Success! a new author was added, click the link to see it: {link}"
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
                {!newRecord && <Form enableReinitialize={true} />}
            </div>
        );
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

AddAuthor.propTypes = propTypes;

export default connect(({ authors, auth: { user } }) => ({ authors, user }))(
    injectIntl(AddAuthor)
);
