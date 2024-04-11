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
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export default function App() {
  const [query, setQuery] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalFilterValue, setModalFilter] = useState();
  const queryClient = useQueryClient();
  const {
    data: photos,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['photos', query],
    queryFn: ({ pageParam = 1 }) => fetchPhotosWithKeyWord(query, pageParam),
    enabled: !!query,
    keepPreviousData: true,
    getNextPageParam: lastPage => {
      return lastPage.page + 1;
    },
  });
  const flatPhotos = photos?.pages?.map(page => page.results).flat();
  const [contentForModal] =
    flatPhotos?.filter(photo => photo.id === modalFilterValue) || [];

  function onFormSubmit(searchedWord) {
    if (query.toLowerCase() !== searchedWord.toLowerCase()) {
      setQuery(searchedWord);
    }
  }

  function handleLoadMoreBtnClick() {
    fetchNextPage();
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
          photos={flatPhotos}
        />
        {error && <ErrorMessage />}
        {isFetching && <Loader />}
        {hasNextPage && (
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
