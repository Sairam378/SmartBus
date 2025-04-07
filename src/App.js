import React, { useState } from 'react'; // ✅ Import useState
import './App.css';
import Bus_info_herosection from './Bus_queue_by_bus_no/Bus_info_herosection';
import Bus_entry_herosection from './Bus_queue_by_bus_entries/Bus_entry_herosection';
import Herosection from './Herosection/Herosection';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar_herosection from './Navbar_items/Navbar_herosection';
import Bus_data from '../src/Bus_data/Bus_data';
import Contact_herosection from '../src/Navbar_items/Contact_herosection';
import LoginPage from './Login_page/LoginPage';
import { UserContext } from './context/UserContext';
import ProfileSelection from './ProfileSelection/ProfileSelection';
import ApplicantSignupForm from './ApplicantSignUpForm/ApplicantSignupForm';
import EmployeeSignup from './EmployeeSignup/EmployeeSignup';
import Bus_track_info from './Bus_Track_info/Bus_track_info';
import DistanceFromCurrentLocation from './Bus/Bus';

function App() {
  // Declare state properly inside the function body
  const [userEmail, setUserEmail] = useState("");

  return (
    <BrowserRouter>
      {/* Wrap everything inside UserContext.Provider */}
      <UserContext.Provider value={{ userEmail, setUserEmail }}>
        <Routes>
          {/* <Route path='/' element={<Bus_data/>}/> */}
          {/* <Route path='/' element={<Herosection />} />
          <Route path='/search1' element={<Bus_info_herosection />} />   
          <Route path='/search2' element={<Bus_entry_herosection />} />
          <Route path='/about' element={<Navbar_herosection />} />
          <Route path='/home' element={<Herosection />} />
          <Route path='/contact' element={<Contact_herosection />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile-selection' element={<ProfileSelection/>} />
          <Route path='/applicant-signup' element={<ApplicantSignupForm />} />
          <Route path='/employee-signup' element={<EmployeeSignup/>} /> */}
          {/* <Route path='/' element={<Bus_track_info />} /> */}
          <Route path='/' element={<DistanceFromCurrentLocation />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
