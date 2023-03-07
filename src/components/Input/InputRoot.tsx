import { InputProvider } from '@contexts/InputContext';
import { useInput } from '@hooks/useInput';
import { FC } from 'react';
import { View, ViewProps, PixelRatio } from 'react-native';

interface IInputRootBase extends ViewProps {
  _focus?: ViewProps['style'];
}
const InputRootBase: FC<IInputRootBase> = ({ _focus, style, ...props }) => {
  const { isFocus } = useInput();
  const { getPixelSizeForLayoutSize } = PixelRatio;
  return (
    <View
      style={[
        {
          width: '100%',
          height: getPixelSizeForLayoutSize(20),
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderRadius: 8,
          gap: 10,
        },
        style,
        isFocus ? _focus : null,
      ]}
      {...props}
    />
  );
};
export const InputRoot: FC<IInputRootBase> = ({ ...props }) => {
  return (
    <InputProvider>
      <InputRootBase {...props} />
    </InputProvider>
  );
};
