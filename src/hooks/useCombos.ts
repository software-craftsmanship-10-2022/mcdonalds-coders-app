import {useState} from 'react';
import type {ComboCategoryType, ComboType} from 'src/@types/combos';
import {getAllCombosFromApi, getComboDetailByIdFromApi} from '../api/products/combosApi';
import {getSessionStorageItem, setSessionStorageItem} from './useSessionStorage';

const useCombos = () => {
  const [combos, setCombos] = useState<ComboCategoryType[]>([]);

  const getAllCombos = (): void => {
    const combosFromCache = getSessionStorageItem<ComboCategoryType[] | undefined>('combos');

    if (combosFromCache) {
      setCombos(combosFromCache);
      return;
    }

    getAllCombosFromApi()
      .then((combosFromApi) => {
        setCombos(combosFromApi);
        setSessionStorageItem('combos', combosFromApi);
      })
      .catch(console.error);
  };

  const getComboById = async (comboId: string): Promise<ComboType> => {
    return getComboDetailByIdFromApi(comboId);
  };

  return {combos, getAllCombos, getComboById};
};

export default useCombos;
