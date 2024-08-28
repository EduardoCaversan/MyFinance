import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

export interface IDataGridColumn {
  header: string;
  field: string;
  isCurrency?: boolean;
}

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnChanges {
  @Input() columns: IDataGridColumn[] = [];
  @Input() rows: { [key: string]: any }[] = [];

  private originalRows: { [key: string]: any }[] = [];
  private activeSortColumn: string | null = null;
  private sortDirection: 'asc' | 'desc' | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      this.originalRows = [...this.rows];
    }
  }

  public toggleSort(column: string): void {
    this.updateSortDirection(column);
    this.applySort();
  }

  public getSortIcon(column: string): string {
    if (this.isActiveColumn(column)) {
      return this.sortDirection === 'asc' ? 'mdiSortAscending' : 'mdiSortDescending';
    }
    return 'mdiSort';
  }

  private updateSortDirection(column: string): void {
    if (this.isActiveColumn(column)) {
      this.cycleSortDirection();
    } else {
      this.activateSortColumn(column);
    }
  }

  private isActiveColumn(column: string): boolean {
    return this.activeSortColumn === column;
  }

  private cycleSortDirection(): void {
    if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else if (this.sortDirection === 'desc') {
      this.resetSort();
    } else {
      this.sortDirection = 'asc';
    }
  }

  private activateSortColumn(column: string): void {
    this.activeSortColumn = column;
    this.sortDirection = 'asc';
  }

  private resetSort(): void {
    this.sortDirection = null;
    this.activeSortColumn = null;
  }

  private applySort(): void {
    if (this.activeSortColumn && this.sortDirection) {
      this.sortRows();
    } else {
      this.resetRows();
    }
  }

  private sortRows(): void {
    this.rows.sort((a, b) => {
      const aValue = this.normalizeValue(a[this.activeSortColumn!]);
      const bValue = this.normalizeValue(b[this.activeSortColumn!]);

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const comparison = aValue.toString().localeCompare(bValue.toString());
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  private resetRows(): void {
    this.rows = [...this.originalRows];
  }

  private normalizeValue(value: string | number): string | number {
    if (typeof value === 'number') {
      return value;
    }

    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      return parsedValue;
    }

    return value.toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .toLowerCase();
  }

  public getCurrencyString(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}