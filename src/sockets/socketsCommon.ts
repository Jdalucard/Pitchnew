import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export const socketsCommon = {
  jwt: '',
  setJWT: (jwt: string) => {
    socketsCommon.jwt = `Bearer ${jwt}`;
  },

  attempDisconnect: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
    if (socket && socket.connected) socket.disconnect();
  },
};
