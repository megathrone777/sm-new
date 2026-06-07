Object.assign(process.env, { NODE_ENV: "test" });

import { Blob } from "node:buffer";
import { ReadableStream, TransformStream, WritableStream } from "node:stream/web";
import { TextDecoder, TextEncoder } from "node:util";

class MockMessagePort extends EventTarget {
  onmessage: ((event: MessageEvent) => void) | null = null;
  onmessageerror: ((event: MessageEvent) => void) | null = null;

  partner: MockMessagePort | null = null;

  postMessage(data: unknown): void {
    const handler = this.partner?.onmessage;

    if (handler) {
      queueMicrotask((): void => handler(new MessageEvent("message", { data })));
    }
  }

  start(): void {}
  close(): void {}
}

class MockMessageChannel {
  readonly port1: MockMessagePort = new MockMessagePort();
  readonly port2: MockMessagePort = new MockMessagePort();

  constructor() {
    this.port1.partner = this.port2;
    this.port2.partner = this.port1;
  }
}

Object.assign(globalThis as object, {
  Blob,
  MessageChannel: MockMessageChannel,
  MessagePort: MockMessagePort,
  ReadableStream,
  TextDecoder,
  TextEncoder,
  TransformStream,
  WritableStream,
});
