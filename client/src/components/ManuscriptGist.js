import React from 'react';

import { Link, withRouter } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import MultiLangRow from './MultiLangRow';

import logos from '../img/logos/';

import CustomPaper from './shared/CustomPaper';

const messages = defineMessages({
    seeFull: {
        id: 'app.titles.gist.see.full.record',
        defaultMessage: 'see full record',
    },
});

const ManuscriptGist = ({ manuscript, location, intl: { formatMessage } }) => {
    const {
        id,
        aTitle,
        title,
        authors,
        collection,
        subject,
        group,
    } = manuscript;

    const { name: collectionName, aName: collectionArabicName, desc, logo } =
        group || {};

    const primaryAuthor = authors.find(
        _author =>
            _author.manuscriptAuthor &&
            _author.manuscriptAuthor.status === 'primary'
    );
    const secondaryAuthors = authors.filter(
        _author =>
            _author.manuscriptAuthor &&
            _author.manuscriptAuthor.status !== 'primary'
    );
    const secondaryAuthorEnNames = secondaryAuthors.length
        ? secondaryAuthors.map(_author => _author.name).join(', ')
        : '';
    const secondaryAuthorArNames = secondaryAuthors.length
        ? secondaryAuthors.map(_author => _author.aName).join(', ')
        : '';
    return (
        <CustomPaper>
            <div className="row">
                <div className="col mixed-text ltr">
                    <div>
                        <h3>
                            <Link
                                to={{
                                    pathname: `/titles/${id}`,
                                    search: location.search,
                                }}
                            >
                                {title
                                    ? title
                                    : formatMessage(messages.seeFull)}{' '}
                                (WAAMD id # {id})
                            </Link>{' '}
                            {title &&
                                logo && (
                                    <img
                                        src={logos[logo]}
                                        alt={desc}
                                        style={{ maxHeight: 24 }}
                                    />
                                )}{' '}
                        </h3>
                    </div>
                </div>
                <div className="col mixed-text rtl">
                    <div className="rtl">
                        <h3>
                            <Link
                                to={{
                                    pathname: `/titles/${id}`,
                                    search: location.search,
                                }}
                            >
                                {aTitle
                                    ? aTitle
                                    : formatMessage(messages.seeFull)}
                            </Link>{' '}
                            {aTitle &&
                                logo && (
                                    <img
                                        src={logos[logo]}
                                        alt={desc}
                                        style={{ maxHeight: 24 }}
                                    />
                                )}{' '}
                        </h3>
                    </div>
                </div>
            </div>

            {group && (
                <div>
                    <MultiLangRow
                        label={'Collection:'}
                        value={
                            collectionName
                                ? collectionName +
                                  (collection ? `: ${collection}` : '')
                                : ''
                        }
                        aValue={
                            collectionArabicName
                                ? collectionArabicName +
                                  (collection ? `: ${collection}` : '')
                                : ''
                        }
                        aLabel={'المجموعة:'}
                    />
                    <hr />
                </div>
            )}

            {primaryAuthor && (
                <div>
                    <MultiLangRow
                        label={'Author:'}
                        value={primaryAuthor.name}
                        aValue={primaryAuthor.aName}
                        aLabel={'المؤلف:'}
                    />
                    <hr />
                </div>
            )}
            {!!secondaryAuthors.length && (
                <div>
                    <MultiLangRow
                        label={'Secondary Author(s):'}
                        value={secondaryAuthorEnNames}
                        aValue={secondaryAuthorArNames}
                        aLabel={'المؤلفون الثانويون:'}
                    />
                    <hr />
                </div>
            )}
            <MultiLangRow
                label={'Subject:'}
                value={subject && subject.subject}
                aValue={subject && subject.aSubject}
                aLabel={'الموضوع:'}
            />
        </CustomPaper>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

ManuscriptGist.propTypes = propTypes;

export default withRouter(injectIntl(ManuscriptGist));
