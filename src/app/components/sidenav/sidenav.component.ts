import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

interface INavData {
  label: string;
  iconName: string;
  url: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  public collapsed: boolean = true;
  public navData: INavData[] = [
    { label: 'Início', iconName: 'mdiHome', url: 'home' },
    { label: 'Dashboard', iconName: 'mdiFinance', url: 'dashboard' },
    { label: 'Movimentações', iconName: 'mdiWallet', url: 'movimentacoes' },
    { label: 'Sair', iconName: 'mdiLocationExit', url: 'logout' },
  ];

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void { }

  public collapseNav(): void {
    this.collapsed = !this.collapsed;
  }

  public goToPage(targetPage: string): void {
    if (targetPage === 'logout') {
      this.auth.completeLogout();
      this.router.navigate(['login']);
    }
    else{
      this.collapsed = true;
      this.router.navigate(['financas/' + targetPage]);
    }
  }
}