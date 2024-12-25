import React from "react";
import { FaHome, FaChartBar, FaCog } from "react-icons/fa"; // Example icons
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`${styles.sidebar} ${!isOpen ? styles.closed : ""}`}>
      <div className={styles.logo}>
        <span>JobbersHub</span>
      </div>
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        {isOpen ? "←" : "→"}
      </button>
      <ul className={styles.menu}>
        <li className={`${styles.menuItem} ${styles.active}`}>
          <FaHome className={styles.icon} />
          All Affiliates Dashboard
        </li>
        <li className={styles.menuItem}>
          <FaChartBar className={styles.icon} />
          Feedback Report
        </li>
        <li className={styles.menuItem}>
          <FaCog className={styles.icon} />
          Revenue Dashboard
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
