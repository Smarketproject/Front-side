import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormProvider } from '../../providers/form/form';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/password';
import { CpfValidator } from '../../validators/cpf';
import { RestProvider } from '../../providers/rest/rest';
@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  cadastroForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public form: FormProvider,
    public rest: RestProvider,
    public loadingCtrl: LoadingController
  ) {
    this.cadastroForm = formBuilder.group({
      'username': [
        '',
        Validators.required
      ],
      'email': [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
        ])
      ],
      'cpf': [
        '',
        Validators.compose([
          Validators.required,
          CpfValidator.isValid
        ])
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
  submitForm(value: any): void {
    let loading = this.loadingCtrl.create({
      content: "Cadastrando",
    });
    let data = {
      'cpf': value.cpf,
      'email': value.email,
      'password': value.password,
      'username': value.username
    }
    loading.present();
    console.log('Formulário enviado!');
    console.log(data);

    this.rest.postCadastro(value).subscribe(
      data => {
        // console.log(data);
        this.navCtrl.popToRoot();
        loading.dismiss();
      },
      error => {
        // console.log(error);
        this.form.presentToast('Ocorreu algum erro no processamento.');
        loading.dismiss();
      });
  }

}
