import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  /*Entrar, cadastrar, atualizar e deletar */

  getByIdUsuario(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://redeantonias.herokuapp.com/usuario/${id}`,this.token)
  }

  entrar(userLogin : UsuarioLogin) : Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('https://redeantonias.herokuapp.com/usuario/logar',userLogin)
  }

  cadastrar(user : Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>('https://redeantonias.herokuapp.com/usuario/cadastrar',user)
  }

  putUsuario(user: Usuario) : Observable<Usuario>{
    return this.http.put<Usuario>('https://redeantonias.herokuapp.com/usuario/atualizar', user, this.token)
  }

  deleteUsuario(id:number){
    return this.http.delete(`https://redeantonias.herokuapp.com/usuario/${id}`, this.token)
  }

 //Tem que fazer isso para finalizar compra (se não estiver logado não vai finalizar a compra)
  logado(){
    let ok : boolean = false
    if(environment.token != ''){
      ok = true
    }
    return ok
  }

  naoLogado(){
    let ok: boolean = false
    if(environment.token == ''){
      ok = true
    }
    return ok
  }

  vendedor(){
    let ok: boolean = false
    if(environment.vendedor == true){
      ok = true
    }
    return ok
  }
  }
  

