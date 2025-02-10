import { useState } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";

import styles from "./AppLayout.module.css";

function AppLayout() {
  const [isMenuChecked, setIsMenuChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsMenuChecked((prev) => !prev);
  };

  return (
    <div className={styles.app}>
      <div className={styles.menubox}>
      <div
          className={`${styles.menuback} ${
            isMenuChecked ? styles.boxscale : styles.boxnormal
          }`}
        ></div>
        <input
          className={styles.input}
          type="checkbox"
          id="menu"
          checked={isMenuChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="menu">
          <div className={styles.menubar}></div>
        </label>
      </div>

      <div
        className={`${styles.sidebar} ${
          isMenuChecked ? styles.sidebarVisible : styles.sidebarHidden
        }`}
      >
        <Sidebar />
      </div>

      <div className={styles.map}>
        <Map className={styles.user} setIsMenuChecked={setIsMenuChecked} />
      </div>

      <User />
    </div>
  );
}

export default AppLayout;
