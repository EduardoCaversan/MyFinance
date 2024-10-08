import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [CommonModule, SidenavComponent, RouterOutlet],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss'
})
export class FinancesComponent {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngDoCheck(): void {
    if(this.activatedRoute.children.length < 1)
      this.router.navigate(['financas/home']);
  }
}
