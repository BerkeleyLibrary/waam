import React from 'react';

import { Link } from 'react-router-dom';

import CustomPaper from './CustomPaper';

export default ({ englishValue, arabicValue, path }) => {
    return (
        <CustomPaper>
            <Link to={path}>
                <div className="row">
                    <div className="col-sm-6 mixed-text">{englishValue}</div>
                    <div className="col-sm-6 mixed-text" dir="rtl">
                        {arabicValue}
                    </div>
                </div>
            </Link>
            {/*<div className="row">
             <div className="col-sm-6 mixed-text">
             {englishValue && <Link
             to={{pathname: `/titles`, search: `query=${englishValue}&fieldName=${fieldName}`}} className="btn btn-outline-secondary btn-xs" title="Search titles">
             <i className="fas fa-search" />{' '}search records
             </Link>}
             </div>
             <div className="col-sm-6 mixed-text" dir="rtl">
             {arabicValue && <Link
             to={{pathname: `/titles`, search: `query=${arabicValue}&fieldName=${fieldName}`}} className="btn btn-outline-secondary btn-xs" title="Search titles">
             search records{' '}<i className="fas fa-search" />
             </Link>}
             </div>
             </div>*/}
        </CustomPaper>
    );
};
