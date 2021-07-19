import { Usuario } from './../model/Usuario';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    usuario:Usuario = new Usuario()
    nome = environment.nome
    busca: string

  constructor(
    public auth: AuthService,
    public router : Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  refresh(){
    this.router.navigateByUrl('/quemsomos', { skipLocationChange: true }).then(() =>{
        this.router.navigate(["/pesquisar",this.busca])
    })
}

  sair(){
    this.router.navigate(['/quemsomos'])
    environment.token=''
    environment.nome=''
    environment.foto=''
    environment.id=0
  }
}
