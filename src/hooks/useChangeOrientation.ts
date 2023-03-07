import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
export const useChangeOrientation = (
  orientation = ScreenOrientation.OrientationLock.PORTRAIT,
) => {
  useFocusEffect(() => {
    ScreenOrientation.lockAsync(orientation);
  });
};
