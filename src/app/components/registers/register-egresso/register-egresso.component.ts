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
import { IEgresso, IEgressoCreate } from './../../../interfaces/egresso.interface';
import { EgressoService } from '../../../services/egresso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-register-egresso',
  standalone: false,
  templateUrl: './register-egresso.component.html',
  styleUrl: './register-egresso.component.scss',
})
export class RegisterEgressoComponent {


  constructor(private egressoService: EgressoService, private route: ActivatedRoute, private router: Router, private courseService: CourseService){}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  resumoFromControl = new FormControl('', [Validators.required]);

  cpfFormControl = new FormControl('', [Validators.required]);

  fullNameFormControl =  new FormControl('', [Validators.required]);

  passwordFormControl =  new FormControl(null, [Validators.required]);

  cursoFormControl = new FormControl('', [Validators.required]);

  dataInicio = new FormControl('', [Validators.required]);
  dataFim = new FormControl('', [Validators.required]);


  matcher = new MyErrorStateMatcher();
  
  courseList: any[]= []

  title: 'Cadastrar' | 'Atualizar' = 'Cadastrar';

  egressoId: number = -1;
  egressoStatus: string = '';
  egressoHomologado: string = '';
  
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      
      const cpf = params.get('cpf'); 

      const id = Number(params.get('id'));

      if(cpf){

        this.title = 'Atualizar';


        this.egressoService.recuperarEgresso(cpf).subscribe(
          {
            next: (response) => {
              
              console.log(response)

              //Preenche o formulário com os dados
              this.egressoId = response.id;
              this.egressoStatus = response.userStatus;
              this.egressoHomologado = response.homologadoStatus;
              // Preenche o formulário com os dados
              this.emailFormControl.setValue(response.email);
              this.cpfFormControl.setValue(response.cpf);
              this.resumoFromControl.setValue(response.resumo);
              this.fullNameFormControl.setValue(response.nome);
              //this.passwordFormControl.setValue(response.senha);
              //this.cursoFormControl.setValue(response.egressoCursos);

              this.passwordFormControl.clearValidators();

              this.passwordFormControl.updateValueAndValidity();

              
            this.egressoService.recuperarCurso(response.id).subscribe(
              {
                next: (response) => {

                  console.log(response)

                  this.cursoFormControl.setValue(response.content[0].id)
                  //this.dataInicio.setValue(response.content[0])

                },complete: () =>{  
                  
                }
              },
            )


            }, error: (error) => {

              console.error(error)

              if (error instanceof SyntaxError) {
                console.error('Erro de JSON inválido na resposta da API.');
              }
            }
          }
        );

  
      }else if(id){

        this.title = 'Atualizar';


        this.egressoService.getEgressoById(id).subscribe(
          {
            next: (response) => {
              
              console.log(response)

              //Preenche o formulário com os dados
              this.egressoId = response.id;
              this.egressoStatus = response.userStatus;
              this.egressoHomologado = response.homologadoStatus;
              // Preenche o formulário com os dados
              this.emailFormControl.setValue(response.email);
              this.cpfFormControl.setValue(response.cpf);
              this.resumoFromControl.setValue(response.resumo);
              this.fullNameFormControl.setValue(response.nome);
              //this.passwordFormControl.setValue(response.senha);
    
              this.passwordFormControl.clearValidators();

              this.passwordFormControl.updateValueAndValidity();

                
            this.egressoService.recuperarCurso(response.id).subscribe(
              {
                next: (response) => {

                  console.log(response)

                  this.cursoFormControl.setValue(response.content[0].id);
                  this.dataInicio.setValue(response.content[0].ano_inicio);
                  this.dataFim.setValue( response.content[0].ano_fim);

                },complete: () =>{  
                  
                }
              },
            )

            }, error: (error) => {

              console.error(error)

              if (error instanceof SyntaxError) {
                console.error('Erro de JSON inválido na resposta da API.');
              }
            }
          }
        );

      }
      
    });

    this.courseService.getAllCourses(0, 100).subscribe(
      {
        next: (response) => {
          this.courseList = response.content

          console.log(this.courseList)
        }
      }
    )

    
  }


  

  onSubmit(){

    console.log(this.passwordFormControl.value)

    if(this.title === 'Cadastrar'){

      let egresso: IEgressoCreate = {
        nome: this.fullNameFormControl.value ?? '',
        cpf: this.cpfFormControl.value ?? '',
        email: this.emailFormControl.value ?? '',
        senha: this.passwordFormControl.value ?? null,
        resumo: this.resumoFromControl.value ?? '',
        status: 'ACTIVE',
        homologado: "PENDING",
        idCurso: Number(this.cursoFormControl.value),
        ano_inicio: new Date(this.dataInicio.value ?? '').getFullYear() ?? 0,
        ano_fim: new Date(this.dataFim.value ?? '').getFullYear() ?? 0,
        Ano_inicio: new Date(this.dataInicio.value ?? '').getFullYear() ?? 0,
        Ano_fim: new Date(this.dataFim.value ?? '').getFullYear() ?? 0,
      }

      console.log(egresso)

      
      this.egressoService.cadastrarEgresso(egresso).subscribe(
        {
          next: (response) =>{

            console.log(response)
            
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {

          }
        }
      )

    }else{

      let egresso = {
        id: this.egressoId,
        nome: this.fullNameFormControl.value,
        cpf: this.cpfFormControl.value,
        email: this.emailFormControl.value,
        senha: this.passwordFormControl.value ?? null,
        resumo: this.resumoFromControl.value,
        status: this.egressoStatus,
        homologado: this.egressoHomologado,
        idCurso: Number(this.cursoFormControl.value),
        ano_inicio: new Date(this.dataInicio.value ?? '').getFullYear() ?? null,
        ano_fim: new Date(this.dataFim.value ?? '').getFullYear() ?? null,
        Ano_inicio: new Date(this.dataInicio.value ?? '').getFullYear() ?? null,
        Ano_fim: new Date(this.dataFim.value ?? '').getFullYear() ?? null,
      }

      console.log(egresso)

      this.egressoService.atualizarEgresso(egresso).subscribe(

        {
          next: (response) =>{
            console.log(response)
          },
          error: (error) => {
            console.error(error);
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
