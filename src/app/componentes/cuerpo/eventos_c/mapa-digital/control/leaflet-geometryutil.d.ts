// src/typings/leaflet-geometryutil.d.ts

import * as L from 'leaflet';

declare module 'leaflet' {
  namespace GeometryUtil {
    /**
     * Calcula el área geodésica (en metros cuadrados) de un polígono definido por puntos.
     * @param latLngs Arreglo de coordenadas que definen el polígono
     */
    function geodesicArea(latLngs: L.LatLng[]): number;
  }
}
