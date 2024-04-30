import { Link } from "react-router-dom";
import styled from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContexts";

// function for format datetime
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

//  function for city item display in city list component
function CityItem({ city }) {
  const { date, emoji, id, cityName, position } = city;
  const { currentCity, deleteCity } = useCities();

  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styled.cityItem} ${
          id === currentCity.id ? styled.cityItem__active : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styled.emoji}>{emoji}</span>
        <h3 className={styled.name}>{cityName}</h3>
        <time className={styled.date}>({formatDate(date)})</time>
        <button className={styled.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}

//

export default CityItem;
