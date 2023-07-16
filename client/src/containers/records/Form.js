import React from 'react';
import { Link } from 'react-router-dom';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { intlShape, injectIntl, defineMessages } from 'react-intl';
import { addManuscript } from '../../actions/manuscripts';
import {
    renderTextField,
    renderMultiLineTextField,
} from '../../components/shared/ReduxFormComponents';
import { formFields, hiddenFormFields } from './recordFields';
import DiacriticsWithArabicKeyBoard from '../../components/shared/DiacriticsWithArabicKeyBoard';

import { putPrimaryAuthorFirst } from '../../utils/utils';

const renderAuthors = ({ fields, meta: { error, submitFailed } }) => (
    <div>
        {fields.map((member, index) => (
            <div className="row" key={index}>
                <div className="col-sm-6" style={{ position: 'relative' }}>
                    {index !== 0 && (
                        <button
                            type="button"
                            title="Remove"
                            onClick={() => fields.remove(index)}
                            className="btn-danger btn-xs"
                            style={{
                                position: 'absolute',
                                right: 15,
                                top: 0,
                            }}
                        >
                            X
                        </button>
                    )}
                    <Field
                        name={`${member}.id`}
                        type="number"
                        component={renderTextField}
                        label={
                            index === 0
                                ? 'Primary Author AMMS #'
                                : 'Secondary Author AMMS #'
                        }
                        placeholder={
                            index === 0
                                ? 'author id, numbers only, e.g. 456'
                                : 'secondary author id, numbers only, e.g. 456'
                        }
                    />
                    <Field
                        name={`${member}.status`}
                        type="hidden"
                        component="input"
                    />
                </div>
                <div dir="rtl" className="col-sm-6">
                    <label>
                        {index === 0 ? 'رقم المؤلف:' : 'رقم المؤلف الثاني:'}
                    </label>
                </div>
            </div>
        ))}
        <div className="form-group">
            <button
                type="button"
                className="btn-info btn-xs"
                onClick={() => fields.push({})}
            >
                Add a secondary author
            </button>
            {submitFailed && error && <span>{error}</span>}
        </div>
    </div>
);

const messages = defineMessages({
    add: {
        id: 'app.titles.add.form.add',
        defaultMessage: 'save',
    },
    cancel: {
        id: 'app.titles.add.form.cancel',
        defaultMessage: 'cancel',
    },
});

const validate = values => {
    const errors = {};
    /*const requiredFields = ['aTitle'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'required'
        }
    });*/

    return errors;
};

const Form = ({
    selectedManuscript,
    dispatch,
    handleSubmit,
    pristine,
    submitting,
    intl: { formatMessage },
    hiddenFields = false,
}) => {
    return (
        <div>
            <form
                onSubmit={handleSubmit(values =>
                    dispatch(addManuscript(values))
                )}
            >
                <DiacriticsWithArabicKeyBoard />
                {formFields.map((label, index) => {
                    const isAuthors = label.type === 'authors';
                    if (isAuthors) {
                        return (
                            <FieldArray
                                key={index}
                                name="authors"
                                component={renderAuthors}
                            />
                        );
                    }
                    const biLang = label.english && label.arabic && !label.dir;
                    const rtl = label.dir === 'rtl';
                    const ltr = label.dir === 'ltr';
                    return (
                        <div key={index}>
                            {biLang && (
                                <div className="row">
                                    <div className="col-sm-6">
                                        <Field
                                            name={Object.keys(label.english)[0]}
                                            component={
                                                label.multiLine
                                                    ? renderMultiLineTextField
                                                    : renderTextField
                                            }
                                            label={
                                                Object.values(label.english)[0]
                                            }
                                            placeholder={label.placeholder}
                                            type={label.type}
                                        />
                                    </div>
                                    <div dir="rtl" className="col-sm-6">
                                        <Field
                                            name={Object.keys(label.arabic)[0]}
                                            component={
                                                label.multiLine
                                                    ? renderMultiLineTextField
                                                    : renderTextField
                                            }
                                            label={
                                                Object.values(label.arabic)[0]
                                            }
                                            placeholder={label.placeholder}
                                            type={label.type}
                                        />
                                    </div>
                                </div>
                            )}
                            {rtl && (
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>
                                            {Object.values(label.english)[0]}
                                        </label>
                                    </div>
                                    <div dir="rtl" className="col-sm-6">
                                        <Field
                                            name={Object.keys(label.arabic)[0]}
                                            component={
                                                label.multiLine
                                                    ? renderMultiLineTextField
                                                    : renderTextField
                                            }
                                            label={
                                                Object.values(label.arabic)[0]
                                            }
                                            placeholder={label.placeholder}
                                            type={label.type}
                                        />
                                    </div>
                                </div>
                            )}
                            {ltr && (
                                <div className="row">
                                    <div className="col-sm-6">
                                        <Field
                                            name={Object.keys(label.english)[0]}
                                            component={
                                                label.multiLine
                                                    ? renderMultiLineTextField
                                                    : renderTextField
                                            }
                                            label={
                                                Object.values(label.english)[0]
                                            }
                                            placeholder={label.placeholder}
                                            type={label.type}
                                        />
                                    </div>
                                    <div dir="rtl" className="col-sm-6">
                                        <label>
                                            {Object.values(label.arabic)[0]}
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                {hiddenFields &&
                    hiddenFormFields.map(item => (
                        <Field
                            key={item}
                            name={item}
                            type="hidden"
                            component="input"
                        />
                    ))}
                <div>
                    <button
                        className="btn btn-outline-primary"
                        disabled={pristine || submitting}
                        type="submit"
                    >
                        <i className="fas fa-plus" />{' '}
                        {formatMessage(messages.add)}
                    </button>{' '}
                    <Link
                        to={
                            selectedManuscript
                                ? `/titles/${selectedManuscript.id}`
                                : '/titles'
                        }
                        className="btn btn-outline-secondary"
                    >
                        {formatMessage(messages.cancel)}
                    </Link>
                </div>
            </form>
        </div>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

Form.propTypes = propTypes;

export default injectIntl(
    connect(({ manuscripts: { selectedManuscript } }) => ({
        initialValues: selectedManuscript
            ? putPrimaryAuthorFirst(selectedManuscript)
            : { authors: [{ status: 'primary' }] },
        selectedManuscript,
    }))(
        reduxForm({
            form: 'add_update_record_form',
            validate,
        })(Form)
    )
);
