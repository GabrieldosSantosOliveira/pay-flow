import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginPage } from '@screens/LoginPage';
const { Navigator, Screen } = createBottomTabNavigator();
export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="LoginPage"
        component={LoginPage}
        options={{ tabBarStyle: { height: 0, opacity: 0 } }}
      />
    </Navigator>
  );
};
