import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IOportunity } from '../../../interfaces/oportunity.interface'; 
import { OportunityService } from '../../../services/oportunity.service';
import { AutenticationService } from '../../../services/autentication.service';

@Component({
  selector: 'app-create-oportunity',
  standalone: false,
  templateUrl: './create-oportunity.component.html',
  styleUrl: './create-oportunity.component.scss'
})
export class CreateOportunityComponent {
    tituloFormControl = new FormControl('', [Validators.required]);

    descricaoFormControl = new FormControl('', [Validators.required]);

    constructor(private oportunityService: OportunityService, private authService: AutenticationService) {}

    onSubmit(){


        let oportunity = {
          egressoId: Number(this.authService.getId()),
          titulo: this.tituloFormControl.value,
          descricao: this.descricaoFormControl.value,
          link: 'https://link.com'
        }

        console.log(oportunity)


        this.oportunityService.create(oportunity).subscribe(
          {
            next: (response) => {
              console.log(response)
            },
            error: (error) => {
              console.error(error);
            }
          }
        )


    }

}
