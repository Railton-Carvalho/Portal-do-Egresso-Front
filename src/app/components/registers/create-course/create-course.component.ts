import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  levelsList: string[]=[
    'Bacharelado',
    'Mestrado',
    'Doutourado',
    'Especialista'
  ];

}
