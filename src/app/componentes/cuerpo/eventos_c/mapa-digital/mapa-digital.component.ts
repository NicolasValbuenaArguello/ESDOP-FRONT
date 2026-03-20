import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import * as L from 'leaflet';
import { Icon, Map, control, layerGroup, marker, tileLayer } from 'leaflet'
import { MapaService } from 'src/app/servicios_generales/mapa/mapa.service';
import { RutasService } from 'src/app/servicios_generales/mapa/rutas.service';

import { watermark } from './control/control';
import { titulo_subtitulo } from './control/titulos';
import { fullScreenMap } from './control/full-screen-map';
import { filter } from './control/filter';
//import 'leaflet.markercluster';
import html2canvas from "html2canvas";
import { GeoJsonService } from 'src/app/servicios_generales/geo_json/geo-json.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

import * as L from 'leaflet';
import 'leaflet-geometryutil';

import 'leaflet-draw';





@Component({
  selector: 'app-mapa-digital',
  templateUrl: './mapa-digital.component.html',
  styleUrls: ['./mapa-digital.component.css'],

})
export class MapaDigitalComponent implements OnInit {

  map: Map

  info_blica: boolean = true;
  marker_intems = marker([0, 0])
  histr = marker([0, 0])
  inte = marker([0, 0])
  lat: number = 0
  lon: number = 0
  group = layerGroup()
  historico = layerGroup()
  grupo_inteligencia = layerGroup()

  cordenada_x = this.mapa.cordenada_x
  cordenada_y = this.mapa.cordenada_y

  dato_uno = this.mapa.evento
  dato_dos = this.mapa.fecha

  x: number
  y: number
  

  icono: string = "../../../../assets/evento.png"
  icono_paso: string = "../../../../assets/alto.png"
  icono_paso_formal: string = "../../../../assets/minimo.png"
  icono_aetcr: string = "../../../../assets/"
  icono_aetcr_peloton: string = "../../../../assets/"
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  drawnItems = new L.FeatureGroup();
  geojsonExportado: any = null;
  latLngTexto: string = '';
latLngDms: string = '';

  constructor(private mapa: MapaService, private ruta: RutasService, private geojeson: GeoJsonService, private selectores: SelectoresService) {
    ruta.carga(["rutas"])
  }


geoJsonData: any = null; // para exportación

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

ngOnInit(): void {
  // 🔹 Inicializar mapa
  this.map = L.map('map').setView([4.60971, -74.08175], 6);

  // 🔹 Capas base
  const openStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);

  const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, and others'
  });

  const vacio = L.tileLayer('');

  const baseLayers = {
    "Esri World Imagery": esriWorldImagery,
    "OpenStreetMap": openStreetMap,
    "Sin Capa": vacio,
  };

  // 🔹 Controles estándar
  L.control.scale().addTo(this.map);
  L.control.layers(baseLayers).addTo(this.map);
  

  // 🔹 Controles personalizados
  titulo_subtitulo().addTo(this.map);
  watermark().addTo(this.map);
  fullScreenMap().addTo(this.map);

  // 🔹 Cargar GeoJSON externo
  const url = 'http://172.22.2.36:5198/geojeson/DIV_EJC_2025.geojson';
  this.geojeson.geojeson(url, this.map, "#585858", "#00000", "1", 4);

  // 🔹 Capa para elementos dibujados
  this.drawnItems = new L.FeatureGroup();
  this.map.addLayer(this.drawnItems);

  // 🔹 Controles de dibujo (leaflet.pm)
  this.map.pm.addControls({
    position: 'topright',
    drawCircle: false,
    drawMarker: false,
    drawCircleMarker: false,
    drawPolyline: true,
    drawPolygon: true,
    drawRectangle: false,
    cutPolygon: false,
    editMode: false,
    dragMode: false,
    removalMode: true,
    rotateMode: false
  });

  // Eventos de dibujo
  this.map.on('pm:create', (e: any) => this.handlePmCreate(e));
  this.map.on(L.Draw.Event.CREATED, (event: any) => {
    const layer = event.layer;
    this.drawnItems.addLayer(layer);
    this.geoJsonData = this.drawnItems.toGeoJSON();
  });

  // Evento de click (ej: agregar punto manual en coordenadas clickeadas)
  this.map.on('click', (click: { latlng: any }) => this.handleMapClick(click.latlng));

  // 🔹 Mostrar coordenadas en tiempo real
  this.map.on('mousemove', (e: L.LeafletMouseEvent) => {
    const lat = e.latlng.lat.toFixed(6);
    const lng = e.latlng.lng.toFixed(6);
    this.latLngTexto = `${lat}, ${lng}`;
    this.latLngDms = this.toDMS(e.latlng.lat, 'lat') + ' , ' + this.toDMS(e.latlng.lng, 'lng');
  });

  // 🔹 Botones de exportación
  this.agregarBotonesExportacion(this.map);
  this.map.on('mousemove', (e: L.LeafletMouseEvent) => {
  const latDms = this.toDMS(e.latlng.lat, 'lat');
  const lngDms = this.toDMS(e.latlng.lng, 'lng');
  const coords = `${latDms}, ${lngDms}`;
  
  // Mostrarlas en un div flotante
  const coordBox = document.getElementById('coords-box');
  if (coordBox) coordBox.innerText = coords;
});
}
latInput: string = '';
lngInput: string = '';

