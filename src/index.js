import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyStyleMaterial.js';
import 'material-design-icons/iconfont/material-icons.css';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

import { imageList, searchForm, btnSearch, btnLabel, btnSpinner } from './js/refs';
import fetchItem from './js/fetchImg';
import imgItem from './tmpl/imgItem.hbs';
import './sass/styles.scss';

btnSearch.classList.add('hidden');
searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    fetchItem.query = form.elements.query.value;

    fetchItem.reset();
    imageList.innerHTML = '';
    if (!fetchItem.query) {
        PNotify.error({ title: 'Oooopsy', text: 'input mistake' });
        btnSearch.classList.add('hidden');
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
    btnSearch.disabled = true;
    btnLabel.textContent = 'Loading';
    btnSpinner.classList.remove('hidden');
    fetchItem.fetch().then(hits => {
        imgMarkup(hits);
        btnSearch.classList.remove('hidden');
        window.scrollTo({
            top: imageList.scrollHeight,
            behavior: 'smooth',
        });
        btnSearch.disabled = false;
        btnLabel.textContent = 'Load More';
        btnSpinner.classList.add('hidden');
    });
}
