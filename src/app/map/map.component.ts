import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { ShowlayerService } from '../navbar/showlayer.service';
declare const JSITM: any;
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map;
  overlay;
  layersObjList = []
  showStrinId

  constructor(private showLayerService: ShowlayerService) { }

  ngOnInit(): void {
    this.showLayerService.layerAdd$.subscribe(layersToAddList => {
      if (this.overlay) {
        this.overlay.setMap(null);
        this.overlay = null;
      }
      this.layersObjList = layersToAddList;
      this.toShowString(this.layersObjList);
      this.setGroundLayer();
    });
    const loader = new Loader({
      apiKey: environment.MAP_API_KEY,
    });

    loader.load().then(() => {
      this.map =new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 31.0461, lng: 34.8516 },
        zoom: 8,
      });
    });
  }

  setGroundLayer(){
    const bounds = this.map.getBounds();
    const northEastLat = bounds.getNorthEast().lat(); //north
    const northEastLng = bounds.getNorthEast().lng(); // east
    const southWestLat = bounds.getSouthWest().lat(); // south
    const southWestLng = bounds.getSouthWest().lng(); //west
    const itmNorthEst = JSITM.gpsRef2itmRef(`${northEastLat.toString()} ${northEastLng.toString()}`);
    const itmSouthWst = JSITM.gpsRef2itmRef(`${southWestLat.toString()} ${southWestLng.toString()}`);
    let bboxStr = encodeURIComponent(`${itmNorthEst},${itmSouthWst}`.replace(/\s/g, ','));
    let dynamicLayerString = encodeURIComponent(JSON.stringify(this.layersObjList));
    let showString = encodeURIComponent(this.showStrinId);
    let boximage = `https://ags.govmap.gov.il/proxy/proxy.ashx?http://govmap/arcgis/rest/services/AdditionalData/MapServer/export?dynamicLayers=${dynamicLayerString}&dpi=96&transparent=true&format=png32&layers=${showString}&bbox=${bboxStr}&bboxSR=2039&imageSR=2039&size=714%2C937&f=image`

    const imageBounds = {
      north: northEastLat,
      south: southWestLat,
      east: northEastLng,
      west: southWestLng
    }
    this.overlay = new google.maps.GroundOverlay( boximage , imageBounds);

    this.overlay.setMap(this.map);

  }

  toShowString(layerToShowArray) {
    let showIdList = [];
    for (let layer of layerToShowArray) {
      showIdList.push(layer.id.toString());
    }
    this.showStrinId = `show:${showIdList}`;
  }

}
