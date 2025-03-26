import { Component, Output, EventEmitter } from '@angular/core';
import { IEgresso } from '../../interfaces/egresso.interface';
import { EgressoService } from '../../services/egresso.service';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-manage-egresso',
  standalone: false,
  templateUrl: './manage-egresso.component.html',
  styleUrl: './manage-egresso.component.scss'
})
export class ManageEgressoComponent {

  constructor(private egressoService: EgressoService, private router: Router, private courseService: CourseService) {}

  egressosFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 0;
  egressosPaginados: any[] = [];

  egressos: IEgresso[]  =  []

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'excluir' = 'visualizar';
  viewEgresso: any = {} as any;
  viewCurso: any = {} as any;

  cursosEgressos: any[] = [];

  ngOnInit(): void {

    this.getEgressos();

  }


  getEgressos(){

    this.egressoService.recuperarEgressos(this.paginaAtual -1, this.itensPorPagina).subscribe(
      {
        next: (response) => {

          this.egressos = response.content;

          this.totalPaginas = response.totalPages;
        
          console.log(response)

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
      this.buscarEgresso();
    }
  }

  buscarEgresso(){

    console.log(this.searchTerm);

    this.paginaAtual = 1

    if(this.searchTerm == ''){
      this.getEgressos();
      return
    }

    this.egressoService.getEgressoByName(this.paginaAtual - 1, this.itensPorPagina, this.searchTerm).subscribe(
      {
        next: (response) => {
          this.egressos = response.content
        }
      }
    )
  }


  atualizarPaginacao() {
 
    this.getEgressos();

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

    this.router.navigate(['/cadastrar_egresso']);
  
  }

  editarEgresso(egresso: IEgresso) {

    this.router.navigate(['/atualizar_egresso/cpf/', egresso.cpf]);
  }

  fecharModal(){
    this.isOpen = false;
  }

  openModal(egresso: IEgresso, index: number, mode: 'visualizar' | 'excluir'){
    this.viewEgresso = egresso;
    this.viewCurso = this.cursosEgressos[index];

    this.isOpen = true;

    this.mode = mode;
  }

  excluirEgresso(egresso: IEgresso) {

  
    this.egressoService.deletarEgressoLogica(egresso.id).subscribe(
      {
        next: (response) => {

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
}
