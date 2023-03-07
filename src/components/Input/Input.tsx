import { useInput } from '@hooks/useInput';
import { forwardRef, ForwardRefRenderFunction, memo } from 'react';
import { TextInput, TextInputProps } from 'react-native';

const InputBase: ForwardRefRenderFunction<TextInput, TextInputProps> = (
  { style, onFocus, onBlur, ...props },
  ref,
) => {
  const { setIsFocus } = useInput();
  return (
    <TextInput
      style={[{ flex: 1, height: '100%' }, style]}
      ref={ref}
      {...props}
      onFocus={(e) => {
        onFocus ? onFocus(e) : null;
        setIsFocus(true);
      }}
      onBlur={(e) => {
        onBlur ? onBlur(e) : null;
        setIsFocus(false);
      }}
    />
  );
};
export const Input = memo(forwardRef(InputBase));
