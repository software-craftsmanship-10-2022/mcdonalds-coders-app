import MARKERS from 'src/data/markers';
import {getAllMarkersFromApi, getMarkerByIdFromApi} from './markersApi';

describe('Given markersApi', () => {
  test('when we call markersApi, then all markers data is resolved', async () => {
    await expect(getAllMarkersFromApi()).resolves.toEqual(MARKERS);
  });

  test('when we call markersApiwith an id, then the specified marker is resolved', async () => {
    const id = 2;
    const mockedFoundMarker = MARKERS.find((marker) => marker.id === id);

    await expect(getMarkerByIdFromApi(id)).resolves.toEqual(mockedFoundMarker);
  });

  test('when we call markersApiwith location, then the specified marker is resolved', async () => {
    const id = 2;
    const mockedFoundMarker = MARKERS.find((marker) => marker.id === id);

    await expect(getMarkerByIdFromApi(id)).resolves.toEqual(mockedFoundMarker);
  });

  test('when we call markersApiwith a not existing id, then throw an error', async () => {
    await expect(getMarkerByIdFromApi(99)).rejects.toThrowError('Marker not found');
  });
});