crearMarkerDesdeFormulario() {
  if (!this.latInput || !this.lngInput) {
    alert('Ingrese latitud y longitud');
    return;
  }

  // Convertir entrada (puede ser decimal o DMS) a decimal
  const lat = this.parseCoordinate(this.latInput, 'lat');
  const lng = this.parseCoordinate(this.lngInput, 'lng');

  if (lat === null || lng === null) {
    alert('Formato de coordenadas inválido');
    return;
  }

  const latDms = this.toDMS(lat, 'lat');
  const lngDms = this.toDMS(lng, 'lng');

  const marker = L.marker([lat, lng], { draggable: true }).addTo(this.map!);
  marker.bindPopup(`
    <b>Coordenadas:</b><br>
    Decimal: ${lat.toFixed(6)}, ${lng.toFixed(6)}<br>
    Geográficas: ${latDms}, ${lngDms}
  `).openPopup();

  // Centrar mapa
  this.map?.setView([lat, lng], 13);
}
parseCoordinate(value: string, type: 'lat' | 'lng'): number | null {
  value = value.trim();

  // Si es decimal simple
  if (!isNaN(Number(value))) {
    return Number(value);
  }

  // Si es DMS (ejemplo: 4°36'35"N)
  const regex = /(\d+)°\s*(\d+)'?\s*(\d+(?:\.\d+)?)?"?\s*([NSEWO])?/i;
  const match = value.match(regex);

  if (!match) return null;

  let degrees = parseFloat(match[1]);
  let minutes = parseFloat(match[2]) || 0;
  let seconds = parseFloat(match[3]) || 0;
  const direction = match[4]?.toUpperCase();

  let decimal = degrees + minutes / 60 + seconds / 3600;

  if (direction === 'S' || direction === 'O' || direction === 'W') {
    decimal *= -1;
  }

  // Validación de rangos
  if (type === 'lat' && (decimal < -90 || decimal > 90)) return null;
  if (type === 'lng' && (decimal < -180 || decimal > 180)) return null;

  return decimal;
}

graficarEventos(data: any[]) {
  if (!Array.isArray(data) || data.length === 0 || !this.map) return;

  this.eliminar(); // ✅ Limpia marcadores anteriores

  const markersGroup = L.featureGroup();

  data.forEach((evento: any) => {
    const lat = parseFloat(evento[16]);
    const lng = parseFloat(evento[17]);
    if (isNaN(lat) || isNaN(lng)) return;

    // 🎨 Determinar color según tipo de operación
    const tipo = (evento[0] || '').toLowerCase();
    const color = 'gold';

    // 📍 Icono tipo chincheta
    const pinIcon = L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const marker = L.marker([lat, lng], { icon: pinIcon });

    // 💬 Popup con estilo elegante
    const popupHtml = `
      <div style="
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        color: #222;
        background: #fff;
        border-radius: 10px;
        padding: 10px 12px;
        box-shadow: 0 3px 8px rgba(0,0,0,0.2);
        max-width: 280px;
      ">
        <h4 style="margin: 0 0 6px; font-size: 15px; color: ${color};">
          📍 ${evento[0] || 'Evento sin nombre'}
        </h4>
        <p style="margin: 4px 0;"><strong>📅 Fecha:</strong> ${evento[1] || 'N/D'}</p>
        <p style="margin: 4px 0;"><strong>🗺 Municipio:</strong> ${evento[7] || 'N/D'}</p>
        <p style="margin: 4px 0;"><strong>🎯 Actor:</strong> ${evento[8] || 'N/D'}</p>
        <p style="margin: 4px 0;"><strong>⚙️ Operación:</strong> ${evento[15] || 'N/D'}</p>
        ${
          evento[19]
            ? `<div style="margin-top:8px; padding:8px; background:#f8f9fa; border-radius:8px; font-style:italic;">
                 ${evento[19]}
               </div>`
            : ''
        }
      </div>
    `;

    marker.bindPopup(popupHtml, { closeButton: true, autoClose: true });
    marker.addTo(markersGroup);
  });

  markersGroup.addTo(this.map);

  // 🔹 Ajustar zoom si hay puntos
  if (markersGroup.getLayers().length > 0) {
    this.map.fitBounds(markersGroup.getBounds().pad(0.2));
  }
}

activarDibujoMarker() {
  if (!this.map) return;

  // Usar leaflet.pm para activar modo marker
  (this.map as any).pm.enableDraw('Marker', {
    markerStyle: { draggable: true }
  });

  // Evento cuando se coloca el marker
  this.map.on('pm:create', (e: any) => {
    if (e.layer instanceof L.Marker) {
      const latlng = e.layer.getLatLng();
      const latDms = this.toDMS(latlng.lat, 'lat');
      const lngDms = this.toDMS(latlng.lng, 'lng');

      e.layer.bindPopup(`
        <b>Coordenadas:</b><br>
        Decimal: ${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}<br>
        Geográficas: ${latDms}, ${lngDms}
      `).openPopup();
    }
  });
}
mostrarFormulario: boolean = false;


