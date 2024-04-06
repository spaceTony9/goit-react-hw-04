import { SearchBar, ImageGallery, Error } from './components/index.js';
import { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import fetchPhotosWithKeyWord from './apiService.js';

export default function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        setLoading(true);
        const apiRequest = await fetchPhotosWithKeyWord(query);
        setPhotos(apiRequest.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [query]);

  function onFormSubmit(searchedWord) {
    setQuery(searchedWord);
  }

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} />
      <ImageGallery photos={photos} />
      {error && <Error />}
      {loading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      )}
    </>
  );
}
