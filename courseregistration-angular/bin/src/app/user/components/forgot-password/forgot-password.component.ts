import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PasswordValidation } from '../../password.validation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
resetPasswordForm: FormGroup;
submitted = false;
passwordReset: String;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({ id: ['', Validators.required], email: ['', Validators.required], password: ['', [Validators.required, Validators.minLength(6)]], confirmPassword: ['', [Validators.required]] }, {validator: PasswordValidation.MatchPassword});
  }
  get f() { return this.resetPasswordForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid)
      return;
    this.userService.resetPassword(this.resetPasswordForm.value).subscribe(resp => {
      let flag = resp.json(); this.passwordReset = flag;

      if (this.passwordReset == "Password reset") {
        this.userService.sendSubmitMessage("Password reset");
        alert("Your password has been reset successfully. Please login");
        this.router.navigate(['login']);
      }
      else if(this.passwordReset=="invalid email"){
      this.userService.sendSubmitMessage("Invalid email");
        alert("Please enter the email address with which you have registered");
      }
      else if(this.passwordReset=="Invalid user ID"){
        this.userService.sendSubmitMessage("Invalid user ID");
          alert("You did not sign up. Please make sure you have an account.");
        }
        else{
          this.userService.sendSubmitMessage("error occured");
          alert("Unexpected error");
        }
    });
    }
}
