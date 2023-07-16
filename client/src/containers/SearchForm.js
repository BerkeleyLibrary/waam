import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { intlShape, injectIntl, defineMessages } from 'react-intl';
import SeeAlso from '../components/shared/SeeAlso';
import NoResults from '../components/shared/NoResults';
import { clearCrossReferences } from '../actions/crossReferences';
import { fetchGroupsIfNeeded } from '../actions/groups';
import SearchFormRow from './SearchFormRow';

const messages = defineMessages({
    search: {
        id: 'app.page.form.search.buttons.search',
        defaultMessage: 'search',
    },
    clearSearch: {
        id: 'app.page.form.search.buttons.clear',
        defaultMessage: 'clear search',
    },
    basicSearch: {
        id: 'app.page.form.search.buttons.basic.search',
        defaultMessage: 'basic search',
    },
    advancedSearch: {
        id: 'app.page.form.search.buttons.advanced.search',
        defaultMessage: 'advanced search',
    },
});

class Search extends React.Component {
    renderCheckBox = ({ input }) => {
        return (
            <input
                {...input}
                type="checkbox"
                checked={input.value === 'true' || input.value === true}
            />
        );
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchGroupsIfNeeded());
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(clearCrossReferences());
    }

    render() {
        const {
            handleSubmit,
            submitting,
            onSearch,
            seeAlso,
            query,
            noResults,
            change,
            advancedSearch,
            switchSearch,
            groups: { response: { results: groupList } },
            intl: { formatMessage },
            user,
        } = this.props;

        const pageUrl = '/titles';

        return (
            <form onSubmit={handleSubmit(onSearch)}>
                <SearchFormRow
                    groupList={groupList}
                    change={change}
                    fieldName={query.fieldName}
                />

                {advancedSearch && (
                    <div>
                        <SearchFormRow
                            suffix="_1"
                            groupList={groupList}
                            change={change}
                            fieldName={query.fieldName_1}
                        />
                        <SearchFormRow
                            suffix="_2"
                            groupList={groupList}
                            change={change}
                            fieldName={query.fieldName_2}
                        />
                    </div>
                )}

                {user && (
                    <div className="form-group">
                        <label htmlFor="showLastUpdated">
                            <Field
                                name="showLastUpdated"
                                id="showLastUpdated"
                                component={this.renderCheckBox}
                            />{' '}
                            Show Last Updated First?
                        </label>
                    </div>
                )}
                <div className="form-group">
                    <button
                        disabled={submitting}
                        type="submit"
                        className="btn btn-outline-primary"
                    >
                        <i className="fas fa-search" />{' '}
                        {formatMessage(messages.search)}
                    </button>{' '}
                    <Link
                        to={{
                            pathname: '/titles',
                            search: `${(query.advanced && 'advanced=true') ||
                                ''}`,
                        }}
                        className="btn btn-outline-secondary"
                    >
                        <i className="fas fa-times" />{' '}
                        {formatMessage(messages.clearSearch)}
                    </Link>{' '}
                    <Link
                        className="btn btn-outline-secondary"
                        to={switchSearch()}
                    >
                        {advancedSearch ? (
                            <i className="fas fa-minus" />
                        ) : (
                            <i className="fas fa-plus" />
                        )}{' '}
                        {advancedSearch
                            ? formatMessage(messages.basicSearch)
                            : formatMessage(messages.advancedSearch)}
                    </Link>
                </div>

                {noResults && <NoResults noSearch={!query.query} />}

                <SeeAlso pathname={pageUrl} query={query} refList={seeAlso} />
            </form>
        );
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

Search.propTypes = propTypes;

export default connect(
    ({
        auth: { user },
        manuscripts: { query },
        crossReferences: { seeAlso },
        groups,
    }) => ({
        initialValues: query, // pull initial values from account reducer
        seeAlso,
        groups,
        query,
        user,
    })
)(
    reduxForm({
        form: 'search',
    })(injectIntl(Search))
);
