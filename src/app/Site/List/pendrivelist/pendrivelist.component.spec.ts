import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendrivelistComponent } from './pendrivelist.component';

describe('PendrivelistComponent', () => {
  let component: PendrivelistComponent;
  let fixture: ComponentFixture<PendrivelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendrivelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendrivelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
