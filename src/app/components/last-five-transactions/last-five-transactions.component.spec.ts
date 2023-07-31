import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFiveTransactionsComponent } from './last-five-transactions.component';

describe('LastFiveTransactionsComponent', () => {
  let component: LastFiveTransactionsComponent;
  let fixture: ComponentFixture<LastFiveTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastFiveTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastFiveTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
