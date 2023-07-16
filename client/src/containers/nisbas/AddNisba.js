import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import {
    intlShape,
    injectIntl,
    defineMessages,
    FormattedMessage,
} from 'react-intl';

import { cleanUpNisbas } from '../../actions/nisbas';

import Breadcrumb from '../../components/shared/Breadcrumb';

import Loader from '../../components/shared/Loader';

import Form from './NisbaForm';

const messages = defineMessages({
    pageTitle: {
        id: 'app.nisbas.add.title',
        defaultMessage: 'New nisba',
    },
    backToSearch: {
        id: 'app.nisbas.add.back.link',
        defaultMessage: 'back to search',
    },
});

class AddNisba extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(cleanUpNisbas());
    }

    render() {
        const {
            nisbas: { isFetching, newRecord },
            user,
            intl: { formatMessage },
        } = this.props;

        if (!user) {
            return null;
        }

        return (
            <div>
                <Breadcrumb
                    items={[
                        { link: '/', label: 'home' },
                        { link: '/nisbas', label: 'nisbas' },
                        { link: '', label: formatMessage(messages.pageTitle) },
                    ]}
                />

                <h1>{formatMessage(messages.pageTitle)}</h1>
                {isFetching && <Loader />}
                {newRecord && (
                    <div className="alert alert-info">
                        <FormattedMessage
                            id="app.nisbas.add.success.message"
                            defaultMessage="Success! a new nisba was added, click the link to see it: {link}"
                            values={{
                                link: (
                                    <Link to={`/nisbas/${newRecord.id}`}>
                                        {newRecord.nisba}
                                    </Link>
                                ),
                            }}
                        />
                    </div>
                )}
                {!newRecord && <Form enableReinitialize={true} />}
            </div>
        );
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

AddNisba.propTypes = propTypes;

export default connect(({ nisbas, auth: { user } }) => ({ nisbas, user }))(
    injectIntl(AddNisba)
);
