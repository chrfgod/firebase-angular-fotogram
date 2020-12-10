import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Progresso } from 'src/app/progresso.service';
import { Observable, Subject, interval } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import 'rxjs';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string;
  public imagem: any;
  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number;
  @Output()
  public atualizarTimeline: EventEmitter<any> = new EventEmitter();
  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null)
  });

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });


    let acompanhamentoUpload = interval(1000);
    let continua = new Subject();
    continua.next(true);
    acompanhamentoUpload.pipe(takeUntil(continua)).subscribe(() => {
      this.progressoPublicacao = 'andamento';
      this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);

      if (this.progresso.status === 'concluido') {
        this.progressoPublicacao = 'concluido';
        this.atualizarTimeline.emit();
        continua.next(false);
      }
    });

  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (event.target as HTMLInputElement).files;
  }

  public lazy(): void {
    this.progressoPublicacao = 'pendente';
  }

}
