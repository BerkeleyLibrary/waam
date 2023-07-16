import React from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import Modal from 'react-bootstrap/Modal';

import Loader from '../components/shared/Loader';

import Breadcrumb from '../components/shared/Breadcrumb';

import UserForm from './UserForm';

import { fetchSingleUserIfNeeded, deleteUser } from '../actions/users';

class UserDetail extends React.Component {
    state = {
        open: false,
    };

    componentWillMount() {
        const { match: { params: { id } }, dispatch } = this.props;
        dispatch(fetchSingleUserIfNeeded(parseInt(id, 10)));
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteUser = () => {
        const { match: { params: { id } }, dispatch, history } = this.props;
        dispatch(deleteUser(parseInt(id, 10), history));
    };

    render() {
        const {
            selectedUser,
            isFetching,
            match: { params: { id } },
        } = this.props;

        return (
            <div>
                <Breadcrumb
                    items={[
                        { link: '/', label: 'home' },
                        { link: '/dashboard', label: 'dashboard' },
                        { link: '/dashboard/users', label: 'users' },
                        { link: '', label: id },
                    ]}
                />
                <div className="text-right">
                    <button
                        className="btn btn-outline-danger"
                        onClick={this.handleOpen}
                    >
                        Delete
                    </button>

                    <Modal show={this.state.open} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this user? this
                            action can not be undone.
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
                                onClick={this.deleteUser}
                            >
                                Delete
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
                {(() => {
                    if (isFetching) {
                        return <Loader />;
                    } else if (selectedUser) {
                        return <UserForm />;
                    } else {
                        return <Loader />;
                    }
                })()}
            </div>
        );
    }
}

export default withRouter(connect(({ users }) => users)(UserDetail));
