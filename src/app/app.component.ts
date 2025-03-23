import { ChangeDetectorRef, Component, Type } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ISideOption } from './interfaces/sideOption.interface';
import { RegisterEgressoComponent } from './components/registers/register-egresso/register-egresso.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { TestimonialsComponent } from './components/testimonials-components/testimonials/testimonials.component';
import { ManageEgressoComponent } from './components/manage-egresso/manage-egresso.component';
import { ManageEgressoService } from './services/manage-egresso.service';
import { RegisterEgressoService } from './services/register-egresso.service';
import { ApproveEgressoComponent } from './components/homologar-components/approve-egresso/approve-egresso.component';
import { ApproveOportunityComponent } from './components/homologar-components/approve-oportunity/approve-oportunity.component';
import { ApproveTestimonialsComponent } from './components/homologar-components/approve-testimonials/approve-testimonials.component';
import { ManageCourseComponent } from './components/manage-course/manage-course.component';
import { CreateCourseComponent } from './components/registers/create-course/create-course.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portal-Egresso';

  manageEgressoSubscription!: Subscription;

  currentComponent: Type<any> = ApproveEgressoComponent;

  constructor(private cdr: ChangeDetectorRef, 
    private manageEgressoService: ManageEgressoService, private registerEgressoService: RegisterEgressoService) {}
  onOptionSelected(component: Type<any>) {
    this.currentComponent = component;
    this.cdr.detectChanges();
  }

  ngOnInit() {
     this.manageEgressoSubscription = this.manageEgressoService.egresso$.subscribe((dados) => {

      if(dados && dados.op && dados.op == 'dashboard'){
        this.onOptionSelected(dados.item);
      }else{
        this.onEgresso(dados);
      }

     });

     this.onOptionSelected(CreateCourseComponent)
  }
  

  onEgresso(event: any){

    this.registerEgressoService.setEgresso(event);

    this.onOptionSelected(RegisterEgressoComponent);

  }

  ngOnDestroy(){
    if (this.manageEgressoSubscription) {
      this.manageEgressoSubscription.unsubscribe();
    }
  }

}