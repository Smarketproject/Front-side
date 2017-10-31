import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CadastroPage } from '../cadastro/cadastro';
import { MenuPage } from '../menu/menu';

import { FormGroup, FormBuilder, Validators } from "@angular/forms"


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm : FormGroup;
  // public resposta:Array<{}>;
  // account = {
  //   username: "",
  //   password: "",
  // }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public rest: RestProvider,
    private formBuilder :FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      'username' : [
        null, 
        Validators.compose([
          Validators.required,
        ])
      ],
      'password' : [
        null, 
        Validators.compose([
          Validators.required,
        ])
      ]
    });
  }

  ionViewDidLoad() {
  }

  //Vai para a página de cadastro
  goToCadastro(){
    this.navCtrl.push(CadastroPage);
  }

  //Vai para a página de menu
  goToMenu(){
    this.navCtrl.setRoot(MenuPage);
  }

  submitForm(value:any){
    console.log('Formulário enviado!');
    console.log(value);
  }
  // doSignin(){
  //   this.rest.postLogin(this.account)
  //     .subscribe(data=>{
  //       console.log(data);
  //     });
  // }
}
