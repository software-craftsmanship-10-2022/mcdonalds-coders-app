import type {MarkerType} from 'src/@types/marker';
import type {MarkerRepository} from '../domain/MarkerRepository';
import StorageMarkerRepository from '../infrastructure/StorageMarkerRepository';

const findMarkers = async (): Promise<MarkerType[]> => {
  const markerRepository: MarkerRepository = new StorageMarkerRepository();
  return markerRepository.findAll();
};

const findMarkerById = async (markerId: number): Promise<MarkerType> => {
  const markerRepository: MarkerRepository = new StorageMarkerRepository();
  return markerRepository.findById(markerId);
};

export {findMarkers, findMarkerById};
