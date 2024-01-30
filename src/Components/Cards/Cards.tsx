import React from "react";
import styles from "./Cards.module.css";

interface CardProps {
  handleClick: (label: string) => void;
  label: string;
}

export const Cards: React.FC<CardProps> = ({ handleClick, label }) => {
  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          handleClick(label);
        }}
        id="0"
      >
        <img src="src/assets/account-business-group-people-profile-user-users-icon-835148.png"></img>
        <label>{label}</label>
      </div>
    </>
  );
};
