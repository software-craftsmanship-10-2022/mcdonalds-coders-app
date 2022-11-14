import {useState} from 'react';
import type {MarkerType} from 'src/@types/marker';
import {getAllMarkersFromApi} from 'src/api/markers/application/markersApi';
import {getSessionStorageItem, setSessionStorageItem} from './useSessionStorage';

export const useProducts = () => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const getAllMarkers = (): void => {
    const markersFromCache = getSessionStorageItem<MarkerType[] | undefined>('markers');

    if (markersFromCache) {
      setMarkers(markersFromCache);
    }

    if (!markersFromCache) {
      getAllMarkersFromApi()
        .then((markersFromApi) => {
          setMarkers(markersFromApi);
          setSessionStorageItem('markers', markersFromApi);
        })
        .catch(console.error);
    }
  };

  return {
    markers,
    getAllMarkers,
  };
};
