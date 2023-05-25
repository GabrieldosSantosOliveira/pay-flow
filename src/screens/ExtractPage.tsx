import { Boleto } from '@components/Boleto/Boleto';
import { BoletoListEmpty } from '@components/Boleto/BoletoListEmpty';
import { Details } from '@components/Boleto/Details';
import { Header } from '@components/Header/Header';
import { HeaderFlatList } from '@components/Header/HeaderFlatList';
import { Loading } from '@components/Loading/Loading';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FC, useState, useRef, useEffect } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BoletoDto, BoletoViewBody } from 'src/dtos/BoletoDto.dto';

const ExtractPageBase: FC = () => {
  const [boletos, setBoletos] = useState<BoletoViewBody[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countOfBoletosPay, setCountOfBoletosPay] = useState<number>(0);
  const [boleto, setBoleto] = useState<BoletoViewBody>();
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);
  const { navigate } = useNavigation();
  const handleDelete = (id: string) => {
    bottomSheetRef.current?.snapToIndex(0);
    setBoletos((prev) => prev.filter((boleto) => boleto.id !== id));
  };
  const insets = useSafeAreaInsets();
  function updateScreenBoleto(id: string) {
    bottomSheetRef.current?.close();
    navigate('Update', { id });
  }
  const renderItem: FC<ListRenderItemInfo<BoletoViewBody>> = ({ item }) => {
    function showModalBoleto() {
      setBoleto(item);
      bottomSheetRef.current?.present();
    }
    return <Boleto {...item} showModalBoleto={showModalBoleto} />;
  };
  useEffect(() => {
    const subscriber = firestore()
      .collection<BoletoDto>('boletos')
      .onSnapshot((snapshot) => {
        if (snapshot) {
          const data = snapshot.docs
            .map((doc) => {
              const boleto = doc.data();
              if (boleto) {
                const { code, created_at, expiry, name, value, paymentStatus } =
                  boleto;
                return {
                  id: doc.id,
                  code,
                  created_at,
                  expiry: new Date(expiry),
                  paymentStatus,
                  name,
                  value,
                } as BoletoViewBody;
              }
            })
            .filter((boleto) => boleto);

          setBoletos(data as BoletoViewBody[] | []);
        }
        setIsLoading(false);
      });
    const subscriberCount = firestore()
      .collection('boletos')
      .where('paymentStatus', '==', true)
      .onSnapshot((snapshot) => {
        if (snapshot) {
          setCountOfBoletosPay(snapshot.size);
        }
      });

    return () => {
      subscriber();
      subscriberCount();
    };
  }, []);
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
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <HeaderFlatList
              subTitle={`${countOfBoletosPay} pagos`}
              title="Meus Extratos"
            />
          )}
          data={boletos}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <BoletoListEmpty title="Você ainda não possui extratos cadastrados" />
          )}
        />
      )}
      <Details
        updateScreenBoleto={updateScreenBoleto}
        handleDelete={handleDelete}
        ref={bottomSheetRef}
        {...boleto}
      />
    </View>
  );
};

export const ExtractPage = gestureHandlerRootHOC(() => (
  <BottomSheetModalProvider>
    <ExtractPageBase />
  </BottomSheetModalProvider>
));
