import React from 'react';

import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import { withRouter } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import Loader from '../../components/shared/Loader';

import { loginAction } from '../../actions/authActions';

import {
    renderTextField,
    renderCheckbox,
} from '../../components/shared/ReduxFormComponents';

const propTypes = {
    intl: intlShape.isRequired,
};

const messages = defineMessages({
    signin: {
        id: 'app.signin',
        defaultMessage: 'sign in',
    },
    emailHint: {
        id: 'app.signin.email.hint',
        defaultMessage: 'you@example.com',
    },
    emailLabel: {
        id: 'app.signin.email.label',
        defaultMessage: 'Your e-mail',
    },
    passHint: {
        id: 'app.signin.pass.hint',
        defaultMessage: 'your password',
    },
    passLabel: {
        id: 'app.signin.pass.label',
        defaultMessage: 'Password',
    },
    rememberMe: {
        id: 'app.signin.remember.me.label',
        defaultMessage: 'Remember me',
    },
    clearForm: {
        id: 'app.signin.clear.form',
        defaultMessage: 'clear form',
    },
});

const validate = values => {
    const errors = {};
    const requiredFields = ['email', 'password'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'required';
        }
    });
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'email.not.valid';
    }
    return errors;
};

const SignIn = props => {
    const {
        dispatch,
        handleSubmit,
        pristine,
        reset,
        submitting,
        intl: { formatMessage },
        auth: { error },
        history,
    } = props;

    return (
        <form
            onSubmit={handleSubmit(values =>
                dispatch(loginAction(values, history))
            )}
        >
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <Field
                    name="email"
                    component={renderTextField}
                    label={formatMessage(messages.emailLabel)}
                    placeholder={formatMessage(messages.emailHint)}
                />
            </div>
            <div>
                <Field
                    name="password"
                    component={renderTextField}
                    label={formatMessage(messages.passLabel)}
                    placeholder={formatMessage(messages.passHint)}
                    type="password"
                />
            </div>

            <div>
                <Field
                    name="remember"
                    component={renderCheckbox}
                    label={formatMessage(messages.rememberMe)}
                />
            </div>

            <div>
                <button
                    className="btn btn-outline-primary"
                    disabled={pristine || submitting}
                    type="submit"
                >
                    {formatMessage(messages.signin)}
                </button>{' '}
                <button
                    className="btn btn-outline-secondary"
                    disabled={pristine || submitting}
                    onClick={reset}
                    type="button"
                >
                    {formatMessage(messages.clearForm)}
                </button>
            </div>
            {submitting && <Loader />}
        </form>
    );
};

SignIn.propTypes = propTypes;

function marStateToProps(state) {
    const { auth } = state;

    return {
        auth,
    };
}

export default withRouter(
    connect(marStateToProps)(
        injectIntl(
            reduxForm({
                form: 'singin', // a unique identifier for this form
                validate,
            })(SignIn)
        )
    )
);
