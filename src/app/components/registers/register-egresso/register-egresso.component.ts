import {Component} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ManageEgressoService } from '../../../services/manage-egresso.service';
import { IEgresso } from './../../../interfaces/egresso.interface';
import { RegisterEgressoService } from '../../../services/register-egresso.service';
import { EgressoService } from '../../../services/egresso.service';

@Component({
  selector: 'app-register-egresso',
  standalone: false,
  templateUrl: './register-egresso.component.html',
  styleUrl: './register-egresso.component.scss',
})
export class RegisterEgressoComponent {


  constructor(private registerEgressoService: RegisterEgressoService, private egressoService: EgressoService ){}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  resumoFromControl = new FormControl('', [Validators.required]);

  cpfFormControl = new FormControl('', [Validators.required]);

  fullNameFormControl =  new FormControl('', [Validators.required]);

  passwordFormControl =  new FormControl('', [Validators.required]);


  matcher = new MyErrorStateMatcher();
  
  courseList: string[]=[
    'Ciência da Computação',
    'Logistica',
    'Sistemas de Informação',
    'Engenharia de Software'
  ];

  title: 'Cadastrar' | 'Atualizar' = 'Cadastrar';
  
  ngOnInit(): void {
    const dados = this.registerEgressoService.getLastEgresso();

    if (dados && dados.operation == false) {
      const egresso = dados.egresso;

      this.title = 'Atualizar'

      this.emailFormControl.setValue(egresso.email);
      this. 
        cpfFormControl 
      .setValue(egresso.cpf);
      this.resumoFromControl.setValue(egresso.resumo)
      this.fullNameFormControl.setValue(egresso.nome);
      this.passwordFormControl.setValue(egresso.senha);
    }
  }

  onSubmit(){

    const egresso = {
      nome: this.fullNameFormControl.value,
      cpf: this.cpfFormControl.value,
      email: this.emailFormControl.value,
      resumo: this.resumoFromControl.value,
      senha: this.passwordFormControl.value,
    }

    if(this.title === 'Cadastrar'){
      
      this.egressoService.cadastrarEgresso(egresso).subscribe(
        {
          next: (response) =>{
            
          },
          error: (error) => {
            alert(error);
          },
          complete: () => {

          }
        }
      )

    }else{

      this.egressoService.atualizarEgresso(egresso).subscribe(
        {
          next: (response) =>{
            
          },
          error: (error) => {
            alert(error);
          },
          complete: () => {
            
          }
        }
      )

    }

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  
}



export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
