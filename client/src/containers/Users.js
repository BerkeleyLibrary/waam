import React from 'react';

import { connect } from 'react-redux';

import { Route } from 'react-router-dom';

import UserDetail from './UserDetail';

import { getQueryObject, dispatchFetchActionIfNeeded } from '../utils/utils';

import { fetchUsersIfNeeded } from '../actions/users';

import UserList from '../components/UserList';

import Pagination from '../components/Pagination';

import Loader from '../components/shared/Loader';

import Breadcrumb from '../components/shared/Breadcrumb';

class Users extends React.Component {
    componentDidMount() {
        const { dispatch, location } = this.props;

        const query = getQueryObject(location.search);

        dispatch(fetchUsersIfNeeded(query));
    }

    componentWillReceiveProps(nextProps) {
        dispatchFetchActionIfNeeded(nextProps, this.props, fetchUsersIfNeeded);
    }

    render() {
        const {
            users: {
                isFetching,
                genericError,
                response: { results, pagination },
            },
            match,
            location,
        } = this.props;

        const query = getQueryObject(location.search);

        const pageTitle = 'Users';

        return (
            <div className="users">
                <Route path={`${match.url}/:id`} component={UserDetail} />
                <Route
                    exact
                    path={match.url}
                    render={() => (
                        <div>
                            <Breadcrumb
                                items={[
                                    { link: '/', label: 'home' },
                                    {
                                        link: '/dashboard/index',
                                        label: 'dashboard',
                                    },
                                    { link: '', label: pageTitle },
                                ]}
                            />
                            <h1>{pageTitle}</h1>
                            {(() => {
                                if (isFetching) {
                                    return <Loader />;
                                } else if (genericError) {
                                    return (
                                        <div className="alert alert-danger">
                                            {genericError}
                                        </div>
                                    );
                                } else if (results.length) {
                                    return (
                                        <div>
                                            <UserList list={results} />
                                            <Pagination
                                                pagination={pagination}
                                                query={query}
                                                pathname="/dashboard/users"
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="card">
                                            <div className="card-body">
                                                Sorry, no results found.
                                            </div>
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    )}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users } = state;

    return {
        users,
    };
}

export default connect(mapStateToProps)(Users);
