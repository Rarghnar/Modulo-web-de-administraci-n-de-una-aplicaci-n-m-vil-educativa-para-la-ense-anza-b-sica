import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() pathRoute!: string
  @Input() isAdmin!: any;

  public array: any[]

  constructor(private authService: AuthService) {
    this.array = [];    
  }

  ngOnInit(): void {  
  }

  public logOut(): void {
    this.authService.logout();
  }
}
