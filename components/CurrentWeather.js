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
      <div className="card text-black w-75">
        <div className="card-body p-3">
          <h1 className="card-title">
            {city.name} ({city.country})
          </h1>
          <h2>Current Temperature {currentTemp}°F</h2>
          <h2>
            High {high}°F Low {low}°F
          </h2>
          <h3>
            Sunrise: {sunrise} Sunset: {sunset}
          </h3>
          <img src={icon} alt="WeatherIcon"></img>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
