import React from "react";
import { Cards } from "../../Components/Cards/Cards";
import styles from "./HomeScreen.module.css";
import { useNavigate } from "react-router-dom";

const HomeScreen: React.FC = () => {
  const cardArray = ["Users", "Posts", "Comments"];
  const navigate = useNavigate();

  const handleClick = (name: string) => {
    if (name === "Users") navigate("/List");
  };

  return (
    <div className={styles.homeContainer}>
      <h4>Home Screen</h4>
      <div className={styles.cardsContainer}>
        {cardArray.map((name, id) => (
          <Cards key={id} handleClick={() => handleClick(name)} label={name} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
