import { Component, Output, EventEmitter } from '@angular/core';
import { IEgresso } from '../../../interfaces/egresso.interface';
import { TestimonialService } from '../../../services/testimonial.service';
import { ITestimonial } from '../../../interfaces/testimonial.interface';


@Component({
  selector: 'app-approve-testimonials',
  standalone: false,
  templateUrl: './approve-testimonials.component.html',
  styleUrl: './approve-testimonials.component.scss'
})
export class ApproveTestimonialsComponent {

  constructor(private testimonialService: TestimonialService) {}

  testimonialsFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 4;
  testimonialsPaginados: any[] = [];

  testimonials: any[] = []

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'rejeitar' | 'aprovar' = 'visualizar';
  viewTestimonial: ITestimonial = {} as ITestimonial;

  ngOnInit(): void {

    this.getTestimonial();

  }

  getTestimonial(){

    this.testimonialService.getPendentes(this.paginaAtual - 1, this.itensPorPagina, this.searchTerm).subscribe(
      {
        next: (response) => {

          this.testimonials = response.content;

          this.totalPaginas = response.totalPages;

          console.log(response);

        }
      }
    )

  }

  verificarCampo(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    if (valor.trim() === '') {
      this.buscarDepoimentos();
    }
  }


  buscarDepoimentos() {

    this.paginaAtual = 1;
    
    this.getTestimonial()

  }

  atualizarPaginacao() {
  
    this.getTestimonial();

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


  aprovarEgresso(testimonial: ITestimonial) {

    this.testimonialService.approve(testimonial.id).subscribe(
      {
        next: (response) =>{
          console.log(response)

          this.buscarDepoimentos()
        },
        error: (error) => {
        },
        complete: () => {

        }
      }
    )

    this.fecharModal();

  }

  rejeitarEgresso(testimonial: ITestimonial) {
  

    this.testimonialService.reject(testimonial.id).subscribe(
      {
        next: (response) =>{
          console.log(response)

          this.buscarDepoimentos()
        },
        error: (error) => {
        },
        complete: () => {

        }
      }
    )

    this.fecharModal();

  }

  fecharModal(){
    this.isOpen = false;
  }

  openModal(testimonial: ITestimonial, mode: 'visualizar' | 'rejeitar' | 'aprovar'){
    this.viewTestimonial = testimonial;

    this.isOpen = true;

    this.mode = mode;
  }

}
