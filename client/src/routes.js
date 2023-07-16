import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import MyLoadingComponent from './components/MyLoadingComponent';

const Home = Loadable({
    loader: () => import('./components/pages/Home'),
    loading: MyLoadingComponent,
});

const About = Loadable({
    loader: () => import('./components/pages/About'),
    loading: MyLoadingComponent,
});

const Help = Loadable({
    loader: () => import('./components/pages/Help'),
    loading: MyLoadingComponent,
});

const FieldHelp = Loadable({
    loader: () => import('./components/pages/FieldSearchHelp'),
    loading: MyLoadingComponent,
});

const Subjects = Loadable({
    loader: () => import('./containers/Subjects'),
    loading: MyLoadingComponent,
});

const Authors = Loadable({
    loader: () => import('./containers/Authors'),
    loading: MyLoadingComponent,
});

const LoginPage = Loadable({
    loader: () => import('./components/pages/LoginPage'),
    loading: MyLoadingComponent,
});

const SignUpPage = Loadable({
    loader: () => import('./components/pages/SignUpPage'),
    loading: MyLoadingComponent,
});

const LogoutPage = Loadable({
    loader: () => import('./containers/Logout'),
    loading: MyLoadingComponent,
});

const AccountPage = Loadable({
    loader: () => import('./components/pages/AccountPage'),
    loading: MyLoadingComponent,
});

const Manuscripts = Loadable({
    loader: () => import('./containers/Manuscripts'),
    loading: MyLoadingComponent,
});

const NormalizedSubjects = Loadable({
    loader: () => import('./containers/NormalizedSubjects'),
    loading: MyLoadingComponent,
});

const Nisbas = Loadable({
    loader: () => import('./containers/Nisbas'),
    loading: MyLoadingComponent,
});

const NotFound = Loadable({
    loader: () => import('./components/pages/NotFound'),
    loading: MyLoadingComponent,
});

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
