import { get } from '../api/Api';

const asyncValidate = (values /*, dispatch */) => {
    return get('/api/user-exists', {
        email: values.email,
    }).then(json => {
        if (json.status) {
            return { email: 'email.already.exists' };
        }
    });
};

export default asyncValidate;
