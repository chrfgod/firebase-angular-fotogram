import { Usuario } from './acesso/usuario.model';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class Auth {
    // tslint:disable-next-line: variable-name
    public token_id: string;
    constructor(
        private router: Router,
        private toastr: ToastrService
      ) { }
    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                delete usuario.senha;
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario);
                this.toastr.success('Cadastrado com sucesso');
            })
            .catch((error: Error) => {
                this.toastr.error(error.message);
            });
    }

    public autenticar(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        localStorage.setItem('idToken', idToken);
                        this.toastr.success('Logado com sucesso');
                        this.router.navigate(['/home']);
                    });
            })
            .catch((error: Error) => this.toastr.error(error.message));
    }

    public autenticado(): boolean {
        if (this.token_id === undefined && localStorage.getItem('idToken') !== null) {
            this.token_id = localStorage.getItem('idToken');
        }
        if (this.token_id === undefined) {
            this.router.navigate(['/']);
        }
        return this.token_id !== undefined;
    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken');
                this.token_id = undefined;
            });
    }

    public logado(): boolean {
        if (this.token_id === undefined && localStorage.getItem('idToken') !== null) {
            this.token_id = localStorage.getItem('idToken');
        }
        if (this.token_id !== undefined) {
            this.router.navigate(['/home']);
        }
        return this.token_id === undefined;

    }

}

