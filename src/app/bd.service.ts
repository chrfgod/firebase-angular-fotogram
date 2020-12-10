import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(
        private progreso: Progresso
    ){}

    public publicar(publicacao: any): void {
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`).push({titulo: publicacao.titulo})
            .then((resposta: any) => {
                let nomeImagem = resposta.key;
                firebase.storage().ref().child(`imagens/${nomeImagem}`).put(publicacao.imagem).on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot: any) => {
                        this.progreso.status = 'andamento';
                        this.progreso.estado = snapshot;
                    },
                    // tslint:disable-next-line: no-shadowed-variable
                    (error) => {
                        this.progreso.status = 'erro';

                    },
                    () => {
                        this.progreso.status = 'concluido';
                    });

            });
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`).orderByKey()
            .once('value').then((snapshot: any) => {
                let publicacoes: Array<any> = [];
                snapshot.forEach((childSnapshot: any) => {
                    let publicacao = childSnapshot.val()
                    publicacao.key = childSnapshot.key;
                    publicacoes.push(publicacao);
                });
                return publicacoes.reverse();
            })
            .then((publicacoes: any) => {
                publicacoes.forEach((publicacao) => {
                    firebase.storage().ref().child(`imagens/${publicacao.key}`)
                    .getDownloadURL().then((url: string) => {
                        publicacao.url_imagem = url;
                        firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                            // tslint:disable-next-line: no-shadowed-variable
                            .once('value').then((snapshot: any) => {
                               publicacao.nome_usuario = snapshot.val().nome_usuario;
                            });
                    });
                });
                resolve(publicacoes);
            });
        });

    }
}
/* let publicacao = childSnapshot.val();
                    firebase.storage().ref().child(`imagens/${childSnapshot.key}`)
                    .getDownloadURL().then((url: string) => {
                        publicacao.url_imagem = url;
                        firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                            // tslint:disable-next-line: no-shadowed-variable
                            .once('value').then((snapshot: any) => {
                               publicacao.nome_usuario = snapshot.val().nome_usuario;
                               publicacoes.push(publicacao);
                            });
                    }); */
