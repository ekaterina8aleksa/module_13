import * as basicLightbox from 'basiclightbox';
import PNotify from 'pnotify/dist/es/PNotify';
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
    window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
    });
});

/*imageList.addEventListener('click', event => {
    if (event.target.dataset.imgbig != null) {
        basicLightbox.create(`<img src="${event.target.dataset.imgbig}">`).show();
    }
});*/

function imgMarkup(hits) {
    const markup = imgItem(hits);
    imageList.insertAdjacentHTML('beforeend', markup);
}

function nextPageMarkup() {
    fetchItem.fetch().then(hits => {
        imgMarkup(hits);
        btnSearch.classList.remove('hidden');
        window.scrollTo({
            top: imageList.scrollHeight,
            behavior: 'smooth',
        });
    });
}
//data-imgbig="{{largeImageURL}}
