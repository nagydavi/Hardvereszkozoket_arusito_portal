import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamviewComponent } from './ramview.component';

describe('RamviewComponent', () => {
  let component: RamviewComponent;
  let fixture: ComponentFixture<RamviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RamviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RamviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
