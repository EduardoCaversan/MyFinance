import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatagridComponent } from "../../../../shared/components/datagrid/datagrid.component";
import { MovementsCardComponent } from "../../../../shared/components/movements-card/movements-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatagridComponent, MovementsCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}