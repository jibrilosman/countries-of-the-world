import "./index.css";
import { useData } from "./context/DataContext";
import Search from "./components/search/Search";




const Home = () => {
  const { data } = useData();
  
  

  return (
    <>
    <Search /> 
    </>
  );
};

export default Home;


