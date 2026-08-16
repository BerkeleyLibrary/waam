import React from 'react';

import { Field } from 'redux-form';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { Popover, OverlayTrigger } from 'react-bootstrap';

import ArabicKeyboard from '../components/ArabicKeyboard';

const messages = defineMessages({
    default: {
        id: 'app.search.label.default',
        defaultMessage: 'enter a search keyword in Latin characters or Arabic',
    },
    keyword: {
        id: 'app.search.label.keyword',
        defaultMessage: 'enter a search keyword',
    },
    select: {
        id: 'app.search.label.select',
        defaultMessage: 'select field',
    },
    choose: {
        id: 'app.search.label.choose',
        defaultMessage: 'choose...',
    },
    selectCollection: {
        id: 'app.search.label.select.collection',
        defaultMessage: 'select collection',
    },
    waamdId: {
        id: 'app.search.label.waamd.id',
        defaultMessage: 'enter WAAMD Id',
    },
    title: {
        id: 'app.search.label.title',
        defaultMessage: 'enter title or word(s) from the title in Arabic',
    },
    subject: {
        id: 'app.search.label.subject',
        defaultMessage: 'enter subject in Latin characters or Arabic',
    },
    subjectId: {
        id: 'app.search.label.subject.id',
        defaultMessage: 'enter subject id',
    },
    author: {
        id: 'app.search.label.author',
        defaultMessage:
            'enter author name or part of the name in Latin characters or Arabic',
    },
    authorId: {
        id: 'app.search.label.author.id',
        defaultMessage: 'enter author id',
    },
    aka: {
        id: 'app.search.label.aka',
        defaultMessage:
            "enter author's familiar name in Latin characters or Arabic",
    },
    nisba: {
        id: 'app.search.label.nisba',
        defaultMessage:
            "enter author's tribal or residential or ethnic name (nisba) in Latin characters or Arabic",
    },
    nisbaId: {
        id: 'app.search.label.nisba.id',
        defaultMessage: 'enter nisba id',
    },
    died_date: {
        id: 'app.search.label.died_date',
        defaultMessage: 'enter date deceased, A.H. or C.E.',
    },
    collection: {
        id: 'app.search.label.collection',
        defaultMessage: 'enter collection',
    },
    collectionNumber: {
        id: 'app.search.label.collectionNumber',
        defaultMessage: 'enter collection number',
    },
    copyist: {
        id: 'app.search.label.copyist',
        defaultMessage: 'enter copyist',
    },
    copiedAt: {
        id: 'app.search.label.copied',
        defaultMessage: 'enter place of copy',
    },
    copiedDate: {
        id: 'app.search.label.copied.date',
        defaultMessage: 'enter date of copy',
    },
    waamdIdField: {
        id: 'app.search.field.waamd.id',
        defaultMessage: 'WAAMD Id',
    },
    titleField: {
        id: 'app.search.field.title',
        defaultMessage: 'title',
    },
    subjectField: {
        id: 'app.search.field.subject',
        defaultMessage: 'subject',
    },
    subjectIdField: {
        id: 'app.search.field.subject.id',
        defaultMessage: 'subject id',
    },
    authorField: {
        id: 'app.search.field.author',
        defaultMessage: 'author',
    },
    authorIdField: {
        id: 'app.search.field.author.id',
        defaultMessage: 'author id',
    },
    akaField: {
        id: 'app.search.field.aka',
        defaultMessage: 'author known as',
    },
    nisbaField: {
        id: 'app.search.field.nisba',
        defaultMessage: 'author nisba',
    },
    nisbaIdField: {
        id: 'app.search.field.nisba.id',
        defaultMessage: 'author nisba id',
    },
    died_dateField: {
        id: 'app.search.field.died_date',
        defaultMessage: 'author death date',
    },
    collectionField: {
        id: 'app.search.field.collection',
        defaultMessage: 'collection',
    },
    collectionNumberField: {
        id: 'app.search.field.collectionNumber',
        defaultMessage: 'collection #',
    },
    copyistField: {
        id: 'app.search.field.copyist',
        defaultMessage: 'Copyist',
    },
    copyiedField: {
        id: 'app.search.field.copied',
        defaultMessage: 'Copied at',
    },
    copiedDateField: {
        id: 'app.search.field.copied.date',
        defaultMessage: 'Date of copy',
    },
    anyField: {
        id: 'app.search.field.any',
        defaultMessage: 'any field',
    },
});

const propTypes = {
    intl: intlShape.isRequired,
};

class SearchFormRow extends React.Component {
    state = {
        fieldName: '',
    };

    onFieldNameChange(value) {
        this.setState({ fieldName: value });
    }

