import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    intlShape,
    injectIntl,
    defineMessages,
    FormattedMessage,
} from 'react-intl';
import Modal from 'react-bootstrap/Modal';
import Loader from '../components/shared/Loader';
import CustomPaper from '../components/shared/CustomPaper';
import Breadcrumb from '../components/shared/Breadcrumb';
import MultiLangRow from '../components/MultiLangRow';
import logos from '../img/logos/';
import {
    fetchSingleManuscriptIfNeeded,
    deleteRecord,
    cleanUpSingleManuscript,
} from '../actions/manuscripts';
import { getAuthorFlatJson } from '../utils/utils';

const labels = {
    author: [
        {
            english: {
                id: 'Author WAAMD ID#:',
            },
            arabic: {
                id: 'رقم المؤلف:',
            },
        },
        {
            english: {
                name: 'Name:',
            },
            arabic: {
                aName: 'المؤلف:',
            },
        },
        {
            english: {
                altName: 'Alt name:',
            },
            arabic: {
                aAltName: 'إسم بديل:',
            },
        },
        {
            english: {
                LCName: 'Library of Congress name authority:',
            },
            arabic: {
                ALCName: 'اسم مكتبة الكونغرس:',
            },
        },
        {
            english: {
                aka: 'known as:',
            },
            arabic: {
                aAka: 'اسم الشهرة:',
            },
        },
        {
            english: {
                dateDied: 'Deceased:',
            },
            arabic: {
                dateDied: 'تاريخ الوفاة:',
            },
        },
        {
            english: {
                nisba: 'Nisba:',
            },
            arabic: {
                aNisba: 'النسبة:',
            },
        },
        {
            english: {
                documentation: 'Author Documentation:',
            },
            arabic: {
                aDocumentation: 'توثيق المؤلف:',
            },
        },
    ],
    top: [
        {
            english: {
                id: 'WAAMD ID#:',
            },
            arabic: {
                id: 'رقم:',
            },
        },
        {
            english: {
                title: 'Title:',
            },
            arabic: {
                aTitle: 'العنوان:',
            },
        },
        {
            english: {
                altTitle: 'Alternate title:',
            },
            arabic: {
                aAltTitle: 'العنوان البديل:',
            },
        },
        {
            english: {
                attrTitle: 'Attributed title:',
            },
            arabic: {
                aAttrTitle: 'العنوان المنسوب:',
            },
        },
        {
            english: {
                groupName: 'Collection:',
            },
            arabic: {
                groupArabicName: 'المجموعة:',
            },
        },
        {
            english: {
                subjectName: 'Subject:',
            },
            arabic: {
                subjectArabicName: 'الموضوع:',
            },
        },
    ],
    other: [
        {
            english: {
                form: 'Form:',
            },
            arabic: {
                aForm: 'النوع:',
            },
        },
        {
            english: {
                lang: 'Language/script:',
            },
            arabic: {
                lang: 'اللغة / نوع الخط:',
            },
        },
        {
            english: {
                pages: 'Pages:',
            },
            arabic: {
                pages: 'عدد الصفحات:',
            },
        },
        {
            english: {
                dims: 'Dimensions:',
            },
            arabic: {
                dims: 'الأبعاد:',
            },
        },
        {
            english: {
                condition: 'Condition:',
            },
            arabic: {
                aCondition: 'حالة المخطوط:',
            },
        },
        {
            english: {
                owner: 'Owner/where found:',
            },
            arabic: {
                aOwner: 'المالك / مكان وجود المخطوط:',
            },
        },
        {
            english: {
                recp: 'Recipient:',
            },
            arabic: {
                aRecp: 'المستلم:',
            },
        },
        {
            english: {
                recpGrp: 'Recipient Group:',
            },
            arabic: {
                aRecpGrp: 'الجماعة:',
            },
        },
        {
            english: {
                req: 'Requested:',
            },
            arabic: {
                aReq: 'بالتماس:',
            },
        },
        {
            english: {
                copyist: 'Copyist:',
            },
            arabic: {
                aCopyist: 'الناسخ:',
            },
        },
        {
            english: {
                copiedAt: 'Place of copy:',
            },
            arabic: {
                aCopiedAt: 'مكان النسخ:',
            },
        },
        {
            english: {
                copiedDate: 'Date of copy:',
            },
            arabic: {
                aCopiedDate: 'تاريخ النسخ:',
            },
        },
        {
            english: {
                composed: 'Composed:',
            },
            arabic: {
                composed: 'مكان وتاريخ التأليف:',
            },
        },
        {
            english: {
                aFirstLine: 'First Line:',
            },
            arabic: {
                aFirstLine: 'أولها:',
            },
            dir: 'rtl',
        },
        {
            english: {
                aLastLine: 'Last Line:',
            },
            arabic: {
                aLastLine: 'آخرها:',
            },
            dir: 'rtl',
        },
        {
            english: {
                misc: 'Miscellaneous:',
            },
            arabic: {
                aMisc: 'معلومات إضافية:',
            },
        },
        {
            english: {
                documentation: 'Documentation:',
            },
            arabic: {
                aDocumentation: 'التوثيق:',
            },
        },
        {
            english: {
                onlineCopy: 'Online copy url:',
            },
            arabic: {
                onlineCopy: 'نسخة على الانترنت:',
            },
            dir: 'ltr',
            url: true,
        },
    ],
};

