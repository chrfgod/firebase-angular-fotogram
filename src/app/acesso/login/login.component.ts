import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter();
  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private auth: Auth
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.auth.autenticar(this.formulario.value.email, this.formulario.value.senha)
  }

}
