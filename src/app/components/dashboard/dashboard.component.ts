import { Component, EventEmitter, Output, Type } from '@angular/core';
import { ISideOption } from '../../interfaces/sideOption.interface';
import { ManageEgressoComponent } from '../manage-egresso/manage-egresso.component';
import { ApproveTestimonialsComponent } from '../homologar-components/approve-testimonials/approve-testimonials.component';
import { ApproveOportunityComponent } from '../homologar-components/approve-oportunity/approve-oportunity.component';
import { ApproveEgressoComponent } from '../homologar-components/approve-egresso/approve-egresso.component';
import { ManageEgressoService } from '../../services/manage-egresso.service';
import { ManageCourseComponent } from '../manage-course/manage-course.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private manageEgressoService: ManageEgressoService){}

  cards = [
    { title: 'Gerenciar Egressos', icon: 'student-cap.svg', component: ManageEgressoComponent},
    { title: 'Gerenciar Cursos', icon: 'couse-icon.svg', component: ManageCourseComponent  },
    { title: 'Homologar Depoimentos', icon: 'testimoals.svg', component: ApproveTestimonialsComponent  },
    { title: 'Homologar Oportunidades', icon: 'oportunity.svg', component: ApproveOportunityComponent},
    { title: 'Homologar Cadastros', icon: 'registrer-icon.svg', component: ApproveEgressoComponent }
  ];

  @Output() optionSelected = new EventEmitter<Type<any>>();
  
  onSelected(item: Type<any>) {
    //this.optionSelected.emit(item);

    this.manageEgressoService.emitirEgresso({op: 'dashboard', item: item})
  }
}
