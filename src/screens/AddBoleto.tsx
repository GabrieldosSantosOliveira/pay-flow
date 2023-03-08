import { ButtonTabBar } from '@components/Button/ButtonTabBar';
import { HeaderAddBoleto } from '@components/Header/HeaderAddBoleto';
import { Input } from '@components/Input/Input';
import { InputRoot } from '@components/Input/InputRoot';
import { LineBorder } from '@components/LineBorder';
import { AntDesign, FontAwesome, Ionicons, Octicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
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
import { FC, useRef, useState } from 'react';
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

export interface IForm {
  name: string;
  expiry: string;
  value: string;
  code: string;
}

type ParamList = {
  AddBoleto: {
    code?: string;
  };
};
export const AddBoleto: FC = () => {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateWithoutFormat, setDateWithoutFormat] = useState<Date>();
  const insets = useSafeAreaInsets();
  const { control, handleSubmit, setValue, reset } = useForm<IForm>();
  const { navigate } = useNavigation();
  const ref = useRef<TextInput | null>(null);
  const route = useRoute<RouteProp<ParamList, 'AddBoleto'>>();
  const code = route.params?.code;
  useFocusEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT,
      );
    }
    changeScreenOrientation();
    if (code) {
      setValue('code', code);
    }
  });
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    ref.current?.blur();
  };

  const handleConfirm = (date: Date) => {
    setValue('expiry', DateZone(date));
    setDateWithoutFormat(date);
    hideDatePicker();
  };
  const handleSaveBoleto = async ({ code, name, value }: IForm) => {
    try {
      setIsLoading(true);
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
        .collection('boletos')
        .add({
          name,
          value: Number(value.replace(/\D/g, '')),
          expiry: dateWithoutFormat.toISOString(),
          code,
          paymentStatus: false,
          created_at: firestore.FieldValue.serverTimestamp(),
        });
      Alert.alert('Boleto', 'Boleto registrado com sucesso');
      reset({ code: '', expiry: '', name: '', value: '' });
      navigate('HomePage');
    } catch (error) {
      return Alert.alert('Registrar', 'Não foi possível registrar o boleto');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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
        </View>
      </View>
      <View style={styles.footer}>
        <ButtonTabBar
          type="SECONDARY"
          title="Cancelar"
          onPress={() => navigate('HomePage')}
        />
        <LineBorder />
        <ButtonTabBar
          title="Cadastrar"
          onPress={handleSubmit(handleSaveBoleto)}
          isLoading={isLoading}
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
