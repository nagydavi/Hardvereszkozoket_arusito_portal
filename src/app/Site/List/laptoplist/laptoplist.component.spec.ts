import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptoplistComponent } from './laptoplist.component';

describe('LaptoplistComponent', () => {
  let component: LaptoplistComponent;
  let fixture: ComponentFixture<LaptoplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaptoplistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaptoplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
