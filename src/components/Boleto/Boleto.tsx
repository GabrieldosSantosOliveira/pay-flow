import { DateZone } from '@services/DateZone';
import { MoneyFormat } from '@services/MoneyFormat';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { View, Text, PixelRatio } from 'react-native';
import { BoletoViewBody } from 'src/dtos/BoletoDto.dto';

import { Touchable } from './../Touchable';
type Props = BoletoViewBody & {
  showModalBoleto: () => void;
};
export const Boleto: FC<Props> = ({ expiry, name, value, showModalBoleto }) => {
  return (
    <Touchable onPress={showModalBoleto}>
      <View
        style={{
          height: PixelRatio.getPixelSizeForLayoutSize(30),
          width: '100%',
          flexDirection: 'column',
          paddingHorizontal: 20,
          gap: 6,
          paddingBottom: PixelRatio.getPixelSizeForLayoutSize(5),
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'Lexend_600SemiBold',
              fontSize: ResponsiveFontScale(16),
              color: '#585666',
            }}
          >
            {name}
          </Text>
          <Text style={{ fontFamily: 'Inter_600SemiBold', color: '#585666' }}>
            {MoneyFormat(value)}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Lexend_400Regular',
            color: '#706E7A',
            fontSize: ResponsiveFontScale(12),
          }}
        >
          Vence em{' '}
          <Text
            style={{
              fontFamily: 'Inter_500Medium',
              color: '#706E7A',
              fontSize: ResponsiveFontScale(12),
            }}
          >
            {DateZone(expiry)}
          </Text>
        </Text>
      </View>
    </Touchable>
  );
};
