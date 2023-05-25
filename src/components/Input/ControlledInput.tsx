import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from './Input';
export type ControlledInputProps<T extends FieldValues> = TextInputProps &
  UseControllerProps<T>;
export function ControlledInput<T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...props
}: ControlledInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field: { onBlur, onChange, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          {...props}
        />
      )}
    />
  );
}
