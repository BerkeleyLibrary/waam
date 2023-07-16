import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { Navbar, Nav, NavDropdown, Alert } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { isUCB } from '../config/config';

import { changeLocale } from '../actions/locale';

const propTypes = {
    intl: intlShape.isRequired,
};

const messages = defineMessages({
    appName: {
        id: 'app.name',
        defaultMessage: 'West African Arabic Manuscript Project',
    },
    home: {
        id: 'app.header.page.home',
        defaultMessage: 'Home',
    },
    about: {
        id: 'app.header.page.about',
        defaultMessage: 'About',
    },
    collections: {
        id: 'app.header.page.collections',
        defaultMessage: 'Collections',
    },
    history: {
        id: 'app.header.page.history',
        defaultMessage: 'History',
    },
    headings: {
        id: 'app.header.page.headings',
        defaultMessage: 'Subject Headings',
    },
    search: {
        id: 'app.header.page.search',
        defaultMessage: 'Search',
    },
    searchTitles: {
        id: 'app.header.page.search.titles',
        defaultMessage: 'Search records',
    },
    searchAuthors: {
        id: 'app.header.page.search.authors',
        defaultMessage: 'Search authors',
    },
    searchSubjects: {
        id: 'app.header.page.search.subjects',
        defaultMessage: 'Search subjects',
    },
    searchNisbas: {
        id: 'app.header.page.search.nisbas',
        defaultMessage: 'Search nisbas',
    },
    dashboard: {
        id: 'app.header.page.dashboard',
        defaultMessage: 'Dashboard',
    },
    accountInfo: {
        id: 'app.header.page.account.info',
        defaultMessage: 'Account info',
    },
    xref: {
        id: 'app.header.page.xref',
        defaultMessage: 'X-references',
    },
    users: {
        id: 'app.header.page.users',
        defaultMessage: 'Users',
    },
    loginActivities: {
        id: 'app.header.page.login.activities',
        defaultMessage: 'Login activities',
    },
    logout: {
        id: 'app.header.page.logout',
        defaultMessage: 'Logout',
    },
    login: {
        id: 'app.header.page.login',
        defaultMessage: 'Login',
    },
    signUp: {
        id: 'app.header.page.sign.up',
        defaultMessage: 'Sign up',
    },
    language_ar: {
        id: 'app.header.language.ar',
        defaultMessage: 'Arabic',
    },
    language_ar_native: {
        id: 'app.header.language.ar.native',
        defaultMessage: 'العربية',
    },
    language_en: {
        id: 'app.header.language.en',
        defaultMessage: 'English',
    },
    language_en_native: {
        id: 'app.header.language.en.native',
        defaultMessage: 'English',
    },
});

const HeaderMenu = ({
    user,
    locale,
    onLocaleChange,
    intl: { formatMessage },
}) => {
    return (
        <div>
            <Navbar expand="md">
                <Navbar.Brand>
                    <Link to="/home">
                        <img
                            src="/img/logo.gif"
                            alt={formatMessage(messages.appName)}
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <LinkContainer to="/home">
                            <Nav.Link>{formatMessage(messages.home)}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/subject-headings">
                            <Nav.Link>
                                {formatMessage(messages.headings)}
                            </Nav.Link>
                        </LinkContainer>
                        <NavDropdown
                            title={formatMessage(messages.about)}
                            id="about-nav-dropdown"
                        >
                            <LinkContainer to="/about/index">
                                <NavDropdown.Item>
                                    {formatMessage(messages.about)}
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/about/collections">
                                <NavDropdown.Item>
                                    {formatMessage(messages.collections)}
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/about/history">
                                <NavDropdown.Item>
                                    {formatMessage(messages.history)}
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <NavDropdown
                            title={formatMessage(messages.search)}
                            id="search-nav-dropdown"
                        >
                            <LinkContainer to="/titles">
                                <NavDropdown.Item>
                                    {formatMessage(messages.searchTitles)}
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/authors">
                                <NavDropdown.Item>
                                    {formatMessage(messages.searchAuthors)}
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/subjects">
                                <NavDropdown.Item>
                                    {formatMessage(messages.searchSubjects)}
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/nisbas">
                                <NavDropdown.Item>
                                    {formatMessage(messages.searchNisbas)}
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        {user && (
                            <NavDropdown
                                title={formatMessage(messages.dashboard)}
                                id="my-dashboard-nav-dropdown"
                            >
                                <LinkContainer to="/dashboard/index">
                                    <NavDropdown.Item>
                                        {formatMessage(messages.accountInfo)}
                                    </NavDropdown.Item>
                                </LinkContainer>
                                {user.admin && (
                                    <LinkContainer to="/dashboard/x-references">
                                        <NavDropdown.Item>
                                            {formatMessage(messages.xref)}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                )}
                                {user.admin && (
                                    <LinkContainer to="/dashboard/users">
                                        <NavDropdown.Item>
                                            {formatMessage(messages.users)}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                )}
                                {user.admin && (
                                    <LinkContainer to="/dashboard/logins">
                                        <NavDropdown.Item>
                                            {formatMessage(
                                                messages.loginActivities
                                            )}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                )}
                                <LinkContainer to="/logout">
                                    <NavDropdown.Item>
                                        {formatMessage(messages.logout)}
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                        {!user &&
                            !isUCB && (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        {formatMessage(messages.login)}
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        {!user &&
                            !isUCB && (
                                <LinkContainer to="/sign-up">
                                    <Nav.Link>
                                        {formatMessage(messages.signUp)}
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        <Nav.Link
                            onClick={() =>
                                onLocaleChange(locale === 'ar' ? 'en' : 'ar')
                            }
                            className="language"
                        >
                            {locale === 'ar'
                                ? formatMessage(messages.language_en_native)
                                : formatMessage(messages.language_ar_native)}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {user &&
                user.admin &&
                (isUCB &&
                    document.location.pathname.search(/\/edit|\/add/g) >
                        -1) && (
                    <Alert bsStyle="warning">
                        <strong>Hey, {user.name}</strong>! please avoid making
                        edits on this domain. click{' '}
                        <a href="http://stage.westafricanmanuscripts.org/home">
                            here instead.
                        </a>
                    </Alert>
                )}
        </div>
    );
};

HeaderMenu.propTypes = propTypes;

function mapStateToProps(state) {
    const { auth: { user }, locale } = state;
    return {
        user,
        locale,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLocaleChange: locale => {
            dispatch(changeLocale(locale));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
    pure: false,
})(injectIntl(HeaderMenu));
