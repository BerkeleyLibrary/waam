import React from 'react';

import { connect } from 'react-redux';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import Breadcrumb from '../components/shared/Breadcrumb';

import CustomPaper from '../components/shared/CustomPaper';

import AccountForm from './AccountForm';

const messages = defineMessages({
    pageTitle: {
        id: 'app.dashboard.page.update.account.title',
        defaultMessage: 'Update account info',
    },
});

const AccountInfo = ({ auth, intl: { formatMessage } }) => {
    const { user } = auth;

    const pageTitle = formatMessage(messages.pageTitle);

    return (
        <div>
            <Breadcrumb
                items={[
                    { link: '/', label: 'home' },
                    { link: '/dashboard/index', label: 'dashboard' },
                    { link: '', label: pageTitle },
                ]}
            />
            <h1>{pageTitle}</h1>
            <CustomPaper>
                <div>
                    <AccountForm initialValues={user} />
                </div>
            </CustomPaper>
        </div>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

AccountInfo.propTypes = propTypes;

export default connect(({ auth }) => {
    return { auth };
})(injectIntl(AccountInfo));
