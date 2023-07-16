import React from 'react';

import GenericResultPaper from './shared/GenericResultPaper';

const SubjectList = ({ list, location: { search } }) => (
    <div dir="ltr">
        {list.map(item => (
            <GenericResultPaper
                key={item.id}
                path={{ pathname: `/subjects/${item.id}`, search }}
                englishValue={`${item.subject} (WAAMD id # ${item.id})`}
                arabicValue={item.aSubject}
            />
        ))}
    </div>
);

export default SubjectList;
