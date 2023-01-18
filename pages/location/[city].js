import LocationSearchBar from "../../components/LocationSearchBar";
import Link from "next/link";
import cityData from "../../lib/city.list.json";

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
    `https://api.openweathermap.org/data/2.5/onecall?lat=${filteredCity[0].coord.lat}&lon=${filteredCity[0].coord.lon}&appid=${process.env.WEATHER_API_KEY}=minutely&units=metric`
  );
  const data = await res.json();
  if (!data) {
    return { notFound: true };
  }
  return {
    props: {
      city: filteredCity,
    },
  };
}

export default function City({ city }) {
  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <p className="w-50">
            <Link href={"/"} className="text-decoration-none text-white">
              &larr; Home
            </Link>
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <LocationSearchBar className="text-center" />
        </div>
        <p>{city.name}</p>
      </div>
    </>
  );
}
