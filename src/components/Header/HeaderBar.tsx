import { FC } from 'react';
import { PixelRatio } from 'react-native';
import { View } from 'react-native';

import { BoletoInfo } from './../Boleto/BoletoInfo';
interface Props {
  countOfBoletos: number;
}
export const HeaderBar: FC<Props> = ({ countOfBoletos }) => {
  return (
    <View
      style={{
        height: PixelRatio.getPixelSizeForLayoutSize(20),
        width: '100%',
        backgroundColor: '#FF941A',
        paddingHorizontal: 30,
        marginBottom:
          PixelRatio.getPixelSizeForLayoutSize(40) -
          PixelRatio.getPixelSizeForLayoutSize(15),
      }}
    >
      <BoletoInfo countOfBoletos={countOfBoletos} />
    </View>
  );
};
