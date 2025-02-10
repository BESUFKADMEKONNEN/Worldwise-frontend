import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img className={styles.img}
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWise</h2>
          <p>
            WorldWise is designed for explorers, travelers, and city enthusiasts
            who want to keep track of the places they've visited. Whether you're
            on a backpacking adventure or documenting cities for research,
            WorldWise lets you save locations, add personal notes, and relive
            your experiences.
          </p>
          <p>
            Easily store details about each city, including your thoughts,
            favorite spots, and important insights. Your journey is
            unique—WorldWise helps you capture it all in one place.
          </p>
        </div>
      </section>
    </main>
  );
}
