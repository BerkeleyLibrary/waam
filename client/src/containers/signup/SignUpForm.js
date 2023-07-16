import React from 'react';

import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import zxcvbn from 'zxcvbn';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import asyncValidate from '../../actions/asyncValidate';

import { signUpAction } from '../../actions/authActions';

import { renderTextField } from '../../components/shared/ReduxFormComponents';

import Loader from '../../components/shared/Loader';

const propTypes = {
    intl: intlShape.isRequired,
};

const messages = defineMessages({
    signup: {
        id: 'app.signup.form.title',
        defaultMessage: 'sign up',
    },
    nameHint: {
        id: 'app.signup.name.hint',
        defaultMessage: 'Enter your name.',
    },
    nameLabel: {
        id: 'app.signup.name.label',
        defaultMessage: 'Your full name',
    },
    emailHint: {
        id: 'app.signup.email.hint',
        defaultMessage: 'you@example.com',
    },
    emailLabel: {
        id: 'app.signup.email.label',
        defaultMessage: 'Your e-mail',
    },
    passHint: {
        id: 'app.signup.pass.hint',
        defaultMessage: 'your password',
    },
    passLabel: {
        id: 'app.signup.pass.label',
        defaultMessage: 'Password',
    },
    successMessage: {
        id: 'app.sign.up.success.message',
        defaultMessage:
            'Thanks, You registered successfully, and will be able to login once your account has been approved.',
    },
    clearForm: {
        id: 'app.signup.clear.form',
        defaultMessage: 'clear form',
    },
});

const validate = values => {
    const errors = {};
    const requiredFields = ['email', 'fullName', 'password', 'repeatPassword'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'required';
        }
    });

    if (values.password) {
        const passwordChecker = zxcvbn(values.password, ['amms']);

        if (passwordChecker.score < 3) {
            errors.password =
                passwordChecker.feedback.warning ||
                (passwordChecker.feedback.suggestions.length &&
                    passwordChecker.feedback.suggestions[0]);
        }
    }

    if (values.password !== values.repeatPassword) {
        errors.repeatPassword = 'passwords.do.not.match';
    }

    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'email.not.valid';
    }
    return errors;
};

const SignUpForm = props => {
    const {
        dispatch,
        handleSubmit,
        pristine,
        reset,
        submitting,
        intl: { formatMessage },
        auth: { error, signedUp },
    } = props;
    return (
        <form onSubmit={handleSubmit(values => dispatch(signUpAction(values)))}>
            {error && <div className="alert alert-danger">{error}</div>}
            {signedUp && (
                <div className="alert alert-success">
                    {formatMessage(messages.successMessage)}
                </div>
            )}

            {!signedUp && (
                <div>
                    <div>
                        <Field
                            name="fullName"
                            component={renderTextField}
                            label={formatMessage(messages.nameLabel)}
                            placeholder={formatMessage(messages.nameHint)}
                        />
                    </div>
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
                            type="password"
                        />
                    </div>

                    <div>
                        <Field
                            name="repeatPassword"
                            component={renderTextField}
                            label={formatMessage(messages.passLabel)}
                            type="password"
                        />
                    </div>
                    <div>
                        <button
                            className="btn btn-outline-primary"
                            disabled={pristine || submitting}
                            type="submit"
                        >
                            {formatMessage(messages.signup)}
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
                </div>
            )}

            {submitting && <Loader />}
        </form>
    );
};

SignUpForm.propTypes = propTypes;

function marStateToProps(state) {
    const { auth } = state;

    return {
        auth,
    };
}
export default connect(marStateToProps)(
    injectIntl(
        reduxForm({
            form: 'signup', // a unique identifier for this form
            validate,
            asyncValidate,
            asyncBlurFields: ['email'],
        })(SignUpForm)
    )
);
