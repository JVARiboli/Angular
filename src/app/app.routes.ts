import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { ProdutoComponent } from './component/produto-component/produto-component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },          
  { path: 'produtos', component: ProdutoComponent }    
];
