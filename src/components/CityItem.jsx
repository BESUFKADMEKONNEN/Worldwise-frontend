import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import "flag-icons/css/flag-icons.min.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const countryCode = (emoji) =>
  [...emoji]
    .map((char) => String.fromCharCode(char.codePointAt(0) - 0x1f1a5))
    .join("")
    .toLowerCase();

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, _id, position } = city;
  function handleClick(e) {
    e.preventDefault();
    deleteCity(_id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          _id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${_id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={`${styles.emoji} fi fi-${countryCode(emoji)}`}></span>{" "}
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
