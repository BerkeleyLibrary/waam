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
    fetchSingleAuthorIfNeeded,
    deleteAuthor,
    cleanUpSingleAuthor,
} from '../actions/authors';
import { getAuthorFlatJson } from '../utils/utils';
import logos from '../img/logos/';

const labels = {
    author: [
        {
            english: {
                id: 'Author WAAMD ID#:',
            },
            arabic: {
                id: 'رقم المؤلف:',
            },
        },
        {
            english: {
                nisba: 'Nisba:',
            },
            arabic: {
                aNisba: 'النسبة:',
            },
        },
        {
            english: {
                altName: 'Alt name:',
            },
            arabic: {
                aAltName: 'إسم بديل:',
            },
        },
        {
            english: {
                LCName: 'Library of Congress name authority:',
            },
            arabic: {
                ALCName: 'اسم مكتبة الكونغرس:',
            },
        },
        {
            english: {
                aka: 'known as:',
            },
            arabic: {
                aAka: 'اسم الشهرة:',
            },
        },
        {
            english: {
                dateDied: 'Date Deceased:',
            },
            arabic: {
                aDateDied: 'تاريخ الوفاة:',
            },
        },
        {
            english: {
                dateBorn: 'Date Born:',
            },
            arabic: {
                aDateBorn: 'تاريخ الميلاد:',
            },
        },
        {
            english: {
                documentation: 'Documentation:',
            },
            arabic: {
                aDocumentation: 'التوثيق:',
            },
        },
    ],
};

const messages = defineMessages({
    pageTitle: {
        id: 'app.authors.detail.title',
        defaultMessage: 'Authors',
    },
    backToSearch: {
        id: 'app.authors.detail.back.link',
        defaultMessage: 'back to search',
    },
    sureDelete: {
        id: 'app.authors.detail.sure.delete',
        defaultMessage: 'Are you sure you want to delete this author?',
    },
    sureDeleteTitle: {
        id: 'app.authors.detail.sure.delete.title',
        defaultMessage: 'Are you sure?',
    },
    findRecords: {
        id: 'app.authors.detail.find.records',
        defaultMessage: 'find records',
    },
});

const style = {
    container: {
        paddingTop: 10,
    },
};

class AuthorDetail extends React.Component {
    state = {
        open: false,
    };

    componentDidMount() {
        const { match: { params: { id } }, dispatch } = this.props;

        dispatch(cleanUpSingleAuthor());

        dispatch(fetchSingleAuthorIfNeeded(parseInt(id, 10)));
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteAuthor = () => {
        const { match: { params: { id } }, dispatch } = this.props;
        dispatch(deleteAuthor(parseInt(id, 10)));
        this.handleClose();
    };

    render() {
        const {
            authors: { selectedAuthor, isFetching, deleted },
            location,
            intl: { formatMessage },
            user,
        } = this.props;

        const { group } = selectedAuthor || {};
        const logo = group && group.logo;

        const manuscripts = selectedAuthor && selectedAuthor.manuscripts;

        return (() => {
            if (isFetching) {
                return <Loader />;
            } else if (selectedAuthor) {
                const normalizedAuthor = getAuthorFlatJson(selectedAuthor);

                const authorFields = labels.author;

                return (
                    <div>
                        <Breadcrumb
                            items={[
                                { link: '/', label: 'home' },
                                { link: '/authors', label: 'authors' },
                                { link: '', label: selectedAuthor.id },
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
                                    onClick={this.deleteAuthor}
                                >
                                    Delete
                                </button>{' '}
                            </Modal.Footer>
                        </Modal>

                        <div className="row">
                            <div className="col-sm-6">
                                <Link
                                    to={{
                                        pathname: '/authors',
                                        search: location.search,
                                    }}
                                    className="btn btn-outline-info btn-sm"
                                >
                                    <i className="fas fa-chevron-left" />{' '}
                                    {formatMessage(messages.backToSearch)}
                                </Link>{' '}
                                <Link
                                    to={`/titles?fieldName=authorId&query=${
                                        selectedAuthor.id
                                    }`}
                                    className="btn btn-outline-info btn-sm"
                                >
                                    {formatMessage(messages.findRecords)}
                                </Link>
                            </div>
                            <div className="col-sm-6">
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
                                                to={`/authors/edit/${
                                                    selectedAuthor.id
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
                                    id="app.authors.detail.delete.success.message"
                                    defaultMessage="Success! the author, {name}, was deleted."
                                    values={{ name: selectedAuthor.name }}
                                />
                            </div>
                        )}

                        {!deleted && (
                            <div style={style.container} dir="ltr">
                                {normalizedAuthor.id && (
                                    <CustomPaper>
                                        <div className="row">
                                            <div
                                                className="col-sm-6 mixed-text"
                                                dir="ltr"
                                            >
                                                <h3>
                                                    Author:{' '}
                                                    {selectedAuthor.name}{' '}
                                                </h3>
                                                {logo && (
                                                    <img
                                                        src={logos[logo]}
                                                        style={{
                                                            maxHeight: 24,
                                                        }}
                                                        alt={group.desc}
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className="col-sm-6 mixed-text"
                                                dir="rtl"
                                            >
                                                <h3>
                                                    المؤلف:{' '}
                                                    {selectedAuthor.aName}
                                                </h3>
                                            </div>
                                        </div>
                                        <hr />
                                        {authorFields.map((row, index) => {
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
                                                            normalizedAuthor[
                                                                Object.keys(
                                                                    row.english
                                                                )[0]
                                                            ]
                                                        }
                                                        aValue={
                                                            normalizedAuthor[
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
                                                        authorFields.length -
                                                            1 && <hr />}
                                                </React.Fragment>
                                            );
                                        })}
                                    </CustomPaper>
                                )}
                                {manuscripts &&
                                    manuscripts.length > 0 && (
                                        <CustomPaper>
                                            <div className="row">
                                                <div
                                                    className="col-sm-6 mixed-text"
                                                    dir="ltr"
                                                >
                                                    <h4>
                                                        Records by this author:
                                                    </h4>
                                                </div>
                                                <div
                                                    className="col-sm-6 mixed-text"
                                                    dir="rtl"
                                                >
                                                    <h4>أعمال المؤلف:</h4>
                                                </div>
                                            </div>
                                            {manuscripts.map(
                                                ({ id, title, aTitle }) => (
                                                    <span key={id}>
                                                        <div className="row">
                                                            <div className="ltr col-xs-6 mixed-text">
                                                                {title && (
                                                                    <div>
                                                                        <Link
                                                                            to={`/titles/${id}`}
                                                                        >
                                                                            {
                                                                                title
                                                                            }
                                                                        </Link>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="rtl col-xs-6 mixed-text">
                                                                {aTitle && (
                                                                    <div>
                                                                        <Link
                                                                            to={`/titles/${id}`}
                                                                        >
                                                                            {
                                                                                aTitle
                                                                            }
                                                                        </Link>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </span>
                                                )
                                            )}
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

AuthorDetail.propTypes = propTypes;

export default connect(({ authors, auth: { user } }) => ({ authors, user }))(
    injectIntl(AuthorDetail)
);
