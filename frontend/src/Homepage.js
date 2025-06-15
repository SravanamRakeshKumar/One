import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import './HomePageStyles.css';

function Homepage()
{
    
    let [movies,setMovies] = useState([]);
    let [filtermovies,setFilterMovies] = useState([]);
    let [usersearch,setUsersearch] = useState('');
    let [year,setYear]=useState('');
    let [language,setLanguage]=useState('');
    let [zoner,setZoner]=useState('');
    let [rating,setRating]=useState('');
    let [director,setDirector]=useState('');
    const API_URL = process.env.REACT_APP_API_URL;



    useEffect(()=>
    {
        fetch(`${API_URL}/movies`)
        .then(res =>res.json())
        .then( data => 
            {
                setMovies(data.movies);
                setFilterMovies(data.movies)

    })   //movies

    },[]);

    useEffect(()=>
    {
        let filterArray = movies;
         if(year)
         {
            filterArray = filterArray.filter( movie => movie.year == year )
         }
         if(zoner)
         {
            filterArray = filterArray.filter( movie => movie.zoner == zoner )
         }
         if(language)
         {
            filterArray = filterArray.filter( movie => movie.language == language )
         }
         if(director)
         {
            filterArray = filterArray.filter( movie => movie.director == director )
         }
         if(rating)
         {
            filterArray = filterArray.filter( movie => movie.rating == rating)
         }
        filterArray = filterArray.filter((movie,index)=>
            movie.movie_name.toLowerCase().includes(usersearch.toLowerCase())
        )
        setFilterMovies(filterArray);
    },[usersearch,year,language,zoner,director,rating]);



    return (
        <>
                <header id="homeheader">
                  <section id="logo">
                      <div>
                         <img src="./logo.png" ></img>
                      </div>
                      <h1>Home <span>Theatre</span></h1>
                  </section>
                  <section id="search-bar-accont">
                    <form>
                        <input type="text" value={usersearch} onChange={(event)=>setUsersearch(event.target.value)}  placeholder="Type here.."></input>
                        {/* <input type="submit" value="Search"></input> */}
                    </form>
                    <div
    className="user-avatar"
    onClick={() => {
      const dropdown = document.getElementById("dropdown");
      dropdown.classList.toggle("show");
    }}
  >
    {/* <img src="https://static.vecteezy.com/system/resources/previews/020/973/731/non_2x/avatar-gold-icon-illustration-of-golden-particle-background-isolated-sign-symbol-education-icon-black-background-vector.jpg" alt="user-account"></img> */}
    <div id="dropdown" className="user-dropdown">
      <button onClick={() => window.location.href = "/login"}>Logout</button>
    </div>
  </div>

                  </section>

                 
                    
                </header>
<section id="filters">
        <select className="options" onChange={(event)=>setYear(event.target.value)} >
          <option value="">Year</option>
          <option value="2024">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>

        </select>

        <select className="options" onChange={(event)=>setLanguage(event.target.value)} >
          <option value="">Language</option>
          <option value="telugu">Telugu</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>

        <select className="options" onChange={(event)=>setZoner(event.target.value)} >
          <option value="">Zoner</option>
          <option value="action">action</option>
          <option value="comedy">comedy</option>
          <option value="thriller">thriller</option>
          <option value="romantic">romantic</option>
          <option value="drama">drama</option>
          <option value="sci-fi">sci-fi</option>
          <option value="fantasy">fantasy</option>
          
          

        </select>

        <select className="options" onChange={(event)=>setRating(event.target.value)} >
          <option value="">Rating</option>
          <option value="4.8">4.8</option>
          <option value="4.7">4.7</option>
          <option value="3.9">3.9</option>
        <option value="4.2">4.2</option>
          <option value="4.5">4.5</option>
          <option value="4.0">4.0</option>
          <option value="4.9">4.9</option>
        <option value="4.6">4.6</option>
          <option value="3.6">3.6</option>
          <option value="4.3">4.3</option>
          <option value="4.0">4.0</option>
        </select>

        <select className="options" onChange={(event)=>setDirector(event.target.value)} >
          <option value="">Director</option>
          <option value="koratala siva">koratala siva</option>
          <option value="sukumar">sukumar</option>
          <option value="kalyan shankar">kalyan shankar</option>
          <option value="sailesh kolanu">sailesh kolanu</option>
          <option value="saikiran">saikiran</option>
          <option value="sekhar kammula">sekhar kammula</option>
          <option value="rajamouli">rajamouli</option>
          <option value="bhaskar">bhaskar</option>
          <option value="puri jagannadh">puri jagannadh</option>
          <option value="boyapati srinu">boyapati srinu</option>
          <option value="anil ravipudi">anil ravipudi</option>
          <option value="james cameron">james cameron</option>
        </select>
      </section>

        <section id="parentStylesObject">
          {
            filtermovies.length !== 0 ?
            (
      filtermovies.map((movie,index)=>
      (
        <div id="chaildStylesObject" key={movie.id}>
            <img id="imageStylesObject" src={movie.movie_pic} alt="movie_image" ></img>
            <div id="buttons">
                <Link to="/online" state={{movie}}><button>Online</button></Link>
                <Link to="/offline" state={{movie}}><button>Offline</button></Link>
                
            </div>

        </div>
      ))
    ):<h1 style={{color:"red"}}>No movie found</h1>
    }

    </section>
      
        </>

    )
}

export default Homepage;