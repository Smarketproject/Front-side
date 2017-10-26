import { Injectable } from '@angular/core';

/*
  Generated class for the FormProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FormProvider {
  
  constructor() {
    
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

  //Valida a senha com a confirmação
  public passwordValidation(password, confirm){
    if(password == confirm){
      return true;
    }
    return false;
  }

  presentToast(toastCtrl, message) {
    let toast = toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
