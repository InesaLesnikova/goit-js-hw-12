import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
  iconColor: '#fff',
  messageColor: '#fff',
});

export async function searchImage(request, page = 1, per_page = 20) {
  const API_KEY = '49253518-6fbcd3e4502fdc6eae88c44f3';
  const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(request) +
    '&image_type=photo' +
    '&orientation=horizontal' +
    '&safesearch=true' +
    '&page=' +
    page +
    '&per_page=' +
    per_page;
  try {
    if (request == '') {
      throw new Error('Please enter something!');
    }
    const result = await axios.get(URL);
    if (result.data.hits == 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please, try again!'
      );
    }

    return { urls: [...result.data.hits], total: result.data.totalHits };
  } catch (err) {
    iziToast.error({
      iconUrl: 'img/error.svg',
      message: err.message,
    });
    // return [];
  }
}
