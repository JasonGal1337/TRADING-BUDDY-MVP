import { useNavigate } from 'react-router-dom';
import "./index.css";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toLogin() {
      navigate("/");
  }

  function signup(){ 
    axios.post("http://localhost:3001/user/signup", { email, password }).then(({data})=>{
      console.log(data);
      if(data.token){
        localStorage.setItem("token", data.token);
        navigate("/profile");
      } else {
        alert(data.msg);
      }
    })
  }

    return (
      <div>
        <input type="email" placeholder="email" onChange={(e) => {setEmail(e.target.value)}} />
        <input type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}} />
        <button onClick={()=> {signup();}}>Create Account</button>
        <p>Already have an account?</p>
        <a onClick={() => {
            toLogin();
        }}>Login</a>
      </div>
    );
  }
  
  export default Signup;