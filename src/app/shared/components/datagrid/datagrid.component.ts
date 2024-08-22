import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.scss'
})
export class DatagridComponent {
  @Input() columns: string[] = [];
  @Input() rows: { [key: string]: any }[] = [];
}
