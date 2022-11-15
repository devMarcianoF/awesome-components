/*
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmEqualValidator (main: string, confirm: string): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (!ctrl.get(main) || !ctrl.get(confirm)) {
      return {
        confirmEqual: 'Invalid control names'
      };
    }
    const mainValue = ctrl.get(main)!.value;
    const confirmValue = ctrl.get(confirm)!.value;

    return mainValue === confirmValue ? null : {
      confirmEqual: {
        main: mainValue,
        confirm: confirmValue
      }
    };

  };
}
*/
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/*Un Validator est une fonction qui retourne une  ValidatorFn.
  Cette  ValidatorFn  prend un AbstractControl comme paramètre :
  elle retourne  null  si le contrôle est valide ;
elle retourne un objet  ValidationErrors  si le contrôle est invalide – cet objet contient une paire clé-valeur où la clé est le nom de l'erreur.*/
export function confirmEqualValidator(main: string, confirm: string): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (!ctrl.get(main) || !ctrl.get(confirm)) {
      return {
        confirmEqual: 'Invalid control names'
      };
    }
    const mainValue = ctrl.get(main)!.value;
    const confirmValue = ctrl.get(confirm)!.value;

    return mainValue === confirmValue ? null : {
      confirmEqual: {
        main: mainValue,
        confirm: confirmValue
      }
    };
  };
}
