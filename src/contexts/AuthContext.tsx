import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createContext, ReactNode, FC, useEffect, useState } from 'react';
import { Platform } from 'react-native';
interface IAuthContext {
  SingInWithGoogle: () => Promise<void>;
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
interface IAuthProvider {
  children: ReactNode;
}
export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState();
  const SingInWithGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
    } catch (error) {
      console.log(JSON.stringify(error));
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
  }, []);
  return (
    <AuthContext.Provider value={{ SingInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
