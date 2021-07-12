import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowlayerService {

  private _layersAddListSource = new Subject<any>();
  layerAdd$ = this._layersAddListSource.asObservable();


  constructor() { }

  addLayer(layersList) {
    this._layersAddListSource.next(layersList);
  }
}
