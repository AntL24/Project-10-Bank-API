//feature is a simple graphical element.
function Feature({ imgSrc, title, description }) {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={title} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Feature;
