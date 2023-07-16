import React from 'react';
import Loader from './shared/Loader';

const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <Loader />;
    } else if (error) {
        // Handle the error state
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

export default MyLoadingComponent;
