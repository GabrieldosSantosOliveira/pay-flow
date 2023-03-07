import { ButtonBoletoNotPay } from '@components/Button/ButtonBoletoNotPay';
import { ButtonWarning } from '@components/Button/ButtonWarning';
import { Feather } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { MoneyFormat } from '@services/MoneyFormat';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { memo, forwardRef, ForwardRefRenderFunction } from 'react';
import { View, Text, PixelRatio } from 'react-native';
import { BoletoViewBody } from 'src/dtos/BoletoDto.dto';

type Props = Partial<BoletoViewBody> & {
  handleUpdateStatus: (paymentStatus: boolean, id: string) => void;
  handleDeleteBoleto: (id) => void;
};
const BoletoNotPayBase: ForwardRefRenderFunction<BottomSheetModal, Props> = (
  { name, value, id, handleUpdateStatus, handleDeleteBoleto },
  ref,
) => {
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={[PixelRatio.getPixelSizeForLayoutSize(140)]}
    >
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: ResponsiveFontScale(20),
            fontFamily: 'Lexend_400Regular',
            color: '#585666',
            paddingHorizontal: 75,
          }}
        >
          O boleto{' '}
          <Text
            style={{
              fontFamily: 'Lexend_600SemiBold',
            }}
          >
            {name}
          </Text>{' '}
          no valor de{' '}
          <Text
            style={{
              fontFamily: 'Lexend_600SemiBold',
            }}
          >
            {MoneyFormat(value || 0)}
          </Text>{' '}
          foi pago ?
        </Text>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 24,
            width: '100%',
            gap: 16,
          }}
        >
          <ButtonBoletoNotPay
            onPress={() => handleUpdateStatus(false, id || '')}
            text="Ainda Não"
            type="SECONDARY"
          />
          <ButtonBoletoNotPay
            onPress={() => handleUpdateStatus(true, id || '')}
            text="Sim"
          />
        </View>
        <ButtonWarning
          icon={<Feather name="trash" size={24} color="#E83F5B" />}
          onPress={() => handleDeleteBoleto(id || '')}
          text="Deletar Boleto"
          type="SECONDARY"
        />
      </View>
    </BottomSheetModal>
  );
};
export const BoletoNotPay = memo(forwardRef(BoletoNotPayBase));
