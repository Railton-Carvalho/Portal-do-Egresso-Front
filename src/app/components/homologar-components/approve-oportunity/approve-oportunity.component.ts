import { Component, Output, EventEmitter } from '@angular/core';
import { IEgresso } from '../../../interfaces/egresso.interface';
import { ManageEgressoService } from '../../../services/manage-egresso.service';
import { OportunityService } from '../../../services/oportunity.service';
import { IOportunity } from '../../../interfaces/oportunity.interface';

@Component({
  selector: 'app-approve-oportunity',
  standalone: false,
  templateUrl: './approve-oportunity.component.html',
  styleUrl: './approve-oportunity.component.scss'
})
export class ApproveOportunityComponent {

  constructor(private manageEgressoService: ManageEgressoService, private oportunityService: OportunityService) {}

  @Output('onEgresso') onEgressoEmitt = new EventEmitter<any>();

  oportunitysFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 4;
  oportunitysPaginados: any[] = [];

  oportunitys: IOportunity[]  =  [
      {
        id: 1,
        title: "TÍTULO DA OPORTUNIDADE 1",
         testimonials: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        status: "Aprovado", 
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 2,
        title: "TÍTULO DA OPORTUNIDADE 1",
         testimonials: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        status: "Aprovado", 
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 2,
        title: "TÍTULO DA OPORTUNIDADE 1",
         testimonials: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        status: "Aprovado", 
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 2,
        title: "TÍTULO DA OPORTUNIDADE 1",
         testimonials: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        status: "Aprovado", 
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 2,
        title: "TÍTULO DA OPORTUNIDADE 1",
         testimonials: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        status: "Aprovado", 
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 2,
        title: "TÍTULO DA OPORTUNIDADE 1",
         testimonials: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        status: "Aprovado", 
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
      {
        id: 2,
        title: "TÍTULO DA OPORTUNIDADE 1",
        testimonials: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor tortor ac erat vestibulum pellentesque. Mauris ac ligula luctus, consectetur eros at, gravida dui. Nam mattis mattis nunc quis auctor. Suspendisse consequat varius orci et iaculis. Praesent nisi dolor, sollicitudin eget maximus eu, tempus eu ante. Maecenas id condimentum velit, vel faucibus magna. Vestibulum arcu lectus, tincidunt vitae augue sed, congue consequat est. Praesent eget augue bibendum, venenatis mi in, elementum leo.",
        status: "Aprovado", 
        createdAt: "2025-02-02", 
        updatedAt: "2025-02-02", 
      },
  ]

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'rejeitar' | 'aprovar' = 'visualizar';
  viewOportunity: IOportunity = {} as IOportunity;

  ngOnInit(): void {
    this.filtrarEgressos();
  }

  filtrarEgressos() {
    if (this.searchTerm.trim() === '') {
      this.oportunitysFiltrados = this.oportunitys;
    } else {
      const termo = this.searchTerm.toLowerCase();
      this.oportunitysFiltrados = this.oportunitys.filter((e) =>
        e.title.toLowerCase().includes(termo)
      );
    }

    this.paginaAtual = 1;
    this.atualizarPaginacao();
  }

  atualizarPaginacao() {
    this.totalPaginas = Math.ceil(
      this.oportunitysFiltrados.length / this.itensPorPagina
    );

    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    this.oportunitysPaginados = this.oportunitysFiltrados.slice(inicio, fim);
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


  aprovarEgresso(oportunity: IOportunity) {

    this.oportunityService.approve(oportunity.id).subscribe(
      {
        next: (response) =>{
          
        },
        error: (error) => {
          alert(error);
        },
        complete: () => {

        }
      }
    )

    this.fecharModal();

  }

  rejeitarEgresso(oportunity: IOportunity) {
  

    this.oportunityService.reject(oportunity.id).subscribe(
      {
        next: (response) =>{
          
        },
        error: (error) => {
          alert(error);
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
