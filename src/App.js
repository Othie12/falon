import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navigation from './Navigation';
import Beats from './Beats';
import UserProfile from './User_profile';
import RegistrationForm from './Signup';
import UploadBeatForm from './Upload_Beat';
import CombineForms from './Login';



export default function App(){
const [loggedIn, setLoggedIn] = useState(false);
const [id, setId] = useState('');

    return (
      <>
      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className='container'>
        <h1>id{id}</h1>
        <Routes>
          <Route path='/' element={<Beats />}></Route>
          <Route path='/User_profile' element={<UserProfile id={id} />}></Route>
          <Route path='/Signup' element={<RegistrationForm />}></Route>
          <Route path='/Upload_Beat' element={<UploadBeatForm />}></Route>
          <Route path='/Login' element={<CombineForms setLoggedIn={setLoggedIn} setId={setId} />}></Route>
        </Routes>
      </div>
      </>
    );
}