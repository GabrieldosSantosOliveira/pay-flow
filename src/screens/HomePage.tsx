import { Boleto } from '@components/Boleto/Boleto';
import { BoletoListEmpty } from '@components/Boleto/BoletoListEmpty';
import { BoletoNotPay } from '@components/Boleto/BoletoNotPay';
import { Details } from '@components/Boleto/Details';
import { Header } from '@components/Header/Header';
import { HeaderBar } from '@components/Header/HeaderBar';
import { HeaderFlatList } from '@components/Header/HeaderFlatList';
import { Loading } from '@components/Loading/Loading';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FC, useState, useEffect, useRef, useCallback } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BoletoDto, BoletoViewBody } from 'src/dtos/BoletoDto.dto';
const HomePageBase: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [boletos, setBoletos] = useState<BoletoViewBody[]>([]);
  const [countOfBoletos, setCountOfBoletos] = useState<number>(0);
  const [boleto, setBoleto] = useState<BoletoViewBody | null>(null);
  const boletoNotPay = boletos.filter(
    ({ expiry, paymentStatus }) =>
      paymentStatus === false && expiry <= new Date(),
  )[0];
  const { navigate } = useNavigation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetRefBoletoNotPay = useRef<BottomSheetModal>(null);
  const handleUpdateStatus = (paymentStatus: boolean, id: string) => {
    if (id) {
      firestore()
        .collection<BoletoDto>('boletos')
        .doc(id)
        .update({ paymentStatus });
      bottomSheetRefBoletoNotPay.current?.close();
    }
  };
  const handleDelete = (id: string) => {
    bottomSheetRef.current?.snapToIndex(0);
    setBoletos((prev) => prev.filter((boleto) => boleto.id !== id));
  };
  const handleDeleteBoleto = (id: string) => {
    bottomSheetRefBoletoNotPay.current?.close();
    firestore().collection('boletos').doc(id).delete();
  };
  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (boletoNotPay) {
      bottomSheetRefBoletoNotPay.current?.present();
    }
  }, [boletos]);
  function updateScreenBoleto(id: string) {
    bottomSheetRef.current?.close();
    navigate('Update', { id });
  }
  useEffect(() => {
    const subscriber = firestore()
      .collection<BoletoDto>('boletos')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const boleto = doc.data();
          const { code, created_at, expiry, name, value, paymentStatus } =
            boleto;
          return {
            id: doc.id,
            code,
            created_at,
            paymentStatus,
            expiry: new Date(expiry),
            name,
            value,
          };
        });
        setBoletos(data);
        setCountOfBoletos(snapshot.size);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);
  const renderItem: FC<ListRenderItemInfo<BoletoViewBody>> = useCallback(
    ({ item }) => {
      function showModalBoleto() {
        setBoleto(item);
        bottomSheetRef.current?.present();
      }

      return <Boleto {...item} showModalBoleto={showModalBoleto} />;
    },
    [],
  );
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingTop: insets.top,
      }}
    >
      <Header />
      <HeaderBar countOfBoletos={countOfBoletos} />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          ListHeaderComponent={() => <HeaderFlatList title="Meus Boletos" />}
          data={boletos}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <BoletoListEmpty title="Você ainda não possui boletos cadastrados" />
          )}
        />
      )}
      <Details
        updateScreenBoleto={updateScreenBoleto}
        handleDelete={handleDelete}
        ref={bottomSheetRef}
        {...boleto}
      />
      <BoletoNotPay
        handleDeleteBoleto={handleDeleteBoleto}
        handleUpdateStatus={handleUpdateStatus}
        ref={bottomSheetRefBoletoNotPay}
        {...boletoNotPay}
      />
    </View>
  );
};
export const HomePage = gestureHandlerRootHOC(() => (
  <BottomSheetModalProvider>
    <HomePageBase />
  </BottomSheetModalProvider>
));
