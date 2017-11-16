import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MenuPage } from '../menu/menu';

import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { FormProvider } from '../../providers/form/form';

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
      'password': [
        null,
        Validators.compose([
          Validators.required,
        ])
      ]
    });
  }

  ionViewDidLoad() {
    console.log(this.config);
  }

  //ionViewDidLoad() {
  //console.log('ionViewDidLoad AtualizarPage');
  //}

  //Vai para a página de menu
  goToMenu(token) {
    this.navCtrl.setRoot(
      MenuPage,
      {
        token: token
      });
  }

  //Envia ao servidor as credenciais para realizar a atualização de usuario  
  submitForm(value: any) {
    let loading = this.loadingCtrl.create({
      content: "Validando as credenciais"
    });

    loading.present();
    this.rest.postAtualizar(value).subscribe(
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
