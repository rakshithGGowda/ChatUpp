import React from 'react'
import {GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import "firebase/app"
import Lottie from 'react-lottie';
import animationData from '../lottie/Blogging';

import { auth } from '../firebase'
import firebase from 'firebase/app'

const Login = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return (
        <div id="login-page" >
            <div id="login-card">
                <h2>What up Lets chatUp</h2>
                <div className="login-button google" onClick = {() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} >
                    <GoogleOutlined/> Get In with Google
                </div>
                <div className="login-button facebook" onClick = {() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())} >
                    <FacebookOutlined/> Get In with Facebook
            </div>
        </div>
            <div>
        <div className= "bloogging">
            <Lottie
                options={defaultOptions}
                height={300}
                width={450}
            />
      </div>
    </div>
        </div>
    )
}



export default Login
