import type {MarkerType} from 'src/@types/marker';
import MARKERS from 'src/data/markers';
import type {MarkerRepository} from '../domain/MarkerRepository';

export default class StorageMarkerRepository implements MarkerRepository {
  async findAll(): Promise<MarkerType[]> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const markersFromStorage: string | null = sessionStorage.getItem('markers');

    if (markersFromStorage) {
      const markers: MarkerType[] = JSON.parse(markersFromStorage) as MarkerType[];
      return Promise.resolve(markers);
    }

    sessionStorage.setItem('markers', JSON.stringify(MARKERS));
    return Promise.resolve(MARKERS);
  }

  async findById(markerId: number): Promise<MarkerType> {
    const markers = await this.findAll();
    const marker = markers.find((marker) => marker.id === markerId);

    if (!marker) {
      throw new Error(`Marker with id ${markerId} not found`);
    }

    return Promise.resolve(marker);
  }
}
