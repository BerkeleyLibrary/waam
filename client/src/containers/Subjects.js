import React from 'react';

import { connect } from 'react-redux';

import { Link, Route, Switch } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { fetchSubjectsIfNeeded } from '../actions/subjects';

import SubjectList from '../components/SubjectList';

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

import SubjectInfoDialog from '../components/SubjectInfoDialog';

import SubjectDetail from './SubjectDetail';

import AddSubject from './subjects/AddSubject';

import EditSubject from './subjects/EditSubject';

const messages = defineMessages({
    pageTitle: {
        id: 'app.search.subjects.page.title',
        defaultMessage: 'Subjects',
    },
    searchSubjectsBlurb: {
        id: 'app.search.subjects.page.blurb',
        defaultMessage:
            'If unsure about keywords, go to “Subject Headings” tab at the top of this screen for a complete list of subjects; a subject search can also be initiated from there.',
    },
});

class Subjects extends React.Component {
    componentDidMount() {
        const { dispatch, location } = this.props;

        const query = getQueryObject(location.search);

        query.npp = 20;

        dispatch(fetchSubjectsIfNeeded(query));
    }

    componentWillReceiveProps(nextProps) {
        dispatchFetchActionIfNeeded(
            nextProps,
            this.props,
            fetchSubjectsIfNeeded
        );
    }

    render() {
        const {
            subjects: { isFetching, response: { results, pagination } },
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
            <div className="subjects">
                <Switch>
                    <Route path={`${match.url}/add`} component={AddSubject} />
                    <Route
                        path={`${match.url}/edit/:id`}
                        component={EditSubject}
                    />
                    <Route
                        path={`${match.url}/:id`}
                        component={SubjectDetail}
                    />
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
                                                    new subject
                                                </Link>
                                            )}{' '}
                                            <SubjectInfoDialog />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        {formatMessage(
                                            messages.searchSubjectsBlurb
                                        )}
                                    </div>
                                </div>

                                <SimpleSearchForm
                                    onSearch={values =>
                                        submitSearch(
                                            values,
                                            history,
                                            '/subjects'
                                        )
                                    }
                                    enableReinitialize={true}
                                    initialValues={query}
                                    noResults={!results.length && !isFetching}
                                    pathname="/subjects"
                                    searchType="subject"
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
                                                    pathname="/subjects"
                                                />
                                                <SubjectList
                                                    list={results}
                                                    location={location}
                                                />
                                                <Pagination
                                                    pagination={pagination}
                                                    query={query}
                                                    pathname="/subjects"
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
    const { subjects, auth: { user } } = state;

    return {
        subjects,
        user,
    };
}

const propTypes = {
    intl: intlShape.isRequired,
};

Subjects.propTypes = propTypes;

export default connect(mapStateToProps)(injectIntl(Subjects));
