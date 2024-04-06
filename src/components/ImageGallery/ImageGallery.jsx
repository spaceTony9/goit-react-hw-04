import { ImageCard } from '../index.js';

export default function ImageGallery({ photos }) {
  return (
    <main>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <ImageCard desc={photo.description} link={photo.urls.small} />
          </li>
        ))}
        <li></li>
      </ul>
    </main>
  );
}
