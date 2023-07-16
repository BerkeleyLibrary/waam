import React from 'react';

const LoginList = props => {
    return (
        <div dir="ltr">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>IP Address</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.user.name}</td>
                                <td>{item.ip}</td>
                                <td>
                                    {new Date(
                                        item.createdAt
                                    ).toLocaleDateString() +
                                        ' ' +
                                        new Date(
                                            item.createdAt
                                        ).toLocaleTimeString()}
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
