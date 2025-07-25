import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bancos',
  imports: [RouterLink],
  templateUrl: './bancos.component.html',
  styleUrl: './bancos.component.css'
})
export class BancosComponent {
  fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
}
