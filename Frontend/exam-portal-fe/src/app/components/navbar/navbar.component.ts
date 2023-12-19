import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _loginService: LoginService, private _router: Router) { }

  role: any;

  ngOnInit(): void {
    this.role = this._loginService.getUserRole();
  }

  public logout() {
    this._loginService.logout();
    this._router.navigate(['login']);
    window.location.reload();
  }
}
