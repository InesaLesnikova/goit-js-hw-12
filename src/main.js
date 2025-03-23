import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImage } from './js/pixabay-api';
import { renderGallary } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loading'),
  moreImgBtn: document.getElementById('moreImgBtn'),
  request: document.querySelector('.form input'),
  submitBtn: document.querySelector('.form button'),
};

refs.form.addEventListener('submit', handleSubmitClick);
refs.moreImgBtn.addEventListener('click', handleMoreClick);

let page = 1;
const per_page = 20;
let request = '';

async function handleSubmitClick(event) {
  event.preventDefault();
  request = refs.request.value.trim();

  if (!request) {
    iziToast.error({
      position: 'topRight',
      message: 'Please enter a valid search query.',
    });
    return;
  }

  refs.request.setAttribute('readonly', true);
  refs.submitBtn.disabled = true;
  refs.loader.classList.remove('hidden');

  page = 1;
  try {
    const images = await searchImage(request, page, per_page);
    refs.loader.classList.add('hidden');
    refs.request.removeAttribute('readonly');
    refs.submitBtn.disabled = false;

    if (!images || !images.urls || images.urls.length === 0) {
      refs.gallery.innerHTML = '';
      refs.moreImgBtn.classList.add('hidden');
      iziToast.warning({
        position: 'topRight',
        message: 'No images found. Please try a different search query.',
      });
      return;
    }

    refs.gallery.innerHTML = '';
    refs.request.value = '';
    renderGallary(images.urls, refs.gallery);
    needMoreBtnCheck(images);
  } catch (error) {
    refs.loader.classList.add('hidden');
    refs.request.removeAttribute('readonly');
    refs.submitBtn.disabled = false;
    iziToast.error({
      position: 'topRight',
      message: 'An error occurred while fetching images. Please try again later.',
    });
  }
}

async function handleMoreClick() {
  refs.loader.classList.remove('hidden');

  try {
    const images = await searchImage(request, ++page, per_page);
    refs.loader.classList.add('hidden');

    if (!images || !images.urls || images.urls.length === 0) {
      refs.moreImgBtn.classList.add('hidden');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    const lastGalleryCard = refs.gallery.lastElementChild;
    renderGallary(images.urls, refs.gallery);
    needMoreBtnCheck(images);

    if (lastGalleryCard) {
      const { top: lastCardPos } = lastGalleryCard.getBoundingClientRect();
      window.scrollBy({ top: lastCardPos - 24, behavior: 'smooth' });
    }
  } catch (error) {
    refs.loader.classList.add('hidden');
    iziToast.error({
      position: 'topRight',
      message: 'An error occurred while fetching more images. Please try again later.',
    });
  }
}

function needMoreBtnCheck(images) {
  if (!images || images.urls.length < per_page || images.total === page * per_page) {
    refs.moreImgBtn.classList.add('hidden');
    refs.moreImgBtn.removeEventListener('click', handleMoreClick);
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    refs.moreImgBtn.classList.remove('hidden');
    refs.moreImgBtn.addEventListener('click', handleMoreClick);
  }
}
