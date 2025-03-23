import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-testimonials',
  standalone: false,
  templateUrl: './send-testimonials.component.html',
  styleUrl: './send-testimonials.component.scss'
})
export class SendTestimonialsComponent {
  titleFormControl = new FormControl('', [Validators.required]);

 
}
