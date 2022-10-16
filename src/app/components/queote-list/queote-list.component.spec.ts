import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueoteListComponent } from './queote-list.component';

describe('QueoteListComponent', () => {
  let component: QueoteListComponent;
  let fixture: ComponentFixture<QueoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueoteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
