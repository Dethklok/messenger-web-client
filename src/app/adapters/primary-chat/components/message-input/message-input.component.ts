import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { SendMessageUseCase } from 'app/core/application/message/useCase/SendMessageUseCase';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
})
export class MessageInputComponent implements OnInit {
  readonly form = this.formBuilder.group({
    content: ['', Validators.required],
  });

  constructor(
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    console.log('Message input init');
  }

  sendMessage() {
    this.sendMessageUseCase.execute(this.form.getRawValue());
    this.form.reset();
  }
}
