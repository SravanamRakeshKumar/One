import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './OnlinePage.css';

function Online()
{
   let location = useLocation();
  let [movie_details,setMovie_details] = useState({});
   
    useEffect(()=>
    {
       setMovie_details(location.state["movie"]);
    }
    ,[]);
    // console.log(movie_details);
    return (
        <>
            <section id="details">
                <div id="image">
                    <img src={movie_details.movie_pic} alt="movie_image"></img>
                </div>
                <div id="movie_details">
                    <h2>Movie Name:{movie_details.movie_name}</h2>
                    <h2>Movie Director:{movie_details.director}</h2>
                    <h2>year:{movie_details.year}</h2>
                    <h2>Zoner:{movie_details.zoner}</h2>
                    <h2>Language:{movie_details.language}</h2>
                    <a href="hi-nanna.mp4" download>
                        <button>Download</button>
                    </a>
                    
                </div>

            
            <iframe id="video" width="1000px" height="500px" src={movie_details.video} ></iframe>
            </section>
        </>

        //  <h2>Movie Name :{movie_details.movie_name}</h2>
    );
}

export default Online;