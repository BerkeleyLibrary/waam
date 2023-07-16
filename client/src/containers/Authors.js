import React from 'react';

import { connect } from 'react-redux';

import { Link, Route, Switch } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { fetchAuthorsIfNeeded } from '../actions/authors';

import AuthorList from '../components/AuthorList';

import Pagination from '../components/Pagination';

import Loader from '../components/shared/Loader';

import ResultContInfo from '../components/shared/ResultCountInfo';

import Breadcrumb from '../components/shared/Breadcrumb';

import SimpleSearchForm from './SimpleSearchForm';

import {
    getQueryObject,
    submitSearch,
    dispatchFetchActionIfNeeded,
} from '../utils/utils';

import AuthorInfoDialog from '../components/AuthorInfoDialog';

import AuthorDetail from './AuthorDetail';

import AddAuthor from './authors/AddAuthor';

import EditAuthor from './authors/EditAuthor';

const messages = defineMessages({
    pageTitle: {
        id: 'app.search.authors.page.title',
        defaultMessage: 'Authors',
    },
    searchAuthorsBlurb: {
        id: 'app.search.authors.page.blurb',
        defaultMessage:
            'Consult the “Searching for Authors and Subjects” tab on the homepage for help; `ain, hamza and transliteration symbols are not necessary in keywords. ',
    },
});

class Authors extends React.Component {
    componentDidMount() {
        const { dispatch, location } = this.props;

        const query = getQueryObject(location.search);

        query.npp = 20;

        dispatch(fetchAuthorsIfNeeded(query));
    }

    componentWillReceiveProps(nextProps) {
        dispatchFetchActionIfNeeded(
            nextProps,
            this.props,
            fetchAuthorsIfNeeded
        );
    }

    render() {
        const {
            authors: { isFetching, response: { results, pagination } },
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
            <div className="authors">
                <Switch>
                    <Route path={`${match.url}/add`} component={AddAuthor} />
                    <Route
                        path={`${match.url}/edit/:id`}
                        component={EditAuthor}
                    />
                    <Route path={`${match.url}/:id`} component={AuthorDetail} />
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
                                                    new author
                                                </Link>
                                            )}{' '}
                                            <AuthorInfoDialog />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        {formatMessage(
                                            messages.searchAuthorsBlurb
                                        )}
                                    </div>
                                </div>

                                <SimpleSearchForm
                                    onSearch={values =>
                                        submitSearch(
                                            values,
                                            history,
                                            '/authors'
                                        )
                                    }
                                    enableReinitialize={true}
                                    initialValues={query}
                                    noResults={!results.length && !isFetching}
                                    pathname="/authors"
                                    searchType="author"
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
                                                    pathname="/authors"
                                                />
                                                <AuthorList
                                                    list={results}
                                                    location={location}
                                                />
                                                <Pagination
                                                    pagination={pagination}
                                                    query={query}
                                                    pathname="/authors"
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
    const { authors, auth: { user } } = state;

    return {
        authors,
        user,
    };
}

const propTypes = {
    intl: intlShape.isRequired,
};

Authors.propTypes = propTypes;

export default connect(mapStateToProps)(injectIntl(Authors));
