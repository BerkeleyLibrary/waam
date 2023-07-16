import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { addSubject } from '../../actions/subjects';
import DiacriticsWithArabicKeyBoard from '../../components/shared/DiacriticsWithArabicKeyBoard';

import {
    renderTextField,
    renderMultiLineTextField,
} from '../../components/shared/ReduxFormComponents';

import { formFields, hiddenFormFields } from './subjectFields';

const messages = defineMessages({
    add: {
        id: 'app.subjects.add.form.add',
        defaultMessage: 'save',
    },
    cancel: {
        id: 'app.subjects.add.form.cancel',
        defaultMessage: 'cancel',
    },
});

const validate = values => {
    const errors = {};
    const requiredFields = ['subject', 'aSubject'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'required';
        }
    });

    return errors;
};

const Form = ({
    selectedSubject,
    dispatch,
    handleSubmit,
    pristine,
    submitting,
    intl: { formatMessage },
    hiddenFields = false,
}) => {
    return (
        <form
            onSubmit={handleSubmit(values => dispatch(addSubject(values)))}
            dir="ltr"
        >
            <DiacriticsWithArabicKeyBoard />
            {formFields.map((label, index) => {
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
                                        label={Object.values(label.english)[0]}
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
                                        label={Object.values(label.arabic)[0]}
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
                                        label={Object.values(label.arabic)[0]}
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
                                        label={Object.values(label.english)[0]}
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
                    <i className="fas fa-plus" /> {formatMessage(messages.add)}
                </button>{' '}
                <Link
                    to={
                        selectedSubject
                            ? `/subjects/${selectedSubject.id}`
                            : '/subjects'
                    }
                    className="btn btn-outline-secondary"
                >
                    {formatMessage(messages.cancel)}
                </Link>
            </div>
        </form>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

Form.propTypes = propTypes;

export default injectIntl(
    connect(({ subjects: { selectedSubject } }) => ({
        initialValues: selectedSubject,
        selectedSubject,
    }))(
        reduxForm({
            form: 'add_update_subject_form',
            validate,
        })(Form)
    )
);
