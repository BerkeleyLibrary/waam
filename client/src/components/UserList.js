import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

const LoginList = props => {
    return (
        <div dir="ltr">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Admin</th>
                        <th>Active</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <Link to={`/dashboard/users/${item.id}`}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td>{item.email}</td>
                                <td>{item.admin ? 'Yes' : 'No'}</td>
                                <td>{item.active ? 'Yes' : 'No'}</td>
                                <td>
                                    {dateFormat(item.createdAt, 'mediumDate')}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LoginList;
