import { FormControl } from "@angular/forms";
import { FormProvider } from "../providers/form/form";

export class CpfValidator {
    constructor(public form: FormProvider) {

    }

    static isValid(control: FormControl): any {
        //validacao do cpf
        var cpf = control.value;
        var unmasked = "";
        var soma = 0;
        var resto;

        cpf = cpf.replace('-', '.');
        for (let entry of cpf.split('.')) {
            unmasked += entry;
        }

        if (unmasked.length < 11) {

            return {
                'isValid': true
            }
        }
        
        if (unmasked == "00000000000" ||
            unmasked == "00000000000" ||
            unmasked == "11111111111" ||
            unmasked == "22222222222" ||
            unmasked == "33333333333" ||
            unmasked == "44444444444" ||
            unmasked == "55555555555" ||
            unmasked == "66666666666" ||
            unmasked == "77777777777" ||
            unmasked == "88888888888" ||
            unmasked == "99999999999"){
            return {
                'isValid': true
            }
        }
        
        for (var i=1; i<=9; i++){
            soma = soma + parseInt(unmasked.substring(i-1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11))  
            resto = 0;

        if (resto != parseInt(unmasked.substring(9, 10)) ){
            return {
                'isValid': true
            }
        }
        
        soma = 0;
        for (var i = 1; i <= 10; i++) {
            soma = soma + parseInt(unmasked.substring(i-1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11))  
            resto = 0;

        if (resto != parseInt(unmasked.substring(10, 11) ) ){
            return {
                'isValid': true
            }
        }

        return null;
    }

}