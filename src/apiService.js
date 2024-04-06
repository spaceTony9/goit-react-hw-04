import axios from 'axios';

export default async function fetchPhotosWithKeyWord(keyword) {
  const instance = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: { 'Accept-Version': 'v1' },
    params: {
      client_id: '1ctU6kuTt2ahGNIdcLlG3-NmcIRESl6UxJvupJGrReY',
      query: keyword,
      page: 1,
      per_page: 10,
    },
  });
  try {
    const response = await instance.get('/search/photos');
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}
