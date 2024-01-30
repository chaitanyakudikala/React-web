import { useNavigate } from "react-router-dom";
import { userData } from "../../types";
import styles from "./List.module.css";
import { useState } from "react";

interface ListProps {
  users: Array<userData>;
  setHeadName: React.Dispatch<React.SetStateAction<string>>;
}

const List: React.FC<ListProps> = ({ users, setHeadName }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = (headName: string) => {
    setHeadName(headName);
    setIsExpanded(!isExpanded);
    navigate("/userDeatils");
  };

  return (
    <>
      <div className={styles.parent}>
        {users.map((user) => (
          <div
            className={styles.container}
            key={user.id}
            onClick={() => handleClick(user.name)}
          >
            <p>{user.name}</p>
            <p>Works at: {user.company.name}</p>
            <p>{user.phone}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
