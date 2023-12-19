import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {

  constructor(public _loginService: LoginService, private _router: Router) {}

  public logout() {
    this._loginService.logout();
    this._router.navigate(['login']);
    window.location.reload();
  }
}
