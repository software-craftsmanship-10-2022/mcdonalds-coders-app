import type {MarkerType} from 'src/@types/marker';
import {findMarkerById, findMarkers} from 'src/api/markers/application/markersApi';

export const useMarkers = () => {
  const getAllMarkers = async (): Promise<MarkerType[]> => {
    return Promise.resolve(findMarkers());
  };

  const getMarkerById = async (markerId: number): Promise<MarkerType> => {
    return Promise.resolve(findMarkerById(markerId));
  };

  return {
    getAllMarkers,
    getMarkerById,
  };
};
