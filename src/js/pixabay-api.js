import axios from 'axios';

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

  if (!request.trim()) {
    return Promise.reject(new Error('Please enter something!'));
  }

  try {
    const result = await axios.get(URL);
    if (result.data.hits.length === 0) {
      return Promise.reject(
        new Error('Sorry, no images match your search query. Try again!')
      );
    }

    return { urls: result.data.hits, total: result.data.totalHits };
  } catch {
    return Promise.reject(new Error('An error occurred while fetching images. Try again later!'));
  }
}
