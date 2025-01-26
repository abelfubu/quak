import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuakSearchComponent } from './quak-search.component';

describe('QuakSearchComponent', () => {
  let component: QuakSearchComponent;
  let fixture: ComponentFixture<QuakSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuakSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuakSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
