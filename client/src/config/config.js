export const isUCB = document.location.hostname === 'waamd.lib.berkeley.edu';
export const GOOGLE_ANALYTICS_ACCOUNT_ID = isUCB
    ? 'UA-107019296-1'
    : 'UA-93517474-1';
export const GOOGLE_MAPS_API_KEY = isUCB
    ? 'AIzaSyCqhptLZq6kAnJw4I8z1FS5WF6rAbDtJzU'
    : 'AIzaSyBL2VkJEqQi0GL8yLDc8sAX3D4BnVfOFV8';
