import 'url-search-params-polyfill';
import './index-scss-compiled.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import pkg from '../package.json';

ReactDOM.render(<Root />, document.getElementById('root'));

window.__APP_VER__ = pkg.version;
