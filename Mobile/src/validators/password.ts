import { FormControl, FormGroup } from "@angular/forms";

export class PasswordValidator{
    
    static isEqual(group: FormGroup):any{
        let confirmCtrl = group.controls['confirm'];
        let passwordCtrl = group.controls['password'];
        if(passwordCtrl.value != confirmCtrl.value){
            confirmCtrl.setErrors({
                "isEqual": true
            })
            return {
                "isEqual": true
            }
        }
        return null;
    }

}