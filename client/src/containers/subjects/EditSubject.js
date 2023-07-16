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
    cleanUpSingleSubject,
    fetchSingleSubjectIfNeeded,
    cleanUpSubjects,
} from '../../actions/subjects';

import Breadcrumb from '../../components/shared/Breadcrumb';

import Loader from '../../components/shared/Loader';

import Form from './SubjectForm';

const messages = defineMessages({
    pageTitle: {
        id: 'app.subjects.edit.title',
        defaultMessage: 'Edit subject',
    },
    backToSearch: {
        id: 'app.subjects.edit.back.link',
        defaultMessage: 'back to search',
    },
});

class EditSubject extends React.Component {
    componentDidMount() {
        const { match: { params: { id } }, dispatch } = this.props;

        dispatch(cleanUpSingleSubject());

        dispatch(fetchSingleSubjectIfNeeded(parseInt(id, 10)));
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(cleanUpSubjects());
    }

    render() {
        const {
            subjects: { isFetching, newRecord },
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
                        { link: '/subjects', label: 'subjects' },
                        { link: '', label: formatMessage(messages.pageTitle) },
                    ]}
                />

                <h1>{formatMessage(messages.pageTitle)}</h1>
                {isFetching && <Loader />}
                {newRecord && (
                    <div className="alert alert-info">
                        <FormattedMessage
                            id="app.subjects.edit.success.message"
                            defaultMessage="Success! a new subject was updated, click the link to see it: {link}"
                            values={{
                                link: (
                                    <Link to={`/subjects/${newRecord.id}`}>
                                        {newRecord.subject}
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

EditSubject.propTypes = propTypes;

export default connect(({ subjects, auth: { user } }) => ({ subjects, user }))(
    injectIntl(EditSubject)
);
