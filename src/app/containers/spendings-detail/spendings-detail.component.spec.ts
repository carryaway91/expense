import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingsDetailComponent } from './spendings-detail.component';

describe('SpendingsDetailComponent', () => {
  let component: SpendingsDetailComponent;
  let fixture: ComponentFixture<SpendingsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
