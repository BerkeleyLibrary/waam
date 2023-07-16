import React from 'react';

import Header from '../containers/Header';
import Footer from './shared/Footer';
import routes from '../routes';
import { GOOGLE_ANALYTICS_ACCOUNT_ID } from '../config/config';

import { Route, withRouter } from 'react-router-dom';

import ReactGA from "react-ga4";

ReactGA.initialize(GOOGLE_ANALYTICS_ACCOUNT_ID);

const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    window.scrollTo(0, 0);
    return null;
};

const App = ({ location }) => {
    const isHome = location.pathname === '/home';

    const cssClassName = isHome ? 'main-content home' : 'main-content';

    return (
        <div>
            <Header />
            <div className="container">
                <div className="content-container">
                    <div className={cssClassName}>
                        <Route path="/" component={logPageView} />
                        {routes}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default withRouter(App);
