import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { MenuProdutosComponent } from './produtos/menu-produtos.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './cadastro-produto/usuario.component';
import { UsuarioEditComponent } from './edit/usuario-edit-delete/usuario-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { CadastrarCategoriaComponent } from './cadastrar-categoria/cadastrar-categoria.component';
import { ServicosComponent } from './servicos/servicos.component';
import { VerProdutoComponent } from './ver-produto/ver-produto.component';
import { PgCategoriaComponent } from './pg-categoria/pg-categoria.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    QuemSomosComponent,
    MenuProdutosComponent,
    EntrarComponent,
    CadastrarComponent,
    UsuarioComponent,
    UsuarioEditComponent,
    ProdutoEditComponent,
    CadastrarCategoriaComponent,
    ServicosComponent,
    VerProdutoComponent,
    PgCategoriaComponent,
    PesquisarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [ 
    {provide: LocationStrategy, useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
