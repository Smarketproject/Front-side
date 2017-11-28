import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MenuPage } from '../menu/menu';

import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { FormProvider } from '../../providers/form/form';
import { PasswordValidator } from '../../validators/password';

@IonicPage()
@Component({
  selector: 'page-atualizar',
  templateUrl: 'atualizar.html',
})
export class AtualizarPage {
  config: {};
  atualizarForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public form: FormProvider
  ) {


    this.atualizarForm = formBuilder.group({
      'oldpassword': [
        '',
        Validators.required
      ],
      'password': [
        '',
        Validators.required
      ],
      'confirm': [
        '',
        Validators.required
      ]
    }, { 'validator': PasswordValidator.isEqual });
    
  }

  ionViewDidLoad() {
  }

  //Vai para a página de menu
  goToMenu(token) {
    this.navCtrl.pop();
  }

  //Envia ao servidor as credenciais para realizar a atualização de usuario  
  submitForm(value: any) {
    let data = {
      password: value.oldpassword,
      new_password: value.password
    }
    let loading = this.loadingCtrl.create({
      content: "Validando as credenciais"
    });

    loading.present();
    this.rest.postAtualizar(data, this.navParams.get('token')).subscribe(
      data => {
        this.goToMenu(data.auth_token);
        loading.dismiss();
      },
      error => {
        if (error.status == 401) {
          this.form.presentToast('Senha incorreto!');
        }

        if (error.status == 0) {
          this.form.presentToast('Não foi possível realizar o login, tente mais tarde.');
        }
        loading.dismiss();
      });


  }
}
