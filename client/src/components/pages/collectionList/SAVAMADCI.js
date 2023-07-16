import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroupsIfNeeded } from '../../../actions/groups';
import Loader from '../../../components/shared/Loader';

class SAVAMA extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchGroupsIfNeeded());
    }
    render() {
        const { groups: { isFetching, response: { results } } } = this.props;
        const groupsToShow = results
            .filter(group => !!group.parentId)
            .sort(({ name: a }, { name: b }) => (a > b ? 1 : -1));

        return (
            <div>
                <h1>The SAVAMA-DCI Project (45,518 mss)</h1>
                <p>
                    During 2018-2019 WAAMD collaborated with The Centre for the
                    Study of Manuscript Cultures, University of Hamburg (CSMC),
                    and a consortium of private libraries, Sauvegarde et
                    Valorisation des Manuscrits pour la Défense de la Culture
                    Islamique, in Timbuktu, Mali, (SAVAMA-DCI) and with the Hill
                    Museum and Manuscript Library (HMML), St. John’s University,
                    St. Cloud Minnesota to disseminate information about their
                    Timbuktu preservation and digitization project that involves
                    over 250,000 manuscripts. Currently (2019), only 1400 images
                    of those manuscripts in only one of those libraries in WAAMD
                    are linked to their HMML records; additional digital images
                    will be added as they become available. For details on the
                    individual collections that are now all accessible in WAAMD,
                    see the collections descriptions below.
                </p>
                {isFetching && <Loader />}
                <ol>
                    {(() =>
                        groupsToShow.map(place => (
                            <li key={place.name}>
                                <Link
                                    to={`/about/collections/${place.path}`}
                                >{`${place.name}`}</Link>{' '}
                                {place.desc}
                            </li>
                        )))()}
                </ol>
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

export default connect(mapStateToProps)(SAVAMA);
