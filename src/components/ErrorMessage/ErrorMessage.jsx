import bugImg from '/src/img/bug.png';

function ErrorMessage() {
  return (
    <div>
      <img alt="bug icon" src={bugImg} height="200px" width="200px" />
      <p>You just got ambushed by a bug. Try reloading the page!</p>
    </div>
  );
}

export default ErrorMessage;
