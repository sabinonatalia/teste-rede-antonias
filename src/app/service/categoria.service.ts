import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }
  token = { headers: new HttpHeaders().set('Authorization', environment.token), 
};
getAllCategoria(): Observable<Categoria[]> {
  return this.http.get<Categoria[]>(
    'https://redeantonias.herokuapp.com/categoria',
    this.token 
  );
}

getByIdCategoria(id: number): Observable<Categoria> {
  return this.http.get<Categoria>(
    `https://redeantonias.herokuapp.com/categoria/${id}`,
    this.token
  );
}

getByProdutoCategoria(produto: string): Observable<Categoria[]> {
  return this.http.get<Categoria[]>(
    `https://redeantonias.herokuapp.com/categoria/produto/${produto}`,
    this.token
  );
}
getByChave(chave: string): Observable<Categoria[]> {
  return this.http.get<Categoria[]>(
    `https://redeantonias.herokuapp.com/categoria/chave/${chave}`,
    this.token
  );
}
postCategoria(categoria: Categoria): Observable<Categoria> {
  return this.http.post<Categoria>(
    'https://redeantonias.herokuapp.com/categoria',
    categoria,
    this.token
  );
}

putCategoria(categoria: Categoria): Observable<Categoria> {
  return this.http.put<Categoria>(
    'https://redeantonias.herokuapp.com/categoria',
    categoria,
    this.token
  );
}

deleteCategoria(id: number) {
  return this.http.delete(
    `https://redeantonias.herokuapp.com/produtosservicos/categoria/${id}`,
    this.token
  );
}
}
