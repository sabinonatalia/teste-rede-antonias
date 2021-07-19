import { ProdutosServicos } from './../model/ProdutosServicos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http:HttpClient
  ) { }
  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getByIdProduto(id:number): Observable<ProdutosServicos>{
    return this.http.get<ProdutosServicos>(`https://redeantonias.herokuapp.com/produtosservicos/${id}`,this.token)
  }

  getAllProdutos(): Observable<ProdutosServicos[]>{
    return this.http.get<ProdutosServicos[]>('https://redeantonias.herokuapp.com/produtosservicos', this.token)
  }
  postProdutos(produtos: ProdutosServicos): Observable<ProdutosServicos>{
    return this.http.post<ProdutosServicos>('https://redeantonias.herokuapp.com/produtosservicos', produtos, this.token)
  }

  putProduto(produto:ProdutosServicos) : Observable<ProdutosServicos>{
    return this.http.put<ProdutosServicos>('https://redeantonias.herokuapp.com/produtosservicos', produto, this.token)
  }

  getByNomeProdutosServicos(nome: string): Observable<ProdutosServicos[]>{
    return this.http.get<ProdutosServicos[]>(`https://redeantonias.herokuapp.com/produtosservicos/nome/${nome}`)
  }

  deleteProduto(id:number){
    return this.http.delete(`https://redeantonias.herokuapp.com/produtosservicos/${id}`, this.token)
  }
}
