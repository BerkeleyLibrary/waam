import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import {
    intlShape,
    injectIntl,
    defineMessages,
    FormattedMessage,
} from 'react-intl';

import Modal from 'react-bootstrap/Modal';

import Loader from '../components/shared/Loader';

import CustomPaper from '../components/shared/CustomPaper';

import Breadcrumb from '../components/shared/Breadcrumb';

import MultiLangRow from '../components/MultiLangRow';

import {
    fetchSingleSubjectIfNeeded,
    deleteSubject,
    cleanUpSingleSubject,
} from '../actions/subjects';

const labels = [
    {
        english: {
            id: 'Subject AMMS id:',
        },
        arabic: {
            id: 'رقم:',
        },
    },
    {
        english: {
            subject: 'Subject:',
        },
        arabic: {
            aSubject: 'الموضوع:',
        },
    },
];

const messages = defineMessages({
    pageTitle: {
        id: 'app.subjects.detail.title',
        defaultMessage: 'Subjects',
    },
    backToSearch: {
        id: 'app.subjects.detail.back.link',
        defaultMessage: 'back to search',
    },
    sureDelete: {
        id: 'app.subjects.detail.sure.delete',
        defaultMessage: 'Are you sure you want to delete this subject?',
    },
    sureDeleteTitle: {
        id: 'app.subjects.detail.sure.delete.title',
        defaultMessage: 'Are you sure?',
    },
    findRecords: {
        id: 'app.subjects.detail.find.records',
        defaultMessage: 'find records',
    },
});

const style = {
    container: {
        paddingTop: 10,
    },
};

class SubjectDetail extends React.Component {
    state = {
        open: false,
    };

    componentDidMount() {
        const { match: { params: { id } }, dispatch } = this.props;

        dispatch(cleanUpSingleSubject());

        dispatch(fetchSingleSubjectIfNeeded(parseInt(id, 10)));
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteSubject = () => {
        const { match: { params: { id } }, dispatch } = this.props;
        dispatch(deleteSubject(parseInt(id, 10)));
        this.handleClose();
    };

    render() {
        const {
            subjects: { selectedSubject, isFetching, deleted },
            location,
            intl: { formatMessage },
            user,
        } = this.props;

        return (() => {
            if (isFetching) {
                return <Loader />;
            } else if (selectedSubject) {
                const subjectFields = labels;

                return (
                    <div>
                        <Breadcrumb
                            items={[
                                { link: '/', label: 'home' },
                                { link: '/subjects', label: 'subjects' },
                                { link: '', label: selectedSubject.id },
                            ]}
                        />

                        <Modal show={this.state.open} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {formatMessage(messages.sureDeleteTitle)}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {formatMessage(messages.sureDelete)}
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={this.handleClose}
                                >
                                    Cancel
                                </button>{' '}
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={this.deleteSubject}
                                >
                                    Delete
                                </button>
                            </Modal.Footer>
                        </Modal>

                        <div className="row">
                            <div className="col">
                                <Link
                                    to={{
                                        pathname: '/subjects',
                                        search: location.search,
                                    }}
                                    className="btn btn-outline-info btn-sm"
                                >
                                    <i className="fas fa-chevron-left" />{' '}
                                    {formatMessage(messages.backToSearch)}
                                </Link>{' '}
                                <Link
                                    to={`/titles?fieldName=subjectId&query=${
                                        selectedSubject.id
                                    }`}
                                    className="btn btn-outline-info btn-sm"
                                >
                                    {formatMessage(messages.findRecords)}
                                </Link>
                            </div>
                            <div className="col">
                                {!deleted &&
                                    user &&
                                    user.admin && (
                                        <div className="text-right">
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={this.handleOpen}
                                            >
                                                <i className="fas fa-times" />{' '}
                                                Delete
                                            </button>{' '}
                                            <Link
                                                to={`/subjects/edit/${
                                                    selectedSubject.id
                                                }`}
                                                className="btn btn-outline-info btn-sm"
                                            >
                                                <i className="fas fa-pen" />{' '}
                                                Edit
                                            </Link>
                                        </div>
                                    )}
                            </div>
                        </div>

                        {deleted && (
                            <div className="alert alert-info">
                                <FormattedMessage
                                    id="app.subjects.detail.delete.success.message"
                                    defaultMessage="Success! the subject, {name}, was deleted."
                                    values={{ name: selectedSubject.subject }}
                                />
                            </div>
                        )}

                        {!deleted && (
                            <div style={style.container} dir="ltr">
                                {selectedSubject.id && (
                                    <CustomPaper>
                                        <div className="row">
                                            <div
                                                className="col mixed-text"
                                                dir="ltr"
                                            >
                                                <h3>Subject</h3>
                                            </div>
                                            <div
                                                className="col mixed-text"
                                                dir="rtl"
                                            >
                                                <h3>الموضوع</h3>
                                            </div>
                                        </div>
                                        <hr />
                                        {subjectFields.map((row, index) => {
                                            return (
                                                <React.Fragment
                                                    key={
                                                        Object.keys(
                                                            row.english
                                                        )[0]
                                                    }
                                                >
                                                    <MultiLangRow
                                                        label={
                                                            Object.values(
                                                                row.english
                                                            )[0]
                                                        }
                                                        value={
                                                            selectedSubject[
                                                                Object.keys(
                                                                    row.english
                                                                )[0]
                                                            ]
                                                        }
                                                        aValue={
                                                            selectedSubject[
                                                                Object.keys(
                                                                    row.arabic
                                                                )[0]
                                                            ]
                                                        }
                                                        aLabel={
                                                            Object.values(
                                                                row.arabic
                                                            )[0]
                                                        }
                                                    />
                                                    {index !==
                                                        subjectFields.length -
                                                            1 && <hr />}
                                                </React.Fragment>
                                            );
                                        })}
                                    </CustomPaper>
                                )}
                            </div>
                        )}
                    </div>
                );
            } else {
                return <Loader />;
            }
        })();
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

SubjectDetail.propTypes = propTypes;

export default connect(({ subjects, auth: { user } }) => ({ subjects, user }))(
    injectIntl(SubjectDetail)
);
