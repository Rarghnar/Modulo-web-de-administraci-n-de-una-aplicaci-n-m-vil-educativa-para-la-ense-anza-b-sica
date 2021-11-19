import { Component, OnInit } from '@angular/core';
import { IsSuperadminService } from 'src/app/core/services/is-superadmin/is-superadmin.service';
import { TokenService } from '../core/services/token/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public path: string = "admin"
  public isAdmin: any = false;

  constructor(private isSuperAdmin: IsSuperadminService, private tokenService:TokenService) { }

  async ngOnInit(): Promise<void> { 
    if (JSON.parse(this.tokenService.getToken()).role === 'superadmin') {
      this.isAdmin = true          
    } else this.isAdmin = false;
    /* this.isAdmin = this.isSuperAdmin.getMessage; */
  }

}