    componentWillReceiveProps(nextProps) {
        const { fieldName } = nextProps;
        if (fieldName && !this.state.fieldName) {
            this.setState({ fieldName });
        }
    }

    render() {
        const {
            suffix = '',
            groupList,
            change,
            intl: { formatMessage },
        } = this.props;

        const defaultPlaceholder = formatMessage(messages.keyword);

        const popoverContent = this.state.fieldName
            ? formatMessage(messages[this.state.fieldName])
            : formatMessage(messages.default);

        const inputGroupClassName =
            this.state.fieldName !== 'collectionNumber' ? 'input-group' : '';

        const helpPopover = (
            <Popover id="popover-record-search">{popoverContent}</Popover>
        );

        return (
            <div className="row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor={`search-field-name${suffix}`}>
                            {formatMessage(messages.select)}
                        </label>
                        <Field
                            name={`fieldName${suffix}`}
                            component="select"
                            className="form-control"
                            id={`search-field-name${suffix}`}
                            onChange={(event, value) =>
                                this.onFieldNameChange(value)
                            }
                            style={{ verticalAlign: 'bottom' }}
                        >
                            <option value={''}>
                                {formatMessage(messages.anyField)}
                            </option>
                            <option value={'waamdId'}>
                                {formatMessage(messages.waamdIdField)}
                            </option>
                            <option value={'title'}>
                                {formatMessage(messages.titleField)}
                            </option>
                            <option value={'subject'}>
                                {formatMessage(messages.subjectField)}
                            </option>
                            <option value={'subjectId'}>
                                {formatMessage(messages.subjectIdField)}
                            </option>
                            <option value={'author'}>
                                {formatMessage(messages.authorField)}
                            </option>
                            <option value={'authorId'}>
                                {formatMessage(messages.authorIdField)}
                            </option>
                            <option value={'aka'}>
                                {formatMessage(messages.akaField)}
                            </option>
                            <option value={'nisba'}>
                                {formatMessage(messages.nisbaField)}
                            </option>
                            <option value={'nisbaId'}>
                                {formatMessage(messages.nisbaIdField)}
                            </option>
                            <option value={'died_date'}>
                                {formatMessage(messages.died_dateField)}
                            </option>
                            <option value={'collection'}>
                                {formatMessage(messages.collectionField)}
                            </option>
                            <option value={'collectionNumber'}>
                                {formatMessage(messages.collectionNumberField)}
                            </option>
                            <option value={'copyist'}>
                                {formatMessage(messages.copyistField)}
                            </option>
                            <option value={'copiedAt'}>
                                {formatMessage(messages.copyiedField)}
                            </option>
                            <option value={'copiedDate'}>
                                {formatMessage(messages.copiedDateField)}
                            </option>
                        </Field>
                    </div>
                </div>
                <div className="col-sm-9">
                    {(() => {
                        if (this.state.fieldName === 'collection') {
                            return (
                                <div className="form-group">
                                    <label htmlFor={`query${suffix}`}>
                                        {formatMessage(
                                            messages.selectCollection
                                        )}
                                    </label>
                                    <Field
                                        name={`query${suffix}`}
                                        component="select"
                                        id={`query${suffix}`}
                                        className="form-control"
                                    >
                                        <option value={''}>
                                            {formatMessage(messages.choose)}
                                        </option>
                                        {groupList.map((group) => (
                                            <option
                                                key={group.id}
                                                value={group.name}
                                            >
                                                {group.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                            );
                        } else {
                            return (
                                <div className="form-group">
                                    <label
                                        htmlFor={`search-query-input${suffix}`}
                                    >
                                        {defaultPlaceholder}{' '}
                                        <OverlayTrigger
                                            trigger={['hover', 'focus']}
                                            placement="right"
                                            overlay={helpPopover}
                                        >
                                            <i className="fas fa-info-circle" />
                                        </OverlayTrigger>
                                    </label>
                                    <div className={inputGroupClassName}>
                                        <Field
                                            name={`query${suffix}`}
                                            component="input"
                                            type="text"
                                            className="form-control"
                                            id={`search-query-input${suffix}`}
                                            placeholder={defaultPlaceholder}
                                            autoComplete="off"
                                        />
                                        {this.state.fieldName !==
                                            'collectionNumber' && (
                                            <div className="input-group-append">
                                                <ArabicKeyboard
                                                    change={(value) =>
                                                        value &&
                                                        change(
                                                            `query${suffix}`,
                                                            value
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    })()}
                </div>
            </div>
        );
    }
}

SearchFormRow.propTypes = propTypes;

export default injectIntl(SearchFormRow);
