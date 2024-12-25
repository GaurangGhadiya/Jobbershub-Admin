import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>JobbersHub</div>
      <nav className={styles.nav}>
        <a href="#profile" className={styles.navLink}>
          My Profile
        </a>
        <a href="#tasks" className={styles.navLink}>
          My Tasks
        </a>
        <a href="#goals" className={styles.navLink}>
          Goals
        </a>
      </nav>
    </div>
  );
};

export default Header;
