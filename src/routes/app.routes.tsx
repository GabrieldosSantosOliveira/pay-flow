import { createStackNavigator } from '@react-navigation/stack';
import { HomePage } from '@screens/HomePage';
const { Navigator, Screen } = createStackNavigator();
export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomePage" component={HomePage} />
    </Navigator>
  );
};
