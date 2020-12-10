import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string;
  public publicacoes: any;

  constructor(
    private bd: Bd
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
      this.atualizarTimeLine();
    });
  }

  public atualizarTimeLine(): void {
    this.bd.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes;
      });
  }

}
