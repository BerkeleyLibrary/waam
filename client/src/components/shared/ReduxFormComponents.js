import React from 'react';

import { injectIntl, defineMessages } from 'react-intl';

const errorMessages = defineMessages({
    required: {
        id: 'app.validation.error.required',
        defaultMessage: 'Required',
    },
    'email.not.valid': {
        id: 'app.validation.error.email.not.valid',
        defaultMessage: 'Invalid e-mail address.',
    },
    'passwords.do.not.match': {
        id: 'app.validation.error.passwords.do.not.match',
        defaultMessage: "Passwords don't match.",
    },
    'email.already.exists': {
        id: 'app.validation.error.email.already.exists',
        defaultMessage: 'E-mail already used.',
    },
});

const TextField = ({
    input,
    label,
    type,
    meta: { touched, error },
    intl: { formatMessage },
    ...custom
}) => (
    <div className={`form-group ${touched && error && 'has-error'}`}>
        <label className="control-label">{label}</label>
        <div>
            <input
                {...input}
                type={type}
                {...custom}
                className="form-control"
                autoComplete="off"
            />
            {touched &&
                error && (
                    <div className="text-danger">
                        {(errorMessages[error] &&
                            formatMessage(errorMessages[error])) ||
                            error}
                    </div>
                )}
        </div>
    </div>
);

const MultiLineTextField = ({
    input,
    label,
    meta: { touched, error },
    intl: { formatMessage },
    ...custom
}) => (
    <div className={`form-group ${touched && error && 'has-error'}`}>
        <label className="control-label">{label}</label>
        <div>
            <textarea {...input} {...custom} className="form-control" />
            {touched &&
                error && (
                    <div className="text-danger">
                        {(errorMessages[error] &&
                            formatMessage(errorMessages[error])) ||
                            error}
                    </div>
                )}
        </div>
    </div>
);
export const renderTextField = injectIntl(TextField);
export const renderMultiLineTextField = injectIntl(MultiLineTextField);

export const renderCheckbox = ({ input, label }) => (
    <div>
        <input
            checked={!!input.value}
            onChange={input.onChange}
            type="checkbox"
            id={input.name}
        />{' '}
        <label htmlFor={input.name}>{label}</label>
    </div>
);

export const RenderFlatButton = props => {
    return (
        <button
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
            className="btn btn-outline-secondary btn-md"
        >
            Clear Search
        </button>
    );
};
