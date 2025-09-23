import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlunoModel } from '../models/aluno-model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private baseUrl = 'http://localhost:8080/aluno';

  constructor(private http: HttpClient) { }

  listar(): Observable<AlunoModel[]> {
    return this.http.get<AlunoModel[]>(`${this.baseUrl}/listar`);
  }

  salvar(aluno: AlunoModel): Observable<AlunoModel> {
    return this.http.post<AlunoModel>(`${this.baseUrl}/salvar`, aluno);
  }

  editar(id: string, aluno: AlunoModel): Observable<AlunoModel> {
    return this.http.put<AlunoModel>(`${this.baseUrl}/editar/${id}`, aluno);
  }

  apagar(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/apagar/${id}`, { responseType: 'text' as 'json' });
  }

  buscarPorId(id: string): Observable<AlunoModel> {
    return this.http.get<AlunoModel>(`${this.baseUrl}/buscar/${id}`);
  }
}
