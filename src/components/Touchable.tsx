import { FC } from 'react';
import {
  Platform,
  TouchableOpacityProps,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
export const Touchable: FC<TouchableOpacityProps> = ({ ...props }) => {
  return Platform.OS === 'ios' ? (
    <TouchableOpacity {...props} />
  ) : (
    <TouchableNativeFeedback {...props} />
  );
};
