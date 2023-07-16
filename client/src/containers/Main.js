import React, { Component } from 'react';

import { connect } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';

import Helmet from 'react-helmet';

import IntlCreator from './IntlCreator';

import App from '../components/App';

import { fetchUserIfNeeded } from '../actions/authActions';

class Main extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
    }

    render() {
        let { locale } = this.props;

        const dir = locale === 'ar' ? 'rtl' : 'ltr';

        return (
            <IntlCreator locale={locale}>
                <span>
                    <Helmet
                        htmlAttributes={{ lang: 'en', dir, amp: undefined }}
                    />
                    <Router>
                        <App />
                    </Router>
                </span>
            </IntlCreator>
        );
    }
}

function mapStateToProps({ locale }) {
    return {
        locale,
    };
}

export default connect(mapStateToProps)(Main);
