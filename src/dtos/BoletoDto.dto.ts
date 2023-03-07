import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
export interface BoletoDto {
  name: string;
  expiry: string;
  value: number;
  code: string;
  paymentStatus: boolean;
  created_at: FirebaseFirestoreTypes.Timestamp;
}
export interface BoletoViewBody {
  id: string;
  paymentStatus: boolean;
  name: string;
  expiry: Date;
  value: number;
  code: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
}
