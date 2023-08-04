import { Component } from '@angular/core';
import { CreateChannelFormComponent } from 'app/side-menu/component/create-channel-form/create-channel-form.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(private readonly modalService: NzModalService) {}

  onCreateChannelClick() {
    this.modalService.create({
      nzTitle: $localize`Create channel`,
      nzContent: CreateChannelFormComponent,
      nzOnOk: (instance) => instance.submit(),
    });
  }
}
