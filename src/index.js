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

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    fetchItem.query = form.elements.query.value;

    fetchItem.reset();
    imageList.innerHTML = '';
    btnSearch.classList.add('hidden');
    if (!fetchItem.query) {
        PNotify.error({ title: 'Oooopsy', text: 'input mistake' });
        return;
    }

    nextPageMarkup();
});

btnSearch.addEventListener('click', () => {
    nextPageMarkup();
});

function imgMarkup(hits) {
    const markup = imgItem(hits);
    imageList.insertAdjacentHTML('beforeend', markup);
}

function nextPageMarkup() {
    fetchItem.fetch().then(hits => {
        imgMarkup(hits);
        btnSearch.classList.remove('hidden');
    });
}
