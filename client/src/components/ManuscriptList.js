import React from 'react';

import ManuscriptGist from './ManuscriptGist';

const ManuscriptList = ({ list }) => {
    return (
        <div dir="ltr">
            {list.map(item => {
                return <ManuscriptGist key={item.id} manuscript={item} />;
            })}
        </div>
    );
};

export default ManuscriptList;
