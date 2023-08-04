import { Component, EventEmitter, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MessageFormDto } from './MessageFormDto';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
})
export class MessageInputComponent {
  @Output() sendMessage = new EventEmitter<MessageFormDto>();

  readonly form = this.formBuilder.group({
    content: ['', Validators.required],
  });

  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  onMessageSubmit() {
    this.sendMessage.emit(this.form.getRawValue());
    this.form.reset();
  }
}
