import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Loading } from 'ionic-angular';

   
/*
  Generated class for the FormProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FormProvider {
  
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    
  }
  //Tamanho do input cpf
  public cpfLength(){
    return 14;
  }

  //Tamanho do input username
  public usernameLength(){
    return 20;
  }

  //Tamanho do input password
  public passwordLength(){
    return 20;
  }

  //Tamanho do input email
  public emailLength(){
    return 30;
  }

  //Método para mascarar o cpf
  public cpfMask(cpf:string):string{
    cpf = this.removeLetterInput(cpf);
    var unmasked:string = this.cpfUnmask(cpf);
    var masked = "";

    for (var _i = 0; _i < unmasked.length; _i++) {
      if((_i == 3) || (_i == 6))
        masked += '.';

      if(_i == 9)
        masked += '-';
      masked += unmasked[_i];  
    }
    return masked;
  }


  public cpfUnmask(cpf:string){
    //Variável para salvar o cpf sem máscara
    var unmasked = "";
    //Transforma o '-' em '.' para poder quebrar a string mais facilmente
    cpf = cpf.replace('-', '.');
    //Quebra a string concatenando em unmasked
    for(let entry of cpf.split('.')){
      unmasked += entry;
    }
    //Retorna o cpf sem qualquer máscara
    return unmasked;
  }

  //Remove o número do input
  private removeNumberInput(string:string){
    let length = string.length;
    let input = string.charAt(length - 1);
    if(!isNaN(parseInt(input))){
      console.log("numero!");
      if(length == 1)
        return "";
      string = string.substring(0, length - 2);
    }
  }

  //Remove o número do input
  private removeLetterInput(string:string){
    let length = string.length;
    let input = string.charAt(length - 1);
    if(isNaN(parseInt(input))){
      console.log(input);
      if(length == 1)
        return "";
      string = string.substring(0, length - 1);
    }
    return string;
  }
  //Valida a senha com a confirmação
  public passwordValidation(password, confirm){
    if(password == confirm){
      return true;
    }
    return false;
  }
  public presentToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();
  }
  
  
}
