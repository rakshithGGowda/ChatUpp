import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine'
import {auth} from '../firebase'
import loadingComp from '../loading.gif'
import {useAuth} from '../contexts/AuthContext'

const Chats = () => {
    
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true)
    // console.log(user)

    const handleLogout = async () => {
        await auth.signOut();
        history.push('./')
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type:'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            history.push('./')
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "Project-ID": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
                "User-Name" : user.email,
                "User-Secret" : user.uid,
                
            }
        })
        .then(() =>{
            setLoading(false)
        })
        .catch(() =>{
            let formData = new FormData();
            formData.append('email',user.email);
            formData.append('username',user.email);
            formData.append('secret',user.uid);
            
            getFile(user.photoURL)
            .then((avatar) => {
                formData.append('avatar',avatar, avatar.name)

                axios.post('https://api.chatengine.io/users',
                formData,
                { 
                    headers:
                        {
                            "Private-Key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY
                        }
                })
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    }, [user,history]);


    if(!user || loading) return (<div id = "loading-container">
                                   <img id="loading-icon" src={loadingComp} alt="React Logo" /> 
                                </div>)
    
    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className="logo-tab">
                    ChatUp
                </div>
                <div className="logout-tab" onClick = {handleLogout}>
                    Logout
                </div>
            </div>
                <ChatEngine height= "calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
                />
        </div>
    )
}

export default Chats
