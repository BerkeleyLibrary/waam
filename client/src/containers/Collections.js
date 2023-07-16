import React from 'react';

import { Link, Route } from 'react-router-dom';

import { connect } from 'react-redux';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import GoogleMapReact from 'google-map-react';

import collectionList from '../components/pages/collectionList';

import Breadcrumb from '../components/shared/Breadcrumb';

import { fetchGroupsIfNeeded } from '../actions/groups';

import Loader from '../components/shared/Loader';

import NotFound from '../components/pages/NotFound';

import { GOOGLE_MAPS_API_KEY } from '../config/config';

const K_SIZE = 20;

const regularStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2,

    border: `5px solid #965517`,
    borderRadius: K_SIZE,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4,
    cursor: 'pointer',
};

const hoverStyle = {
    ...regularStyle,
    width: 'auto',
    height: 'auto',
    borderRadius: '0',
    left: -K_SIZE,
    top: -K_SIZE,
    zIndex: 10,
};

const Marker = ({ children, $hover }) => {
    return $hover ? (
        <div style={hoverStyle}>{children}</div>
    ) : (
        <div style={regularStyle} />
    );
};

export const IndividualCollection = ({ match, location }) => {
    let Ele = collectionList[match.params.name];

    if (!Ele) {
        return <NotFound location={location} />;
    }

    return (
        <div>
            <Breadcrumb
                items={[
                    { link: '/', label: 'home' },
                    { link: '/about/collections', label: 'collections' },
                    { link: '', label: match.params.name },
                ]}
            />
            <div dir="ltr">
                <Ele />
            </div>
        </div>
    );
};

const messages = defineMessages({
    title: {
        id: 'app.page.collection.title',
        defaultMessage: 'Collections included',
    },
    p: {
        id: 'app.page.collection.p',
        defaultMessage:
            'For details about these collections click on the map site or the name above.',
    },
});

class Groups extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchGroupsIfNeeded());
    }

    render() {
        const {
            match,
            groups: { isFetching, response: { results } },
            intl: { formatMessage },
        } = this.props;

        const pageTitle = formatMessage(messages.title);
        const groupsToShow = results.filter(group => !group.parentId);

        return (
            <div>
                <Route
                    path={`${match.url}/:name`}
                    component={IndividualCollection}
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
                            <h1>{pageTitle}</h1>
                            {isFetching && <Loader />}
                            <ol>
                                {(() =>
                                    groupsToShow.map(place => (
                                        <li key={place.name}>
                                            <Link
                                                to={`/about/collections/${
                                                    place.path
                                                }`}
                                            >{`${place.name}`}</Link>{' '}
                                            {place.desc}
                                        </li>
                                    )))()}
                            </ol>
                            <p>{formatMessage(messages.p)}</p>
                            <div style={{ width: '100%', height: 600 }}>
                                <GoogleMapReact
                                    zoom={5}
                                    bootstrapURLKeys={{
                                        key: GOOGLE_MAPS_API_KEY,
                                    }}
                                    center={[16.7759, -3.0094]}
                                    hoverDistance={K_SIZE / 2}
                                >
                                    {(() =>
                                        groupsToShow.map((place, index) => (
                                            <Marker
                                                lat={place.lat}
                                                lng={place.lng}
                                                key={place.name}
                                            >
                                                <Link
                                                    to={`/about/collections/${
                                                        place.path
                                                    }`}
                                                    style={{ display: 'block' }}
                                                >{`#${index + 1} ${
                                                    place.name
                                                }`}</Link>
                                            </Marker>
                                        )))()}
                                </GoogleMapReact>
                            </div>
                        </div>
                    )}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { groups } = state;

    return {
        groups,
    };
}

const propTypes = {
    intl: intlShape.isRequired,
};

Groups.propTypes = propTypes;

export default connect(mapStateToProps)(injectIntl(Groups));
