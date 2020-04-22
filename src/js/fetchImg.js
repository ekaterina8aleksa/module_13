const apiKey = '16137003-a99878a83e3cf9a5973a72148';

function fetchItem(searchQuery, page) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${apiKey}`;

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error fetching data');
        })
        .then(({ hits }) => {
            return hits;
        })
        .catch(error => console.error(error));
}

export default fetchItem;
