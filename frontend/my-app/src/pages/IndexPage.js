import { useState, useEffect } from "react";
import classes from "./IndexPage.module.css";
import { Connect,Colour,  } from "../Api/socketConnection";
import { GetEmail, GetColour, GetCredits, GetInfo, GetUpdate } from "../scripts/getCookies";

function deleteCookies(){
  document.cookie = "Email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "Colour=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = `Credits=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `Info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `Last=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  function Nav() {
    window.location.reload();
  }
  setTimeout(Nav, 200); 
}


function IndexPage(){
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const [info, setInfo] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  
 

  useEffect(() => {
    function LoadConfig() {
      Connect();
      Colour(GetColour(), GetEmail());
    }
    setTimeout(LoadConfig, 50);
    const timer = setTimeout(() => {
      setIsLoading(true)
      setCredits(GetCredits());
      setInfo(GetInfo());
      setLastUpdate(GetUpdate());
      setIsLoading(false)
    }, 500);
    return () => {clearTimeout(timer);}
  }, []);


    if(isLoading){
      return (
        <div className={classes.IndexPage}>
          <h1>Loading...</h1>
          <button onClick={deleteCookies}>clear</button>
        </div>
        )
    }else{
      return (
        <div className={classes.IndexPage}>
            <h1>Hello {GetEmail()}</h1>
            <p>Credits: {credits}, <br/> Info: {info},  <br/> Last update: {lastUpdate}</p>
        </div>
      )
    }
}

export default IndexPage;

