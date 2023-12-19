import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptComponent } from './attempt.component';

describe('AttemptComponent', () => {
  let component: AttemptComponent;
  let fixture: ComponentFixture<AttemptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttemptComponent]
    });
    fixture = TestBed.createComponent(AttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
