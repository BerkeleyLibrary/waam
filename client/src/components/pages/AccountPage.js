import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import UpdateAccount from '../../containers/UpdateAccount';

import Logins from '../../containers/Logins';

import Users from '../../containers/Users';

import AccountInfo from '../../containers/AccountInfo';

import AdminMenu from '../../containers/AdminMenu';

import CrossReferences from '../../containers/CrossReferences';

import Breadcrumb from '../shared/Breadcrumb';

const messages = defineMessages({
    pageTitle: {
        id: 'app.search.dashboard.page.title',
        defaultMessage: 'Dashboard',
    },
});

const AccountPage = ({ match, intl: { formatMessage } }) => {
    return (
        <div>
            <Route
                path={`${match.url}/x-references`}
                component={CrossReferences}
            />
            <Route
                path={`${match.url}/update-account`}
                component={UpdateAccount}
            />
            <Route path={`${match.url}/logins`} component={Logins} />
            <Route path={`${match.url}/users`} component={Users} />
            <Route
                exact
                path={`${match.url}/index`}
                render={() => (
                    <div>
                        <Breadcrumb
                            items={[
                                { link: '/', label: 'home' },
                                {
                                    link: '',
                                    label: formatMessage(messages.pageTitle),
                                },
                            ]}
                        />

                        <h1>{formatMessage(messages.pageTitle)}</h1>
                        <AdminMenu />

                        <AccountInfo />
                    </div>
                )}
            />
            <Route
                exact
                path={match.url}
                render={props => (
                    <Redirect
                        to={{
                            pathname: `${match.url}/index`,
                            state: { from: props.location },
                        }}
                    />
                )}
            />
        </div>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

AccountPage.propTypes = propTypes;

export default injectIntl(AccountPage);
