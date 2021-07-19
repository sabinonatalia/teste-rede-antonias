import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosServicos } from '../model/ProdutosServicos';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {

  busca: string
  produto: ProdutosServicos = new ProdutosServicos()
  listaProdutosServicos: ProdutosServicos[]
  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.busca = this.route.snapshot.params["nome"]
  
    this.pesquisar()
  }

  pesquisar(){
    this.produtoService.getByNomeProdutosServicos(this.busca).subscribe((resp: ProdutosServicos[])=>{
      this.listaProdutosServicos = resp
    })
  }
}
