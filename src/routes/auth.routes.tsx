import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashBoard } from '@screens/DashBoard';
const { Navigator, Screen } = createBottomTabNavigator();
export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="DashBoard" component={DashBoard} />
    </Navigator>
  );
};
