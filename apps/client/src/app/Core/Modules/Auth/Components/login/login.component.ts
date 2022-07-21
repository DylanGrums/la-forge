import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthManagerService } from '../../Services/auth-manager.service';
import { SetToken } from '../../Store/Actions/auth.actions';

@Component({
  selector: 'la-forge-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authManager: AuthManagerService,
    private readonly _store: Store,
    private readonly _router: Router
  ) { }

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const formatedUser = {
      email: this.loginForm.value['email'] as string,
      password: this.loginForm.value['password'] as string,
    }
    this._authManager.login(formatedUser).subscribe({
      next: (res) => {
        if (res?.token) {
          this._store.dispatch(new SetToken(res?.token));
        }
        this._router.navigate(['/'])
      },
      error: (error) => {
        console.error('Error :', error)
      }
    })
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}
