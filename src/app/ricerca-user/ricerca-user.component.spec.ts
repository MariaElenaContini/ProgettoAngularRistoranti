import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaUserComponent } from './ricerca-user.component';

describe('RicercaUserComponent', () => {
  let component: RicercaUserComponent;
  let fixture: ComponentFixture<RicercaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RicercaUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
