import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-cadastrar-categoria',
  templateUrl: './cadastrar-categoria.component.html',
  styleUrls: ['./cadastrar-categoria.component.css']
})
export class CadastrarCategoriaComponent implements OnInit {
  categoria: Categoria= new Categoria();
  listaCategoria: Categoria[];

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
  ) {}
  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }
    this.findAllCategoria();
  }

  findAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp;
    });
  }

  cadastrar() {
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp;
      
      this.findAllCategoria();
      this.categoria = new Categoria();
      alert('Categoria cadastrada com sucesso')
    });
  } 
} 
