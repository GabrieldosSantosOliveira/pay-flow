import { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { InputProvider } from '../contexts/InputContext';
import { useInput } from '../hooks/useInput';
const InputRootBase: FC<ViewProps> = ({ style, ...props }) => {
  const { isFocus } = useInput();

  return (
    <View
      style={[
        {
          width: '100%',
          height: 56,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderRadius: 8,
          borderColor: 'red',
          borderWidth: isFocus ? 5 : 1,
          gap: 10,
        },
        style,
      ]}
      {...props}
    />
  );
};
export const InputRoot: FC<ViewProps> = ({ ...props }) => {
  return (
    <InputProvider>
      <InputRootBase {...props} />
    </InputProvider>
  );
};
