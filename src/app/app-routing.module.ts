import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { ManageCourseComponent } from './components/manage-course/manage-course.component';
import { ManageEgressoComponent } from './components/manage-egresso/manage-egresso.component';
import { ApproveTestimonialsComponent } from './components/homologar-components/approve-testimonials/approve-testimonials.component';
import { ApproveOportunityComponent } from './components/homologar-components/approve-oportunity/approve-oportunity.component';
import { ApproveEgressoComponent } from './components/homologar-components/approve-egresso/approve-egresso.component';
import { TestimonialsComponent } from './components/testimonials-components/testimonials/testimonials.component';
import { EgressoProfileComponent } from './components/egresso-profile/egresso-profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CreateOportunityComponent } from './components/oportunity-components/create-oportunity/create-oportunity.component';
import { RegisterEgressoComponent } from './components/registers/register-egresso/register-egresso.component';
import { CreateCourseComponent } from './components/registers/create-course/create-course.component';
import { EgressoComponentsComponent } from './components/egresso-components/egresso-components.component';
import { OportunityComponent } from './components/oportunity-components/oportunity/oportunity.component';
import { ManageTestimoalsComponent } from './components/manage-testimoals/manage-testimoals.component';
import { ManageOportunityComponent } from './components/manage-oportunity/manage-oportunity.component';
import { SendTestimonialsComponent } from './components/testimonials-components/send-testimonials/send-testimonials.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent, 
    //canActivate: [AuthNotGuard],
  },

  {
    path: '',
    component: MainLayoutComponent,

    children: [
      {path: '', redirectTo: 'egressos', pathMatch: 'full'},
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador', 'egresso'] }
      },

      {
        path: 'gerenciar_egresso',
        component: ManageEgressoComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador'] }
      },
      {
        path: 'cadastrar_egresso',
        component: RegisterEgressoComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador'] }
      },
      {
        path: 'atualizar_egresso/cpf/:cpf',
        component: RegisterEgressoComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador', 'egresso'] }
      },

      {
        path: 'atualizar_egresso/id/:id',
        component: RegisterEgressoComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador', 'egresso'] }
      },

      {
        path: 'gerenciar_curso',
        component: ManageCourseComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador'] }
      },

      {
        path: 'cadastrar_curso',
        component: CreateCourseComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador'] }
      },
      {
        path: 'atualizar_curso/:id',
        component: CreateCourseComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador'] }
      },

      {
        path: 'gerenciar_depoimentos',
        component: ManageTestimoalsComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['egresso'] }
      },

      {
        path: 'cadastrar_depoimento',
        component: SendTestimonialsComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['egresso'] }
      },
      {
        path: 'gerenciar_oportunidades',
        component: ManageOportunityComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['egresso'] }
      },

      {
        path: 'cadastrar_oportunidade',
        component: CreateOportunityComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['egresso'] }
      },


      {
        path: 'homologar_depoimentos',
        component: ApproveTestimonialsComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador'] }
      },

      {
        path: 'homologar_oportunidades',
        component: ApproveOportunityComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador'] }
      },

      
      {
        path: 'homologar_cadastros',
        component: ApproveEgressoComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['coordenador'] }
      },

      {
        path: 'egressos',
        component: EgressoComponentsComponent,
        
      },
      {
        path: 'depoimentos',
        component: TestimonialsComponent
      },
      {
        path: 'oportunidades',
        component: OportunityComponent
      },
      {
        path: 'relatorios',
        component: ReportsComponent
      },
      {
        path: 'perfil_egresso/:cpf',
        component: EgressoProfileComponent
      }
      
    ]

  },


  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'},  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 




}
