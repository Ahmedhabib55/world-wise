import styled from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContexts";

// function for displaying the country list on the screen
function CountryList() {
  const { cities, loading } = useCities();

  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);
  return (
    <ul className={styled.countryList}>
      {countries.map((country, idx) => (
        <CountryItem country={country} key={idx} />
      ))}
    </ul>
  );
}

export default CountryList;
