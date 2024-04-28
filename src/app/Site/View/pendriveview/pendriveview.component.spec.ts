import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendriveviewComponent } from './pendriveview.component';

describe('PendriveviewComponent', () => {
  let component: PendriveviewComponent;
  let fixture: ComponentFixture<PendriveviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendriveviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendriveviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
