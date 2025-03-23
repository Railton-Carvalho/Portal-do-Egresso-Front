import { Component } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { ManageCourseService } from '../../services/manage-course.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-manage-course',
  standalone: false,
  templateUrl: './manage-course.component.html',
  styleUrl: './manage-course.component.scss'
})
export class ManageCourseComponent {
  constructor(private manageCourseService: ManageCourseService, private courseService: CourseService) {}


  courseFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 4;
  coursePaginados: any[] = [];

  course: ICourse[]  =  [
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
    
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
      {
        "id": 1,
        "name": "Curso Curso 1",
        "level": "1",
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
      },
  ]

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'excluir' = 'visualizar';
  viewCourse: any = {} as any;

  ngOnInit(): void {
    this.filtrarCourse();
  }

  filtrarCourse() {
    if (this.searchTerm.trim() === '') {
      this.courseFiltrados = this.course;
    } else {
      const termo = this.searchTerm.toLowerCase();
      this.courseFiltrados = this.course.filter((e) =>
        e.name.toLowerCase().includes(termo)
      );
    }

    this.paginaAtual = 1;
    this.atualizarPaginacao();
  }

  atualizarPaginacao() {
    this.totalPaginas = Math.ceil(
      this.courseFiltrados.length / this.itensPorPagina
    );

    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    this.coursePaginados = this.courseFiltrados.slice(inicio, fim);
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPaginacao();
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPaginacao();
    }
  }

  criarNovoCourse() {

    this.manageCourseService.emitirCourse({operation: true})
  }

  editarCourse(course: ICourse) {

    this.manageCourseService.emitirCourse({operation: false, course: course})

  }

  fecharModal(){
    this.isOpen = false;
  }

  openModal(course: ICourse, mode: 'visualizar' | 'excluir'){
    this.viewCourse = course;

    this.isOpen = true;

    this.mode = mode;
  }

  excluirCourse(course: ICourse) {
  
    alert('excluir');

    this.courseService.deleteCourse(course.id).subscribe(
      {
        next: (response) => {

        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          
        }
      }
    )

    this.fecharModal();

  }
  }
