import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamlistComponent } from './ramlist.component';

describe('RamlistComponent', () => {
  let component: RamlistComponent;
  let fixture: ComponentFixture<RamlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RamlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RamlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
