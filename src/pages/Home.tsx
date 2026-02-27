import { useState } from "react";
import Categorias from "../components/home/categorias/Categorias";
import Populares from "../components/home/populares/Populares";
import Promos from "../components/home/promos/Promos";
import "./home.css";
//import "../assets/styles/home.css"
const Home = () => {
  const [expandido, setExpandido] = useState(false);
  return (
    <>
      <div className="home-main">
        {!expandido && <Categorias />}
        {!expandido && <Promos />}
        <Populares expandido={expandido} onToggle={() => setExpandido(!expandido)} />
      </div>
    </>
  );
};



export default Home;
