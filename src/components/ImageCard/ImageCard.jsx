import css from './ImageCard.module.css';

export default function ImageCard({
  desc,
  link,
  openModal,
  photoId,
  modalContent,
}) {
  function handleClick(id) {
    modalContent(id);
    openModal();
  }

  return (
    <div>
      <img
        onClick={() => handleClick(photoId)}
        className={css.listImage}
        src={link}
        alt={desc}
      />
    </div>
  );
}
