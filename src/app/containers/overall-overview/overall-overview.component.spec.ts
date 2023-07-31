import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallOverviewComponent } from './overall-overview.component';

describe('OverallOverviewComponent', () => {
  let component: OverallOverviewComponent;
  let fixture: ComponentFixture<OverallOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
