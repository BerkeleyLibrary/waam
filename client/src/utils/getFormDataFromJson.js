export default function getFormDataFromJson(values) {
    let formBody = [];

    Object.keys(values).forEach(key => {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(values[key]);
        formBody.push(encodedKey + '=' + encodedValue);
    });

    return formBody.join('&');
}
