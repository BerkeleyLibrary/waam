import React from 'react';

import CrossReferenceForm from '../../containers/CrossReferenceForm';

import Breadcrumb from '../shared/Breadcrumb';

export default () => {
    const pageTitle = 'Add a new x-reference';

    return (
        <div>
            <Breadcrumb
                items={[
                    { link: '/', label: 'home' },
                    { link: '/dashboard/index', label: 'dashboard' },
                    { link: '/dashboard/x-references', label: 'x-references' },
                    { link: '', label: pageTitle },
                ]}
            />

            <h1>{pageTitle}</h1>
            <CrossReferenceForm />
        </div>
    );
};
