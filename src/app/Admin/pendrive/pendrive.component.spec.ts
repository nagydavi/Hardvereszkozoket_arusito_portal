import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendriveComponent } from './pendrive.component';

describe('PendriveComponent', () => {
  let component: PendriveComponent;
  let fixture: ComponentFixture<PendriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendriveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