const messages = defineMessages({
    pageTitle: {
        id: 'app.titles.detail.title',
        defaultMessage: 'Records',
    },
    backToSearch: {
        id: 'app.titles.detail.back.link',
        defaultMessage: 'back to search',
    },
    sureDelete: {
        id: 'app.titles.detail.sure.delete',
        defaultMessage: 'Are you sure you want to delete this record?',
    },
    sureDeleteTitle: {
        id: 'app.titles.detail.sure.delete.title',
        defaultMessage: 'Are you sure?',
    },
});

class ManuscriptDetail extends React.Component {
    state = {
        open: false,
    };

    componentDidMount() {
        const { match: { params: { id } }, dispatch } = this.props;

        dispatch(cleanUpSingleManuscript());

        dispatch(fetchSingleManuscriptIfNeeded(parseInt(id, 10)));
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteRecord = () => {
        const { match: { params: { id } }, dispatch } = this.props;
        dispatch(deleteRecord(parseInt(id, 10)));
        this.handleClose();
    };

    render() {
        const {
            manuscripts: { selectedManuscript, isFetching, deleted },
            location,
            intl: { formatMessage },
            user,
        } = this.props;

        return (() => {
            if (isFetching) {
                return <Loader />;
            } else if (selectedManuscript) {
                let {
                    id,
                    aTitle,
                    title,
                    authors,
                    collection,
                    subject,
                    group,
                } = selectedManuscript;

                const primaryAuthor = getAuthorFlatJson(
                    authors.find(
                        _author =>
                            _author.manuscriptAuthor &&
                            _author.manuscriptAuthor.status === 'primary'
                    )
                );
                const secondaryAuthors = authors
                    .filter(
                        _author =>
                            _author.manuscriptAuthor &&
                            _author.manuscriptAuthor.status !== 'primary'
                    )
                    .map(_author => getAuthorFlatJson(_author));

                subject = subject || {};

                group = group || {};

                const normalizedManuscript = Object.assign(
                    {},
                    selectedManuscript,
                    {
                        subjectName: subject.subject,
                        subjectArabicName: subject.aSubject,
                        groupName: group.name
                            ? group.name + (collection ? `: ${collection}` : '')
                            : '',
                        groupArabicName: group.aName
                            ? group.aName +
                              (collection ? `: ${collection}` : '')
                            : '',
                    }
                );

                const otherFields = labels.other;
                const topFields = labels.top;
                const authorFields = labels.author;

                const logo = group.logo;

                return (
                    <>
                        <Breadcrumb
                            items={[
                                { link: '/', label: 'home' },
                                { link: '/titles', label: 'titles' },
                                { link: '', label: id },
                            ]}
                        />

                        <Modal show={this.state.open} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {formatMessage(messages.sureDeleteTitle)}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {formatMessage(messages.sureDelete)}
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={this.handleClose}
                                >
                                    Cancel
                                </button>{' '}
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={this.deleteRecord}
                                >
                                    Delete
                                </button>
                            </Modal.Footer>
                        </Modal>

                        <div className="row">
                            <div className="col">
                                <Link
                                    to={{
                                        pathname: '/titles',
                                        search: location.search,
                                    }}
                                    className="btn btn-outline-info btn-sm"
                                >
                                    <i className="fas fa-chevron-left" />{' '}
                                    {formatMessage(messages.backToSearch)}
                                </Link>
                            </div>
                            <div className="col">
                                {!deleted &&
                                    user &&
                                    user.admin && (
                                        <div className="text-right">
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={this.handleOpen}
                                            >
                                                <i className="fas fa-times" />{' '}
                                                Delete
                                            </button>{' '}
                                            <Link
                                                to={`/titles/edit/${id}`}
                                                className="btn btn-outline-info btn-sm"
                                            >
                                                <i className="fas fa-pen" />{' '}
                                                Edit
                                            </Link>
                                        </div>
                                    )}
                            </div>
                        </div>

                        {deleted && (
                            <div className="alert alert-info">
                                <FormattedMessage
                                    id="app.titles.detail.delete.success.message"
                                    defaultMessage="Success! the record, {title}, was deleted."
                                    values={{
                                        title: selectedManuscript.aTitle,
                                    }}
                                />
                            </div>
                        )}

                        {!deleted && (
                            <div dir="ltr">
                                <h1>
                                    {aTitle || title}{' '}
                                    {logo && (
                                        <img
                                            src={logos[logo]}
                                            alt={group.desc}
                                            style={{ maxHeight: 24 }}
                                        />
                                    )}
                                </h1>

                                <>
                                    <CustomPaper>
                                        {topFields.map((row, index) => {
                                            return (
                                                <React.Fragment
                                                    key={
                                                        Object.keys(
                                                            row.english
                                                        )[0]
                                                    }
                                                >
                                                    <MultiLangRow
                                                        label={
                                                            Object.values(
                                                                row.english
                                                            )[0]
                                                        }
                                                        value={
                                                            normalizedManuscript[
                                                                Object.keys(
                                                                    row.english
                                                                )[0]
                                                            ]
                                                        }
                                                        aValue={
                                                            normalizedManuscript[
                                                                Object.keys(
                                                                    row.arabic
                                                                )[0]
                                                            ]
                                                        }
                                                        aLabel={
                                                            Object.values(
                                                                row.arabic
                                                            )[0]
                                                        }
                                                        dir={row.dir}
                                                        url={row.url}
                                                    />
                                                    {index !==
                                                        topFields.length -
                                                            1 && <hr />}
                                                </React.Fragment>
                                            );
                                        })}
                                    </CustomPaper>
                                    {primaryAuthor &&
                                        primaryAuthor.id && (
                                            <CustomPaper>
                                                <div className="row">
                                                    <div
                                                        className="col mixed-text"
                                                        dir="ltr"
                                                    >
                                                        <h3 className="ltr">
                                                            Author
                                                        </h3>
                                                    </div>
                                                    <div
                                                        className="col mixed-text"
                                                        dir="rtl"
                                                    >
                                                        <h3>المؤلف</h3>
                                                    </div>
                                                </div>
                                                <hr />
                                                {authorFields.map(
                                                    (row, index) => {
                                                        const enLabel = Object.values(
                                                            row.english
                                                        )[0];
                                                        const arLabel = Object.values(
                                                            row.arabic
                                                        )[0];
                                                        const enValue =
                                                            primaryAuthor[
                                                                Object.keys(
                                                                    row.english
                                                                )[0]
                                                            ];
                                                        const arValue =
                                                            primaryAuthor[
                                                                Object.keys(
                                                                    row.arabic
                                                                )[0]
                                                            ];
                                                        const isName =
                                                            Object.keys(
                                                                row.english
                                                            )[0] === 'name';
                                                        return (
                                                            <React.Fragment
                                                                key={
                                                                    Object.keys(
                                                                        row.english
                                                                    )[0]
                                                                }
                                                            >
                                                                <div className="row">
                                                                    <div className="ltr col mixed-text">
                                                                        <div className="field-name ">
                                                                            {
                                                                                enLabel
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="rtl col mixed-text">
                                                                        <div className="field-name">
                                                                            {
                                                                                arLabel
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="ltr col mixed-text">
                                                                        {isName && (
                                                                            <Link
                                                                                to={`/authors/${
                                                                                    primaryAuthor.id
                                                                                }`}
                                                                            >
                                                                                {
                                                                                    enValue
                                                                                }
                                                                            </Link>
                                                                        )}
                                                                        {!isName &&
                                                                            enValue}
                                                                    </div>
                                                                    <div className="rtl col mixed-text">
                                                                        {isName && (
                                                                            <Link
                                                                                to={`/authors/${
                                                                                    primaryAuthor.id
                                                                                }`}
                                                                            >
                                                                                {
                                                                                    arValue
                                                                                }
                                                                            </Link>
                                                                        )}
                                                                        {!isName &&
                                                                            arValue}
                                                                    </div>
                                                                </div>
                                                                {index !==
                                                                    authorFields.length -
                                                                        1 && (
                                                                    <hr />
                                                                )}
                                                            </React.Fragment>
                                                        );
                                                    }
                                                )}
                                            </CustomPaper>
                                        )}

                                    {secondaryAuthors.length > 0 && (
                                        <CustomPaper>
                                            <div className="row">
                                                <div
                                                    className="col mixed-text"
                                                    dir="ltr"
                                                >
                                                    <h3>Secondary Author(s)</h3>
                                                </div>
                                                <div
                                                    className="col mixed-text"
                                                    dir="rtl"
                                                >
                                                    <h3>المؤلفون الثانويون</h3>
                                                </div>
                                            </div>
                                            <hr />
                                            {secondaryAuthors.map(
                                                (secAuthor, index) => (
                                                    <div
                                                        className="row"
                                                        key={`sec-${
                                                            secAuthor.id
                                                        }`}
                                                    >
                                                        <div className="ltr col mixed-text">
                                                            <Link
                                                                to={`/authors/${
                                                                    secAuthor.id
                                                                }`}
                                                            >
                                                                {secAuthor.name}
                                                            </Link>
                                                        </div>
                                                        <div className="rtl col mixed-text">
                                                            <Link
                                                                to={`/authors/${
                                                                    secAuthor.id
                                                                }`}
                                                            >
                                                                {
                                                                    secAuthor.aName
                                                                }
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </CustomPaper>
                                    )}

                                    <CustomPaper>
                                        {otherFields.map((row, index) => {
                                            return (
                                                <React.Fragment
                                                    key={
                                                        Object.keys(
                                                            row.english
                                                        )[0]
                                                    }
                                                >
                                                    <MultiLangRow
                                                        label={
                                                            Object.values(
                                                                row.english
                                                            )[0]
                                                        }
                                                        value={
                                                            normalizedManuscript[
                                                                Object.keys(
                                                                    row.english
                                                                )[0]
                                                            ]
                                                        }
                                                        aValue={
                                                            normalizedManuscript[
                                                                Object.keys(
                                                                    row.arabic
                                                                )[0]
                                                            ]
                                                        }
                                                        aLabel={
                                                            Object.values(
                                                                row.arabic
                                                            )[0]
                                                        }
                                                        dir={row.dir}
                                                        url={row.url}
                                                        record={
                                                            normalizedManuscript
                                                        }
                                                    />
                                                    {index !==
                                                        otherFields.length -
                                                            1 && <hr />}
                                                </React.Fragment>
                                            );
                                        })}
                                    </CustomPaper>
                                </>
                            </div>
                        )}
                    </>
                );
            } else {
                return <Loader />;
            }
        })();
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

ManuscriptDetail.propTypes = propTypes;

export default connect(({ manuscripts, auth: { user } }) => ({
    manuscripts,
    user,
}))(injectIntl(ManuscriptDetail));
