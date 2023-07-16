import React from 'react';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

import Breadcrumb from '../shared/Breadcrumb';

const messages = defineMessages({
    title: {
        id: 'app.page.history.title',
        defaultMessage: 'West African Arabic Manuscript Database',
    },
    subTitle: {
        id: 'app.page.history.subtitle',
        defaultMessage:
            'A database/union catalogue of West African Arabic manuscripts (formerly known as AMMS)',
    },
    p1: {
        id: 'app.page.history.p1',
        defaultMessage:
            'The first version of this database  (“AMMS” for the Arabic Manuscript Management System) was written in 1987 as a finding aid for an Arabic manuscript microfilm project, funded by N.E.H.,  that preserved over 100,000 folios of material from the private library of Haroun o/ Sidiyya in Boutilimit, Mauritania. Our object then was to produce a bilingual hardcopy finding aid for that collection which consisted of diverse types of material from letters and notes to local histories and classical treatises in the Islamic sciences. Our goal was a simple and quick computer-generated entry system using un-transliterated Latin letters alongside Arabic entries.  We sought records that could be equally accessible to readers (and input specialists) using either Arabic or English. Our end-product was to be a bilingual catalogue with indices that would be user-friendly in both languages. The original AMMS program was written by Kazumi Hatasa using an early ARABDOS software to create 31 possible fields for entries about each manuscript (16 in Arabic, 15 in English – titles were not transliterated into Latin characters) and with an indexing capability to cross-reference and locate up to three fields in either language.',
    },
    p2: {
        id: 'app.page.history.p2',
        defaultMessage:
            'Two years later the same software was employed to in-put a finding aid and generate indices for the Mauritanian national manuscript collection at the Institut Mauritanien de Recherche Scientifique. The possibility of expanding the number of entries still further, to include other West African collections, prompted a second version of AMMS, on the same platform, with the capability of merging records of different collections into a single database.',
    },
    p3: {
        id: 'app.page.history.p3',
        defaultMessage:
            'Subsequently, in the early 1990s other published catalogues and hand-lists from West African collections housed in Niger, Paris, Timbuktu, and Evanston, Illinois were entered in the database. Taken together, over 19,000 records from these six collections were recorded in the AMMS vers.2 database.',
    },
    p4: {
        id: 'app.page.history.p4',
        defaultMessage:
            'The research potential of a union index of authors, nicknames, titles and subject matter in these collections of West Africa’s Arabic literary heritage, with the capability of expansion as other collections are uncovered, became obvious. AMMS presented us with a mechanism to re-unite a literary tradition represented by tens of thousands of Arabic documents across the West African Sahel.  This is a literature that has been largely unknown to the outside world beyond the work of a small band of local scholars and an even smaller cohort of Arabists. Even where these materials were accessible to researchers in public repositories, the importance of this literary tradition was well masked by the disparate systems used to record it and the dispersal of individual collections in Africa, Europe and North America.',
    },
    p5: {
        id: 'app.page.history.p5',
        defaultMessage:
            'This project seeks to bring together, in a single database, a sizeable cross-section of these Arabic materials. Input has frequently depended upon the accuracy and inclinations of other cataloguers whose work has been incorporated, and manuscript annotation and documentation is thus uneven across records from different sources. However, this compilation does provide users with an index to roughly three- hundred years of Saharan and Sahelian literary activity.',
    },
    p6: {
        id: 'app.page.history.p6',
        defaultMessage:
            'In the early 1990s the project of editing over 19,000 entries for consistent orthography and subject identification foundered on the magnitude of that task, an increasingly outdated and fragile software platform, and difficulties in imagining how such an unwieldy end-product might be disseminated. One positive result of my inattention to the project during the 1990s is that many of these problems were largely resolved during that period by advances in computer technology.',
    },
    p7: {
        id: 'app.page.history.p7',
        defaultMessage:
            'In summer 2002 all 19,778 records were ported onto a Windows platform, the screen was redesigned, and, most significant, a search engine was created that overcame many of the previous difficulties that had arisen from the diversity of input parameters. This third reconstruction of the database software was accomplished by Jalal al-Muhtadi who, with Robert Duff, made possible the first on-line version of AMMS, as an open-access resource for West African Arabic manuscripts in 2004.',
    },
    p8: {
        id: 'app.page.history.p8',
        defaultMessage:
            'During the 1990s new finds of manuscripts in private libraries in Mauritania and Mali continued apace, and the numbers of additional manuscripts now catalogued from ‘new’ collections well eclipse the number of initial entries. It is our hope to incorporate newly catalogued collections as their editors make them available. Under an agreement with al-Furqan Islamic Heritage Foundation in 2008 we began entering catalogues of West African libraries that were published by the foundation, and that project continues.',
    },
    p9: {
        id: 'app.page.history.p9',
        defaultMessage:
            'AMMS yet again suffered a hiatus of attention during the decade after it was put on-line while I was preoccupied with the Arabic Literature of Africa vol V (Brill, 2015). In summer 2017 the software, some parts dating back 25 years, was entirely re-written by Mohamed Ali Elbou (AMMS vers. 4) and the data made into a relational database.  AMMS was re-named as the West African Arabic Manuscript Database (WAAMD).  This work was funded in part by Duke University research funds provided by Bruce Hall and subsequently by the University of California, Berkeley, Library.  In the summer of 2018 the database was transferred to the Berkeley Library and, with its updated software, new records to be added more rapidly than was formerly possible.  Also, in 2018, the author information from the Arabic Literature of Africa volume 5 (Mauritania and the western Sahara) was added and collaboration began with the SAVAMA-DCI Project at Hamburg University’s Center for the Study of Manuscript Cultures, to publish their inventories of Timbuktu libraries, with digital image links to the Hill Museum and Manuscript Library digitization project in Timbuktu.',
    },
    p10: {
        id: 'app.page.history.p10',
        defaultMessage: 'C.C. Stewart, General Editor (1998-2018)',
    },
    subtitle2: {
        id: 'app.page.history.subtitle2',
        defaultMessage: 'Acknowledgements',
    },
    p13: {
        id: 'app.page.history.p13',
        defaultMessage:
            'In the more than twenty-five years that this project has been maturing I have benefited from the advice and labors of a large number of friends and colleagues, none of whom are responsible for omissions and errors that will appear in a project of this magnitude. Baba o/ Haroun may have started this project by his request for help in preserving his father’s library in Boutilimit, Mauritania in 1986; Mamadou Niang, Andrew Stewart, and Atteya Elnoory all assisted with the input of that collection on the AMMS ver.1 that, with AMMS vers.2, was written by Kazumi Hatasa. Sidi Ahmad b. Ahmad Salim, and Ahmad Ould Muhammad Yahya collaborated to input the Nouakchott collection and assisted with developing an early version of our subject-matter rubrics in 1989. These subject rubrics were subsequently refined by John Hunwick who also kindly offered to use the AMMS for the input of collections at Northwestern University.',
    },
    p14: {
        id: 'app.page.history.p14',
        defaultMessage:
            'Mohammad Zouber gave us permission to photograph and input the hand-list in Timbuktu, and Raymond Taylor did that work. For the revival of this project I am deeply indebted to Jalal al-Muhtadi who ported our data to its current Windows platform and wrote AMMS vers.3 with a new search engine that, effectively, has made it possible to place this database at the disposal of researchers. Equally important has been the technical expertise of Robert Duff who re-wrote the search engine for internet access and has patiently ushered this project into world wide view. Fortuitously, Bruce Hall returned from his research in Timbuktu in 2002 in time to take on some of the editing responsibilities for large portions of data that is now on-line and to input additional material (mainly from Niamey) in the database, and I am deeply indebted to his dedication to what has become our common project. Most recently (2008-9) I have benefited enormously from advice from Mohamed Drioueche at al-Furqan Foundation and the technical expertise of Dave Mak.  Since 2009 Mohamed Ali Elbou has been the main IT support for this project; it is he who has repaired problems on the out-dated software and, most importantly, authored a complete re-write of the AMMS platform in 2017.',
    },
});

const History = ({ intl: { formatMessage } }) => {
    return (
        <div>
            <Breadcrumb
                items={[
                    { link: '/', label: 'home' },
                    { link: '', label: 'history' },
                ]}
            />
            <h1>{formatMessage(messages.title)}</h1>
            <h3>{formatMessage(messages.subTitle)}</h3>
            <p>{formatMessage(messages.p1)}</p>
            <p>{formatMessage(messages.p2)}</p>
            <p>{formatMessage(messages.p3)}</p>
            <p>{formatMessage(messages.p4)}</p>
            <p>{formatMessage(messages.p5)}</p>
            <p>{formatMessage(messages.p6)}</p>
            <p>{formatMessage(messages.p7)}</p>
            <p>{formatMessage(messages.p8)}</p>
            <p>{formatMessage(messages.p9)}</p>
            <p>{formatMessage(messages.p10)}</p>
            <h3>{formatMessage(messages.subtitle2)}</h3>
            <p>{formatMessage(messages.p13)}</p>
            <p>{formatMessage(messages.p14)}</p>
        </div>
    );
};

const propTypes = {
    intl: intlShape.isRequired,
};

History.propTypes = propTypes;

export default injectIntl(History);
