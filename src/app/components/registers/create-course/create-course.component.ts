import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { ICourse } from '../../../interfaces/course.interface';

@Component({
  selector: 'app-create-course',
  standalone: false,
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export class CreateCourseComponent {
  levelFormControl = new FormControl('', [Validators.required]);

  nameFormControl = new FormControl('', [Validators.required]);
  
  title: 'Cadastrar' | 'Atualizar' = 'Cadastrar';

  oportunidades: any[] = [];
  cursoId: number = -1;

  levelsList: string[]=[
    "Bacharelado",
    'Mestrado',
    'Doutourado',
    'Especialista'
  ];

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id')); 

      if(id){
        this.title = 'Atualizar';

      
        this.courseService.getCourseById(id).subscribe(
          {
            next: (response) => {

              console.log(response)
              
              //Preenche o formulário com os dados
              this.nameFormControl.setValue(response.nome);
              this.levelFormControl.setValue(response.nivel);

              this.cursoId = response.id;
              this.oportunidades = response.oportunidades;

            }
          }
        );
        
      }

    });

  }

  onSubmit(){

    if(this.title === 'Cadastrar'){

      let curso = {
        nome: this.nameFormControl.value ?? '',
        nivel: this.levelFormControl.value ?? '',
        oportunidades: null,
        ano_inicio: new Date().getFullYear(),
        ano_fim: new Date().getFullYear(),
      }
      
      this.courseService.createCourse(curso).subscribe(
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

      let curso = {
        id: this.cursoId,
        nome: this.nameFormControl.value ?? '',
        nivel: this.levelFormControl.value ?? '',
        oportunidades: this.oportunidades,
        ano_inicio: new Date().getFullYear(),
        ano_fim: new Date().getFullYear(),
      }

      this.courseService.updateCourse(curso).subscribe(
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
