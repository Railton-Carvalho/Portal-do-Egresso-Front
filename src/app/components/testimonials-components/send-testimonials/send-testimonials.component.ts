import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TestimonialService } from '../../../services/testimonial.service';
import { AutenticationService } from '../../../services/autentication.service';

@Component({
  selector: 'app-send-testimonials',
  standalone: false,
  templateUrl: './send-testimonials.component.html',
  styleUrl: './send-testimonials.component.scss'
})
export class SendTestimonialsComponent {
  depoimentoFormControl = new FormControl('', [Validators.required]);

  constructor(private testimonialService: TestimonialService, private authService: AutenticationService){}

  onSubmit(){

    let testimoal = {
      egressoId: Number(this.authService.getId()),
      texto: this.depoimentoFormControl.value
    }

    this.testimonialService.create(testimoal).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error) => [
          console.error(error)
        ]
      }
    )

  }
 
}
