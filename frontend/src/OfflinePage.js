import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import './OfflinePage.css';
function Offline()
{
   let location = useLocation();
  let [movie_details,setMovie_details] = useState({});
  let [count,setCount]=useState(0);
  let [total,setTotal]=useState(0);
  let [seats,setSeats] = useState([]);
   
    useEffect(()=>
    {
       setMovie_details(location.state["movie"]);
    }
    ,[]);

    useEffect(()=>{
      if (movie_details?.seats_booked)
      {
        setSeats(movie_details.seats_booked);
        movie_details.seats_booked.map(seat =>
        {
          document.getElementById(seat).style.backgroundColor="red";
          document.getElementById(seat).disabled="true";
        }
        )
      }

    },[movie_details])

    const Selected = (event) => 
    {
      if (event.target.style.backgroundColor !== "green")
      {
      event.target.style.backgroundColor ="green";
      setCount(count+1);
      setTotal((count+1)*100);
      setSeats([...seats,event.target.id]);
      }
      else 
      {
        event.target.style.backgroundColor ="transparent";
              setCount(count-1);
              setTotal(total-100);
      }
    }

    
     
     const Book = async () => {

      if (count>=1)
      {



      const { data: order } = await axios.post("http://localhost:5000/api/create-order", {
                  amount: total,
                });

                const options = {
        key: "rzp_test_ltmkskOb29dwDe",
        amount: order.amount,
        currency: order.currency,
        name: "HomeTheatre",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function () { 	 //it is activate after payment is done
          window.location.href="http://localhost:3000/home";  //relocate the homepage 
          alert("✅ Payment send Successful!seats are booking"); //conformation purpose
           const data=axios.patch(`http://localhost:5000/movies/${movie_details.id}`, 
            {
                  seats_booked: seats,  //updated seats_booked property
          }
                                              );
        }
      }
         const rzp = new window.Razorpay(options);
           rzp.open();




      // const data=axios.patch(`http://localhost:3000/movies/${movie_details.id}`, 
      //       {
      //             seats_booked: seats,  //updated seats_booked property
      //     }
      //                                         );

      // console.log(seats);
      //  if(window.confirm("are you sure to book tickets"))
      //  {

      //      alert("seats booking completed!")
      //  }
    }
    else 
    {
      alert("please select atleast one seat for booking")
    }
     }

    return (
      <>
      <header id="header">
          <h1>movie:{movie_details.movie_name}</h1>
          <h3>Total Seates:{count}</h3>
          <h3>Total Amount:{total}</h3>
          <button id="book" onClick={Book}>Book Now</button>
      </header>
      <div id="info">
        <p><button></button><h3>Selected Seates</h3></p>
        <p><button></button><h3>Empty Seates</h3></p>
        <p><button></button><h3>Filled Seates</h3></p>

      </div>
     <section id="movie_hall">
         <div id="screen">
            Movie paly Here
          </div>
      <section id="seats">
        <div id="A" className="row">
          <h2>A</h2>
        

                  <div id="part1">
                       <button id="A1" onClick={Selected}>1</button>
                       <button id="A2" onClick={Selected}>2</button>
                        <button id="A3"  onClick={Selected}>3</button>
                        <button id="A4" onClick={Selected}>4</button>
                      <button  id="A5" onClick={Selected}>5</button>
                      <button  id="A6" onClick={Selected}>6</button>
                 </div>
                 <div id="part2">
                      <button id="A7" onClick={Selected}>7</button>
                      <button id="A8" onClick={Selected}>8</button>
                      <button id="A9" onClick={Selected}>9</button>
                      <button  id="A10" onClick={Selected}>10</button>
                      <button id="A11" onClick={Selected}>11</button>
                       <button id="A12" onClick={Selected}>12</button>
                      <button id="A13" onClick={Selected}>13</button>
                      <button id="A14" onClick={Selected}>14</button>
                       <button id="A15" onClick={Selected}>15</button>
                  </div>

        </div>
        <div id="B" className="row">
          <h2>B</h2>
                   

                  <div id="part1">
                       <button id="B1" onClick={Selected}>1</button>
                       <button id="B2" onClick={Selected}>2</button>
                        <button id="B3"  onClick={Selected}>3</button>
                        <button id="B4" onClick={Selected}>4</button>
                      <button  id="B5" onClick={Selected}>5</button>
                      <button  id="B6" onClick={Selected}>6</button>
                 </div>
                 <div id="part2">
                      <button id="B7" onClick={Selected}>7</button>
                      <button id="B8" onClick={Selected}>8</button>
                      <button id="B9" onClick={Selected}>9</button>
                      <button  id="B10" onClick={Selected}>10</button>
                      <button id="B11" onClick={Selected}>11</button>
                       <button id="B12" onClick={Selected}>12</button>
                      <button id="B13" onClick={Selected}>13</button>
                      <button id="B14" onClick={Selected}>14</button>
                       <button id="B15" onClick={Selected}>15</button>
                  </div>

        </div>
        <div id="C" className="row">
          <h2>C</h2>
                   

                  <div id="part1">
                       <button id="C1" onClick={Selected}>1</button>
                       <button id="C2" onClick={Selected}>2</button>
                        <button id="C3"  onClick={Selected}>3</button>
                        <button id="C4" onClick={Selected}>4</button>
                      <button  id="C5" onClick={Selected}>5</button>
                      <button  id="C6" onClick={Selected}>6</button>
                 </div>
                 <div id="part2">
                      <button id="C7" onClick={Selected}>7</button>
                      <button id="C8" onClick={Selected}>8</button>
                      <button id="C9" onClick={Selected}>9</button>
                      <button  id="C10" onClick={Selected}>10</button>
                      <button id="C11" onClick={Selected}>11</button>
                       <button id="C12" onClick={Selected}>12</button>
                      <button id="C13" onClick={Selected}>13</button>
                      <button id="C14" onClick={Selected}>14</button>
                       <button id="C15" onClick={Selected}>15</button>
                  </div>

        </div>
        <div id="D" className="row">
          <h2>D</h2>
                    

                  <div id="part1">
                       <button id="D1" onClick={Selected}>1</button>
                       <button id="D2" onClick={Selected}>2</button>
                        <button id="D3"  onClick={Selected}>3</button>
                        <button id="D4" onClick={Selected}>4</button>
                      <button  id="D5" onClick={Selected}>5</button>
                      <button  id="D6" onClick={Selected}>6</button>
                 </div>
                 <div id="part2">
                      <button id="D7" onClick={Selected}>7</button>
                      <button id="D8" onClick={Selected}>8</button>
                      <button id="D9" onClick={Selected}>9</button>
                      <button  id="D10" onClick={Selected}>10</button>
                      <button id="D11" onClick={Selected}>11</button>
                       <button id="D12" onClick={Selected}>12</button>
                      <button id="D13" onClick={Selected}>13</button>
                      <button id="D14" onClick={Selected}>14</button>
                       <button id="D15" onClick={Selected}>15</button>
                  </div>

        </div>
        <div id="E" className="row">
          <h2>E</h2>

                  <div id="part1">
                       <button id="E1" onClick={Selected}>1</button>
                       <button id="E2" onClick={Selected}>2</button>
                        <button id="E3"  onClick={Selected}>3</button>
                        <button id="E4" onClick={Selected}>4</button>
                      <button  id="E5" onClick={Selected}>5</button>
                      <button  id="E6" onClick={Selected}>6</button>
                 </div>
                 <div id="part2">
                      <button id="E7" onClick={Selected}>7</button>
                      <button id="E8" onClick={Selected}>8</button>
                      <button id="E9" onClick={Selected}>9</button>
                      <button  id="E10" onClick={Selected}>10</button>
                      <button id="E11" onClick={Selected}>11</button>
                       <button id="E12" onClick={Selected}>12</button>
                      <button id="E13" onClick={Selected}>13</button>
                      <button id="E14" onClick={Selected}>14</button>
                       <button id="E15" onClick={Selected}>15</button>
                  </div>

        </div>
        
      </section>
      

     </section>

      </>



    );
}

export default Offline;