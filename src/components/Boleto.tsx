import { DateZone } from '@services/DateZone';
import { MoneyFormat } from '@services/MoneyFormat';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { PixelRatio } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

import { Touchable } from './Touchable';
interface Props {
  nameOfBillet: string;
  valueOfBillet: number;
  maturity: Date;
  codeOfBillet: string;
}
export const Boleto: FC<Props> = ({
  maturity,
  nameOfBillet,
  valueOfBillet,
}) => {
  return (
    <Touchable>
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
            {nameOfBillet}
          </Text>
          <Text style={{ fontFamily: 'Inter_600SemiBold', color: '#585666' }}>
            {MoneyFormat(valueOfBillet)}
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
            {DateZone(maturity)}
          </Text>
        </Text>
      </View>
    </Touchable>
  );
};
