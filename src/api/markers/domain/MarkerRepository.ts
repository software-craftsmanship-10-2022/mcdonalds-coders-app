import type {MarkerType} from 'src/@types/marker';

export type MarkerRepository = {
  save: (markerType: MarkerType) => Promise<void>;
};
