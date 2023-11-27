import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import { useData } from "./context/DataContext";
import Detail from "./components/details/Detail";
import Home from "./components/home/Home";
import Layout from "./components/Layout";

function App() {
  const { theme } = useData();
  return (
    <>
    <div className={theme}>
      <BrowserRouter>   
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;

// <div className={theme}>
// <Router>
//   <Header />
//   <Search />
//   <Routes>
//       <Route path="/"  element={ <Main />} />
//       <Route path="/detail" element={<Detail />} />
//   </Routes>
// </Router>
// </div>
