import * as basicLightbox from 'basiclightbox';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/es/PNotifyStyleMaterial.js';
import 'material-design-icons/iconfont/material-icons.css';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

import { imageList, searchForm, btnSearch } from './js/refs';
import fetchItem from './js/fetchImg';
import imgItem from './tmpl/imgItem.hbs';
import './sass/styles.scss';

let page = '';
let searchQuery = '';

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    searchQuery = form.elements.query.value;

    imageList.innerHTML = '';
    page = 1;
    fetchItem(searchQuery, page).then(hits => {
        imgMarkup(hits);
        page += 1;
    });
});

btnSearch.addEventListener('click', () => {
    fetchItem(searchQuery, page).then(hits => {
        imgMarkup(hits);
        page += 1;
    });
});

function imgMarkup(hits) {
    const markup = imgItem(hits);
    imageList.insertAdjacentHTML('beforeend', markup);
}
