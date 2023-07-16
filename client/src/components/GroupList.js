import React from 'react';

import GenericResultPaper from './shared/GenericResultPaper';

const GroupList = props => {
    return (
        <div dir="ltr">
            {props.list.map(item => {
                return (
                    <GenericResultPaper
                        key={item.id}
                        englishValue={item.name}
                        arabicValue={item.aName}
                        fieldName="collection"
                    />
                );
            })}
        </div>
    );
};

export default GroupList;
