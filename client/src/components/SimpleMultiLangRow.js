import React from 'react';

export default ({ aValue, value }) => {
    return (
        <tr>
            <td className="ltr">{value}</td>
            <td className="rtl">{aValue}</td>
        </tr>
    );
};
