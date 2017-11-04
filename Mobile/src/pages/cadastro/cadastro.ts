import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    public rest: RestProvider
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
    },{'validator': PasswordValidator.isEqual});
  }

  ionViewDidLoad() {
    
  }
  submitForm(value: any): void {
    let data = {
      'cpf': this.form.cpfUnmask(value.cpf),
      'email': value.email,
      'password': value.password,
      'username': value.username
    }
    console.log('Formulário enviado!');
    console.log(data);
    this.rest.postCadastro(data).subscribe(data=>{
      console.log('data: ' + data._body);

    }, error=>{
      // this.form.presentToast('Senha ou nome incorreto!');
      console.log('error' + error._body);
    }); 
  }

}
