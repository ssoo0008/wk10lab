import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListactorComponent } from './listactor.component';

describe('ListactorComponent', () => {
  let component: ListactorComponent;
  let fixture: ComponentFixture<ListactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
