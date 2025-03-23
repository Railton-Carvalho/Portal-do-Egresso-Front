import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IOportunity } from '../../../interfaces/oportunity.interface'; 
import { OportunityService } from '../../../services/oportunity.service';

@Component({
  selector: 'app-create-oportunity',
  standalone: false,
  templateUrl: './create-oportunity.component.html',
  styleUrl: './create-oportunity.component.scss'
})
export class CreateOportunityComponent {
    titleFormControl = new FormControl('', [Validators.required]);

    testimonialsFormControl = new FormControl('', [Validators.required]);

    constructor(private oportunityService: OportunityService) {}

    onSubmit(){

      

    }

}
