import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLinechartComponent } from './data-linechart.component';

describe('DataLinechartComponent', () => {
  let component: DataLinechartComponent;
  let fixture: ComponentFixture<DataLinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataLinechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
