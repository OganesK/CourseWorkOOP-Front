import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import HomePage from "./Pages/Home/HomePage";
import SignUpPage from "./Pages/Auth/SignUpPage";
import SignInPage from "./Pages/Auth/SignInPage";

class AppRouter extends React.Component {
    state = {
        isSignedIn: false,
    }
    render(){
        console.log(this.state)
        if(!this.state.isSignedIn){
            return(
                <>
                <Routes>
                    <Route path='*' element={<Navigate to='/signin' />} />
                    <Route path='/signin' element={<SignInPage isSignedIn={this.setState} />} />
                    <Route path='/signup' element={<SignUpPage />} />
                </Routes>
                </>
            )
        }else{
            return(
                <Routes>
                    <Route path='*' element={<Navigate to='/home' />} />
                    <Route path='/home' element={<HomePage />} />
                </Routes>
            )
        }
    }
}

export default AppRouter;