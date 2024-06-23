import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import * as mdi from '@mdi/js'

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() public name: string = 'mdiAccount';
  @Input() public size: string = "xl";
  public iconSvg: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const { name } = changes;
    if (name)
      this.iconSvg = (mdi as any)[this.name];
  }
}
