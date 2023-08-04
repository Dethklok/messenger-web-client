import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { SaveChannelInputPort } from 'app/side-menu/port/SaveChannelInputPort';

@Component({
  selector: 'app-create-channel-form',
  templateUrl: './create-channel-form.component.html',
})
export class CreateChannelFormComponent {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly saveChannelInputPort: SaveChannelInputPort
  ) {}

  readonly form = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(24)],
    ],
  });

  async submit() {
    await this.saveChannelInputPort.execute(this.form.getRawValue());
  }
}
