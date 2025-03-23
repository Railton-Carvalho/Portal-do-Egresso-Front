import { Component, Output, EventEmitter } from '@angular/core';
import { IEgresso } from '../../interfaces/egresso.interface';
import { ManageEgressoService } from '../../services/manage-egresso.service';
import { EgressoService } from '../../services/egresso.service';

@Component({
  selector: 'app-manage-egresso',
  standalone: false,
  templateUrl: './manage-egresso.component.html',
  styleUrl: './manage-egresso.component.scss'
})
export class ManageEgressoComponent {

  constructor(private manageEgressoService: ManageEgressoService, private egressoService: EgressoService) {}

  @Output('onEgresso') onEgressoEmitt = new EventEmitter<any>();

  egressosFiltrados: any[] = [];
  searchTerm: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 4;
  egressosPaginados: any[] = [];

  egressos: IEgresso[]  =  [
      {
        "id": 1,
        "nome": "Carlos Alberto",
        "senha": "senha12345",
        "userStatus": "ACTIVE",
        "email": "carlos.alberto@example.com",
        "cpf": "12345678901",
        "resumo": "Resumo do egresso Carlos.",
        "url_foto": "http://example.com/foto1.jpg",
        "egressoCursos": [
          'Ciência da Computação',
          'Curso 2',
          'Ciência da Computação 456',
          'Curso 4',
          'Curso 5',
        ],
        "createdAt": "2025-03-11T22:21:23.741944",
        "updatedAt": "2025-03-11T22:21:23.741944",
        "homologado": false,
        "links": []
      },
      {
          "id": 1,
          "nome": "Carlos Alberto",
          "senha": "senha12345",
          "userStatus": "ACTIVE",
          "email": "carlos.alberto@example.com",
          "cpf": "12345678901",
          "resumo": "Resumo do egresso Carlos.",
          "url_foto": "http://example.com/foto1.jpg",
          "egressoCursos": [],
          "createdAt": "2025-03-11T22:21:23.741944",
          "updatedAt": "2025-03-11T22:21:23.741944",
          "homologado": false,
          "links": []
    },
    {
        id: 1,
        nome: "Carlos Alberto",
        senha: "senha12345",
        userStatus: "ACTIVE",
        email: "carlos.alberto@example.com",
        cpf: "12345678901",
        resumo: "Resumo do egresso Carlos.",
        url_foto: "http://example.com/foto1.jpg",
        egressoCursos: [],
        createdAt: "2025-03-11T22:21:23.741944",
        updatedAt: "2025-03-11T22:21:23.741944",
        homologado: false,
        links: []
    },
    {
        id: 1,
        nome: "CSALLES ROBERTO",
        senha: "senha12345",
        userStatus: "ACTIVE",
        email: "carlos.alberto@example.com",
        cpf: "12345678901",
        resumo: "Resumo do egresso Carlos.",
        url_foto: "http://example.com/foto1.jpg",
        egressoCursos: [],
        createdAt: "2025-03-11T22:21:23.741944",
        updatedAt: "2025-03-11T22:21:23.741944",
        homologado: false,
        links: []
    }
    ,
    {
        id: 1,
        nome: "Franscico Paula Roberto",
        senha: "senha12345",
        userStatus: "ACTIVE",
        email: "carlos.alberto@example.com",
        cpf: "12345678901",
        resumo: "Resumo do egresso Carlos.",
        url_foto: "http://example.com/foto1.jpg",
        egressoCursos: [],
        createdAt: "2025-03-11T22:21:23.741944",
        updatedAt: "2025-03-11T22:21:23.741944",
        homologado: false,
        links: []
    }
    ,
    {
        id: 1,
        nome: "Carlos Alberto",
        senha: "senha12345",
        userStatus: "ACTIVE",
        email: "carlos.alberto@example.com",
        cpf: "12345678901",
        resumo: "Resumo do egresso Carlos.",
        url_foto: "http://example.com/foto1.jpg",
        egressoCursos: [],
        createdAt: "2025-03-11T22:21:23.741944",
        updatedAt: "2025-03-11T22:21:23.741944",
        homologado: false,
        links: []
    }
    ,
    {
        id: 1,
        nome: "Carlos Alberto",
        senha: "senha12345",
        userStatus: "ACTIVE",
        email: "carlos.alberto@example.com",
        cpf: "12345678901",
        resumo: "Resumo do egresso Carlos.",
        url_foto: "http://example.com/foto1.jpg",
        egressoCursos: [],
        createdAt: "2025-03-11T22:21:23.741944",
        updatedAt: "2025-03-11T22:21:23.741944",
        homologado: false,
        links: []
    }
  ]

  // modal 

  isOpen = false;
  mode: 'visualizar' | 'excluir' = 'visualizar';
  viewEgresso: IEgresso = {} as IEgresso;

  ngOnInit(): void {
    this.filtrarEgressos();
  }

  filtrarEgressos() {
    if (this.searchTerm.trim() === '') {
      this.egressosFiltrados = this.egressos;
    } else {
      const termo = this.searchTerm.toLowerCase();
      this.egressosFiltrados = this.egressos.filter((e) =>
        e.nome.toLowerCase().includes(termo)
      );
    }

    this.paginaAtual = 1;
    this.atualizarPaginacao();
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

  criarNovoEgresso() {

    this.manageEgressoService.emitirEgresso({operation: true})
  }

  editarEgresso(egresso: IEgresso) {

    this.manageEgressoService.emitirEgresso({operation: false, egresso: egresso})

  }

  fecharModal(){
    this.isOpen = false;
  }

  openModal(egresso: IEgresso, mode: 'visualizar' | 'excluir'){
    this.viewEgresso = egresso;

    this.isOpen = true;

    this.mode = mode;
  }

  excluirEgresso(egresso: IEgresso) {
  
    alert('excluir');

    this.egressoService.deletarEgresso(egresso.id).subscribe(
      {
        next: (response) => {

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
