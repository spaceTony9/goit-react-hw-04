import { ImageCard } from '../index.js';
import css from './ImageGallery.module.css';

export default function ImageGallery({ photos, openModal, modalContent }) {
  return (
    <ul className={css.galleryList}>
      {photos.map(photo => (
        <li className={css.galleryListItem} key={photo.id}>
          <ImageCard
            openModal={openModal}
            photoId={photo.id}
            modalContent={modalContent}
            desc={photo.alt_description}
            link={photo.urls.small}
          />
        </li>
      ))}
    </ul>
  );
}
