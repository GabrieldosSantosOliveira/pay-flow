import LogoInfoBoleto from '@assets/logoInfoBoleto.svg';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { View, PixelRatio, Text } from 'react-native';

import { Touchable } from './Touchable';
interface Props {
  countOfBoletos: number;
}
export const BoletoInfo: FC<Props> = ({ countOfBoletos }) => {
  return (
    <Touchable>
      <View
        style={{
          backgroundColor: '#585666',
          height: PixelRatio.getPixelSizeForLayoutSize(40),
          borderRadius: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 23,
          gap: 20,
        }}
      >
        <LogoInfoBoleto />
        <View style={{ backgroundColor: '#FFFF', width: 1, height: '100%' }} />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: ResponsiveFontScale(13),
              lineHeight: 20,
              color: '#FFFFFF',
            }}
          >
            Você tem {countOfBoletos} boletos cadastrados para pagar
          </Text>
        </View>
      </View>
    </Touchable>
  );
};
