import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith, tap} from "rxjs";
import {ComplexFormService} from "../../services/complex-form.service";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {
  loading = false;
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  phoneCtrl!: FormControl;
  emailForm!: FormGroup;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  loginInfoForm!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;

  constructor(private fb: FormBuilder, private complexFormService: ComplexFormService) { }

  ngOnInit(): void {
    this.initMainForm();
    this.initFormControls();
    this.initFormObservables()
  }

  private initMainForm(): void {
    this.mainForm = this.fb.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    });
  }


   initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap( showEmailCtrl => this.setEmailValidators(showEmailCtrl) )
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhoneCtrl => this.setPhoneValidators(showPhoneCtrl))
    )
  }

   setPhoneValidators(showPhoneCtrl: boolean) {
      if (showPhoneCtrl) {
        this.phoneCtrl.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      } else {
        this.phoneCtrl.clearValidators()
      }
      this.phoneCtrl.updateValueAndValidity()
  }

  setEmailValidators(showEmailCtrl: boolean) {
      if(showEmailCtrl) {
        this.emailCtrl.addValidators([Validators.required, Validators.email])
        this.confirmEmailCtrl.addValidators([Validators.required, Validators.email])
      } else {
        this.emailCtrl.clearValidators();
        this.confirmEmailCtrl.clearValidators()
      }
      this.emailCtrl.updateValueAndValidity()
      this.confirmEmailCtrl.updateValueAndValidity()
  }

  onSubmitForm() {
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          this.resetForm()
        } else {
          console.log('Echec de l\'enregistrement')
        }
      })
    ).subscribe()
  }

  private resetForm () {
    this.mainForm.reset();
    //Dans le cas d'un enregistrement réussi, vous réinitialisez le formulaire
    // (vous videz tous les champs). Il faut donc passer la valeur  'email'  à
    // contactPreferenceCtrl  pour retrouver le vrai état initial du formulaire.
    this.contactPreferenceCtrl.patchValue('email');
  }


  //Pourquoi AbstractControl ? Parce que ça vous permet de passer des FormControls ou des FormGroups à cette méthode : ce sera utile dans le prochain chapitre !
  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champs est requis'
    } else if (ctrl.hasError('email')) {
        return 'Merci d\'entrer une adresse mail valide'
    }
    //Attention au piège ! Les codes d'erreur pour  Validators.minLength  et  Validators.maxLength  sont  'minlength'  et  'maxlength'  avec des  l  minuscules !
      else if (ctrl.hasError('minlength')) {
        return 'Il n\'y a pas assez de chiffres'
    } else if (ctrl.hasError('maxlength')) {
        return 'il y a trop de chiffres'
    } else {
        return 'Ce champs contient une erreur'
    }
  }

  private initFormControls() {
    this.personalInfoForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
    });
    this.contactPreferenceCtrl = this.fb.control('email');
    this.phoneCtrl = this.fb.control('');
    this.emailCtrl = this.fb.control('');
    this.confirmEmailCtrl = this.fb.control('');
    this.emailForm = this.fb.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    })
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.confirmPasswordCtrl = this.fb.control('', Validators.required);
    this.loginInfoForm = this.fb.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    });

  }


}
