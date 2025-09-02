import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoModel } from '../model/produto-model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API_URL = 'http://localhost:8080/produtos'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<ProdutoModel[]> {
    return this.http.get<ProdutoModel[]>(`${this.API_URL}/listar`);
  }
  
  buscarPorId(id: string): Observable<ProdutoModel> {
    return this.http.get<ProdutoModel>(`${this.API_URL}/buscar/${id}`);
  }

  salvar(ProdutoModel: Omit<ProdutoModel, 'id'>): Observable<ProdutoModel> {
    return this.http.post<ProdutoModel>(`${this.API_URL}/salvar`, ProdutoModel);
  }

  atualizar(id: string, ProdutoModel: Omit<ProdutoModel, 'id'>): Observable<ProdutoModel> {
    return this.http.put<ProdutoModel>(`${this.API_URL}/editar/${id}`, ProdutoModel);
  }

  apagar(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/apagar/${id}`, { responseType: 'text' });
  }
}