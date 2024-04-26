import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopviewComponent } from './laptopview.component';

describe('LaptopviewComponent', () => {
  let component: LaptopviewComponent;
  let fixture: ComponentFixture<LaptopviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaptopviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaptopviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
