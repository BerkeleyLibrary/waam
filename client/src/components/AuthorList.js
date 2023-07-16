import React from 'react';
import { Link } from 'react-router-dom';
import CustomPaper from './shared/CustomPaper';
import logos from '../img/logos/';

const AuthorList = ({ list, location: { search } }) => (
    <div dir="ltr">
        {list.map(item => (
            <CustomPaper key={item.id}>
                <Link to={{ pathname: `/authors/${item.id}`, search }}>
                    <div className="row">
                        <div className="col mixed-text">
                            {item.name} (WAAMD id # {item.id}){' '}
                            {item.group &&
                                item.name &&
                                item.group.logo && (
                                    <img
                                        src={logos[item.group.logo]}
                                        style={{ maxHeight: 24 }}
                                        alt={item.group.desc}
                                    />
                                )}
                        </div>
                        <div className="col mixed-text" dir="rtl">
                            {item.aName}{' '}
                            {item.group &&
                                item.aName &&
                                item.group.logo && (
                                    <img
                                        src={logos[item.group.logo]}
                                        style={{ maxHeight: 24 }}
                                        alt={item.group.desc}
                                    />
                                )}
                        </div>
                    </div>
                </Link>
            </CustomPaper>
        ))}
    </div>
);

export default AuthorList;
