import { useState } from "react";
import data from "../lib/city.list.json";
import Link from "next/link";

export default function LocationSearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [matchingCityResults, setMatchingCityResults] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    let matchingCities = [];
    for (let city of data) {
      const match = city.name
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase());
      if (match) {
        const cityData = {
          ...city,
          slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
        };
        matchingCities.push(cityData);
      }
      setMatchingCityResults(matchingCities);
    }
  };

  return (
    <>
      <div className="form-floating mb-3 w-50">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Location (city)"
          onChange={(e) => handleChange(e)}
          value={inputValue}
        />
        <label htmlFor="floatingInput" className="text-black">
          Location (city)
        </label>
        {inputValue.length >= 2 ? (
          <ul className="list-group ">
            {" "}
            {matchingCityResults.length > 0
              ? matchingCityResults.map((city) => (
                  <Link
                    href={`/location/${city.slug}`}
                    className="text-decoration-none list-group-item list-group-item-action text-black"
                    style={{ listStyle: "none" }}
                    key={city.id}
                  >
                    <li className="fw-bold py-1">
                      {city.name}
                      {city.state ? `, ${city.state}` : ""} ({city.country})
                    </li>
                  </Link>
                ))
              : "The city is misspelled or not in our system."}
          </ul>
        ) : null}
      </div>
    </>
  );
}
