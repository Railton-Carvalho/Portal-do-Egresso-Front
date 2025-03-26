import { Component, Output, EventEmitter } from '@angular/core';
import { IEgresso } from '../../../interfaces/egresso.interface';
import { EgressoService } from '../../../services/egresso.service';


@Component({
  selector: 'app-approve-egresso',
  standalone: false,
  templateUrl: './approve-egresso.component.html',
  styleUrl: './approve-egresso.component.scss'
})
export class ApproveEgressoComponent {

  constructor(private egressoService: EgressoService) {}


  egressosFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 4;
  egressosPaginados: any[] = [];

  cursosEgressos: any[] = [];
  egressos: any[] = [];
  viewCurso: any = {} as any;


  // modal 

  isOpen = false;
  mode: 'visualizar' | 'rejeitar' | 'aprovar' = 'visualizar';
  viewEgresso: IEgresso = {} as IEgresso;

  ngOnInit(): void {

    this.getEgresso();

  }

  getEgresso(){

    this.egressoService.getEgressoPendentes(this.paginaAtual - 1, this.itensPorPagina).subscribe(
      {
        next: (response) => {

          this.egressos = response.content;

          this.totalPaginas = response.totalPages;

          console.log(response);

          this.egressos.forEach(element => {
            
            this.egressoService.recuperarCurso(element.id).subscribe(
              {
                next: (response) => {

                  this.cursosEgressos.push(response.content)

                },complete: () =>{
                  console.log(this.cursosEgressos)
                }
              },
            )

          });

        }
      }
    )

  }

  verificarCampo(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    if (valor.trim() === '') {
      this.buscarEgresso();
    }
  }

  
  buscarEgresso(){

    console.log(this.searchTerm);

    if(this.searchTerm == ''){
      this.getEgresso();
      return
    }

    this.paginaAtual = 1

    this.egressoService.getEgressoByName(this.paginaAtual - 1, this.totalPaginas, this.searchTerm).subscribe(
      {
        next: (response) => {
          this.egressos = response.content

          this.totalPaginas = response.totalPages
        }
      }
    )
  }


  atualizarPaginacao() {
    this.totalPaginas = Math.ceil(
      this.egressosFiltrados.length / this.itensPorPagina
    );

    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    this.egressosPaginados = this.egressosFiltrados.slice(inicio, fim);
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


  aprovarEgresso(egresso: IEgresso) {

    this.egressoService.aprovarEgresso(egresso.id).subscribe(
      {
        next: (response) =>{
          console.log(response);
          this.buscarEgresso()
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

  rejeitarEgresso(egresso: IEgresso) {
  
    this.egressoService.rejeitarEgresso(egresso.id).subscribe(
      {
        next: (response) =>{
          console.log(response);

          this.buscarEgresso();
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

  openModal(egresso: IEgresso, index: number, mode: 'visualizar' | 'rejeitar' | 'aprovar'){
    this.viewEgresso = egresso;
    this.viewCurso = this.cursosEgressos[index];

    this.isOpen = true;

    this.mode = mode;
  }

  

}
