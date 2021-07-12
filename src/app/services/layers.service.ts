import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LayersService {

  private getAdditionalLayersUrl: string = "https://ags.govmap.gov.il/Layers/GetAdditionalLayers";

  private _layerToAddSource = new Subject<any>();
  layerToAdd$ = this._layerToAddSource.asObservable();

  private _layerToRemoveSource = new Subject<any>();
  layerToRemove$ = this._layerToRemoveSource.asObservable();


  constructor(private http: HttpClient) { }

  getAdditionalLayers(payload) {
    return this.http.post(this.getAdditionalLayersUrl, payload);
  }

  addToLayers(layer) {
    this._layerToAddSource.next(layer);
  }

  removeLayerFromDropDown(layer) {
    this._layerToRemoveSource.next(layer);
  }

}


