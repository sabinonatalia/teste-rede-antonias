import { Usuario } from './../../model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario;
  idUsuario = environment.id
  nome = environment.nome;
  foto = environment.foto;
  confirmarSenha: string;

  constructor(
    private authService: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {} 

  ngOnInit() {
    window.scroll(0,0);
    this.idUsuario= this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  findByIdUsuario(id:number){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp:Usuario)=>{
      this.usuario = resp
    })
  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  // }
  // atualizarUsuario(){
  //   this.authService.putUsuario(this.usuario).subscribe((resp:Usuario)=>{
  //     this.usuario = resp
  //     alert('Usuário atualizado com sucesso!')
  //     this.router.navigate(['/usuario-editar'])
  //   })
  // }
    atualizarUsuario(){
  if (this.usuario.senha == this.confirmarSenha) {
    this.authService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.router.navigate(['/quemsomos'])
    }) //subscribe serve para que o objeto não seja enviado da forma json
    alert('Usuário atualizado com sucesso, faça o login novamente.')
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
    this.router.navigate(['/entrar'])

  }
  else {
    alert('As senhas não coincidem!')
  }
}

  deletarUsuario(){
    this.authService.deleteUsuario(this.idUsuario).subscribe(()=>{
      alert('Usuário apagado com sucesso!')
      this.router.navigate(['/usuario-editar'])
    })
  }
  //falta criar método atualizar dados usuario! - atualização ok

  sair(){
    this.router.navigate(['/quemsomos'])
    environment.token=''
    environment.nome=''
    environment.foto=''
    environment.id=0
  }

}
