import { Component, EventEmitter, Output, Type } from '@angular/core';
import { ISideOption } from '../../interfaces/sideOption.interface';
import { ManageEgressoComponent } from '../manage-egresso/manage-egresso.component';
import { ApproveTestimonialsComponent } from '../homologar-components/approve-testimonials/approve-testimonials.component';
import { ApproveOportunityComponent } from '../homologar-components/approve-oportunity/approve-oportunity.component';
import { ApproveEgressoComponent } from '../homologar-components/approve-egresso/approve-egresso.component';
import { ManageCourseComponent } from '../manage-course/manage-course.component';
import { AutenticationService } from '../../services/autentication.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private authService: AutenticationService){}

  cards: any [] = []

  
  ngOnInit(){


    let role = this.authService.getRole();

    let id = this.authService.getId() ?? -1;

    if(role === 'coordenador'){
      
      this.cards = [
        { title: 'Gerenciar Egressos', icon: 'student-cap.svg', rota: '/gerenciar_egresso'},
        { title: 'Gerenciar Cursos', icon: 'couse-icon.svg', rota: '/gerenciar_curso'  },
        { title: 'Homologar Depoimentos', icon: 'testimoals.svg', rota: '/homologar_depoimentos'  },
        { title: 'Homologar Oportunidades', icon: 'oportunity.svg', rota: '/homologar_oportunidades'},
        { title: 'Homologar Cadastros', icon: 'registrer-icon.svg', rota: '/homologar_cadastros' }
      ];

    }else if(role === 'egresso'){

      this.cards = [
        { title: 'Gerenciar Depoimentos', icon: 'testimoals.svg', rota: '/gerenciar_depoimentos'},
        { title: 'Gerenciar Oportunidades', icon: 'oportunity.svg', rota: '/gerenciar_oportunidades'  },
        { title: 'Atualizar Dados', icon: 'student-cap.svg', rota: '/atualizar_egresso/id/'+id },
      ];

    }


  }
  

}
