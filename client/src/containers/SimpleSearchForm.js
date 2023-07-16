import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { Popover, OverlayTrigger } from 'react-bootstrap';

import SeeAlso from '../components/shared/SeeAlso';

import ArabicKeyboard from '../components/ArabicKeyboard';

import NoResults from '../components/shared/NoResults';

const messages = defineMessages({
    clearSearch: {
        id: 'app.page.form.simple.search.buttons.clear',
        defaultMessage: 'clear search',
    },
    search: {
        id: 'app.page.form.simple.search.buttons.search',
        defaultMessage: 'search',
    },
    placeholder_generic: {
        id: 'app.page.form.simple.search.label.generic',
        defaultMessage: 'enter a keyword',
    },
    placeholder_author: {
        id: 'app.page.form.simple.search.label.author',
        defaultMessage:
            'enter author name or part of the name in Latin characters or Arabic',
    },
    placeholder_subject: {
        id: 'app.page.form.simple.search.label.subject',
        defaultMessage: 'enter subject in Latin characters or Arabic',
    },
    placeholder_nisba: {
        id: 'app.page.form.simple.search.label.nisba',
        defaultMessage:
            "enter author's tribal or residential or ethnic name (nisba) in Latin characters or Arabic",
    },
    select: {
        id: 'app.page.form.simple.search.select',
        defaultMessage: 'select field',
    },
    anyField: {
        id: 'app.page.form.simple.search.select.any.field',
        defaultMessage: 'any field',
    },
    nameField: {
        id: 'app.page.form.simple.search.select.name',
        defaultMessage: 'author name',
    },
    authorIdField: {
        id: 'app.page.form.simple.search.select.author.id',
        defaultMessage: 'author id',
    },
    akaField: {
        id: 'app.page.form.simple.search.select.author.aka',
        defaultMessage: 'author known as',
    },
    nisbaField: {
        id: 'app.page.form.simple.search.select.author.nisba',
        defaultMessage: 'author nisba',
    },
    nisbaIdField: {
        id: 'app.page.form.simple.search.select.author.nisba.id',
        defaultMessage: 'author nisba id',
    },
    died_dateField: {
        id: 'app.page.form.simple.search.select.author.date_died',
        defaultMessage: 'author death date',
    },
});

const renderCheckBox = ({ input }) => {
    return (
        <input
            {...input}
            type="checkbox"
            checked={input.value === 'true' || input.value === true}
        />
    );
};

const Search = props => {
    const {
        handleSubmit,
        submitting,
        onSearch,
        searchType = 'generic',
        noResults,
        seeAlso,
        initialValues,
        pathname,
        change,
        intl: { formatMessage },
        user,
    } = props;

    const isAuthorSearch = searchType === 'author';
    const mainColumnClass = isAuthorSearch ? 'col-sm-9' : 'col-sm-12';
    const popoverContent = formatMessage(messages['placeholder_' + searchType]);
    const placeholder = formatMessage(messages.placeholder_generic);
    const helpPopover = (
        <Popover id="popover-trigger-click">{popoverContent}</Popover>
    );

    return (
        <form onSubmit={handleSubmit(onSearch)}>
            <div className="row">
                {isAuthorSearch && (
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label htmlFor={`search-field-name`}>
                                {formatMessage(messages.select)}
                            </label>
                            <Field
                                name={`fieldName`}
                                component="select"
                                className="form-control"
                                id={`search-field-name`}
                                style={{ verticalAlign: 'bottom' }}
                            >
                                <option value={''}>
                                    {formatMessage(messages.anyField)}
                                </option>
                                <option value={'name'}>
                                    {formatMessage(messages.nameField)}
                                </option>
                                <option value={'authorId'}>
                                    {formatMessage(messages.authorIdField)}
                                </option>
                                <option value={'aka'}>
                                    {formatMessage(messages.akaField)}
                                </option>
                                <option value={'nisba'}>
                                    {formatMessage(messages.nisbaField)}
                                </option>
                                <option value={'nisbaId'}>
                                    {formatMessage(messages.nisbaIdField)}
                                </option>
                                <option value={'died_date'}>
                                    {formatMessage(messages.died_dateField)}
                                </option>
                            </Field>
                        </div>
                    </div>
                )}
                <div className={mainColumnClass}>
                    <label htmlFor="search-query-input">
                        {placeholder}{' '}
                        <OverlayTrigger
                            trigger={['hover', 'focus']}
                            placement="right"
                            overlay={helpPopover}
                        >
                            <i className="fas fa-info-circle" />
                        </OverlayTrigger>
                    </label>
                    <div className="input-group form-group">
                        <Field
                            name="query"
                            component="input"
                            type="text"
                            className="form-control"
                            id="search-query-input"
                            placeholder={placeholder}
                            autoComplete="off"
                        />
                        <div className="input-group-append">
                            <ArabicKeyboard
                                change={value =>
                                    value && change('query', value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {user && (
                <div className="form-group">
                    <label htmlFor="showLastUpdated">
                        <Field
                            name="showLastUpdated"
                            id="showLastUpdated"
                            component={renderCheckBox}
                        />{' '}
                        Show Last Updated First?
                    </label>
                </div>
            )}

            <div className="form-group">
                <button
                    disabled={submitting}
                    type="submit"
                    className="btn btn-outline-primary btn-md"
                >
                    <i className="fas fa-search" />{' '}
                    {formatMessage(messages.search)}
                </button>{' '}
                <Link to={pathname} className="btn btn-outline-secondary">
                    <i className="fas fa-times" />{' '}
                    {formatMessage(messages.clearSearch)}
                </Link>
            </div>

            {noResults && <NoResults noSearch={!initialValues.query} />}
            {pathname && (
                <SeeAlso
                    pathname={pathname}
                    query={initialValues}
                    refList={seeAlso}
                />
            )}
        </form>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

Search.propTypes = propTypes;

export default connect(({ auth: { user }, crossReferences: { seeAlso } }) => ({
    seeAlso,
    user,
}))(
    reduxForm({
        form: 'simple_search',
    })(injectIntl(Search))
);
