import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Loginpage from './loginpage';
import Homepage from './Homepage';
import Signup from './signuppage';
import Online from './OnlinePage';
import Offline from './OfflinePage';
// import RazorpayCheckout from './RazorpayCheckout';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <>

    //   <RazorpayCheckout />

    // </>

    <>
    <BrowserRouter>
          <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/online" element={<Online />} />
                <Route path="/offline" element={<Offline />} />


         </Routes>
    </BrowserRouter>
    </>

);





