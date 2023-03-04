import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from '@screens/LoginPage';
const { Navigator, Screen } = createStackNavigator();
export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="LoginPage" component={LoginPage} />
    </Navigator>
  );
};
