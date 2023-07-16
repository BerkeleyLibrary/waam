import React from 'react';

import { connect } from 'react-redux';

import { fetchLoginsIfNeeded } from '../actions/logins';

import LoginList from '../components/LoginList';

import Pagination from '../components/Pagination';

import Loader from '../components/shared/Loader';

import { getQueryObject, dispatchFetchActionIfNeeded } from '../utils/utils';

import Breadcrumb from '../components/shared/Breadcrumb';

class Logins extends React.Component {
    componentDidMount() {
        const { dispatch, location } = this.props;

        const query = getQueryObject(location.search);

        query.npp = 40;

        dispatch(fetchLoginsIfNeeded(query));
    }

    componentWillReceiveProps(nextProps) {
        dispatchFetchActionIfNeeded(nextProps, this.props, fetchLoginsIfNeeded);
    }

    render() {
        const {
            logins: {
                isFetching,
                genericError,
                response: { results, pagination },
            },
            location,
        } = this.props;

        const query = getQueryObject(location.search);

        query.npp = 40;

        const pageTitle = 'Login Activities';

        return (
            <div className="logins">
                <Breadcrumb
                    items={[
                        { link: '/', label: 'home' },
                        { link: '/dashboard/index', label: 'dashboard' },
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
                                <LoginList list={results} />
                                <Pagination
                                    pagination={pagination}
                                    query={query}
                                    pathname="/dashboard/logins"
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
        );
    }
}

function mapStateToProps(state) {
    const { logins } = state;

    return {
        logins,
    };
}

export default connect(mapStateToProps)(Logins);
