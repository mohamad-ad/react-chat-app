import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateEmail, User, UserCredential, updateProfile, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import {auth} from '../firebase';

interface IAuth{
    user:User|null;
    signup(email: string, password: string): Promise<UserCredential>;
    login(email: string, password: string): Promise<UserCredential>
    logout(): Promise<void>;
    setEmail(email: string): Promise<void> | null;
    updateUsernameAndPhotoURL(displayName: string, photoURL: string|null|undefined): Promise<void> | null;
    setPassword(password: string): Promise<void> | null;
}
const AuthContext = createContext({} as IAuth);
export const useAuthContext = ()=> useContext(AuthContext);





export const AuthContextProvider = ({children}:{children:JSX.Element})=>{
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);

    function signup(email:string, password:string){
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function login(email:string, password:string) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logout(){
        return signOut(auth);
    }
    function setEmail(email:string){
        return user && updateEmail(user, email);
    }
    function setPassword(password:string){
        return user && updatePassword(user, password);
    }
    function updateUsernameAndPhotoURL(displayName:string, photoURL:string|null){
        return user && updateProfile(user, {
            displayName,
            photoURL: photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
        })
    }

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setUser(user);
            setLoading(false);
        });
        return unsub;
    },[])

    const value={
        user,
        signup,
        login,
        logout,
        setEmail,
        setPassword,
        updateUsernameAndPhotoURL
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}