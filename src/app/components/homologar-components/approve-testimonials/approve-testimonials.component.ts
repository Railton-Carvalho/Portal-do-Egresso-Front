import { Component, Output, EventEmitter } from '@angular/core';
import { IEgresso } from '../../../interfaces/egresso.interface';
import { ManageEgressoService } from '../../../services/manage-egresso.service';
import { TestimonialService } from '../../../services/testimonial.service';
import { ITestimonial } from '../../../interfaces/testimonial.interface';


@Component({
  selector: 'app-approve-testimonials',
  standalone: false,
  templateUrl: './approve-testimonials.component.html',
  styleUrl: './approve-testimonials.component.scss'
})
export class ApproveTestimonialsComponent {

  constructor(private manageEgressoService: ManageEgressoService, private testimonialService: TestimonialService) {}

  @Output('onEgresso') onEgressoEmitt = new EventEmitter<any>();

  testimonialsFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 4;
  testimonialsPaginados: any[] = [];

  testimonials: ITestimonial[]  =  [
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
  ]

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'rejeitar' | 'aprovar' = 'visualizar';
  viewTestimonial: ITestimonial = {} as ITestimonial;

  ngOnInit(): void {
    this.filtrarEgressos();
  }

  filtrarEgressos() {
    if (this.searchTerm.trim() === '') {
      this.testimonialsFiltrados = this.testimonials;
    } else {
      const termo = this.searchTerm.toLowerCase();
      this.testimonialsFiltrados = this.testimonials.filter((e) =>
        e.content.toLowerCase().includes(termo)
      );
    }

    this.paginaAtual = 1;
    this.atualizarPaginacao();
  }

  atualizarPaginacao() {
    this.totalPaginas = Math.ceil(
      this.testimonialsFiltrados.length / this.itensPorPagina
    );

    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    this.testimonialsPaginados = this.testimonialsFiltrados.slice(inicio, fim);
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

    alert('aprovado')

    this.testimonialService.approve(testimonial.id).subscribe(
      {
        next: (response) =>{
          
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
  
    alert('rejeitar');

    this.testimonialService.reject(testimonial.id).subscribe(
      {
        next: (response) =>{
          
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
