import React from 'react';
import logos from '../img/logos/';

export default ({ aLabel, label, aValue, value, dir, url, record }) => {
    const rtl = dir === 'rtl';
    const ltr = dir === 'ltr';
    return (
        <div>
            <div className="row">
                <div className="ltr col mixed-text">
                    <div className="field-name ">{label}</div>
                </div>
                <div className="rtl col mixed-text">
                    <div className="field-name">{aLabel}</div>
                </div>
            </div>
            {!dir && (
                <div className="row">
                    <div className="ltr col mixed-text">{value}</div>
                    <div className="rtl col mixed-text">{aValue}</div>
                </div>
            )}
            {ltr && (
                <div className="row">
                    <div className="col">
                        {value && url ? (
                            <span>
                                <img
                                    src={logos.hmml}
                                    alt={value}
                                    style={{ maxHeight: 24 }}
                                />{' '}
                                <a
                                    href={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {value}{' '}
                                    <i className="fas fa-external-link-alt" />
                                </a>
                            </span>
                        ) : (
                            value
                        )}
                    </div>
                </div>
            )}
            {rtl && (
                <div className="row">
                    <div className="rtl col">{aValue}</div>
                </div>
            )}
        </div>
    );
};
