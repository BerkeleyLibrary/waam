export function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

export const capitalize = str => str.replace(/\b\w/g, l => l.toUpperCase());

export function goToUrl(url, history) {
    history.push(url);
}

export const getQueryObject = search => {
    const query = {};
    const urlParam = new URLSearchParams(search);
    for (let item of urlParam) {
        query[item[0]] = item[1];
    }

    return query;
};

export const getQueryString = query => {
    return (
        '?' +
        Object.keys(query)
            .map(key => `${key}=${query[key]}`)
            .join('&')
    );
};

export const submitSearch = (query, history, pathname) => {
    query.page = 0;

    const searchString = getQueryString(query);

    history.push(`${pathname}${searchString}`);
};

export const switchSearch = (query, pathname) => {
    const newQuery = Object.assign({}, query);

    if (newQuery.advanced) {
        delete newQuery.advanced;
    } else {
        newQuery.advanced = true;
    }

    const searchString = getQueryString(newQuery);
    return `${pathname}${searchString}`;
};

export const dispatchFetchActionIfNeeded = (nextProps, props, action) => {
    const { dispatch, location } = nextProps;

    const nextQuery = getQueryObject(location.search);

    const locationChanged = location !== props.location;

    if (locationChanged) {
        dispatch(action(nextQuery));
    }
};

export const getAuthorFlatJson = authorObject => {
    if (!authorObject || !authorObject.nisbas) {
        return authorObject;
    }
    const nisbas = authorObject.nisbas.reduce(
        (accumilation, current) => {
            accumilation.nisba.push(current.nisba);
            accumilation.aNisba.push(current.aNisba);
            return accumilation;
        },
        { nisba: [], aNisba: [] }
    );
    const flattenedNisbas = {
        nisba: nisbas.nisba.join(' / '),
        aNisba: nisbas.aNisba.join(' / '),
    };
    return {
        ...authorObject,
        ...flattenedNisbas,
    };
};

export const putPrimaryAuthorFirst = manuscriptObj => {
    if (!manuscriptObj || !manuscriptObj.authors) {
        return manuscriptObj;
    }
    const primaryAuthor = manuscriptObj.authors.find(
        _author => _author && _author.manuscriptAuthor.status === 'primary'
    );
    const secondaryAuthors = manuscriptObj.authors.filter(
        _author =>
            _author.manuscriptAuthor &&
            _author.manuscriptAuthor.status !== 'primary'
    );
    return {
        ...manuscriptObj,
        authors: [{ ...primaryAuthor, status: 'primary' }, ...secondaryAuthors],
    };
};
