import { IoMdHome, IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type BackBottonProps = {
  modo ?: 'home' | 'back'
};
const BackBotton :React.FC<BackBottonProps> = ({ modo = 'home' }) => {
  
  const [modoState] = useState(modo === 'home');
  
  const navigate = useNavigate();

  
  return (
    <>
    
            <button id="back" className="back-btn" onClick={() => navigate("/Filo-Home")}>
              {modoState ? <IoMdHome /> : <IoMdArrowBack />}
            </button>
    
    </>
  );
}

export default BackBotton;


