import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-movements-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './movements-card.component.html',
  styleUrl: './movements-card.component.scss'
})
export class MovementsCardComponent {
  @Input() public chipType: ('entry' | 'exit' | 'balance') = 'entry';
  @Input() public valueToBeShown: number = 0;

  public get chipIconName(): string {
    switch (this.chipType) {
      case 'exit':
        return 'mdiArrowDown';
      case 'balance':
        return 'mdiBank';
      default:
        return 'mdiArrowUp';
    }
  }

  public get chipText(): string {
    switch (this.chipType) {
      case 'exit':
        return 'Saídas';
      case 'balance':
        return 'Saldo';
      default:
        return 'Entradas';
    }
  }

  public get formattedValue(): string {
    return this.valueToBeShown.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
