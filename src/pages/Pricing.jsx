// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section className={styles.resposive}>
        <div>
          <h2>
            Simple Pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Unlock the full potential of WorldWise with our premium plan. For
            just $9/month, you can save unlimited cities, add detailed notes,
            and access your travel history from anywhere. Plan smarter, explore
            better.
          </p>
        </div>

        <img
          className={styles.img}
          src="img-2.jpg"
          alt="overview of a large city with skyscrapers"
        />
      </section>
    </main>
  );
}
