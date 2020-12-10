import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { Auth } from '../../../app/auth.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter();
  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    nome_completo: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
    nome_usuario: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private auth: Auth
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha,
    );
    this.auth.cadastrarUsuario(usuario);
  }

}
