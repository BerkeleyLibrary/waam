import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';

import zxcvbn from 'zxcvbn';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { update } from '../actions/authActions';

import { renderTextField } from '../components/shared/ReduxFormComponents';

import Loader from '../components/shared/Loader';

const propTypes = {
    intl: intlShape.isRequired,
};

const messages = defineMessages({
    nameHint: {
        id: 'app.update.account.name.hint',
        defaultMessage: 'Enter a name.',
    },
    nameLabel: {
        id: 'app.update.account.name.label',
        defaultMessage: 'Your full name',
    },
    emailHint: {
        id: 'app.update.account.email.hint',
        defaultMessage: 'you@example.com',
    },
    emailLabel: {
        id: 'app.update.account.email.label',
        defaultMessage: 'Your e-mail',
    },
    passHint: {
        id: 'app.update.account.pass.hint',
        defaultMessage: 'your password',
    },
    passLabel: {
        id: 'app.update.account.pass.label',
        defaultMessage: 'Password',
    },
    repeatPassLabel: {
        id: 'app.update.account.re.pass.label',
        defaultMessage: 'Re-enter password',
    },
    updateAccountInfo: {
        id: 'app.update.account.buttons.update',
        defaultMessage: 'Update account info',
    },
    cancel: {
        id: 'app.update.account.buttons.cancel',
        defaultMessage: 'Cancel',
    },
});

const validate = values => {
    const errors = {};
    const requiredFields = ['fullName'];
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

    return errors;
};

const AccountForm = props => {
    const {
        dispatch,
        handleSubmit,
        pristine,
        submitting,
        intl: { formatMessage },
        history,
    } = props;
    return (
        <form
            onSubmit={handleSubmit(values => dispatch(update(values, history)))}
        >
            {
                <div>
                    <div>
                        <Field
                            name="name"
                            component={renderTextField}
                            label={formatMessage(messages.nameLabel)}
                            placeholder={formatMessage(messages.nameHint)}
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
                            label={formatMessage(messages.repeatPassLabel)}
                            type="password"
                        />
                    </div>
                    <div>
                        <button
                            className="btn btn-outline-primary"
                            disabled={pristine || submitting}
                            type="submit"
                        >
                            {formatMessage(messages.updateAccountInfo)}
                        </button>{' '}
                        <Link
                            to="/dashboard"
                            className="btn btn-outline-secondary"
                        >
                            {formatMessage(messages.cancel)}
                        </Link>
                    </div>
                </div>
            }

            {submitting && <Loader />}
        </form>
    );
};

AccountForm.propTypes = propTypes;

export default withRouter(
    injectIntl(
        reduxForm({
            form: 'updateAccount', // a unique identifier for this form
            validate,
        })(AccountForm)
    )
);
