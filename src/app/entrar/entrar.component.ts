import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuario: UsuarioLogin = new UsuarioLogin;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }
  entrar() {
    this.authService.entrar(this.usuario).subscribe((resp: UsuarioLogin) => {
      this.usuario = resp
      this.router.navigate(['/quemsomos'])
      environment.token = this.usuario.token
      environment.foto = this.usuario.foto
      environment.nome = this.usuario.nome
      environment.id = this.usuario.id
      environment.email = this.usuario.email
      //environment.vendedor = this.usuario
    },
      erro => {
        if (erro.status == 500) {
          alert('Usuário ou senha inválidos 😥')
        }
      })
  }
}