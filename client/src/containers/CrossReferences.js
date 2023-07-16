import React from 'react';

import { Link, Route } from 'react-router-dom';

import { connect } from 'react-redux';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {
    fetchCrossReferencesIfNeeded,
    deleteCrossReference,
} from '../actions/crossReferences';

import Pagination from '../components/Pagination';

import Loader from '../components/shared/Loader';

import SimpleSearchForm from './SimpleSearchForm';

import CustomPaper from '../components/shared/CustomPaper';

import Row from '../components/shared/Row';

import ResultCountInfo from '../components/shared/ResultCountInfo';

import {
    getQueryObject,
    submitSearch,
    dispatchFetchActionIfNeeded,
} from '../utils/utils';

import CreateCrossReference from '../components/pages/CreateCrossReference';

import Breadcrumb from '../components/shared/Breadcrumb';

const messages = defineMessages({
    pageTitle: {
        id: 'app.dashboard.page.xrefs.title',
        defaultMessage: 'X-references',
    },
    addNew: {
        id: 'app.dashboard.page.xrefs.add.new',
        defaultMessage: 'Add a new x-reference',
    },
});

class CrossReferences extends React.Component {
    state = {
        open: false,
        selected: {},
    };

    handleOpen = selected => {
        this.setState({ open: true, selected });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteCrossReference_ = () => {
        this.handleClose();
        const { dispatch } = this.props;
        dispatch(deleteCrossReference(this.state.selected.id));
    };

    componentDidMount() {
        const { dispatch, location } = this.props;

        const query = getQueryObject(location.search);

        query.npp = 20;

        dispatch(fetchCrossReferencesIfNeeded(query));
    }

    componentWillReceiveProps(nextProps) {
        dispatchFetchActionIfNeeded(
            nextProps,
            this.props,
            fetchCrossReferencesIfNeeded
        );
    }

    render() {
        const {
            crossReferences: { isFetching, response: { results, pagination } },
            location,
            match,
            history,
            intl: { formatMessage },
        } = this.props;

        const query = getQueryObject(location.search);

        query.npp = 20;

        const pageTitle = formatMessage(messages.pageTitle);

        return (
            <div className="cross-references">
                <Route
                    path={`${match.url}/new`}
                    component={CreateCrossReference}
                />
                <Route
                    exact
                    path={match.url}
                    render={() => (
                        <div>
                            <Breadcrumb
                                items={[
                                    { link: '/', label: 'home' },
                                    {
                                        link: '/dashboard/index',
                                        label: 'dashboard',
                                    },
                                    { link: '', label: pageTitle },
                                ]}
                            />

                            <h1>{pageTitle}</h1>

                            <div className="text-right">
                                <Link
                                    className="btn btn-outline-info btn-sm"
                                    to={'/dashboard/x-references/new'}
                                >
                                    <i className="fas fa-plus" />{' '}
                                    {formatMessage(messages.addNew)}
                                </Link>
                            </div>

                            <SimpleSearchForm
                                onSearch={values =>
                                    submitSearch(
                                        values,
                                        history,
                                        '/dashboard/x-references'
                                    )
                                }
                                enableReinitialize={true}
                                initialValues={query}
                                noResults={!results.length && !isFetching}
                                pathname={match.url}
                            />

                            {(() => {
                                if (isFetching) {
                                    return <Loader />;
                                } else if (results.length) {
                                    return (
                                        <div>
                                            <ResultCountInfo
                                                pagination={pagination}
                                                currentResultCount={
                                                    results.length
                                                }
                                            />
                                            <Pagination
                                                pagination={pagination}
                                                query={query}
                                                pathname="/dashboard/x-references"
                                            />
                                            {results.map(ref => {
                                                return (
                                                    <CustomPaper
                                                        key={
                                                            ref.keyword +
                                                            ref.type
                                                        }
                                                    >
                                                        <Row
                                                            label={'Keyword'}
                                                            data={ref.keyword}
                                                        />
                                                        <Row
                                                            label={'X-ref'}
                                                            data={ref.target}
                                                        />
                                                        <Row
                                                            label={'X-ref type'}
                                                            data={ref.type.replace(
                                                                '-',
                                                                ' '
                                                            )}
                                                        />
                                                        <Button
                                                            variant="outline-danger"
                                                            onClick={() =>
                                                                this.handleOpen(
                                                                    ref
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </CustomPaper>
                                                );
                                            })}

                                            <Pagination
                                                pagination={pagination}
                                                query={query}
                                                pathname="/dashboard/x-references"
                                            />

                                            <Modal
                                                show={this.state.open}
                                                onHide={this.handleClose}
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>
                                                        Are you sure?
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Click 'Delete' to delete
                                                    this x-reference
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button
                                                        onClick={
                                                            this.handleClose
                                                        }
                                                        variant="outline-secondary"
                                                    >
                                                        Cancel
                                                    </Button>{' '}
                                                    <Button
                                                        variant="outline-danger"
                                                        onClick={
                                                            this
                                                                .deleteCrossReference_
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    )}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { crossReferences } = state;

    return {
        crossReferences,
    };
}

const propTypes = {
    intl: intlShape.isRequired,
};

CrossReferences.propTypes = propTypes;

export default connect(mapStateToProps)(injectIntl(CrossReferences));
