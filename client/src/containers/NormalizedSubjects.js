import React from 'react';

import { connect } from 'react-redux';

import { Link, Route } from 'react-router-dom';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { fetchNormalizedSubjectsIfNeeded } from '../actions/subjects';

import Loader from '../components/shared/Loader';

import CustomPaper from '../components/shared/CustomPaper';

import Breadcrumb from '../components/shared/Breadcrumb';

const style = {
    section: {
        marginTop: '20px',
    },
    child: {
        margin: '0 20px',
    },
    see: {
        fontStyle: 'italic',
    },
};

const getParentSubjectFromName = (name, allSubjects) =>
    allSubjects.find(
        sub => sub.english.toLowerCase() === name.toLowerCase() && !sub.parent
    );

const renderXRef = (xRef, allSubjects) => {
    return xRef.split(',').map((name, index) => {
        const seeAlsoSubjectObject = getParentSubjectFromName(
            name.trim(),
            allSubjects
        );

        if (seeAlsoSubjectObject) {
            return (
                seeAlsoSubjectObject && (
                    <span key={name}>
                        <Link
                            to={`/subject-headings/${seeAlsoSubjectObject.id}`}
                        >
                            {seeAlsoSubjectObject.english}
                        </Link>
                        {index !== xRef.split(',').length - 1 && ', '}
                    </span>
                )
            );
        }

        return (
            <span key={name}>
                <Link to={`/titles?query=${name}&fieldName=subject`}>
                    {name}
                </Link>
                {index !== xRef.split(',').length - 1 && ', '}
            </span>
        );
    });
};

const RenderSubject = ({ subject, allSubjects, isNotLast = false }) => {
    return (
        <div style={style.child}>
            <div>
                <div className="row mixed-text">
                    <div className="col-sm-6 mixed-text" dir="ltr">
                        <Link
                            to={`/titles?query=${
                                subject.english
                            }&fieldName=subject`}
                        >
                            {subject.english}
                        </Link>
                    </div>
                    <div className="col-sm-6 mixed-text" dir="rtl">
                        <Link
                            to={`/titles?query=${
                                subject.arabic
                            }&fieldName=subject`}
                        >
                            {subject.arabic}
                        </Link>
                    </div>
                </div>
                {subject.seeAlso && (
                    <div dir="ltr">
                        <span style={style.see}>see also: </span>
                        {renderXRef(subject.seeAlso, allSubjects)}
                    </div>
                )}
            </div>
            {isNotLast && <hr />}
        </div>
    );
};

const RenderMainSubject = ({ subject, allSubjects }) => {
    const children = allSubjects.filter(
        innerSubject => innerSubject.parent === subject.english
    );
    return (
        <CustomPaper>
            <div className="row mixed-text">
                <div className="col-sm-6 mixed-text" dir="ltr">
                    <h4>
                        <Link
                            to={`/titles?query=${
                                subject.english
                            }&fieldName=subject`}
                        >
                            {subject.english}
                        </Link>
                    </h4>
                </div>
                <div className="col-sm-6 mixed-text" dir="rtl">
                    <h4>
                        <Link
                            to={`/titles?query=${
                                subject.arabic
                            }&fieldName=subject`}
                        >
                            {subject.arabic}
                        </Link>
                    </h4>
                </div>
            </div>
            <hr />
            {children.map((subSubject, index) => (
                <RenderSubject
                    key={subSubject.id}
                    subject={subSubject}
                    allSubjects={allSubjects}
                    isNotLast={index !== children.length - 1}
                />
            ))}
        </CustomPaper>
    );
};

const messages = defineMessages({
    title: {
        id: 'app.page.subject.heading.title',
        defaultMessage: 'Subject Rubrics',
    },
    backToSubjectHeadings: {
        id: 'app.page.subject.heading.back.link',
        defaultMessage: 'back to subject headings',
    },
    p1: {
        id: 'app.page.subject.heading.p1',
        defaultMessage:
            'The subject headings below are descriptive of the content of individual manuscripts as identified by the several catalogers of these collections. Since these are largely Islamic libraries our manuscript classification system is mainly based on the Islamic disciplines/sciences, but occasionally the same or similar material may appear under more than one broad rubric, following the best judgment of different catalogers. Cross-references to the most common double or triple listings of a subject appear below. Three topics that would not appear among the Islamic disciplines have been added: "politics," "economy" and "social matters" largely to incorporate correspondence and other writings that fall outside the Islamic sciences.',
    },
    p2: {
        id: 'app.page.subject.heading.p2',
        defaultMessage:
            'The subject lists below are not comprehensive. Some of the more detailed descriptors for individual manuscripts are indicated to provide users with an idea of the range of material within particular rubrics. The approximate number of records in the database for each subject (as of 6/08) appears in parentheses following each general subject.',
    },
    p3: {
        id: 'app.page.subject.heading.p3',
        defaultMessage:
            'Click on subject headings for a detailed listing of sub-topics.',
    },
    p4: {
        id: 'app.page.subject.heading.p4',
        defaultMessage:
            'Click on a subject heading in either language to begin a search for it in the database.',
    },
    h31: {
        id: 'app.page.subject.heading.h31',
        defaultMessage: 'General Rubrics (and approx. record numbers in each)',
    },
    h32: {
        id: 'app.page.subject.heading.h32',
        defaultMessage: 'Cross Reference',
    },
});

