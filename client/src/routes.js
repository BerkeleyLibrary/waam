import React, { lazy, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Loadable from './Loadable';

const Home = Loadable(lazy(() => import('./components/pages/Home')));
const About = Loadable(lazy(() => import('./components/pages/About')));
const Help = Loadable(lazy(() => import('./components/pages/Help')));
const FieldHelp = Loadable(lazy(() => import('./components/pages/FieldSearchHelp')));
const Subjects = Loadable(lazy(() => import('./containers/Subjects')));
const Authors = Loadable(lazy(() => import('./containers/Authors')));
const LoginPage = Loadable(lazy(() => import('./components/pages/LoginPage')));
const SignUpPage = Loadable(lazy(() => import('./components/pages/SignUpPage')));
const LogoutPage = Loadable(lazy(() => import('./containers/Logout')));
const AccountPage = Loadable(lazy(() => import('./components/pages/AccountPage')));
const Manuscripts = Loadable(lazy(() => import('./containers/Manuscripts')));
const NormalizedSubjects = Loadable(lazy(() => import('./containers/NormalizedSubjects')));
const Nisbas = Loadable(lazy(() => import('./containers/Nisbas')));
const NotFound = Loadable(lazy(() => import('./components/pages/NotFound')));

export default (
    <Switch>
        <Route
            exact
            path="/"
            render={props => (
                <Redirect
                    to={{
                        pathname: `/home`,
                        state: { from: props.location },
                    }}
                />
            )}
        />
        <Route exact path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Route path="/field-help" component={FieldHelp} />
        <Route path="/dashboard" component={AccountPage} />
        <Route path="/authors" component={Authors} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/nisbas" component={Nisbas} />
        <Route path="/subject-headings" component={NormalizedSubjects} />
        <Route path="/titles" component={Manuscripts} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/subjects" component={Subjects} />
        <Route component={NotFound} />
    </Switch>
);
