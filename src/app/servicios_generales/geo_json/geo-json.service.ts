import { Injectable } from '@angular/core';
import axios from 'axios';
import { control, geoJSON, Map } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class GeoJsonService {

  constructor() { }
  nombres:string
    geojeson(URL:string, map:Map,  color_linea:string, color_relleno:string, dashArray:string, weight:number){
    
    function style() { 
      return { 
      fillColor:color_relleno,
      weight: weight, 
      opacity: 1, 
      color: color_linea, 
      dashArray: dashArray, 
      fillOpacity: 0.1,
      }; 
      } 
    function bindPopup(feature: any, layer: any) {
      layer.bindPopup(
        "<h4>" +
        feature.properties.NOMBRE_DIV +
        "</h4>"
      );
    }
    axios.get(URL).then(({ data }) => {
       const geoJsonValue = geoJSON(data, {
        style:style,
        // Añadir apartado del popup
        onEachFeature: bindPopup
        

      });
      // const dato = geoJsonValue.onRemove(map)
      
      var overlays = {
        "DIVISIONES" :geoJsonValue,

      };
      var baseLayers = {
        
      };


      control.layers(baseLayers, overlays, { collapsed:false, position:'topleft' }).addTo(map)
  

    });

  }
}
