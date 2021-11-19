import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'shared-sidebar-mobile',
  templateUrl: './sidebar-mobile.component.html',
  styleUrls: ['./sidebar-mobile.component.css']
})
export class SidebarMobileComponent implements OnInit {

  @ViewChild('sideBar') sideBar!: ElementRef;
  @Input() pathRoute!: string;
  @Input() isAdmin!: any;
  public toogleSidebar: boolean;

  constructor(private authService: AuthService) {
    this.toogleSidebar = false;
  }

  ngOnInit(): void {
  }

  public openSidebar(): void {
    if (!this.toogleSidebar) {
      this.sideBar.nativeElement.style.left = '0';
      this.toogleSidebar = true;
    } else {
      this.sideBar.nativeElement.style.left = '-86%';
      this.toogleSidebar = false;
    }
  }

  public logOut(): void {
    this.authService.logout();
  }

}
