import io, { Socket } from 'socket.io-client';
import { socketsCommon } from '.';
import { DefaultEventsMap } from '@socket.io/component-emitter';

const PODCASTS_SOCKET_ENDPOINT = '/so-podcasts';
const SOCKETIO_DEFAULT_URL = '/socket.io';

let activeSocket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const podcastsSocket = {
  events: {
    RESULTS_FIRST: "results-first",
    RESULT_COMPLETE: "result-percentage",
    RESULT_ERROR: "result-error",
    RESULTS_COMPLETE: "results-complete",
    SEARCH_ERROR: "search-error",
    ITUNES_DATA: "itunes-data"
  },

  searchPodcasts: (queryParams: string) => {
    const url = import.meta.env.VITE_ENV === 'prod'
      ? PODCASTS_SOCKET_ENDPOINT
      : `${import.meta.env.VITE_SOCKET_API_BASE_URL}${PODCASTS_SOCKET_ENDPOINT}`;
    
    const socket = io(encodeURI(url + "?" + queryParams),
    {
      reconnectionAttempts: 3,
      path: import.meta.env.VITE_ENV === 'prod'
        ? '/socket-api' + SOCKETIO_DEFAULT_URL
        : SOCKETIO_DEFAULT_URL
    });
    socket.emit("jwt-authentication", socketsCommon.jwt);
    activeSocket = socket;
    
    return socket;
  },

  getActiveSocket: () => activeSocket,
};