import { useEffect, useState } from "react";
import { app } from "./firebase";
import {initializeAuth, GoogleAuthProvider, signInWithPopup, browserLocalPersistence, signOut, getAuth, browserPopupRedirectResolver, onAuthStateChanged} from "firebase/auth";

const auth = initializeAuth(app,{
persistence: [browserLocalPersistence],
popupRedirectResolver: browserPopupRedirectResolver
});

// const auth = getAuth(app);
const provider = new GoogleAuthProvider();

import "./App.css";

const App = () => {

    const [user, setUser] = useState(null);

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                console.log(result.user)
            })
            .catch((error) => console.log(error));
    };
    const handleLogout = () => {
        setUser(null);
        signOut(auth);
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
          if(user){
            console.log('logged in user: ', user);
            setUser(user);
          }
          else{
            console.log("No users in session");
            setUser(null);
          }
        })
    },[user])

    return (
        <div className="container">
            {!user && (
                <img
                    className="btn"
                    onClick={() => handleLogin()}
                    src="./Google_SignIn_Logo.png"
                    alt="NA"
                />
            )}
            {user  && (
                <>
                    <div className="user">
                        <h1>Your Successfully Loged In</h1>
                        <h2>Name: {user.displayName}</h2>
                        <h2>Email: {user.email}</h2>
                        <img src={user.photoURL} alt="N/A" />
                        <button onClick={() => handleLogout()} className="logout">Log Out</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
