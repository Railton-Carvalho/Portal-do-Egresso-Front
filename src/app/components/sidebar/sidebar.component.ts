import { Component, EventEmitter, Output, Type, ViewEncapsulation } from '@angular/core';
import { ISideOption } from '../../interfaces/sideOption.interface'
import { LoginComponent } from '../login/login.component';
import { RegisterEgressoComponent } from '../registers/register-egresso/register-egresso.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TestimonialsComponent } from '../testimonials-components/testimonials/testimonials.component';
import { ManageEgressoComponent } from '../manage-egresso/manage-egresso.component';
import { ReportsComponent } from '../reports/reports.component';
import { SendTestimonialsComponent } from '../testimonials-components/send-testimonials/send-testimonials.component';
import { CreateOportunityComponent } from '../oportunity-components/create-oportunity/create-oportunity.component';
import { EgressoProfileComponent } from '../egresso-profile/egresso-profile.component';
import { ApproveEgressoComponent } from '../homologar-components/approve-egresso/approve-egresso.component';
import { CreateCourseComponent } from '../registers/create-course/create-course.component';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})


export class SidebarComponent {
  menuItems: ISideOption[] = [
    { option: 'Egressos', component: DashboardComponent },
    { option: 'Depoimentos', component: ManageEgressoComponent },
    { option: 'Oportunidades', component: TestimonialsComponent },
    { option: 'Relatórios', component: ReportsComponent },
    { option: 'Teste cadastro', component: RegisterEgressoComponent },
    { option: 'Send Depoimento', component: SendTestimonialsComponent },
    { option: 'Send Oportunity', component: CreateOportunityComponent },
    { option: 'Egresso Profile', component: EgressoProfileComponent },
    { option: 'Aprove Regresso', component: ApproveEgressoComponent },
    { option: 'Create Course', component: CreateCourseComponent },
  ];

  @Output() optionSelected = new EventEmitter<Type<any>>();

  onSelected(item: ISideOption) {
    this.optionSelected.emit(item.component);
  }
}
