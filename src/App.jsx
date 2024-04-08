import {
  SearchBar,
  ImageGallery,
  ErrorMessage,
  ImageModal,
  LoadMoreBtn,
  Loader,
} from './components/index.js';
import { useEffect, useState } from 'react';
import fetchPhotosWithKeyWord from './apiService.js';
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalFilter, setModalFilter] = useState();
  const [contentForModal] = photos.filter(photo => photo.id === modalFilter);

  useEffect(() => {
    async function fetchPhotos() {
      if (query === '') {
        return;
      }
      try {
        setError(false);
        setLoading(true);
        const apiRequest = await fetchPhotosWithKeyWord(query, page);
        setPhotos(prevState => [...prevState, ...apiRequest]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [query, page]);

  function onFormSubmit(searchedWord) {
    if (query.toLowerCase() !== searchedWord.toLowerCase()) {
      setPhotos([]);
      setQuery(searchedWord);
    }
    setPage(1);
  }

  function handleLoadMoreBtnClick() {
    setPage(prevState => prevState + 1);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function createModalContent(id) {
    setModalFilter(id);
  }

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} />
      <main>
        <ImageGallery
          modalContent={createModalContent}
          openModal={openModal}
          photos={photos}
        />
        {error && <ErrorMessage />}
        {loading && <Loader />}
        {photos.length > 0 && !loading && (
          <LoadMoreBtn handleLoadMoreBtnClick={handleLoadMoreBtnClick} />
        )}
        <ImageModal
          modalContent={contentForModal}
          isOpen={modalIsOpen}
          closeModal={closeModal}
        />
      </main>
    </>
  );
}
