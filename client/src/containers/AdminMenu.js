import React from 'react';

import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import CustomPaper from '../components/shared/CustomPaper';

const userItems = [
    { link: '/dashboard/update-account', label: 'Update Account Info' },
];

const adminItems = [
    { link: '/dashboard/x-references', label: 'X-references' },
    { link: '/dashboard/users', label: 'Users' },
    { link: '/dashboard/logins', label: 'Login Activities' },
];

const Menu = ({ user }) => {
    if (!user) {
        return null;
    }

    return (
        <CustomPaper>
            <div className="btn-group btn-group-sm">
                {userItems.map(item => (
                    <Link
                        key={item.link}
                        to={item.link}
                        className="btn btn-outline-secondary"
                    >
                        {item.label}
                    </Link>
                ))}

                {user.admin &&
                    adminItems.map(item => (
                        <Link
                            key={item.link}
                            to={item.link}
                            className="btn btn-outline-secondary"
                        >
                            {item.label}
                        </Link>
                    ))}
            </div>
        </CustomPaper>
    );
};

export default withRouter(connect(({ auth: { user } }) => ({ user }))(Menu));