class NormalizedSubjects extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchNormalizedSubjectsIfNeeded());
    }

    render() {
        const {
            normalizedSubjects,
            match,
            intl: { formatMessage },
        } = this.props;

        const parentSubjects = normalizedSubjects.filter(
            subject => !subject.parent
        );

        return (
            <div>
                <Route
                    path={`${match.url}/:id`}
                    render={({ match: { params: { id } } }) => (
                        <div>
                            <Breadcrumb
                                items={[
                                    { link: '/', label: 'home' },
                                    {
                                        link: '/subject-headings',
                                        label: formatMessage(messages.title),
                                    },
                                    {
                                        link: '',
                                        label:
                                            !!normalizedSubjects.length &&
                                            normalizedSubjects.find(
                                                subject =>
                                                    subject.id ===
                                                    parseInt(id, 10)
                                            ).english,
                                    },
                                ]}
                            />

                            <Link
                                to={'/subject-headings'}
                                className="btn btn-outline-info btn-sm"
                            >
                                <i className="fas fa-chevron-left" />{' '}
                                {formatMessage(messages.backToSubjectHeadings)}
                            </Link>
                            <div>
                                <div className="row">
                                    <div
                                        className="col-sm-6 mixed-text"
                                        dir="ltr"
                                    >
                                        <h1>
                                            {!!normalizedSubjects.length &&
                                                normalizedSubjects.find(
                                                    subject =>
                                                        subject.id ===
                                                        parseInt(id, 10)
                                                ).english}
                                        </h1>
                                    </div>
                                    <div
                                        className="col-sm-6 mixed-text"
                                        dir="rtl"
                                    >
                                        <h1>
                                            {!!normalizedSubjects.length &&
                                                normalizedSubjects.find(
                                                    subject =>
                                                        subject.id ===
                                                        parseInt(id, 10)
                                                ).arabic}
                                        </h1>
                                    </div>
                                </div>
                                <p>{formatMessage(messages.p4)}</p>
                                {!normalizedSubjects.length && <Loader />}
                                {!!normalizedSubjects.length && (
                                    <RenderMainSubject
                                        subject={normalizedSubjects.find(
                                            subject =>
                                                subject.id === parseInt(id, 10)
                                        )}
                                        allSubjects={normalizedSubjects}
                                    />
                                )}
                            </div>
                        </div>
                    )}
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
                                        link: '',
                                        label: formatMessage(messages.title),
                                    },
                                ]}
                            />

                            <h1>{formatMessage(messages.title)}</h1>
                            <div>
                                <div style={style.section}>
                                    <p>{formatMessage(messages.p1)}</p>
                                    <p>{formatMessage(messages.p2)}</p>
                                    <h3>{formatMessage(messages.h31)}</h3>
                                    <p>{formatMessage(messages.p3)}</p>
                                    {!normalizedSubjects.length && <Loader />}
                                    <div className="row" dir="ltr">
                                        <div className="col-sm-6 mixed-text">
                                            {parentSubjects
                                                .slice(
                                                    0,
                                                    Math.ceil(
                                                        parentSubjects.length /
                                                            2
                                                    )
                                                )
                                                .map(subject => (
                                                    <div key={subject.id}>
                                                        <div>
                                                            {subject.see ? (
                                                                <span>
                                                                    {
                                                                        subject.english
                                                                    }:{' '}
                                                                    <span
                                                                        style={
                                                                            style.see
                                                                        }
                                                                    >
                                                                        see:{' '}
                                                                    </span>
                                                                    <span>
                                                                        {renderXRef(
                                                                            subject.see,
                                                                            normalizedSubjects
                                                                        )}
                                                                    </span>
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    <Link
                                                                        to={`${
                                                                            match.url
                                                                        }/${
                                                                            subject.id
                                                                        }`}
                                                                    >
                                                                        {
                                                                            subject.english
                                                                        }
                                                                    </Link>{' '}
                                                                    ({
                                                                        subject.count
                                                                    })
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        <div className="col-sm-6 mixed-text">
                                            {parentSubjects
                                                .slice(
                                                    Math.ceil(
                                                        parentSubjects.length /
                                                            2
                                                    )
                                                )
                                                .map(subject => (
                                                    <div key={subject.id}>
                                                        <div>
                                                            {subject.see ? (
                                                                <span>
                                                                    {
                                                                        subject.english
                                                                    }:{' '}
                                                                    <span
                                                                        style={
                                                                            style.see
                                                                        }
                                                                    >
                                                                        see:{' '}
                                                                    </span>
                                                                    <span>
                                                                        {renderXRef(
                                                                            subject.see,
                                                                            normalizedSubjects
                                                                        )}
                                                                    </span>
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    <Link
                                                                        to={`${
                                                                            match.url
                                                                        }/${
                                                                            subject.id
                                                                        }`}
                                                                    >
                                                                        {
                                                                            subject.english
                                                                        }
                                                                    </Link>{' '}
                                                                    ({
                                                                        subject.count
                                                                    })
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div style={style.section}>
                                    <h3>{formatMessage(messages.h32)}</h3>
                                    <p>{formatMessage(messages.p4)}</p>

                                    {normalizedSubjects
                                        .filter(
                                            subject =>
                                                !subject.parent && !subject.see
                                        )
                                        .map(subject => (
                                            <RenderMainSubject
                                                key={subject.id}
                                                subject={subject}
                                                allSubjects={normalizedSubjects}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        );
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

NormalizedSubjects.propTypes = propTypes;

export default connect(({ subjects: { normalizedSubjects } }) => ({
    normalizedSubjects,
}))(injectIntl(NormalizedSubjects));
