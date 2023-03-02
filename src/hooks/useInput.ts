import { useContext } from 'react';
import { InputContext } from './../contexts/InputContext';
export const useInput = () => useContext(InputContext);
