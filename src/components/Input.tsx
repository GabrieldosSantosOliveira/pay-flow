import { TextInput, TextInputProps } from 'react-native';
import { forwardRef, ForwardRefRenderFunction, memo } from 'react';
import { useInput } from '../hooks/useInput';
const InputBase: ForwardRefRenderFunction<TextInput, TextInputProps> = (
  { style, ...props },
  ref,
) => {
  const { isFocus, setIsFocus } = useInput();
  return (
    <TextInput
      style={[{ flex: 1, height: '100%' }, style]}
      ref={ref}
      {...props}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
};
export const Input = memo(forwardRef(InputBase));
