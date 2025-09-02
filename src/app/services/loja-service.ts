import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LojaModel } from '../model/loja-model'

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  private readonly API_URL = 'http://localhost:8080/lojas'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<LojaModel[]> {
    return this.http.get<LojaModel[]>(`${this.API_URL}/listar`);
  }
  
  buscarPorId(id: string): Observable<LojaModel> {
    return this.http.get<LojaModel>(`${this.API_URL}/buscar/${id}`);
  }

  salvar(loja: Omit<LojaModel, 'id'>): Observable<LojaModel> {
    return this.http.post<LojaModel>(`${this.API_URL}/salvar`, loja);
  }

  atualizar(id: string, loja: Omit<LojaModel, 'id'>): Observable<LojaModel> {
    return this.http.put<LojaModel>(`${this.API_URL}/editar/${id}`, loja);
  }

  apagar(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/apagar/${id}`, { responseType: 'text' });
  }

  buscarPorNome(nomeBusca: string): Observable<LojaModel[]> {
    const params = new HttpParams().set('nomeBusca', nomeBusca);
    return this.http.get<LojaModel[]>(`${this.API_URL}/buscar-por-nome`, { params });
  }

  buscarPorDescricao(descricaoBusca: string): Observable<LojaModel[]> {
    const params = new HttpParams().set('descricaoBusca', descricaoBusca);
    return this.http.get<LojaModel[]>(`${this.API_URL}/buscar-por-descricao`, { params });
  }
}