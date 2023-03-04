import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomePage } from '@screens/HomePage';
const { Navigator, Screen } = createBottomTabNavigator();
export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomePage" component={HomePage} />
    </Navigator>
  );
};
