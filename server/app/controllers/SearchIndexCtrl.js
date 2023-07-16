const { Author, Manuscript } = require('../models/index');
const { removeArabicDiacritics } = require('../utils/db-query');

const searchValue = (...values) =>
    values
        .filter(Boolean)
        .map(removeArabicDiacritics)
        .join('\n');

function authors(options) {
    return Author.findAll(options)
        .then(list => {
            if (!list.length) {
                return { done: true };
            }
            const requests = [];
            list.forEach(author => {
                const { nisbas: search_nisba, ids: search_nisba_id } = author
                    .nisbas.length
                    ? author.nisbas.reduce(
                          (sofar, current) => {
                              return {
                                  nisbas:
                                      sofar.nisbas +
                                      `${current.nisba}\n${current.aNisba}\n`,
                                  ids: sofar.ids + `[${current.id}]`,
                              };
                          },
                          { nisbas: '', ids: '' }
                      )
                    : { nisbas: '', ids: '' };
                if (
                    author.search_nisba !== search_nisba ||
                    author.search_nisba_id !== search_nisba_id
                ) {
                    const request = Author.update(
                        { search_nisba, search_nisba_id },
                        {
                            where: { id: author.id },
                            fields: ['search_nisba', 'search_nisba_id'],
                        }
                    );
                    requests.push(request);
                }
            });
            return Promise.all(requests)
                .then(() => {
                    logResponse(`Done indexing ${requests.length} records.`);
                    return { total: requests.length };
                })
                .catch(err => logResponse(err));
        })
        .catch(err => logResponse(err));
}

function manuscripts(options) {
    return Manuscript.findAll(options)
        .then(list => {
            if (!list.length) {
                return { done: true };
            }
            const requests = [];
            list.forEach(record => {
                const search_title = searchValue(
                    record.aTitle,
                    record.aAltTitle,
                    record.aAttrTitle
                );
                let search_author = '';
                let search_author_aka = '';
                let search_author_date_died = '';
                let search_author_nisba = '';
                let search_author_id = '';
                let search_author_nisba_id = '';
                if (record.authors.length) {
                    record.authors.forEach(author => {
                        search_author = searchValue(
                            search_author,
                            author.name,
                            author.aName,
                            author.altName,
                            author.aAltName
                        );
                        search_author_aka = searchValue(
                            search_author_aka,
                            author.aka,
                            author.aAka
                        );
                        search_author_date_died = searchValue(
                            search_author_date_died,
                            author.dateDied
                        );
                        search_author_nisba = searchValue(
                            search_author_nisba,
                            author.search_nisba
                        );
                        search_author_nisba_id += author.search_nisba_id;
                        search_author_id += `[${author.id}]`;
                    });
                }

                const search_subject = record.subject
                    ? searchValue(
                          record.subject.subject,
                          record.subject.aSubject
                      )
                    : '';

                if (
                    search_title !== record.search_title ||
                    search_author !== record.search_author ||
                    search_author_aka !== record.search_author_aka ||
                    search_author_date_died !==
                        record.search_author_date_died ||
                    search_author_nisba !== record.search_author_nisba ||
                    search_author_id != record.search_author_id ||
                    search_author_nisba_id !== record.search_author_nisba_id ||
                    search_subject !== record.search_subject
                ) {
                    const request = Manuscript.update(
                        {
                            search_title,
                            search_author,
                            search_author_aka,
                            search_author_date_died,
                            search_author_nisba,
                            search_author_id,
                            search_author_nisba_id,
                            search_subject,
                        },
                        {
                            where: { id: record.id },
                            fields: [
                                'search_title',
                                'search_author',
                                'search_author_aka',
                                'search_author_date_died',
                                'search_author_nisba',
                                'search_author_id',
                                'search_author_nisba_id',
                                'search_subject',
                            ],
                        }
                    );
                    requests.push(request);
                }
            });
            return Promise.all(requests)
                .then(() => {
                    logResponse(`Done indexing ${requests.length} records.`);
                    return { total: requests.length };
                })
                .catch(err => logResponse(err));
        })
        .catch(err => logResponse(err));
}

function logResponse(data) {
    return console.log(data);
}

module.exports = {
    authors,
    manuscripts,
};
