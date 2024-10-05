import { createContext, useContext, useEffect, useState } from 'react';
import { FirestoreContext } from './firestoreContext';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
  updateProfile
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  if (!AuthContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
	const { app } = useContext(FirestoreContext);
	const auth = getAuth(app);
	const [ user, setUser ] = useState({});
  const [displayName, setDisplayName] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log('user is == ', user);
      setUser(user);
      setDisplayName(user?.displayName);
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

	const createNewUser = (pass, email) => {
    return createUserWithEmailAndPassword(auth, email, pass)
	};

  const setUserName = (name) =>{
    setDisplayName(name);
    return updateProfile(auth.currentUser,{ displayName: name})
  }

	const signInWithEmailPass = (pass, email) => {
		return signInWithEmailAndPassword(auth, email, pass);
	};

	const logOut = async () => {
    setErr(null);
		try {
			await signOut(auth);
		} catch (error) {
      setErr(error.message);
    }
	}

  return (
    <AuthContext.Provider value={{ displayName,signInWithEmailPass, setUserName, createNewUser, isAuth: !!user, err, logOut }}>
      { children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
