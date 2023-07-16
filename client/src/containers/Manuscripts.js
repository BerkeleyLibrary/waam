import React from 'react';

import { Link, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import {
    fetchManuscriptsIfNeeded,
    cleanUpManuscripts,
} from '../actions/manuscripts';

import ManuscriptList from '../components/ManuscriptList';

import Pagination from '../components/Pagination';

import ManuscriptDetail from './ManuscriptDetail';

import Loader from '../components/shared/Loader';

import ResultCountInfo from '../components/shared/ResultCountInfo';

import Breadcrumb from '../components/shared/Breadcrumb';

import SearchForm from './SearchForm';

import {
    dispatchFetchActionIfNeeded,
    getQueryObject,
    submitSearch,
    switchSearch,
} from '../utils/utils';

import TitleInfoDialog from '../components/TitleInfoDialog';

import AddRecord from './records/AddRecord';

import EditRecord from './records/EditRecord';

const messages = defineMessages({
    pageTitle: {
        id: 'app.search.titles.page.title',
        defaultMessage: 'Records',
    },
    searchTitlesBlurb: {
        id: 'app.search.titles.page.blurb',
        defaultMessage:
            'Use “any field” for searches of names or other information that may appear in the ‘Miscellaneous’ field or any of the fields not specified in the box below; `ain, hamza and transliteration symbols are not necessary in keywords. ',
    },
});

class Manuscripts extends React.Component {
    componentDidMount() {
        const { dispatch, location } = this.props;

        const query = getQueryObject(location.search);

        dispatch(fetchManuscriptsIfNeeded(query));
    }

    componentWillReceiveProps(nextProps) {
        dispatchFetchActionIfNeeded(
            nextProps,
            this.props,
            fetchManuscriptsIfNeeded
        );
    }

    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch(cleanUpManuscripts());
    }

    render() {
        const {
            manuscripts: {
                isFetching,
                genericError,
                response: { results, pagination },
            },
            match,
            location,
            history,
            intl: { formatMessage },
            user,
        } = this.props;

        const query = getQueryObject(location.search);

        const advancedSearch = query.advanced;

        const pageUrl = '/titles';

        const pageTitle = formatMessage(messages.pageTitle);

        return (
            <div className="manuscripts">
                <Switch>
                    <Route path={`${match.url}/add`} component={AddRecord} />
                    <Route
                        path={`${match.url}/edit/:id`}
                        component={EditRecord}
                    />
                    <Route
                        path={`${match.url}/:id`}
                        component={ManuscriptDetail}
                    />
                    <Route
                        exact
                        path={match.url}
                        render={() => (
                            <div>
                                <Breadcrumb
                                    items={[
                                        { link: '/', label: 'home' },
                                        { link: '', label: 'titles' },
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
                                                    new record
                                                </Link>
                                            )}{' '}
                                            <TitleInfoDialog />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        {formatMessage(
                                            messages.searchTitlesBlurb
                                        )}
                                    </div>
                                </div>

                                <SearchForm
                                    onSearch={values =>
                                        submitSearch(values, history, pageUrl)
                                    }
                                    enableReinitialize={true}
                                    noResults={!results.length && !isFetching}
                                    advancedSearch={advancedSearch}
                                    switchSearch={() =>
                                        switchSearch(query, pageUrl)
                                    }
                                />

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
                                            <>
                                                <ResultCountInfo
                                                    pagination={pagination}
                                                    currentResultCount={
                                                        results.length
                                                    }
                                                />

                                                <Pagination
                                                    pagination={pagination}
                                                    query={query}
                                                    pathname={pageUrl}
                                                />

                                                <ManuscriptList
                                                    list={results}
                                                />

                                                <Pagination
                                                    pagination={pagination}
                                                    query={query}
                                                    pathname={pageUrl}
                                                />
                                            </>
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
    const { manuscripts, auth: { user } } = state;

    return {
        manuscripts,
        user,
    };
}

const propTypes = {
    intl: intlShape.isRequired,
};

Manuscripts.propTypes = propTypes;

export default connect(mapStateToProps)(injectIntl(Manuscripts));
