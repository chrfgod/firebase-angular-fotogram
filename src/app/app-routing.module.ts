import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoComponent } from './acesso/acesso.component';
import { AutenticacaoGuard } from './autenticacao-guard.service';
import { LogadoGuard } from './logado-guard.service';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  {path: '', component: AcessoComponent, canActivate: [LogadoGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AutenticacaoGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
