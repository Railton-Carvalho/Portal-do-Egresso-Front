import { Component } from '@angular/core';
import { ITestimonial } from '../../interfaces/testimonial.interface';
import { TestimonialService } from '../../services/testimonial.service';
import { Router } from '@angular/router';
import { AutenticationService } from '../../services/autentication.service';

@Component({
  selector: 'app-manage-testimoals',
  standalone: false,
  templateUrl: './manage-testimoals.component.html',
  styleUrl: './manage-testimoals.component.scss'
})
export class ManageTestimoalsComponent {

  constructor(private testimonialService: TestimonialService, private router: Router, private authService: AutenticationService){}

  testimoalsFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 0;
  testimoalsPaginados: any[] = [];

  testimoals: any[]  =  []

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'excluir' = 'visualizar';
  viewTestimoal: ITestimonial = {} as ITestimonial;

  ngOnInit(): void {

    this.getTestimoals();

  }


  getTestimoals(){

    this.testimonialService.getTestimonialByIdEgresso(Number(this.authService.getId()), this.paginaAtual -1, this.itensPorPagina).subscribe(
      {
        next: (response) => {

          this.testimoals = response.content;

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
      this.buscarDepoimento();
    }
  }

  buscarDepoimento(){

    console.log(this.searchTerm);

    if(this.searchTerm == ''){
      this.getTestimoals();
      return
    }

    this.paginaAtual = 1

    // this.testimonialService.getTestimonialByIdEgresso(this.paginaAtual - 1, this.itensPorPagina, this.searchTerm).subscribe(
    //   {
    //     next: (response) => {
    //       this.testimoals = response.content
    //     }
    //   }
    // )
  }


  atualizarPaginacao() {
 
    this.getTestimoals();

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

  criarNovoEgresso() {

    this.router.navigate(['/cadastrar_depoimento']);
  
  }

  // editarOportunity(oportunity: any) {

  //   this.router.navigate(['/atualizar_egresso'], {
  //     queryParams: oportunity  
  //   });

  // }

  fecharModal(){
    this.isOpen = false;
  }

  openModal(testimoal: any, mode: 'visualizar' | 'excluir'){
    this.viewTestimoal = testimoal;

    this.isOpen = true;

    this.mode = mode;
  }

  excluirOportunity(testimoal: any) {

  
    this.testimonialService.delete(testimoal.depoimentoId).subscribe(
      {
        next: (response) => {
          console.log(response);

          this.getTestimoals()
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
