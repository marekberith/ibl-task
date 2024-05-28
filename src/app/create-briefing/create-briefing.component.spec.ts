import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBriefingComponent } from './create-briefing.component';

describe('CreateBriefingComponent', () => {
  let component: CreateBriefingComponent;
  let fixture: ComponentFixture<CreateBriefingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBriefingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
