import { ImageCard } from '../index.js';
import css from './ImageGallery.module.css';

export default function ImageGallery({ photos, openModal, modalContent }) {
  function handleClick(id) {
    modalContent(id);
    openModal();
  }

  return (
    <ul className={css.galleryList}>
      {photos.map(photo => (
        <li
          className={css.galleryListItem}
          key={photo.id}
          onClick={() => handleClick(photo.id)}
        >
          <ImageCard desc={photo.alt_description} link={photo.urls.small} />
        </li>
      ))}
    </ul>
  );
}
