import { ButtonTabBar } from '@components/Button/ButtonTabBar';
import { HeaderAddBoleto } from '@components/Header/HeaderAddBoleto';
import { Input } from '@components/Input/Input';
import { InputRoot } from '@components/Input/InputRoot';
import { LineBorder } from '@components/LineBorder';
import { Loading } from '@components/Loading/Loading';
import { AntDesign, FontAwesome, Ionicons, Octicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { DateZone } from '@services/DateZone';
import { MoneyFormat } from '@services/MoneyFormat';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import * as ScreenOrientation from 'expo-screen-orientation';
import { FC, useCallback, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  KeyboardAvoidingView,
  PixelRatio,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BoletoDto, BoletoViewBody } from 'src/dtos/BoletoDto.dto';
export interface IForm {
  name: string;
  expiry: string;
  value: string;
  code: string;
  paymentStatus: boolean;
}
type ParamList = {
  Update: {
    id: string;
  };
};

export const Update: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const route = useRoute<RouteProp<ParamList, 'Update'>>();
  const { id } = route.params;
  const [dateWithoutFormat, setDateWithoutFormat] = useState<Date>();
  const [boleto, setBoleto] = useState<BoletoViewBody | null>(null);

  const { control, handleSubmit, setValue, reset } = useForm<IForm>({});
  const { navigate } = useNavigation();

  const insets = useSafeAreaInsets();
  const ref = useRef<TextInput | null>(null);
  const onMount = useCallback(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT,
        );
        const response = await firestore()
          .collection<BoletoDto>('boletos')
          .doc(id)
          .get();
        const boleto = response.data();
        if (boleto) {
          const { code, created_at, expiry, name, paymentStatus, value } =
            boleto;
          setBoleto({
            code,
            created_at,
            expiry: new Date(expiry),
            id,
            name,
            value,
            paymentStatus,
          });
          setValue('code', code);
          setDateWithoutFormat(new Date(expiry));
          setValue('expiry', DateZone(new Date(expiry)));
          setValue('name', name);
          setValue('paymentStatus', paymentStatus);
          setValue('value', MoneyFormat(value));
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
    return () => {
      reset({ code: '', expiry: '', name: '', paymentStatus: true, value: '' });
    };
  }, [id]);
  useFocusEffect(onMount);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    ref.current?.blur();
  };

  const handleConfirm = (date: Date) => {
    setValue('expiry', DateZone(date));
    setDateWithoutFormat(date);
    hideDatePicker();
  };
  const handleUpdateBoleto = async ({
    code,
    name,
    value,
    paymentStatus,
  }: IForm) => {
    try {
      setIsLoadingUpdate(true);
      if (!code) {
        return Alert.alert('Preencha o código de barras');
      }

      if (!dateWithoutFormat) {
        return Alert.alert('Preencha a data de vencimento');
      }
      if (!name) {
        return Alert.alert('Preencha o nome do boleto');
      }
      if (!value) {
        return Alert.alert('Preencha o valor do boleto');
      }
      if (Number(value.replace(/\D/g, '') || 0) <= 0) {
        return Alert.alert('Preencha o valor do boleto');
      }
      await firestore()
        .collection<BoletoDto>('boletos')
        .doc(id)
        .update({
          name,
          value: Number(value.replace(/\D/g, '')),
          expiry: dateWithoutFormat.toISOString(),
          code,
          paymentStatus,
          created_at: firestore.FieldValue.serverTimestamp(),
        });
      Alert.alert('Boleto', 'Boleto atualizado com sucesso');
      navigate('HomePage');
    } catch (error) {
      return Alert.alert('Registrar', 'Não foi possível registrar o boleto');
    } finally {
      setIsLoadingUpdate(false);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {!isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }}
        >
          <HeaderAddBoleto />
          <Text style={styles.header}>Preencha os dados do boleto</Text>
          <View style={styles.form}>
            <InputRoot _focus={styles.inputFocus} style={styles.inputBorder}>
              <AntDesign name="filetext1" size={24} color="#FF941A" />
              <LineBorder />
              <Controller
                name="name"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="Nome do boleto"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </InputRoot>
            <InputRoot _focus={styles.inputFocus} style={styles.inputBorder}>
              <Octicons name="x-circle" size={24} color="#FF941A" />
              <LineBorder />
              <Controller
                name="expiry"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="Vencimento"
                    ref={ref}
                    onBlur={onBlur}
                    onFocus={() => {
                      setDatePickerVisibility(true);
                    }}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </InputRoot>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={boleto?.expiry || new Date()}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <InputRoot _focus={styles.inputFocus} style={styles.inputBorder}>
              <Ionicons name="md-wallet-outline" size={24} color="#FF941A" />
              <LineBorder />
              <Controller
                name="value"
                control={control}
                defaultValue="0"
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="Valor"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={MoneyFormat(Number(value.replace(/\D/g, '')) || 0)}
                    keyboardType="number-pad"
                  />
                )}
              />
            </InputRoot>
            <InputRoot _focus={styles.inputFocus} style={styles.inputBorder}>
              <FontAwesome name="barcode" size={24} color="#FF941A" />
              <LineBorder />
              <Controller
                name="code"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="Código"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="number-pad"
                  />
                )}
              />
            </InputRoot>
            <Text>Status de Pagamento</Text>
            <Controller
              name="paymentStatus"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <Picker
                  onBlur={onBlur}
                  onValueChange={(value) => {
                    onChange(value);
                  }}
                  selectedValue={value}
                  style={styles.inputBorder}
                  placeholder="Status do pagamento"
                >
                  <Picker.Item
                    label="Pagamento Realizado"
                    value={true}
                    style={{ backgroundColor: '#bbf7d0' }}
                  />
                  <Picker.Item
                    label="Não pago"
                    value={false}
                    style={{ backgroundColor: '#f87171' }}
                  />
                </Picker>
              )}
            />
          </View>
        </View>
      ) : (
        <Loading />
      )}
      <View style={styles.footer}>
        <ButtonTabBar
          type="SECONDARY"
          title="Cancelar"
          onPress={() => navigate('HomePage')}
        />
        <LineBorder />
        <ButtonTabBar
          title="Atualizar"
          onPress={handleSubmit(handleUpdateBoleto)}
          isLoading={isLoadingUpdate}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  header: {
    fontFamily: 'Lexend_600SemiBold',
    textAlign: 'center',
    fontSize: ResponsiveFontScale(18),
    color: '#585666',
    paddingHorizontal: 90,
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  inputFocus: {
    borderColor: '#E3E3E6',
    borderWidth: 1,
  },
  inputBorder: {
    borderBottomColor: '#E3E3E6',
    borderBottomWidth: 1,
  },
  footer: {
    flexDirection: 'row',
    borderTopColor: '#E3E3E6',
    borderTopWidth: 1,
    height: PixelRatio.getPixelSizeForLayoutSize(20),
    position: 'absolute',
    width: '100%',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
