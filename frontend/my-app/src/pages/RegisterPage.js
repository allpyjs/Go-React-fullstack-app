import { useNavigate } from "react-router-dom";
import { Connect, Register } from "../Api/socketConnection";
import { Verify } from "../scripts/passwordVerify";
import { useRef, useState, useEffect } from "react";
import classes from "./RegisterPage.module.css";
import {GetColour, GetEmail} from "../scripts/getCookies.js"

class RegisterPerson {
  constructor(email, name, password) {
    this.email = email
    this.name = name 
    this.password = password
  }
}

function RegisterPage(){
  const navigate = useNavigate();
  const [count, setCount] = useState("");
  let rt = new RegisterPerson()
  let inputEl = new RegisterPerson()
  inputEl.email  = useRef(null);
  inputEl.name  = useRef(null);
  inputEl.password = useRef(null);
  
  function Nav() {
    navigate("../", { replace: true });
  }
  useEffect(() => {
    if(GetColour() && GetEmail()){
      Nav()
     }
  })


  function send(){
    rt.email = inputEl.email.current.value
    rt.name = inputEl.name.current.value
    rt.password  =  inputEl.password.current.value
    if(Verify(rt.password, rt.name)){
      Connect();
      Register(rt);
      setCount(<p className={classes.sucess}>Successfully registered</p>)

      navigate("../", { replace: true });
    }else{
      setCount(<p className={classes.error}>Weak Password or Login, Password should be at least 8 characters long</p>)
    }
  }

  
    return (
      <div>
        <div className={classes.background}>
          <div className={classes.shape}></div>
          <div className={classes.shape}></div>
        </div>
        <form>
          <h3>Register Here</h3>
          <label htmlFor ="email">Email</label>
          <input type="email" placeholder="email" id="email"  ref={inputEl.email}/>

          <label htmlFor ="username">Name</label>
          <input type="text" placeholder="Name" id="username"  ref={inputEl.name}/>

          <label htmlFor ="password" >Password</label>
          <input type="password" placeholder="Password" id="password" ref={inputEl.password}/>

          <button onClick={send} type="button">Register</button>
          <div>{count}</div>
        </form> 
      </div>
    );

}

export default RegisterPage;
