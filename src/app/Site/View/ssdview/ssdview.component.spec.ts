import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsdviewComponent } from './ssdview.component';

describe('SsdviewComponent', () => {
  let component: SsdviewComponent;
  let fixture: ComponentFixture<SsdviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsdviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SsdviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
