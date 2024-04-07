import {
  SearchBar,
  ImageGallery,
  Error,
  ImageModal,
} from './components/index.js';
import { useEffect, useState } from 'react';
import { Blocks } from 'react-loader-spinner';
import fetchPhotosWithKeyWord from './apiService.js';
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  useEffect(() => {
    async function fetchPhotos() {
      if (formSubmitted) {
        try {
          setLoading(true);
          const apiRequest = await fetchPhotosWithKeyWord(query, page);
          setPhotos(prevState => [...prevState, ...apiRequest]);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchPhotos();
  }, [query, page, formSubmitted]);

  function onFormSubmit(searchedWord) {
    setQuery(searchedWord);
    if (query !== searchedWord) {
      setPhotos([]);
    }
    setPage(1);
    setFormSubmitted(true);
  }

  function handleSeeMoreBtnClick() {
    setPage(prevState => prevState + 1);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function createModalContent(id) {
    const [selectedPhoto] = photos.filter(photo => photo.id === id);
    setModalContent(selectedPhoto);
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
        {error && <Error />}
        {loading && (
          <div className="loaderWrapper">
            <Blocks
              height="80"
              width="80"
              color="#17a9e3"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
          </div>
        )}
        {photos.length ? (
          <div className="seeMoreBtnWrapper">
            <button
              className="seeMoreBtn"
              type="button"
              onClick={handleSeeMoreBtnClick}
            >
              Load More
            </button>
          </div>
        ) : (
          ''
        )}
        <ImageModal
          modalContent={modalContent}
          isOpen={modalIsOpen}
          closeModal={closeModal}
        />
      </main>
    </>
  );
}
