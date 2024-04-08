import css from './LoadMoreBtn.module.css';

function LoadMoreBtn({ handleLoadMoreBtnClick }) {
  return (
    <div className={css.seeMoreBtnWrapper}>
      <button
        className={css.seeMoreBtn}
        type="button"
        onClick={handleLoadMoreBtnClick}
      >
        Load More
      </button>
    </div>
  );
}

export default LoadMoreBtn;
