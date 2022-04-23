
// the "Transport" is provided by Tonejs library
// it controls the time

import { Transport as _transport } from 'tone';
import { Transport } from 'tone/build/esm/core/clock/Transport';

export const getTransport = () => _transport;

export const start = (transport: Transport) => transport.start();

export const pause = (transport: Transport) => transport.pause();

export const stop = (transport: Transport) => transport.stop();
