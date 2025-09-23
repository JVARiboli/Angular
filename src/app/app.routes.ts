import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { AlunoComponent } from './component/aluno-component/aluno-component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },          
  { path: 'alunos', component: AlunoComponent }
];
