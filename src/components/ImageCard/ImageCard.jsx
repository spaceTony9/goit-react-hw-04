export default function ImageCard({ desc, link }) {
  return (
    <div>
      <img src={link} alt={desc} />
    </div>
  );
}
