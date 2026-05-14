import { Blob } from "node:buffer";
import { ReadableStream, TransformStream, WritableStream } from "node:stream/web";
import { TextDecoder, TextEncoder } from "node:util";

Object.assign(globalThis, {
  Blob,
  ReadableStream,
  TextDecoder,
  TextEncoder,
  TransformStream,
  WritableStream,
});
