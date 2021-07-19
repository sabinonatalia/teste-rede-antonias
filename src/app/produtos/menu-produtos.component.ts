import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from './../service/categoria.service';
import { Categoria } from './../model/Categoria';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ProdutosServicos } from '../model/ProdutosServicos';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-menu-produtos',
  templateUrl: './menu-produtos.component.html',
  styleUrls: ['./menu-produtos.component.css']
})  
export class MenuProdutosComponent implements OnInit {
  categoria: Categoria = new Categoria()
  idCategoria:number
  listaCategoria: Categoria[]
  listaProduto: ProdutosServicos[]

  constructor(
    private produtoService: ProdutoService,
    private categoriaService : CategoriaService,
    //private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    window.scroll(0, 0);
    this.findAllProdutos()
    this.findAllCategoria()
    this.idCategoria = this.route.snapshot.params['id']
    this.findByIdCategoria(this.idCategoria)
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: ProdutosServicos[]) => {
      this.listaProduto = resp
    }) 
  }
  findAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  findByIdCategoria(id:number){
    
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp : Categoria)=>{
      this.categoria = resp
    })
  }
}
