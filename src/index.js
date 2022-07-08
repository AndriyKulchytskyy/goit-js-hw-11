import { pictureTemplate } from './rendering-template';
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const PER_PAGE = 40;
let page = 1;
let searchQuery = '';
let totalPictures = 0;

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  clearPage();
  page = 1;
  searchQuery = event.currentTarget.elements.searchQuery.value;

  if (searchQuery.trim() === '') {
    Notiflix.Notify.failure('Please insert something...');
    refs.loadMoreBtn.classList.add('visually-hidden');
    return;
  }

  fetchPictures(searchQuery);
}

async function fetchPictures(query) {
  const searchParams = new URLSearchParams({
    key: '28373708-3ea558ab498d3233943852de5',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  try {
    const responce = await axios.get(url);

    const pictures = responce.data.hits;
    totalPictures = responce.data.total;

    if (totalPictures === 0) {
      refs.loadMoreBtn.classList.add('visually-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      if (page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${totalPictures} images.`);
      }

      uppendPicturesMarkup(pictures);

      let gallery = new SimpleLightbox('.gallery a', {});

      if (page * PER_PAGE >= totalPictures) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadMoreBtn.classList.add('visually-hidden');
      } else {
        refs.loadMoreBtn.classList.remove('visually-hidden');
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function uppendPicturesMarkup(pictures) {
  refs.gallery.insertAdjacentHTML('beforeend', markup(pictures));
}

function markup(pictures) {
  return pictures
    .map(picture => {
      return pictureTemplate(picture);
    })
    .join('');
}

function clearPage() {
  refs.gallery.innerHTML = '';
}

refs.loadMoreBtn.addEventListener('click', () => {
  page += 1;
  fetchPictures(searchQuery);
});
