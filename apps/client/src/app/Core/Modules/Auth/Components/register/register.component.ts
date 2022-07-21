import { MustMatch } from '../../../../../Shared/Tools/mustMatch.tool';
import { AuthManagerService } from './../../Services/auth-manager.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

@Component({
  selector: 'la-forge-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const formatedUser = {
      username: this.registerForm.value['username'],
      email: this.registerForm.value['email'],
      password: this.registerForm.value['password'],
    }
    this.authManager.register(formatedUser).subscribe({
      next: (response) => {
        console.log(response);
        
        // this.router.navigate(['/mail-pending'], { queryParams: { username: response?.username, email: response?.email } });
      },
      error: (error) => {
        console.error('Error :', error)
      }
    })
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
