import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted: boolean = false;

  country = 'BE';
  countryCode = '32';
  constructor(private formBuilder: FormBuilder,
    private userService :UserService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.minLength(3),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.minLength(3),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      },
     
    );
  }
  get f() {
    return this.signUpForm.controls;
  }
  singup() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
      
    this.submitted = true;
    if (this.signUpForm.invalid) {
        return;
    }
    this.userService.singup(this.signUpForm.value).subscribe(
      (data) => {
        this.router.navigate(['/connexion'])
      },
      (error) => {
        return false;
      }
    )
  }

}
