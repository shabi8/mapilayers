import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LayersService } from '../services/layers.service';
import { ShowlayerService } from './showlayer.service';


interface layerShow {
  "id": number;
  "name": string;
  "source": {
    "type": string;
    "mapLayerId": number;
  };
  "minScale": number;
  "maxScale": number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  layers = new FormControl();
  layersList = [];
  mapLayers = {"Group":0,"LayersInToc":[]};



  constructor(private layerService: LayersService, private showlayerService: ShowlayerService) { }

  ngOnInit(): void {
    this.layerService.layerToAdd$.subscribe(layer => {
      if(!this.layersList.includes(layer)){
        this.layersList.push(layer);
      }
    });
    this.layerService.getAdditionalLayers(this.mapLayers).subscribe(data => {
      const response: any = data;
      const layers = response.data.AdditionalLayers;
      let layersArray = Object.keys(layers);
      for (let i = 0; i < 4; i++) {
        this.layersList.push(layers[layersArray[i]]);
      }
    });
  }

  selectedLayersChange() {
    let layerListToAdd = [];
    for (let layer of this.layers.value) {
      const addLayer: layerShow = {
        id: layer.officeId,
        name: layer.caption,
        source: {"type":"mapLayer","mapLayerId": layer.officeId},
        minScale: layer.minScale,
        maxScale: layer.maxScale
      }
      layerListToAdd.push(addLayer);
    }
    this.showlayerService.addLayer(layerListToAdd);
  }

  removeLayer(layer) {
    const index = this.layersList.indexOf(layer);
      if( index > -1) {
        this.layersList.splice(index, 1);
      }
      this.layerService.removeLayerFromDropDown(layer);
  }

}
