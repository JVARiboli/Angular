import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { ProdutoComponent } from './component/produto-component/produto-component';
import { LojaComponent } from './component/loja-component/loja-component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },          
  { path: 'produtos', component: ProdutoComponent },
  { path: 'lojas', component: LojaComponent} 
];
