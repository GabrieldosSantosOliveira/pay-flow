import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createContext, ReactNode, FC, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface IAuthContext {
  SingInWithGoogle: () => Promise<void>;
  user: FirebaseAuthTypes.User | null;
  isLoadingUser: boolean;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
interface IAuthProvider {
  children: ReactNode;
}
export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const SingInWithGoogle = async () => {
    try {
      setIsLoadingUser(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const { user } = await auth().signInWithCredential(googleCredential);
      setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUser(false);
    }
  };
  const configGoogleSingIn = () => {
    try {
      const CLIENT_ID =
        Platform.OS === 'android'
          ? process.env.GOOGLE_CLIENT_ID_ANDROID
          : process.env.GOOGLE_CLIENT_ID_IOS;
      GoogleSignin.configure({
        offlineAccess: true,
        webClientId: CLIENT_ID,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    configGoogleSingIn();
    auth().onAuthStateChanged((userState) => {
      setUser(userState);
      setIsLoadingAuth(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        SingInWithGoogle,
        isLoadingUser,
        user,
        isAuthenticated: Boolean(user),
        isLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
