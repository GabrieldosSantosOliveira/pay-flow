import BottomSheet from '@gorhom/bottom-sheet';
import { DateZone } from '@services/DateZone';
import { MoneyFormat } from '@services/MoneyFormat';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import {
  memo,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { BoletoViewBody } from 'src/dtos/BoletoDto.dto';

import { ButtonSecondary } from './../Button/ButtonSecondary';
import { DescriptionLine } from './../DescriptionLine';
import { DescriptionLinePay } from './../DescriptionLinePay';

const BoletoIsPayBase: ForwardRefRenderFunction<
  BottomSheet,
  Partial<BoletoViewBody>
> = ({ expiry, name, paymentStatus, value, code }, ref) => {
  const { height } = useWindowDimensions();
  const [snapPoints, setSnapPoints] = useState<Array<number | string>>([1]);

  useEffect(() => {
    setSnapPoints([1, height * 0.59]);
  }, []);
  return (
    <BottomSheet ref={ref} index={0} snapPoints={snapPoints}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: ResponsiveFontScale(18),
            fontFamily: 'Lexend_600SemiBold',
            color: '#B1B0B8',
          }}
        >
          {name}
        </Text>

        <DescriptionLine
          title="Vencimento"
          subTitle={DateZone(expiry || new Date())}
        />
        <DescriptionLine title="Valor" subTitle={MoneyFormat(value || 0)} />

        <DescriptionLinePay
          type={paymentStatus ? 'SUCCESS' : 'WARNING'}
          title="Status do Pagamento"
          subTitle={paymentStatus ? 'Realizado' : 'Não realizado'}
        />
        <DescriptionLine title="Código" subTitle={code || ''} />
        <ButtonSecondary onPress={console.log} text="Atualizar" />
      </View>
    </BottomSheet>
  );
};
export const BoletoIsPay = memo(forwardRef(BoletoIsPayBase));
