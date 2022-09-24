import { Injectable, OnDestroy } from '@angular/core';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { AuthService } from 'app/adapters/auth/common/auth.service';
import { environment } from 'environments/environment';
import { firstValueFrom, map } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable()
export class RxStompWebsocketService implements WebsocketService, OnDestroy {
  private readonly APPLICATION_DESTINATION_PREFIX = '/socket';
  private readonly BROKER_PREFIX = '/topic';
  private readonly rxStomp: RxStomp;

  constructor(private readonly authService: AuthService) {
    this.rxStomp = new RxStomp();
    this.rxStomp.configure(this.getRxStompConfiguration());
    this.rxStomp.activate();
  }

  publish<Body>({ destination, body }: { destination: string; body: Body }) {
    this.rxStomp.publish({
      destination: `${this.APPLICATION_DESTINATION_PREFIX}${destination}`,
      body: JSON.stringify(body),
    });
  }

  watch<Body>({ destination }: { destination: string }) {
    return this.rxStomp
      .watch(`${this.BROKER_PREFIX}${destination}`)
      .pipe<Body>(map(({ body }) => JSON.parse(body)));
  }

  async ngOnDestroy() {
    await this.rxStomp.deactivate();
  }

  private getRxStompConfiguration(): RxStompConfig {
    return {
      brokerURL: environment.serverWebsocketUri,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 5000000,
      debug: !environment.production
        ? (message: string) => console.log(new Date(), message)
        : undefined,
      beforeConnect: async (client) => {
        const { name, value } = await firstValueFrom(
          this.authService.getAuthHeader()
        );

        client.stompClient.connectHeaders = {
          [name]: value,
        };
      },
    };
  }
}
