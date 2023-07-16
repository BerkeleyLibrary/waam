import React from 'react';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { update } from '../actions/users';

import { renderCheckbox } from '../components/shared/ReduxFormComponents';

import Loader from '../components/shared/Loader';

const UserForm = props => {
    const {
        dispatch,
        handleSubmit,
        pristine,
        submitting,
        initialValues,
        history,
    } = props;
    return (
        <form
            onSubmit={handleSubmit(values => dispatch(update(values, history)))}
        >
            <div>
                <h4>Name:</h4>
                <p>{initialValues.name}</p>
                <h4>E-mail:</h4>
                <p>{initialValues.email}</p>
                <h4>Created</h4>
                <p>{dateFormat(initialValues.createdAt, 'mediumDate')}</p>

                <Field name="admin" component={renderCheckbox} label="Admin" />
                <Field
                    name="active"
                    component={renderCheckbox}
                    label="Active"
                />

                <div>
                    <button
                        className="btn btn-outline-primary"
                        disabled={pristine || submitting}
                        type="submit"
                    >
                        Update User
                    </button>
                </div>
            </div>

            {submitting && <Loader />}
        </form>
    );
};

function marStateToProps(state) {
    const { users: { selectedUser } } = state;

    return {
        initialValues: selectedUser, // pull initial values from account reducer
    };
}
export default withRouter(
    connect(marStateToProps)(
        reduxForm({
            form: 'update-user', // a unique identifier for this form
        })(UserForm)
    )
);
