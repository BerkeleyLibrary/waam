import React from 'react';

import { connect } from 'react-redux';

import { Link, Route, Switch } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { fetchNisbasIfNeeded } from '../actions/nisbas';

import NisbaList from '../components/NisbaList';

import Pagination from '../components/Pagination';

import Loader from '../components/shared/Loader';

import Breadcrumb from '../components/shared/Breadcrumb';

import ResultContInfo from '../components/shared/ResultCountInfo';

import NisbaInfoDialog from '../components/NisbaInfoDialog';

import SimpleSearchForm from './SimpleSearchForm';

import {
    getQueryObject,
    submitSearch,
    dispatchFetchActionIfNeeded,
} from '../utils/utils';

import NisbaDetail from './NisbaDetail';

import AddNisba from './nisbas/AddNisba';

import EditNisba from './nisbas/EditNisba';

const messages = defineMessages({
    pageTitle: {
        id: 'app.search.nisbas.page.title',
        defaultMessage: 'Nisbas',
    },
    searchNisbasBlurb: {
        id: 'app.search.nisbas.page.blurb',
        defaultMessage:
            'Searching for tribal, residential or ethnic tags frequently found in personal names',
    },
});

class Nisbas extends React.Component {
    componentDidMount() {
        const { dispatch, location } = this.props;

        const query = getQueryObject(location.search);

        query.npp = 20;

        dispatch(fetchNisbasIfNeeded(query));
    }

    componentWillReceiveProps(nextProps) {
        dispatchFetchActionIfNeeded(nextProps, this.props, fetchNisbasIfNeeded);
    }

    render() {
        const {
            nisbas: { isFetching, response: { results, pagination } },
            user,
            match,
            location,
            history,
            intl: { formatMessage },
        } = this.props;

        const query = getQueryObject(location.search);

        query.npp = 20;

        const pageTitle = formatMessage(messages.pageTitle);

        return (
            <div className="nisbas">
                <Switch>
                    <Route path={`${match.url}/add`} component={AddNisba} />
                    <Route
                        path={`${match.url}/edit/:id`}
                        component={EditNisba}
                    />
                    <Route path={`${match.url}/:id`} component={NisbaDetail} />
                    <Route
                        exact
                        path={match.url}
                        render={() => (
                            <div>
                                <Breadcrumb
                                    items={[
                                        { link: '/', label: 'home' },
                                        { link: '', label: pageTitle },
                                    ]}
                                />

                                <div className="row">
                                    <div className="col-sm-7 col-md-8">
                                        <h1>{pageTitle}</h1>
                                    </div>
                                    <div className="col-sm-5 col-md-4">
                                        <div className="text-right">
                                            {user && (
                                                <Link
                                                    to={`${match.url}/add`}
                                                    className="btn btn-outline-info btn-sm"
                                                >
                                                    <i className="fas fa-plus" />{' '}
                                                    new nisba
                                                </Link>
                                            )}{' '}
                                            <NisbaInfoDialog />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        {formatMessage(
                                            messages.searchNisbasBlurb
                                        )}
                                    </div>
                                </div>

                                <SimpleSearchForm
                                    onSearch={values =>
                                        submitSearch(values, history, '/nisbas')
                                    }
                                    enableReinitialize={true}
                                    initialValues={query}
                                    noResults={!results.length && !isFetching}
                                    pathname="/nisbas"
                                    searchType="nisba"
                                />

                                {(() => {
                                    if (isFetching) {
                                        return <Loader />;
                                    } else if (results.length) {
                                        return (
                                            <div>
                                                <ResultContInfo
                                                    pagination={pagination}
                                                    currentResultCount={
                                                        results.length
                                                    }
                                                />
                                                <Pagination
                                                    pagination={pagination}
                                                    query={query}
                                                    pathname="/nisbas"
                                                />
                                                <NisbaList
                                                    list={results}
                                                    location={location}
                                                />
                                                <Pagination
                                                    pagination={pagination}
                                                    query={query}
                                                    pathname="/nisbas"
                                                />
                                            </div>
                                        );
                                    }
                                })()}
                            </div>
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { nisbas, auth: { user } } = state;

    return {
        nisbas,
        user,
    };
}

const propTypes = {
    intl: intlShape.isRequired,
};

Nisbas.propTypes = propTypes;

export default connect(mapStateToProps)(injectIntl(Nisbas));
