import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CadastroPage } from '../cadastro/cadastro';
import { MenuPage } from '../menu/menu';

import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { FormProvider } from '../../providers/form/form';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  config: {};
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public form: FormProvider
  ) {
    this.loginForm = formBuilder.group({
      'username': [
        null,
        Validators.compose([
          Validators.required,
        ])
      ],
      'password': [
        null,
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  ionViewDidLoad() {
    console.log(this.config);
  }

  //Vai para a página de cadastro
  goToCadastro() {
    this.navCtrl.push(CadastroPage);
  }

  //Vai para a página de menu
  goToMenu(token) {
    this.navCtrl.setRoot(
      MenuPage,
      {
        token: token
      });
  }

  //Envia ao servidor as credenciais para realizar o login  
  submitForm(value: any) {
    let loading = this.loadingCtrl.create({
      content: "Validando as credenciais"
    });

    loading.present();
    this.rest.postLogin(value).subscribe(
      data => {
        this.goToMenu(data.auth_token);
        loading.dismiss();
      },
      error => {
        if (error.status == 400) {
          this.form.presentToast('Nome ou senha incorreto!');
        }

        if (error.status == 0) {
          this.form.presentToast('Não foi possível realizar o login, tente mais tarde.');
        }
        loading.dismiss();
      });
  }

}
