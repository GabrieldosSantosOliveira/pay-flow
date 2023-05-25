import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddBoleto } from '@screens/AddBoleto';
import { BarReader } from '@screens/BarReader';
import { Permission } from '@screens/Permission';
import { Update } from '@screens/Update';

import { BottomTabsRoutes, BottomTabsScreens } from './bottomTabs.routes';

export type ScreensStack = {
  BarReader: undefined;
  Tabs: NavigatorScreenParams<BottomTabsScreens>;
  AddBoleto: { code?: string };
  Update: {
    id: string;
  };
  Permission: undefined;
};
const { Navigator, Screen } = createNativeStackNavigator<ScreensStack>();
export const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
      <Screen
        name="Tabs"
        component={BottomTabsRoutes}
        options={{ presentation: 'modal' }}
      />
      <Screen name="AddBoleto" component={AddBoleto} />
      <Screen name="Update" component={Update} />
      <Screen name="Permission" component={Permission} />
      <Screen
        name="BarReader"
        component={BarReader}
        options={{ presentation: 'modal', orientation: 'landscape' }}
      />
    </Navigator>
  );
};
