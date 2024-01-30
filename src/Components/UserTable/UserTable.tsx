import { useEffect, useState } from "react";
import "./styles.css";

const UserTable = () => {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const tabs = ["users", "comments", "posts"];
  const [data, setData] = useState([]);
  const [reqType, setReqType] = useState("users");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`);
        if (!response.ok) throw Error("Error retiving data");
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [reqType]);
  return (
    <>
      <div className="header">
        {tabs.map((tab, idx) => (
          <div className="list" key={idx} onClick={() => setReqType(tab)}>
            <label>{tab}</label>
          </div>
        ))}
      </div>
      <table border={1} style={{ marginTop: "40px" }}>
        <tbody>
          {data.map((item, key) => (
            <tr key={key}>
              {Object.entries(item).map(([key, value]) => {
                return <td key={key}>{JSON.stringify(value)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
