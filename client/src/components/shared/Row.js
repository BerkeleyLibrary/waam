import React from 'react';

const Row = ({
    label,
    data,
    labelCssClass = 'col-sm-4 col-md-3',
    dataCssClass = 'col-sm-8 col-md-9',
}) => {
    return (
        <div className="row">
            <div className={labelCssClass}>
                <label>{label}</label>
            </div>
            <div className={dataCssClass}>{data}</div>
        </div>
    );
};

export default Row;
