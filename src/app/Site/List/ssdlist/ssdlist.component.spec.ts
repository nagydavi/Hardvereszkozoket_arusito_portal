import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsdlistComponent } from './ssdlist.component';

describe('SsdlistComponent', () => {
  let component: SsdlistComponent;
  let fixture: ComponentFixture<SsdlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsdlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SsdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
