import { Component } from 'react';

import { connect } from 'react-redux';

import { logoutAction } from '../actions/authActions';

class Logout extends Component {
    componentWillMount() {
        this.props.dispatch(logoutAction(this.props.history));
    }

    render() {
        return null;
    }
}

export default connect()(Logout);
