import moment from "moment-timezone";

export default function HourlyWeather({ hourlyData, timeZone }) {
  const hourlyWeatherMap = hourlyData.map((item, index) => {
    const time = moment.unix(item.dt).tz(timeZone).format("LT");
    return (
      <>
        {index < 12 ? (
          <div
            className="card py-3 px-1 text-center mx-3"
            style={{ width: "7rem", backgroundColor: "#5E60CE" }}
          >
            <div>{index === 0 ? "NOW" : time}</div>
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
  return (
    <div
      className="horizontal-scroll-container d-inline-flex flex-nowrap"
      style={{ overflowX: "scroll", width: "100%" }}
    >
      {hourlyWeatherMap.map((card) => {
        return <div>{card}</div>;
      })}
    </div>
  );
}
