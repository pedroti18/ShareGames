import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MensagemService } from '../../services/mensagem.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.page.html',
  styleUrls: ['./login-usuario.page.scss'],
})
export class LoginUsuarioPage implements OnInit {

  protected email: string = "";
  protected pws: string = "";
  constructor(
    public afAuth: AngularFireAuth,
    protected msg: MensagemService,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form){
  
    this.login();
  }

  login() {
    this.msg.presentLoading();
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws)
      .then(
        res => {
          console.log(res.user);
          this.msg.dismissLoading();
          this.router.navigate(['/'])
        }, erro => {
          console.log("Erro: " + erro);
          this.msg.dismissLoading();
          this.msg.presentAlert("Erro!" , "Email ou senha invalidos!")
        }
      ).catch(erro => {
        console.log("Erro no sistema: " + erro)
      });
      }
      logout() {
        this.afAuth.auth.signOut();
      }

      loginGoogle(){
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
          res=>{
            console.log(res);
            this.router.navigate(['/'])
          },
        erro=>{
          console.log("Erro" , erro);
          this.msg.presentAlert("Erro" , "Login invalidos!")
      }
    )
  } 
}
