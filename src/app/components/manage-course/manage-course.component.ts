import { Component } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-course',
  standalone: false,
  templateUrl: './manage-course.component.html',
  styleUrl: './manage-course.component.scss'
})
export class ManageCourseComponent {
  constructor(private courseService: CourseService, private router: Router) {}


  courseFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 0;
  coursePaginados: any[] = [];

  courses: any[] = []

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'excluir' = 'visualizar';
  viewCourse: any = {} as any;

  ngOnInit(): void {

    this.getCursos();

  }

  getCursos(){

    this.courseService.getAllCourses(this.paginaAtual -1, this.itensPorPagina).subscribe(
      {
        next: (response) => {

          this.courses = response.content;

          this.totalPaginas = response.totalPages;
        
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

  
  verificarCampo(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    if (valor.trim() === '') {
      this.buscarCurso();
    }
  }
  
  buscarCurso(){

    console.log(this.searchTerm);

    if(this.searchTerm == ''){
      this.getCursos();
      return
    }

    this.paginaAtual = 1
    
    this.courseService.getCourseByName(this.paginaAtual - 1, this.totalPaginas, this.searchTerm).subscribe(
      {
        next: (response) => {
          this.courses = response.content
        }
      }
    )
  }

  atualizarPaginacao() {
    
    this.getCursos();

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

    this.router.navigate(['/cadastrar_curso']);

  }

  editarCourse(course: ICourse) {

    this.router.navigate(['/atualizar_curso', course.id]);

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
  
    this.courseService.deleteCourse(course.id).subscribe(
      {
        next: (response) => {
          this.buscarCurso()
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
