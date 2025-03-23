import { Component, EventEmitter, Output, Type } from '@angular/core';
import { ISideOption } from '../../interfaces/sideOption.interface';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output('homeBtnClicked') homeBtnClicked = new EventEmitter<Type<any>>;

  onHomeBtnClicked(){
    this.homeBtnClicked.emit(DashboardComponent);
  }

  onExitBtnClicked() {
    throw new Error('Method not implemented.');
  }
}
