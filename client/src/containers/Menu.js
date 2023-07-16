import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const style = {
    link: {
        margin: 12,
    },
    menu: {
        padding: 10,
    },
};

let links = {
    '/': 'Home',
    '/about': 'About',
    '/collections': 'Collections',
    '/titles': 'Search Titles',
    '/authors': 'Search Authors',
    '/subjects': 'Search Subjects',
    '/normalized-subjects': 'Subject Headings',
};

const Menu = ({ user }) => {
    if (user) {
        links['/dashboard'] = 'Dashboard';
    }

    return (
        <div className="text-center" style={style.menu}>
            {Object.keys(links).map(key => [
                <Link to={key} style={style.link}>
                    {links[key]}
                </Link>,
                ' ',
            ])}
        </div>
    );
};

export default connect(({ auth: { user } }) => ({ user }))(Menu);
