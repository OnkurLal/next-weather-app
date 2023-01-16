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
      <div className="form-floating mb-3 w-75">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="location"
          onChange={(e) => handleChange(e)}
          value={inputValue}
        />
        <label htmlFor="floatingInput">Location</label>
        {inputValue.length > 2 ? (
          <ul>
            {matchingCityResults.length > 0
              ? matchingCityResults.map((city) => (
                  <Link key={city.id} href={`/location/${city.slug}`}>
                    <li>
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
