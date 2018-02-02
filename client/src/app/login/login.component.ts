import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { InterlinkService } from '../interlink.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: object
  errorMsg: string
  userName: string
  constructor(private _interlink: InterlinkService, private _router: Router) {
    this.user = { name: '' }
    this.errorMsg = "";
  }
  login() {
    this.user['name'] = this.user['name'].trim();
    if (this.user['name'].length > 2) {
      this.errorMsg = "";
      this._interlink.login(this.user, (data) => {
        this._router.navigate(['dashboard']);
      })
    }
    else {
      this.errorMsg = "Name must be at least two characters."
    }
  }
  ngOnInit() {
    this._interlink.CheckSession((userName) => {
      if (userName['user']) {
        this.userName = userName['user'];
        this._router.navigate(['dashboard']);
      } else {
        this._router.navigate(['/']);
      }
    })
  }

}