toggleFormulario() {
  this.mostrarFormulario = !this.mostrarFormulario;
}

crearMarkerPorCoordenadas(lat: number, lng: number) {
  if (!this.map) return;

  const latDms = this.toDMS(lat, 'lat');
  const lngDms = this.toDMS(lng, 'lng');

  const marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
  marker.bindPopup(`
    <b>Coordenadas:</b><br>
    Decimal: ${lat.toFixed(6)}, ${lng.toFixed(6)}<br>
    Geográficas: ${latDms}, ${lngDms}
  `).openPopup();
}

private agregarBotonesExportacion(map: L.Map): void {
  const CustomControl = L.Control.extend({
    options: { position: 'topright' },

    onAdd: () => {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.style.display = 'flex';
      container.style.flexDirection = 'column'; // <-- ahora vertical
      container.style.background = '#fff';
      container.style.borderRadius = '8px';
      container.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
      container.style.padding = '4px';
      container.style.gap = '6px';

      const crearBoton = (emoji: string, titulo: string, accion: () => void): HTMLButtonElement => {
        const btn = L.DomUtil.create('button', '', container) as HTMLButtonElement;
        btn.innerHTML = emoji;
        btn.title = titulo;

        // Estilos individuales del botón
        btn.style.background = '#f0f0f0';
        btn.style.border = 'none';
        btn.style.borderRadius = '6px';
        btn.style.width = '32px';
        btn.style.height = '32px';
        btn.style.fontSize = '18px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background 0.3s';

        // Efecto hover
        btn.onmouseenter = () => btn.style.background = '#d0d0d0';
        btn.onmouseleave = () => btn.style.background = '#f0f0f0';

        btn.onclick = accion;
        return btn;
      };

      // Cambié la escoba (🧹) por un ícono de papelera 🗑️
      crearBoton('🗑️', 'Borrar mediciones', () => this.borrarMediciones());
      crearBoton('📤', 'Exportar GeoJSON', () => this.exportarGeoJSON());
      crearBoton('📄', 'Exportar Excel', () => this.exportarExcel());

      return container;
    }
  });

  new CustomControl().addTo(map);
}

toDMS(dec: number, kind: 'lat' | 'lng'): string {
  const absolute = Math.abs(dec);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.round((minutesNotTruncated - minutes) * 60 * 100) / 100;

  const direction = kind === 'lat'
    ? (dec >= 0 ? 'N' : 'S')
    : (dec >= 0 ? 'E' : 'W');

  return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
}

borrarMediciones() {
  this.drawnItems.clearLayers();
  this.geoJsonData = null;
}

exportarGeoJSON() {
  if (this.drawnItems.getLayers().length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  const geojson = this.drawnItems.toGeoJSON();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geojson));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "mediciones.geojson");
  dlAnchorElem.click();
}


  private exportarExcel() {
    const geojson = this.drawnItems.toGeoJSON();

    // ✅ Verifica si es un FeatureCollection
    if (!geojson || geojson.type !== 'FeatureCollection' || !Array.isArray((geojson as any).features)) {
      console.warn('No hay datos para exportar o el formato no es válido.');
      return;
    }

    const features = (geojson as GeoJSON.FeatureCollection).features;

    const datos = features.map((feature, index) => {
      return {
        ID: index + 1,
        Tipo: feature.geometry.type,
        Coordenadas: feature.geometry.type !== 'GeometryCollection'
          ? JSON.stringify((feature.geometry as GeoJSON.GeometryObject & { coordinates: any }).coordinates)
          : 'GeometryCollection (no coordenadas directas)',
        Propiedades: JSON.stringify(feature.properties || {}),
      };
    });

    // ✅ Exportar a Excel
    import('xlsx').then(xlsx => {
      const ws = xlsx.utils.json_to_sheet(datos);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Mediciones');
      xlsx.writeFile(wb, 'mediciones.xlsx');
    });
  }


  private handleMapClick(latlng: any): void {
    const lat = latlng.lat;
    const lng = latlng.lng;

    const gLat = parseInt(lat);
    const mLat = (lat - gLat) * 60;
    const sLat = Math.round((mLat - parseInt(mLat.toString())) * 60);

    const gLng = parseInt(lng);
    const mLng = (lng - gLng) * 60;
    const sLng = Math.round((mLng - parseInt(mLng.toString())) * 60);

    this.selectores.coordenadas_lat_g = Math.abs(gLat);
    this.selectores.lati = gLat >= 0 ? 'LN' : 'LS';
    this.selectores.coordenadas_lat_m = Math.abs(Math.round(mLat));
    this.selectores.coordenadas_lat_s = Math.abs(sLat);

    this.selectores.coordenadas_log_g = Math.abs(gLng);
    this.selectores.loti = gLng >= 0 ? 'LO' : 'LW';
    this.selectores.coordenadas_log_n = Math.abs(Math.round(mLng));
    this.selectores.coordenadas_log_s = Math.abs(sLng);
  }

