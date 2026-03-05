import Categorias from "../components/home/categorias/Categorias";
import Populares from "../components/home/populares/Populares";
import Promos from "../components/promobanner/promobanner";
import "./home.css";
import Footer from "../components/Footer/Footer";

//import "../assets/styles/home.css"
const Home = () => {
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
