import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatagridComponent, IDataGridColumn } from "../../../../shared/components/datagrid/datagrid.component";
import { MovementsCardComponent } from "../../../../shared/components/movements-card/movements-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatagridComponent, MovementsCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public columns: IDataGridColumn[] = [
    { header: 'Tipo de movimentação', field: 'movementType' },
    { header: 'Valor', field: 'value', isCurrency: true }
  ];
  public rows: Object[] = [
    { movementType: 'Entrada', value: 90 },
    { movementType: 'Saída', value: 20 },
    { movementType: 'Entrada', value: 430 },
    { movementType: 'Entrada', value: 290 },
    { movementType: 'Saída', value: 1000 },
    { movementType: 'Entrada', value: 900 },
    { movementType: 'Saída', value: 10 },
    { movementType: 'Saída', value: 400 },
    { movementType: 'Saída', value: 200 },
    { movementType: 'Entrada', value: 350 }
  ]
}