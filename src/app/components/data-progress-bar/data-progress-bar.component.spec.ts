import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProgressBarComponent } from './data-progress-bar.component';

describe('DataProgressBarComponent', () => {
  let component: DataProgressBarComponent;
  let fixture: ComponentFixture<DataProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
