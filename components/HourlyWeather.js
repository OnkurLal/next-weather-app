import moment from "moment-timezone";

export default function HourlyWeather({ hourlyData, timeZone }) {
  const hourlyWeatherMap = hourlyData.map((item, index) => {
    console.log(item.weather);
    const time = moment.unix(item.dt).tz(timeZone).format("LT");
    return (
      <>
        {index < 6 ? (
          <div>
            <div>{index === 0 ? "now" : time}</div>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              ></img>
            </div>
            <div>{item.temp} °F</div>
          </div>
        ) : null}
      </>
    );
  });
  return <>{hourlyWeatherMap}</>;
}
