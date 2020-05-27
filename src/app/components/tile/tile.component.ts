import { Component, Input } from '@angular/core';
import { HouseModel } from '../../types/app-data.types';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {

  @Input() data: HouseModel;

  public get id(): string {
    return this.data?.url?.split('/').pop();
  }
}
