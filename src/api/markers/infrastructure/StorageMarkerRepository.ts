import type {MarkerType} from 'src/@types/marker';
import {STORAGE} from 'src/config';
import type {MarkerRepository} from '../domain/MarkerRepository';

class StorageMarkerRepository implements MarkerRepository {
  async save(markerType: MarkerType) {
    const order = this.checkMarkerOrFail(markerType.id);

    localStorage.setItem(STORAGE.markers, JSON.stringify(order));

    return Promise.resolve();
  }

  private checkMarkerOrFail(markerId: number): MarkerType {
    const storedMarker = localStorage.getItem(STORAGE.markers);
    if (storedMarker === null) {
      throw new Error();
    }

    return this.parseOrder(storedMarker);
  }

  private parseOrder(storedMarker: string): MarkerType {
    const marker: MarkerType = JSON.parse(storedMarker) as MarkerType;

    return marker;
  }
}

export const storage: MarkerRepository = new StorageMarkerRepository();
