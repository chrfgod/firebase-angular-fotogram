import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Auth } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes', {static: false}) public publicacoes: any;

  constructor(
    private auth: Auth,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public sair(): void {
    this.auth.sair();
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine();
  }

}
