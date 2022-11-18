import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import { useState, useEffect } from "react";

function App() {
  const Api = "http://localhost:3500/toDoList";
  const [name, setname] = useState([]);
  const [newname, setnewname] = useState("");
  const [searchname, setsearchname] = useState("");
  const [showError, setshowError] = useState(null)

  useEffect(() => {
    const FetchApi = async() => {
      try{
        const response = await fetch(Api);
        if(!response.ok){throw Error("Nemamo veze sa serverom")}
        const responseJson = await response.json();
        setname(responseJson)
        setshowError(null)
      }
      catch(err){
        setshowError(err.message)
      }
    }
    (async() => await FetchApi())();
  }, [])

  return (
    <div className="app">
        <Header></Header>
        <main>
          {showError && (
            <p>Greška: {showError}</p>
          )}
          {!showError && ( 
            <Main
              length = {name.length} 
              api = {Api}
              name={name.filter(n => n.label.toLowerCase().includes(searchname.toLocaleLowerCase()))}
              setname = {setname}
              newname = {newname}
              setnewname = {setnewname}
              searchname = {searchname}
              setsearchname = {setsearchname}
              setshowError = {setshowError}
            ></Main>
          )}
        </main>
        <Footer></Footer>
    </div>
  );
}

export default App;
