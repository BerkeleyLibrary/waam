import React from 'react';

import { connect } from 'react-redux';

import { withRouter, Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';

import { create } from '../actions/crossReferences';

import Loader from '../components/shared/Loader';

import ArabicKeyboard from '../components/ArabicKeyboard';

const validate = values => {
    const errors = {};
    const requiredFields = ['keyword', 'target', 'type'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'required';
        }
    });

    return errors;
};

const CrossReferenceForm = props => {
    const {
        dispatch,
        handleSubmit,
        pristine,
        submitting,
        errorMsg,
        successMessage,
        change,
    } = props;

    return (
        <div>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            {successMessage && (
                <div className="alert alert-info">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit(values => dispatch(create(values)))}>
                <div>
                    <div className="form-group">
                        <label htmlFor={`keyword`}>{'Enter a keyword'}</label>
                        <div className="input-group">
                            <Field
                                name="keyword"
                                component="input"
                                id={'keyword'}
                                placeholder={'Ex: Legal'}
                                className="form-control"
                            />
                            <div className="input-group-append">
                                <ArabicKeyboard
                                    change={value =>
                                        value && change('keyword', value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor={`target`}>
                            {'Enter an x-reference'}
                        </label>
                        <div className="input-group">
                            <Field
                                name="target"
                                component="input"
                                id={'target'}
                                placeholder={'Ex: jurisprudence'}
                                className="form-control"
                            />
                            <div className="input-group-append">
                                <ArabicKeyboard
                                    change={value =>
                                        value && change('target', value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor={`type`}>{'X-ref type'}</label>
                        <Field
                            name="type"
                            component="select"
                            id="type"
                            className="form-control"
                        >
                            <option value={''}>Choose...</option>
                            <option value={'see'}>see</option>
                            <option value={'see-also'}>see also</option>
                            <option value={'includes'}>includes</option>
                        </Field>
                    </div>

                    <div>
                        <button
                            className="btn btn-outline-primary"
                            disabled={pristine || submitting}
                            type="submit"
                        >
                            Add x-reference
                        </button>{' '}
                        <Link
                            className="btn btn-outline-secondary"
                            to={'/dashboard/x-references'}
                        >
                            Cancel
                        </Link>
                    </div>
                </div>

                {submitting && <Loader />}
            </form>
        </div>
    );
};

export default withRouter(
    connect(({ crossReferences: { errorMsg, successMessage } }) => ({
        errorMsg,
        successMessage,
    }))(
        reduxForm({
            form: 'create-cross-reference', // a unique identifier for this form
            validate,
        })(CrossReferenceForm)
    )
);
