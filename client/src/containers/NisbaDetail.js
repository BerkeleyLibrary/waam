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
    fetchSingleNisbaIfNeeded,
    deleteNisba,
    cleanUpSingleNisba,
} from '../actions/nisbas';

const labels = [
    {
        english: {
            id: 'Nisba AMMS id:',
        },
        arabic: {
            id: 'رقم:',
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
];

const messages = defineMessages({
    pageTitle: {
        id: 'app.nisbas.detail.title',
        defaultMessage: 'Nisbas',
    },
    backToSearch: {
        id: 'app.nisbas.detail.back.link',
        defaultMessage: 'back to search',
    },
    sureDelete: {
        id: 'app.nisbas.detail.sure.delete',
        defaultMessage: 'Are you sure you want to delete this nisba?',
    },
    sureDeleteTitle: {
        id: 'app.nisbas.detail.sure.delete.title',
        defaultMessage: 'Are you sure?',
    },
    findAuthors: {
        id: 'app.nisbas.detail.find.authors',
        defaultMessage: 'find authors',
    },
});

const style = {
    container: {
        paddingTop: 10,
    },
};

class NisbaDetail extends React.Component {
    state = {
        open: false,
    };

    componentDidMount() {
        const { match: { params: { id } }, dispatch } = this.props;

        dispatch(cleanUpSingleNisba());

        dispatch(fetchSingleNisbaIfNeeded(parseInt(id, 10)));
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteNisba = () => {
        const { match: { params: { id } }, dispatch } = this.props;
        dispatch(deleteNisba(parseInt(id, 10)));
        this.handleClose();
    };

    render() {
        const {
            nisbas: { selectedNisba, isFetching, deleted },
            location,
            intl: { formatMessage },
            user,
        } = this.props;

        return (() => {
            if (isFetching) {
                return <Loader />;
            } else if (selectedNisba) {
                const nisbaFields = labels;

                return (
                    <div>
                        <Breadcrumb
                            items={[
                                { link: '/', label: 'home' },
                                { link: '/nisbas', label: 'nisbas' },
                                { link: '', label: selectedNisba.id },
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
                                    onClick={this.deleteNisba}
                                >
                                    Delete
                                </button>
                            </Modal.Footer>
                        </Modal>

                        <div className="row">
                            <div className="col">
                                <Link
                                    to={{
                                        pathname: '/nisbas',
                                        search: location.search,
                                    }}
                                    className="btn btn-outline-info btn-sm"
                                >
                                    <i className="fas fa-chevron-left" />{' '}
                                    {formatMessage(messages.backToSearch)}
                                </Link>{' '}
                                <Link
                                    to={`/authors?fieldName=nisbaId&query=${
                                        selectedNisba.id
                                    }`}
                                    className="btn btn-outline-info btn-sm"
                                >
                                    {formatMessage(messages.findAuthors)}
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
                                                to={`/nisbas/edit/${
                                                    selectedNisba.id
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
                                    id="app.nisbas.detail.delete.success.message"
                                    defaultMessage="Success! the nisba, {name}, was deleted."
                                    values={{ name: selectedNisba.name }}
                                />
                            </div>
                        )}

                        {!deleted && (
                            <div style={style.container} dir="ltr">
                                {selectedNisba.id && (
                                    <CustomPaper>
                                        <div className="row">
                                            <div
                                                className="col mixed-text"
                                                dir="ltr"
                                            >
                                                <h3>Nisba</h3>
                                            </div>
                                            <div
                                                className="col mixed-text"
                                                dir="rtl"
                                            >
                                                <h3>النسبة</h3>
                                            </div>
                                        </div>
                                        <hr />
                                        {nisbaFields.map((row, index) => {
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
                                                            selectedNisba[
                                                                Object.keys(
                                                                    row.english
                                                                )[0]
                                                            ]
                                                        }
                                                        aValue={
                                                            selectedNisba[
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
                                                        nisbaFields.length -
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

NisbaDetail.propTypes = propTypes;

export default connect(({ nisbas, auth: { user } }) => ({ nisbas, user }))(
    injectIntl(NisbaDetail)
);
