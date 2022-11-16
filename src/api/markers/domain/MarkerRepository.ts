import type {MarkerType} from 'src/@types/marker';

export type MarkerRepository = {
  findAll: () => Promise<MarkerType[]>;
  findById: (markerId: number) => Promise<MarkerType>;
};
