import React from 'react';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import LoginForm from '../../containers/login/LoginForm';

const propTypes = {
    intl: intlShape.isRequired,
};

const messages = defineMessages({
    signin: {
        id: 'app.signin.title',
        defaultMessage: 'Sign In',
    },
});

const LoginPage = props => {
    const { intl } = props;
    return (
        <div className="row">
            <div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
                <h2>{intl.formatMessage(messages.signin)}</h2>
                <LoginForm />
            </div>
        </div>
    );
};

LoginPage.propTypes = propTypes;

export default injectIntl(LoginPage);
