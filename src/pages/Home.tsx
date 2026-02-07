import Categorias from "../components/home/categorias/Categorias";
import Populares from "../components/home/populares/Populares";
import Promos from "../components/home/promos/Promos";
import "./home.css";
//import "../assets/styles/home.css"
const Home = () => {
  return (
    <>
      <div className="home-main">
        <Categorias />
        <Promos />
        <Populares />
      </div>
    </>
  );
};



export default Home;
