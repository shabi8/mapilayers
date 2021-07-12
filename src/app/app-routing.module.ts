import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayersListPageComponent } from './layers-list-page/layers-list-page.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: MapComponent},
  { path: 'additionalLayers', component: LayersListPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
