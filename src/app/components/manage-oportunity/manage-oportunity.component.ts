import { Component } from '@angular/core';
import { OportunityService } from '../../services/oportunity.service';
import { IOportunity } from '../../interfaces/oportunity.interface';
import { Router } from '@angular/router';
import { AutenticationService } from '../../services/autentication.service';

@Component({
  selector: 'app-manage-oportunity',
  standalone: false,
  templateUrl: './manage-oportunity.component.html',
  styleUrl: './manage-oportunity.component.scss'
})
export class ManageOportunityComponent {

  constructor(private oportunityService: OportunityService, private router: Router, private authService: AutenticationService){}

  oportunitysFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 0;
  egressosPaginados: any[] = [];

  oportunitys: any[]  =  []

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'excluir' = 'visualizar';
  viewOportunity: IOportunity = {} as IOportunity;

  ngOnInit(): void {

    this.getOportunitys();

    //this.filtrarEgressos();
  }


  getOportunitys(){

    this.oportunityService.getOportunityByIdEgresso(Number(this.authService.getId()),this.paginaAtual -1, this.itensPorPagina).subscribe(
      {
        next: (response) => {

          this.oportunitys = response.content;

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
      this.buscarOportunity();
    }
  }

  buscarOportunity(){

    console.log(this.searchTerm);

    if(this.searchTerm == ''){
      this.getOportunitys();
      return
    }

    this.paginaAtual = 1

    // this.oportunityService.getOportunityByIdEgresso(this.paginaAtual - 1, this.itensPorPagina, this.searchTerm).subscribe(
    //   {
    //     next: (response) => {
    //       this.oportunitys = response.content
    //     }
    //   }
    // )
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

  criarNovoEgresso() {

    this.router.navigate(['/cadastrar_oportunidade']);
  
  }

  // editarOportunity(oportunity: any) {

  //   this.router.navigate(['/atualizar_egresso'], {
  //     queryParams: oportunity  
  //   });

  // }

  fecharModal(){
    this.isOpen = false;
  }

  openModal(oportunity: any, mode: 'visualizar' | 'excluir'){
    this.viewOportunity = oportunity;

    this.isOpen = true;

    this.mode = mode;
  }

  excluirOportunity(oportunity: any) {

  
    this.oportunityService.delete(oportunity.id).subscribe(
      {
        next: (response) => {
          console.log(response);

          this.getOportunitys()

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
