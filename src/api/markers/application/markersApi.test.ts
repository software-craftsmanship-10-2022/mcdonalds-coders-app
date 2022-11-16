import MARKERS from 'src/data/markers';
import {findMarkerById, findMarkers} from './markersApi';

describe('Given markersApi', () => {
  test('when we call markersApi, then all markers data is resolved', async () => {
    await expect(findMarkers()).resolves.toEqual(MARKERS);
  });

  test('when we call markersApiwith an id, then the specified marker is resolved', async () => {
    const id = 2;
    const mockedFoundMarker = MARKERS.find((marker) => marker.id === id);

    await expect(findMarkerById(id)).resolves.toEqual(mockedFoundMarker);
  });

  test('when we call markersApiwith location, then the specified marker is resolved', async () => {
    const id = 2;
    const mockedFoundMarker = MARKERS.find((marker) => marker.id === id);

    await expect(findMarkerById(id)).resolves.toEqual(mockedFoundMarker);
  });

  test('when we call markersApiwith a not existing id, then throw an error', async () => {
    await expect(async () => findMarkerById(99)).rejects.toThrowError();
  });
});
