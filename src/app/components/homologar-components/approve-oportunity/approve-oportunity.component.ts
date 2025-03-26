import { Component, Output, EventEmitter } from '@angular/core';
import { IEgresso } from '../../../interfaces/egresso.interface';
import { OportunityService } from '../../../services/oportunity.service';
import { IOportunity } from '../../../interfaces/oportunity.interface';

@Component({
  selector: 'app-approve-oportunity',
  standalone: false,
  templateUrl: './approve-oportunity.component.html',
  styleUrl: './approve-oportunity.component.scss'
})
export class ApproveOportunityComponent {

  constructor(private oportunityService: OportunityService) {}

  oportunitysFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 4;
  oportunitysPaginados: any[] = [];

  oportunitys: any[]  = []

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'rejeitar' | 'aprovar' = 'visualizar';
  viewOportunity: IOportunity = {} as IOportunity;

  ngOnInit(): void {

    this.getOportunitys();

  }

  getOportunitys(){

    this.oportunityService.getOportunityPendentes(this.paginaAtual - 1, this.itensPorPagina, this.searchTerm).subscribe(
      {
        next: (response) => {

          this.oportunitys = response.content;

          this.totalPaginas = response.totalPages;

          console.log(response);

        }
      }
    )

  }

  verificarCampo(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    if (valor.trim() === '') {
      this.buscarOportunitys();
    }
  }


  buscarOportunitys() {

    this.paginaAtual = 1;
    
    this.getOportunitys()

  }


  atualizarPaginacao() {
   
    this.getOportunitys();

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


  aprovarOportunity(oportunity: IOportunity) {

    this.oportunityService.approve(oportunity.id).subscribe(
      {
        next: (response) =>{
          console.log(response)

          this.buscarOportunitys()
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

  rejeitarOportunity(oportunity: IOportunity) {
  

    this.oportunityService.reject(oportunity.id).subscribe(
      {
        next: (response) =>{
          console.log(response)

          this.buscarOportunitys()

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

  fecharModal(){
    this.isOpen = false;
  }

  openModal(oportunity: IOportunity, mode: 'visualizar' | 'rejeitar' | 'aprovar'){
    this.viewOportunity = oportunity;

    this.isOpen = true;

    this.mode = mode;
  }
}
