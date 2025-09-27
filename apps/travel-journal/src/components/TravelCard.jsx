import locationIcon from '../assets/location.png';

export default function Entry(props) {
  const { img, country, dates, text, title, googleMapsLink } = props.entryData;
  return (
    <article className="journal-entry">
      <div className="journal-entry__image-container">
        <img src={img.src} alt={img.alt} className="journal-entry__image" />
      </div>

      <div className="journal-entry__content">
        <div className="journal-entry__location">
          <img
            src={locationIcon}
            alt="location-icon"
            className="journal-entry__icon"
          />
          <span className="journal-entry__country">{country}</span>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="journal-entry__map-link"
          >
            View on Google Maps
          </a>
        </div>

        <h2 className="journal-entry__title">{title}</h2>

        <p className="journal-entry__dates">{dates}</p>

        <p className="journal-entry__description">{text}</p>
      </div>
    </article>
  );
}
