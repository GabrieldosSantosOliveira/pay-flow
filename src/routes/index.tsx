import { SplashScreen } from '@components/SplashScreen';
import { useAuth } from '@hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export const Routes = () => {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  if (isLoadingAuth) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  );
};
