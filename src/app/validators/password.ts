import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(group: FormGroup):any{
  if(group){
    if(group.get("password").value !== group.get("passwordConfirm").value){
      return {notMatching: true};
    }
  }
  return null;
}