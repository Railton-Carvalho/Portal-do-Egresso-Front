import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MY_DATE_FORMATS, RegisterEgressoComponent } from './components/registers/register-egresso/register-egresso.component';
import { TestimonialsComponent } from './components/testimonials-components/testimonials/testimonials.component';
import { ManageEgressoComponent } from './components/manage-egresso/manage-egresso.component';
import { SimplePieComponent } from './components/reports/reports-elements/simple-pie/simple-pie.component';
import { ReportsModule } from './components/reports/reports.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SendTestimonialsComponent } from './components/testimonials-components/send-testimonials/send-testimonials.component';
import { CreateOportunityComponent } from './components/oportunity-components/create-oportunity/create-oportunity.component';
import { EgressoProfileComponent } from './components/egresso-profile/egresso-profile.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ApproveEgressoComponent } from './components/homologar-components/approve-egresso/approve-egresso.component';
import { ApproveOportunityComponent } from './components/homologar-components/approve-oportunity/approve-oportunity.component';
import { ApproveTestimonialsComponent } from './components/homologar-components/approve-testimonials/approve-testimonials.component';
import { CreateCourseComponent } from './components/registers/create-course/create-course.component';
import { ManageCourseComponent } from './components/manage-course/manage-course.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { EgressoComponentsComponent } from './components/egresso-components/egresso-components.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { OportunityComponent } from './components/oportunity-components/oportunity/oportunity.component';
import { ManageOportunityComponent } from './components/manage-oportunity/manage-oportunity.component';
import { ManageTestimoalsComponent } from './components/manage-testimoals/manage-testimoals.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    RegisterEgressoComponent,
    TestimonialsComponent,
    ManageEgressoComponent,
    SendTestimonialsComponent,
    CreateOportunityComponent,
    EgressoProfileComponent,
    ApproveEgressoComponent,
    ApproveOportunityComponent,
    ApproveTestimonialsComponent,
    CreateCourseComponent,
    ManageCourseComponent,
    MainLayoutComponent,
    EgressoComponentsComponent,
    OportunityComponent,
    ManageOportunityComponent,
    ManageTestimoalsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReportsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
