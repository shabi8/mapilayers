import { Component, OnInit } from '@angular/core';
import { LayersService } from '../services/layers.service';


@Component({
  selector: 'app-layers-list-page',
  templateUrl: './layers-list-page.component.html',
  styleUrls: ['./layers-list-page.component.css']
})
export class LayersListPageComponent implements OnInit {


  additionalLayers = [];

  mapLayers = {"Group":0,"LayersInToc":[]};

  layersToAdd = [];

  constructor(private layersService: LayersService) { }

  ngOnInit(): void {
    this.layersService.layerToRemove$.subscribe(layer => {
      this.additionalLayers.push(layer);
    });
    this.layersService.getAdditionalLayers(this.mapLayers).subscribe( data => {
      const response: any = data;
      const layers = response.data.AdditionalLayers;
      Object.keys(layers).map((layerNameIndex, index) => {
        let aLayer = layers[layerNameIndex];
        if (index > 3) {
          this.additionalLayers.push(aLayer);
        }
      });
    });
  }

  onCheckChange(event, layer) {
    if(event.checked) {
      const index = this.additionalLayers.indexOf(layer);
      if( index > -1) {
        this.additionalLayers.splice(index, 1);
      }
      this.layersService.addToLayers(layer);
    }
  }

}

