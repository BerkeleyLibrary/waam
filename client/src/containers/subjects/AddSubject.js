import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import {
    intlShape,
    injectIntl,
    defineMessages,
    FormattedMessage,
} from 'react-intl';

import { cleanUpSubjects } from '../../actions/subjects';

import Breadcrumb from '../../components/shared/Breadcrumb';

import Loader from '../../components/shared/Loader';

import Form from './SubjectForm';

const messages = defineMessages({
    pageTitle: {
        id: 'app.subjects.add.title',
        defaultMessage: 'New subject',
    },
    backToSearch: {
        id: 'app.subjects.add.back.link',
        defaultMessage: 'back to search',
    },
});

class AddSubject extends React.Component {
    componentDidMount() {
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
                            id="app.subjects.add.success.message"
                            defaultMessage="Success! a new subject was added, click the link to see it: {link}"
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
                {!newRecord && <Form enableReinitialize={true} />}
            </div>
        );
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

AddSubject.propTypes = propTypes;

export default connect(({ subjects, auth: { user } }) => ({ subjects, user }))(
    injectIntl(AddSubject)
);
