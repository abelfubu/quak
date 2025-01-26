import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuakListComponent } from './quak-list.component';

describe('QuakListComponent', () => {
  let component: QuakListComponent;
  let fixture: ComponentFixture<QuakListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuakListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuakListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
