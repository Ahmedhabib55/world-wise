import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContexts";
import styles from "./City.module.css";

import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
function City() {
  const { id } = useParams();
  const { currentCity, getCity, loading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  const { cityName, emoji, notes } = currentCity;

  if (loading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        {/* <p>{formatDate(date || null)}</p> */}
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <BackButton
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      />
    </div>
  );
}

export default City;
