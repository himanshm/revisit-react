import globeImg from '../assets/globe.png';
export default function Header() {
  return (
    <div className="header">
      <img
        src={globeImg}
        alt="An airplane circulating earth"
        className="globe-img"
      />
      <h1 className="header-text">my travel journal.</h1>
    </div>
  );
}
