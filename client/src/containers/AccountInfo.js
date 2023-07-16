import React from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import CustomPaper from '../components/shared/CustomPaper';

const AccountInfo = ({ auth }) => {
    const { user } = auth;

    if (!user) {
        return null;
    }

    return (
        <CustomPaper>
            <div style={{ padding: 10 }}>
                <h3>My Info:</h3>
                <label>Name:</label>
                <p>{user.name}</p>
                <hr />
                <label>E-mail Address:</label>
                <p>{user.email}</p>
                <hr />
                <label>Account Type:</label>
                <p>{user.admin ? 'Admin' : 'User'}</p>
                <hr />
            </div>
        </CustomPaper>
    );
};

export default withRouter(
    connect(({ auth }) => {
        return { auth };
    })(AccountInfo)
);
