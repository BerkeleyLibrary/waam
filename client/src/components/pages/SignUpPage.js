import React from 'react';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import SignUpForm from '../../containers/signup/SignUpForm';

const propTypes = {
    intl: intlShape.isRequired,
};

const messages = defineMessages({
    signup: {
        id: 'app.signup',
        defaultMessage: 'Sign Up',
    },
});

const SignUpPage = props => {
    return (
        <div className="row">
            <div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
                <h2>{props.intl.formatMessage(messages.signup)}</h2>
                <SignUpForm />
            </div>
        </div>
    );
};

SignUpPage.propTypes = propTypes;

export default injectIntl(SignUpPage);
