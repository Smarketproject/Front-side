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
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
<<<<<<< HEAD
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
=======
    private formBuilder :FormBuilder,
>>>>>>> dee56a63f426e2213392e001530ffe4fb5f639dc
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

  }

  //Vai para a página de cadastro
  goToCadastro() {
    this.navCtrl.push(CadastroPage);
  }

  //Vai para a página de menu
  goToMenu() {
    this.navCtrl.setRoot(MenuPage);
  }

<<<<<<< HEAD
  submitForm(value: any) {
    let loading = this.loadingCtrl.create({
      content: "Validando as credenciais",
=======
  submitForm(value:any){
    console.log('Formulário enviado!');
    console.log(value);
    this.rest.postLogin(value).subscribe(data=>{
      console.log('data: ' + data);
      
      }, error=>{
        this.form.presentToast('Senha ou nome incorreto!');
        console.log('error ' + error._body);
>>>>>>> dee56a63f426e2213392e001530ffe4fb5f639dc
    });
    loading.present();
    this.rest.postLogin(value).subscribe(
      data => {
        // console.log(data);
        this.goToMenu();
        loading.dismiss();
      },
      error => {
        // console.log(error);
        this.form.presentToast('Não foi possível realizar o login.');
        loading.dismiss();
      });
  }

}
