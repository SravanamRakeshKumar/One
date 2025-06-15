import { Link ,useNavigate} from 'react-router-dom';
import './signuppage.css';
import axios from 'axios';
import { useState } from 'react';
function Signup()
{

  let [username,setUsername] = useState('');
  let [password,setPassword] = useState('');
  let [conformpassword,setConformPassword] = useState('');
  let navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;



    async function Add(event) {
       event.preventDefault();

       if(password === conformpassword) 
       {
        try 
        {
          const responce= await axios.post(`${API_URL}/signup`,{
             username:username,
             password:password
            });

            if (responce.data.message === "Account created successfully")
            {
              alert("Account created successful!");
              navigate("/home")
            }
  
        }catch(error)
        {
          console.log(error)
        }

       }
       else 
       {
        alert("password and conform password is not same please check once")
       }

  
}
    return (
    <section id="signuppagesection">
      <div id="signup">
        <h1 id="wish">Create Your Account</h1>
        <form id="signuppageform" onSubmit={Add}>
            <input  id="email" type="text"  value={username} onChange={(event)=>setUsername(event.target.value)} placeholder="username/email" required></input>
            <input  id="password" type="password" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="password" required></input>
            <input  id="conform-password" type="password" value={conformpassword} onChange={(event)=>setConformPassword(event.target.value)} placeholder="conform password" required></input>
            <input  type="submit" value="signup"></input>
        </form>
         
      </div>
            <p style={{color:"white",zIndex:"20",fontSize:"17px",fontFamily:"revert-layer"}}>already have an account <Link to="/login">login</Link></p>

      

   </section>

    )
}
export default Signup;