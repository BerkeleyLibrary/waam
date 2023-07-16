import React from 'react';
import GenericResultPaper from './shared/GenericResultPaper';

const NisbaList = ({ list, location: { search } }) => (
    <div dir="ltr">
        {list.map(item => (
            <GenericResultPaper
                key={item.id}
                path={{ pathname: `/nisbas/${item.id}`, search }}
                englishValue={`${item.nisba} - (WAAMD id # ${item.id})`}
                arabicValue={item.aNisba}
            />
        ))}
    </div>
);

export default NisbaList;
