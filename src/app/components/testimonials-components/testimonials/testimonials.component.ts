import { Component } from '@angular/core';
import { TestimonialService } from '../../../services/testimonial.service';
import { EgressoService } from '../../../services/egresso.service';

@Component({
  selector: 'app-testimonials',
  standalone: false,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
   // Lista de depoimentos (exemplo fixo).
  // Em um app real, você poderia buscar via serviço/HTTP.
  testimonials: any[] = [];

  pageAtual: number = 1;
  size: number = 15;
  totalPage: number = 1;

  
  expandedTestimonials: { [key: number]: boolean } = {};

  constructor(private testimonialService: TestimonialService, private egressoService: EgressoService){}

  ngOnInit() {

    this.getTestimonials()

  }

  getTestimonials() {

    this.testimonialService.getAll(this.pageAtual -1, this.size).subscribe(
      {
        next: (response) => {
          console.log(response);

          this.testimonials = response.content;

          this.totalPage = response.totalPages; 

          this.testimonials.forEach((d, i) => {
            this.expandedTestimonials[i] = false; // Inicia todos os depoimentos recolhidos

            this.egressoService.getEgressoById(d.id_Egresso).subscribe(
             { 
              next: (response) => {
                d.egresso = response;
              }
            }
            )

          });

          

        }
      }
    )

  }


  toggleText(index: number, event: Event) {
    event.preventDefault(); // para não rolar para o topo
    this.expandedTestimonials[index] = !this.expandedTestimonials[index];
  }
}
