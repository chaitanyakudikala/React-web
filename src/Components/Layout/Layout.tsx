import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

interface Props {
  headName: string;
}

const Layout: React.FC<Props> = ({ headName }: Props) => {
  return (
    <div className="App">
      <Header headName={headName} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
