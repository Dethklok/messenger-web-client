import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryChatComponent } from './primary-chat.component';

describe('PrimaryChatComponent', () => {
  let component: PrimaryChatComponent;
  let fixture: ComponentFixture<PrimaryChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
