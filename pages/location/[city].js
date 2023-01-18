import LocationSearchBar from "../../components/LocationSearchBar";
import Link from "next/link";
import cityData from "../../lib/city.list.json";
import CurrentWeather from "../../components/CurrentWeather";
import moment from "moment-timezone";

export async function getServerSideProps(context) {
  const city = context.params.city.split("-");
  const cityId = Number(city[city.length - 1]);
  if (!cityId) {
    return null;
  }
  const filteredCity = cityData.filter((item) => {
    if (item.id === cityId) {
      return item;
    }
  });
  if (!filteredCity) {
    return { notFound: true };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${filteredCity[0].coord.lat}&lon=${filteredCity[0].coord.lon}&appid=ab185f39ec853d46319cc49b2fbb1f9f&units=imperial`
  );
  const data = await res.json();
  if (!data) {
    return { notFound: true };
  }
  const timeZone = data.timezone;

  return {
    props: {
      city: filteredCity,
      currentTemp: Number(data.current.temp).toFixed(1),
      high: Number(data.daily[0].temp.max).toFixed(1),
      low: Number(data.daily[0].temp.min).toFixed(1),
      icon: `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}.png`,
      description: data.daily[0].weather[0].description,
      sunrise: moment.unix(data.daily[0].sunrise).tz(timeZone).format("LT"),
      sunset: moment.unix(data.daily[0].sunset).tz(timeZone).format("LT"),
    },
  };
}

export default function City(props) {
  console.log(props);
  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <p className="w-75">
            <Link href={"/"} className="text-decoration-none text-white">
              &larr; Home
            </Link>
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <LocationSearchBar className="text-center" />
        </div>
        <div className="d-flex justify-content-center my-3">
          <CurrentWeather
            currentTemp={props.currentTemp}
            city={props.city[0]}
            high={props.high}
            low={props.low}
            icon={props.icon}
            description={props.description}
            sunrise={props.sunrise}
            sunset={props.sunset}
          />
        </div>
      </div>
    </>
  );
}
