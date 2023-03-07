import { ButtonWarning } from '@components/Button/ButtonWarning';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import { DateZone } from '@services/DateZone';
import { MoneyFormat } from '@services/MoneyFormat';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { memo, forwardRef, ForwardRefRenderFunction } from 'react';
import { View, Text } from 'react-native';
import { BoletoViewBody } from 'src/dtos/BoletoDto.dto';

import { ButtonSecondary } from './../Button/ButtonSecondary';
import { DescriptionLine } from './../DescriptionLine';
import { DescriptionLinePay } from './../DescriptionLinePay';
type Props = Partial<BoletoViewBody> & {
  handleDelete: (id: string) => void;
  updateScreenBoleto: (id: string) => void;
};
const DetailsBase: ForwardRefRenderFunction<BottomSheetModal, Props> = (
  {
    expiry,
    name,
    paymentStatus,
    value,
    code,
    id,
    handleDelete,
    updateScreenBoleto,
  },
  ref,
) => {
  const handleDeleteBoleto = () => {
    if (id) {
      firestore().collection('boletos').doc(id).delete();
      handleDelete(id);
    }
  };

  return (
    <BottomSheetModal ref={ref} snapPoints={['60%']}>
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
        <ButtonSecondary
          onPress={() => updateScreenBoleto(id || '')}
          text="Atualizar"
        />
        <ButtonWarning onPress={handleDeleteBoleto} text="Deletar" />
      </View>
    </BottomSheetModal>
  );
};
export const Details = memo(forwardRef(DetailsBase));
