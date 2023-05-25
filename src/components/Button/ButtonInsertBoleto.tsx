import { Touchable } from '@components/Touchable';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { Text, TouchableOpacityProps, View } from 'react-native';

export const ButtonInsertBoleto: FC<TouchableOpacityProps> = ({ ...props }) => {
  return (
    <Touchable style={{ width: '100%' }} {...props}>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: '100%',
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            color: '#585666',
            fontSize: ResponsiveFontScale(14),
          }}
        >
          Inserir código do boleto
        </Text>
      </View>
    </Touchable>
  );
};
