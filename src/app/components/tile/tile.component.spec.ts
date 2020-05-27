import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileComponent } from './tile.component';
import { AppRoutingModule } from '../../app-routing.module';

describe('TileComponent', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileComponent ],
      imports: [ AppRoutingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
