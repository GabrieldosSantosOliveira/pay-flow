import { FC } from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
export const Touchable: FC<TouchableOpacityProps> = ({ ...props }) => {
  return <TouchableOpacity {...props} />;
};
