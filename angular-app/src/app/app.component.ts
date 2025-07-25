import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loginOutForm!: FormGroup;
  logeado: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginOutForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  loginOut() {
    this.authService.logout(); // borra estado de login
      this.router.navigate(['/user']);   // redirige a home
  }
}