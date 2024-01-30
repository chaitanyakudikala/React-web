import ListItems from "./Components/ListItem/ListItems";
import UserTable from "./Components/UserTable/UserTable";
import { Route, Routes } from "react-router-dom";
import Missing from "./Components/Missing/Missing";
import Layout from "./Components/Layout/Layout";
import List from "./Components/ListComponent/List";
import { useEffect, useState } from "react";
import axios from "./services/axios";
import { userData } from "./types";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";

const App = () => {
  const [users, setUsers] = useState<Array<userData>>([]);
  const [headName, setHeadName] = useState("User Names");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout headName={headName} />}>
        <Route index element={<HomeScreen />} />
        <Route
          path="/List"
          element={<List users={users} setHeadName={setHeadName} />}
        />
        <Route path="/UserTable" element={<UserTable />} />
        <Route path="/ListItems" element={<ListItems />} />
      </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default App;