private handlePmCreate(e: any): void {
  const layer = e.layer;

  // ✅ Agrega la geometría creada al grupo drawnItems
  this.drawnItems.addLayer(layer);

  if (layer instanceof L.Polygon) {
    const latlngs = layer.getLatLngs();
    const ring = Array.isArray(latlngs[0]) ? latlngs[0] as L.LatLng[] : latlngs as L.LatLng[];

    const area = L.GeometryUtil.geodesicArea(ring);
    const areaKm2 = (area / 1000000).toFixed(2);

    const center = layer.getBounds().getCenter();
    L.popup()
      .setLatLng(center)
      .setContent(`Área: <b>${areaKm2}</b> km²`)
      .openOn(this.map);

    // ✅ Mostrar área al hacer clic sobre la figura
    layer.on('click', () => {
      L.popup()
        .setLatLng(center)
        .setContent(`Área: <b>${areaKm2}</b> km²`)
        .openOn(this.map);
    });
  }

  if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
    const latlngs = layer.getLatLngs() as L.LatLng[];
    let distance = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
      distance += this.map.distance(latlngs[i], latlngs[i + 1]);
    }
    const distanceKm = (distance / 1000).toFixed(2);

    const mid = latlngs[Math.floor(latlngs.length / 2)];
    L.popup()
      .setLatLng(mid)
      .setContent(`Distancia: <b>${distanceKm}</b> km`)
      .openOn(this.map);

    // ✅ Mostrar distancia al hacer clic sobre la línea
    layer.on('click', () => {
      L.popup()
        .setLatLng(mid)
        .setContent(`Distancia: <b>${distanceKm}</b> km`)
        .openOn(this.map);
    });
  }
}




  crear_point(x: number, y: number, dato_uno: string, dato_dos: string) {
    var greenIcon = new Icon({
      iconUrl: this.icono,
      // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.eliminar()
    this.cordenada_x = x
    this.cordenada_y = y

    this.marker_intems = marker([this.cordenada_x, this.cordenada_y], { icon: greenIcon }).addTo(this.map).bindPopup("<b>" + dato_uno + "</b><br>" + dato_dos).openPopup();

  }

  crear_point_peoloton_eliminado(dato: string[]) {
    var greenIcon = new Icon({
      iconUrl: this.icono,
      // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.remover()
    //for (let index in dato) {

    //var x = parseFloat(dato[index][0])
    //var y = parseFloat(dato[index][1])

    //var dato_uno = dato[index][8] + " - " + dato[index][9]
    //var dato_dos = dato[index][10] + ". " + dato[index][11]
    //this.x = x;
    //this.y = y;
    //this.marker_intems = marker([this.x, this.y], { icon: greenIcon }).addTo(this.map).bindPopup("<b>" + dato_uno + "</b><br>" + dato_dos).openPopup();
    //}


  }

  crear_point_peoloton(x: number, y: number, dato_uno: string, dato_dos: string) {
    var greenIcon = new Icon({
      iconUrl: this.icono,
      // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.x = x;
    this.y = y;


    this.marker_intems = marker([this.x, this.y], { icon: greenIcon }).addTo(this.map).bindPopup("<b>" + dato_uno + "</b><br>" + dato_dos).openPopup();


  }


  crear_point_aetcr_mapa_peloton(datos: String[]) {

    this.icono_aetcr_peloton = this.icono_aetcr_peloton + "peloton.png"

    for (let dato in datos) {

      var greenIcon = new Icon({
        iconUrl: this.icono_aetcr_peloton,
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      this.cordenada_x = parseFloat(datos[dato][1])
      this.cordenada_y = parseFloat(datos[dato][2])

      var dato_uno = `
       
     <table style="border: solid 3px orange;border-radius: 7px; width: 400px"; padding: 5px;>
     <caption><b>UNIDAD <i> ${datos[dato][9]}-${datos[dato][10]}  </i></caption>
     <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
     <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >FECHA</td>
     <td>${datos[dato][3]}</td>
   </tr>
     <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
       <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >HR SOPORTE</td>
       <td>${datos[dato][4]}</td>
     </tr>
 
     <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
     <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >UNIDAD</td>
     <td>${datos[dato][5]} - ${datos[dato][6]} - ${datos[dato][7]} - ${datos[dato][8]} - ${datos[dato][9]}${datos[dato][10]}</td>
   </tr>
   <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
   <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >CDTE</td>
   <td>${datos[dato][11]}. ${datos[dato][12]} <br><b> ${datos[dato][13]} </b> </td>
 </tr>
 <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
 <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >EFECTIVOS</td>
 <td>${datos[dato][13]} - ${datos[dato][14]} - ${datos[dato][15]} - ${datos[dato][16]}</td>
 </tr>

 <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >COORDENADAS</td>
<td>${datos[dato][18]} - ${datos[dato][19]}° ${datos[dato][20]}' ${datos[dato][21]}'' ${datos[dato][22]} - ${datos[dato][23]}° ${datos[dato][24]}' ${datos[dato][25]}''</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >VEREDA</td>
<td>${datos[dato][26]}</td>
</tr>
     </table>
     `

      this.marker_intems = marker([this.cordenada_x, this.cordenada_y], { icon: greenIcon }).addTo(this.map).bindPopup(dato_uno, { maxWidth: 400 }).openPopup().closePopup();

    }
  }
  crear_point_aetcr_mapa(datos: String[]) {


    for (let dato in datos) {

      var nivel = datos[dato][6]
      var icono = ""

      if (nivel === "MUY ALTO") {
        icono = this.icono_aetcr + "muy alto.png"
      }
      if (nivel === "ALTO") {
        icono = this.icono_aetcr + "alto.png"
      }
      if (nivel === "MEDIANO") {
        icono = this.icono_aetcr + "medio.png"
      }
      if (nivel === "BAJO") {
        icono = this.icono_aetcr + "bajo.png"
      }
      if (nivel === "MINIMO") {
        icono = this.icono_aetcr + "minimo.png"
      }
      if (nivel === "NO EJC") {
        icono = this.icono_aetcr + "no ejc.png"
      }

      var greenIcon = new Icon({
        iconUrl: icono,
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      //this.eliminar()
      this.cordenada_x = parseFloat(datos[dato][20])
      this.cordenada_y = parseFloat(datos[dato][21])

      var dato_uno = `
      
    <table style="border: solid 3px orange;border-radius: 7px; width: 400px"; padding: 5px;>
    <caption><b>AETCR <i> ${datos[dato][5]} </i></caption>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >NUMERO</td>
    <td>${datos[dato][3]}</td>
  </tr>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
      <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >NOMBRE</td>
      <td>${datos[dato][5]}</td>
    </tr>

    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >NIVEL</td>
    <td>${datos[dato][6]}</td>
  </tr>
  <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
  <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >DEPARTAMENTO</td>
  <td>${datos[dato][9]}</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >MUNICIPIO</td>
<td>${datos[dato][10]}</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >LUGAR</td>
<td>${datos[dato][11]}</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >COORDENADAS</td>
<td>${datos[dato][12]} - ${datos[dato][13]}° ${datos[dato][14]}' ${datos[dato][15]}'' ${datos[dato][16]} - ${datos[dato][17]}° ${datos[dato][18]}' ${datos[dato][19]}''</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >PERSONAL</td>
<td> <b> HOMBRES: </b> ${datos[dato][8]} <br><b> MUJERES: </b>  ${datos[dato][7]}</td>
</tr>

<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >FOTO</td>
<td>  <img src="http://172.22.2.36:5198${datos[dato][1]}" width="300px" height="auto"> </td>
</tr>
    </table>
    `

      this.marker_intems = marker([this.cordenada_x, this.cordenada_y], { icon: greenIcon }).addTo(this.map).bindPopup(dato_uno, { maxWidth: 400 }).openPopup();

    }
  }
  crear_point_aetcr(x: number, y: number, dato_uno: string, dato_dos: string, nivel: string) {


    if (nivel === "MUY ALTO") {
      this.icono_aetcr = this.icono_aetcr + "muy alto.png"
    }
    if (nivel === "ALTO") {
      this.icono_aetcr = this.icono_aetcr + "alto.png"
    }
    if (nivel === "MEDIANO") {
      this.icono_aetcr = this.icono_aetcr + "medio.png"
    }
    if (nivel === "BAJO") {
      this.icono_aetcr = this.icono_aetcr + "bajo.png"
    }
    if (nivel === "MINIMO") {
      this.icono_aetcr = this.icono_aetcr + "minimo.png"
    }
    if (nivel === "NO EJC") {
      this.icono_aetcr = this.icono_aetcr + "no ejc.png"
    }

    var greenIcon = new Icon({
      iconUrl: this.icono_aetcr,
      // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.eliminar()
    this.cordenada_x = x
    this.cordenada_y = y

    this.marker_intems = marker([this.cordenada_x, this.cordenada_y], { icon: greenIcon }).addTo(this.map).bindPopup("<b>" + dato_uno + "</b><br>" + dato_dos).openPopup();

  }
  crear_point_alertas(alertas: String[]) {
    var greenIcon = new Icon({
      iconUrl: this.icono,
      // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.eliminar()

    for (let i in alertas) {

      // console.log(alertas)

      this.lat = parseFloat(alertas[i][25])
      this.lon = parseFloat(alertas[i][26])

      this.marker_intems = marker([this.lat, this.lon], { icon: greenIcon }).addTo(this.map).bindPopup(`
      
    <table style="border: solid 3px orange;border-radius: 7px; width: 400px"; padding: 5px;>
    <caption><b><i> ${alertas[i][31]} </i></caption>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >RADICADO</td>
    <td>${alertas[i][1]}</td>
  </tr>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
      <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >FECHA</td>
      <td>${alertas[i][27]}</td>
    </tr>

    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >DIVISIÓN</td>
    <td>${alertas[i][5]}</td>
  </tr>
  <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
  <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >DEPARTAMENTO</td>
  <td>${alertas[i][14]}</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >MUNICIPIO</td>
<td>${alertas[i][15]}</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >LUGAR</td>
<td>${alertas[i][16]}</td>
</tr>



    </table>
    `, { maxWidth: 400 })

      this.group.addLayer(this.marker_intems);
    }
    // this.cordenada_x = x
    // this.cordenada_y = y

    // this.marker_intems = marker([this.cordenada_x, this.cordenada_y], { icon: greenIcon }).addTo(this.map).bindPopup("<b>" + dato_uno + "</b><br>" + dato_dos).openPopup();

  }
  crear_point_eventos(alertas: String[]) {


    this.eliminar()


    for (let i in alertas) {


      var nivel = alertas[i][25]
      var icono = ""

      if (nivel === "NEGATIVO") {
        icono = this.icono_aetcr + "alto.png"
      }
      if (nivel === "POSITIVO") {
        icono = this.icono_aetcr + "minimo.png"
      }
      var greenIcon = new Icon({
        iconUrl: icono,
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var lat = alertas[i][12]
      var grados = parseFloat(alertas[i][13])
      var minutos = parseFloat(alertas[i][14])
      var segundos = parseFloat(alertas[i][15])

      var lon = alertas[i][16]
      var grados_lot = parseFloat(alertas[i][17])
      var minutos_lot = parseFloat(alertas[i][18])
      var segundos_lot = parseFloat(alertas[i][19])

      this.lat = grados + minutos / 60 + segundos / 3600
      this.lon = grados_lot + minutos_lot / 60 + segundos_lot / 3600


      if (lat === "N" || lat === "LN") {
        this.lat = this.lat
      } else {
        this.lat = this.lat * -1
      }
      if (lon === "W" || lon === "LW") {
        this.lon = this.lon * -1
      } else {
        this.lon = this.lon
      }

      var numero = parseInt(i) + 1
      var unidad = numero + " - " + alertas[i][6]

      this.marker_intems = marker([this.lat, this.lon], { icon: greenIcon }).addTo(this.map).bindPopup(`
      
    <table style="border: solid 3px orange;border-radius: 7px; width: 400px"; padding: 5px;>
    <caption><b><i> ${alertas[i][22]} </i></caption>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >FECHA</td>
    <td>${alertas[i][1]}</td>
  </tr>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
      <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >HORA</td>
      <td>${alertas[i][2]}</td>
    </tr>

    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >UNIDAD</td>
    <td>${alertas[i][3]}-${alertas[i][5]}-${alertas[i][6]}</td>
  </tr>
  <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
  <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >LUGAR</td>
  <td>${alertas[i][9]} <br> ${alertas[i][10]} <br> ${alertas[i][11]}</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >COORDENADAS</td>
<td>${alertas[i][12]}  ${alertas[i][13]}° ${alertas[i][14]}' ${alertas[i][15]}'' ${alertas[i][16]} ${alertas[i][17]}° ${alertas[i][18]}' ${alertas[i][19]}''
  <br>
  ${this.lat} - ${this.lon}
  </td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >AMENAZA</td>
<td>${alertas[i][20]} <br> ${alertas[i][21]}</td>
</tr>


    </table>
    `, { maxWidth: 400 }).bindTooltip(unidad,
        {
          permanent: true,
          direction: 'right'
        })



      this.group.addLayer(this.marker_intems);
    }
    // this.cordenada_x = x
    // this.cordenada_y = y

    // this.marker_intems = marker([this.cordenada_x, this.cordenada_y], { icon: greenIcon }).addTo(this.map).bindPopup("<b>" + dato_uno + "</b><br>" + dato_dos).openPopup();

  }
  crear_point_boletin(alertas: String[]) {


    this.eliminar()


    for (let i in alertas) {


      var nivel = alertas[i][24]
      var icono = ""

      if (nivel === "NEGATIVO") {
        icono = this.icono_aetcr + "alto.png"
      }
      if (nivel === "POSITIVO") {
        icono = this.icono_aetcr + "minimo.png"
      }
      var greenIcon = new Icon({
        iconUrl: icono,
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var lat = alertas[i][11]
      var grados = parseFloat(alertas[i][12])
      var minutos = parseFloat(alertas[i][13])
      var segundos = parseFloat(alertas[i][14])

      var lon = alertas[i][15]
      var grados_lot = parseFloat(alertas[i][16])
      var minutos_lot = parseFloat(alertas[i][17])
      var segundos_lot = parseFloat(alertas[i][18])

      this.lat = grados + minutos / 60 + segundos / 3600
      this.lon = grados_lot + minutos_lot / 60 + segundos_lot / 3600


      if (lat === "N" || lat === "LN") {
        this.lat = this.lat
      } else {
        this.lat = this.lat * -1
      }
      if (lon === "W" || lon === "LW") {
        this.lon = this.lon * -1
      } else {
        this.lon = this.lon
      }

      var numero = parseInt(i) + 1
      var unidad = numero + " - " + alertas[i][6]
      this.marker_intems = marker([this.lat, this.lon], { icon: greenIcon }).addTo(this.map).bindPopup(`
      
    <table style="border: solid 3px orange;border-radius: 7px; width: 400px"; padding: 5px;>
    <caption><b><i> ${alertas[i][22]} </i></caption>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >FECHA</td>
    <td>${alertas[i][1]}</td>
  </tr>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
      <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >HORA</td>
      <td>${alertas[i][2]}</td>
    </tr>

    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >UNIDAD</td>
    <td>${alertas[i][3]}-${alertas[i][5]}-${alertas[i][6]}</td>
  </tr>
  <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
  <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >LUGAR</td>
  <td>${alertas[i][9]} <br> ${alertas[i][10]} <br> ${alertas[i][11]}</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >COORDENADAS</td>
<td>${alertas[i][12]}  ${alertas[i][13]}° ${alertas[i][14]}' ${alertas[i][15]}'' ${alertas[i][16]} ${alertas[i][17]}° ${alertas[i][18]}' ${alertas[i][19]}''
  <br>
  ${this.lat} - ${this.lon}
  </td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >AMENAZA</td>
<td>${alertas[i][20]} <br> ${alertas[i][21]}</td>
</tr>

    </table>
    `, { maxWidth: 400 }).bindTooltip(unidad,
        {
          permanent: true,
          direction: 'right'
        })



      this.group.addLayer(this.marker_intems);
    }
    // this.cordenada_x = x
    // this.cordenada_y = y

    // this.marker_intems = marker([this.cordenada_x, this.cordenada_y], { icon: greenIcon }).addTo(this.map).bindPopup("<b>" + dato_uno + "</b><br>" + dato_dos).openPopup();

  }



  crear_point_pasos(alertas: String[]) {
    const greenIcon = new Icon({
      iconUrl: this.icono_paso,
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const greenIcon_unidad = new Icon({
      iconUrl: this.icono_aetcr_peloton + "/peloton.png",
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    this.eliminar();

    for (let i = 0; i < alertas.length; i++) {
      // Coordenadas del PASO
      const latRef = alertas[i][5];
      const lat = parseFloat(alertas[i][6]) + parseFloat(alertas[i][7]) / 60 + parseFloat(alertas[i][8]) / 3600;
      const lonRef = alertas[i][9];
      const lon = parseFloat(alertas[i][10]) + parseFloat(alertas[i][11]) / 60 + parseFloat(alertas[i][12]) / 3600;

      this.lat = (latRef === 'S' || latRef === 'LS') ? -lat : lat;
      this.lon = (lonRef === 'W' || lonRef === 'LW') ? -lon : lon;

      const pasoMarker = marker([this.lat, this.lon], { icon: greenIcon }).addTo(this.map).bindPopup(`
      <table style="border: solid 3px orange; border-radius: 7px; width: 400px; padding: 5px;">
        <caption><b><i>${alertas[i][3]}</i></b></caption>
        <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">FECHA</td><td>${alertas[i][1]}</td></tr>
        <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">PASO</td><td>${alertas[i][2]} - ${alertas[i][3]}</td></tr>
        <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">TIPO</td><td>${alertas[i][4]}</td></tr>
        <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">PAÍS</td><td>${alertas[i][13]}</td></tr>
        <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">DEPARTAMENTO</td><td>${alertas[i][14]}</td></tr>
        <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">MUNICIPIO</td><td>${alertas[i][15]}</td></tr>
        <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">RESPONSABILIDAD</td><td>${alertas[i][16]}</td></tr>
      </table>
    `, { maxWidth: 400 });

      this.group.addLayer(pasoMarker);

      // Coordenadas de la UNIDAD
      const unidLatRef = alertas[i][26];
      const unidLat = parseFloat(alertas[i][27]) + parseFloat(alertas[i][28]) / 60 + parseFloat(alertas[i][29]) / 3600;
      const unidLonRef = alertas[i][30];
      const unidLon = parseFloat(alertas[i][31]) + parseFloat(alertas[i][32]) / 60 + parseFloat(alertas[i][33]) / 3600;

      if (!isNaN(unidLat) && !isNaN(unidLon)) {
        this.lat = (unidLatRef === 'S' || unidLatRef === 'LS') ? -unidLat : unidLat;
        this.lon = (unidLonRef === 'W' || unidLonRef === 'LW') ? -unidLon : unidLon;

        const unidadMarker = marker([this.lat, this.lon], { icon: greenIcon_unidad }).addTo(this.map).bindPopup(`
        <table style="border: solid 3px orange; border-radius: 7px; width: 400px; padding: 5px;">
          <caption><b><i>${alertas[i][3]}</i></b></caption>
          <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">FECHA</td><td>${alertas[i][1]}</td></tr>
          <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">UNIDAD</td><td>${alertas[i][17]} - ${alertas[i][18]} - ${alertas[i][19]}</td></tr>
          <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">INDICATIVO</td><td>${alertas[i][20]}</td></tr>
          <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">CDTE</td><td>${alertas[i][21]}</td></tr>
          <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">EFECTIVOS</td><td>${alertas[i][22]} - ${alertas[i][23]} - ${alertas[i][24]} - ${alertas[i][25]}</td></tr>
          <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">COORDENADAS</td>
            <td>${alertas[i][26]} - ${alertas[i][27]}° ${alertas[i][28]}' ${alertas[i][29]}'' <br> 
                ${alertas[i][30]} - ${alertas[i][31]}° ${alertas[i][32]}' ${alertas[i][33]}''</td>
          </tr>
          <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">DISTANCIA REPORTADA</td><td>${alertas[i][34]}</td></tr>
          <tr style="background-color: #d2d2d2;"><td style="background-color: #767676; color:white;">EVENTOS ÚLTIMAS 24 HORAS</td><td>${alertas[i][35]}</td></tr>
        </table>
      `, { maxWidth: 400 });

        this.group.addLayer(unidadMarker);
      }
    }
  }


  crear_point_pasos_directiva(alertas: String[]) {
    var greenIcon = new Icon({
      iconUrl: this.icono_paso,
      // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var greenIcon_unidad = new Icon({
      iconUrl: this.icono_paso_formal,
      // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.eliminar()

    for (let i in alertas) {

      var lat = parseFloat(alertas[i][13])
      var lon = parseFloat(alertas[i][14])

      if (alertas[i][11] === "Formal") {
        var greenIcon_2 = greenIcon_unidad

      } else {
        var greenIcon_2 = greenIcon

      }

      this.marker_intems = marker([lat, lon], { icon: greenIcon_2 }).addTo(this.map).bindPopup(`
      
    <table style="border: solid 3px orange;border-radius: 7px; width: 400px"; padding: 5px;>
    <caption><b><i> ${alertas[i][7]} </i></caption>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >Paso</td>
    <td>${alertas[i][1]}</td>
  </tr>

    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >TIPO</td>
    <td>${alertas[i][11]}</td>
  </tr>
  <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
  <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >PAIS</td>
  <td>${alertas[i][10]}</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >DEPARTAMENTO</td>
<td>${alertas[i][9]}</td>
</tr>
<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >MUNICIPIO</td>
<td>${alertas[i][8]}</td>
</tr>

<tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
<td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >RESPONSABILIDAD</td>
<td>${alertas[i][12]}</td>
</tr>
    </table>
    `, { maxWidth: 400 })

      this.lat = 0
      this.lon = 0

      var unid_lat = alertas[i][26]
      var unid_grados = parseFloat(alertas[i][27])
      var unid_minutos = parseFloat(alertas[i][28])
      var unid_segundos = parseFloat(alertas[i][29])

      var unid_lon = alertas[i][30]
      var unid_grados_lot = parseFloat(alertas[i][31])
      var unid_minutos_lot = parseFloat(alertas[i][32])
      var unid_segundos_lot = parseFloat(alertas[i][33])

      this.lat = unid_grados + unid_minutos / 60 + unid_segundos / 3600
      this.lon = unid_grados_lot + unid_minutos_lot / 60 + unid_segundos_lot / 3600

      if (!Number.isNaN(this.lat) && !Number.isNaN(this.lon)) {

        if (unid_lat === "LN" || unid_lat === "N") {
          this.lat = this.lat
        } else {
          this.lat = this.lat * -1
        }
        if (unid_lon === "LW" || unid_lon === "W") {
          this.lon = this.lon * -1
        } else {
          this.lon = this.lon
        }


        this.marker_intems = marker([this.lat, this.lon], { icon: greenIcon_unidad }).addTo(this.map).bindPopup(`
      
      <table style="border: solid 3px orange;border-radius: 7px; width: 400px"; padding: 5px;>
      <caption><b><i> ${alertas[i][3]} </i></caption>
      <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
      <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >FECHA</td>
      <td>${alertas[i][1]}</td>
    </tr>
      <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
        <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >UNIDAD</td>
        <td>${alertas[i][17]} - ${alertas[i][18]} - ${alertas[i][19]}</td>
      </tr>
  
      <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
      <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >INDICATIVO</td>
      <td>${alertas[i][20]}</td>
    </tr>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
    <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >CDTE</td>
    <td>${alertas[i][21]}</td>
  </tr>
  <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
  <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >EFECTIVOS</td>
  <td>${alertas[i][22]} - ${alertas[i][23]} - ${alertas[i][24]} - ${alertas[i][25]}</td>
  </tr>
  <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
  <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >COORDENADAS</td>
  <td>${alertas[i][26]} - ${alertas[i][27]}° ${alertas[i][28]} ' ${alertas[i][29]}'' <br>  ${alertas[i][30]} - ${alertas[i][31]}° ${alertas[i][32]} ' ${alertas[i][33]}''</td>
  </tr>
  
  <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
  <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >DISTANCIA REPORTADA</td>
  <td>${alertas[i][34]}</td>
  </tr>
    <tr style=" border-radius: 3px; background-color: #d2d2d2; color:rgb(53, 53, 53); padding: 3px;">
  <td style="border: solid 1px whitesmoke; border-radius: 5px; background-color: #767676; color:whitesmoke"; >EVENTOS ULTIMAS 24 HORAS</td>
  <td>${alertas[i][35]}</td>
  </tr>
      </table>
      `, { maxWidth: 400 })


      }

      this.group.addLayer(this.marker_intems);
    }
    // this.cordenada_x = x
    // this.cordenada_y = y

    // this.marker_intems = marker([this.cordenada_x, this.cordenada_y], { icon: greenIcon }).addTo(this.map).bindPopup("<b>" + dato_uno + "</b><br>" + dato_dos).openPopup();

  }

  eliminar() {
    this.map.removeLayer(this.marker_intems)
  }
  remover() {
    this.marker_intems.onRemove(this.map)
  }
  descargar_imagen() {

    html2canvas(this.screen.nativeElement).then(canvas => {

      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });
  }
}
