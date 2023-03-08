import { Component, Input } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Required } from '../../../utils/required.decorator';

@Component({
  selector: 'app-message-input[onSubmit]',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
})
export class MessageInputComponent {
  @Input() @Required onSubmit!: (value: { content: string }) => void;

  readonly form = this.formBuilder.group({
    content: ['', Validators.required],
  });

  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  onMessageSubmit() {
    this.onSubmit(this.form.getRawValue());
    this.form.reset();
  }
}
