import css from './ImageCard.module.css';

export default function ImageCard({ desc, link }) {
  return (
    <div>
      <img className={css.listImage} src={link} alt={desc} />
    </div>
  );
}
