import type {MarkerType} from 'src/@types/marker';
import MARKERS from 'src/data/markers';

const getAllMarkersFromApi = async (): Promise<MarkerType[]> => {
  return Promise.resolve(MARKERS);
};

const getMarkerByIdFromApi = async (id: number): Promise<MarkerType> => {
  return new Promise((resolve) => {
    const foundMarkerById = MARKERS.find((marker) => marker.id === id);

    if (foundMarkerById) {
      resolve(foundMarkerById);
    } else {
      throw new Error('Marker not found');
    }
  });
};

export {getAllMarkersFromApi, getMarkerByIdFromApi};
