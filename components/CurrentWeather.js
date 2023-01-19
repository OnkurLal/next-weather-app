export default function CurrentWeather({
  city,
  currentTemp,
  high,
  low,
  icon,
  description,
  sunrise,
  sunset,
}) {
  return (
    <>
      <div
        className="card w-75 text-black"
        style={{ backgroundColor: "yellow" }}
      >
        <div className="card-body p-3 row d-flex align-items-center">
          <div className="col">
            <div className="p-3">
              <h2 className="card-title fw-bold">
                {city.name} ({city.country})
              </h2>
              <h3 className="fw-bold">Current Temperature {currentTemp}°F</h3>
            </div>
            <div className="ps-3 row d-flex align-items-end ">
              <h4 className="col-2 fs-3 fw-bold ">{high}°F</h4>
              <h4 className="col-2 fw-light">{low}°F</h4>
            </div>
            <div className="row p-3">
              <h5 className="col-2">
                <b>Sunrise</b> <br />
                {sunrise}
              </h5>
              <h5 className="col-2">
                <b>Sunset</b> <br />
                {sunset}
              </h5>
            </div>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img
                src={icon}
                alt="Weather Icon"
                className="align-middle"
                style={{ width: "7rem", height: "7rem" }}
              ></img>
              <p className="fw-bold text-center">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
