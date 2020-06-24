import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "gatsby-plugin-firebase"
import { useState } from "react"

export const useFirebaseAuthState = () : [firebase.User,boolean,firebase.auth.Error] => useAuthState(firebase.auth());
export const useFirebaseAuth = () => {
  const signInWithEmailAndPassword = async (
    credentials: EmailAndPasswordCredentials
  ) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
  }
  const logout = async () => {
    await firebase.auth().signOut()
  }

  return {signInWithEmailAndPassword, logout}
}

export interface EmailAndPasswordCredentials {
  email: string
  password: string
}

export const useEmailPasswordCredentials = () =>{
    const [credentials , setCredentials] = useState<EmailAndPasswordCredentials>({
        email: "",
        password: "",
      })
    const setEmail = (email :string) => setCredentials({...credentials , email })
    const setPassword = (password : string)=> setCredentials({...credentials , password})
    return {credentials , setEmail , setPassword}  
}
 
