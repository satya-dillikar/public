/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import _m0 from "protobufjs/minimal";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "";

/** The request message containing the user's name. */
export interface HelloRequest {
  /** This comment will end up direcly in your Open API definition */
  name: string;
}

/** The response message containing the greetings */
export interface HelloReply {
  /** This comment will end up direcly in your Open API definition */
  message: string;
}

const baseHelloRequest: object = { name: "" };

export const HelloRequest = {
  encode(
    message: HelloRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHelloRequest } as HelloRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HelloRequest {
    const message = { ...baseHelloRequest } as HelloRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: HelloRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<HelloRequest>): HelloRequest {
    const message = { ...baseHelloRequest } as HelloRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseHelloReply: object = { message: "" };

export const HelloReply = {
  encode(
    message: HelloReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHelloReply } as HelloReply;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HelloReply {
    const message = { ...baseHelloReply } as HelloReply;
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    return message;
  },

  toJSON(message: HelloReply): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial(object: DeepPartial<HelloReply>): HelloReply {
    const message = { ...baseHelloReply } as HelloReply;
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    return message;
  },
};

/** The greeting service definition. */
export interface Greeter {
  /** Sends a greeting */
  SayHello(
    request: DeepPartial<HelloRequest>,
    metadata?: grpc.Metadata
  ): Promise<HelloReply>;
  /** Sends another greeting */
  SayHelloAgain(
    request: DeepPartial<HelloRequest>,
    metadata?: grpc.Metadata
  ): Promise<HelloReply>;
}

export class GreeterClientImpl implements Greeter {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SayHello = this.SayHello.bind(this);
    this.SayHelloAgain = this.SayHelloAgain.bind(this);
  }

  SayHello(
    request: DeepPartial<HelloRequest>,
    metadata?: grpc.Metadata
  ): Promise<HelloReply> {
    return this.rpc.unary(
      GreeterSayHelloDesc,
      HelloRequest.fromPartial(request),
      metadata
    );
  }

  SayHelloAgain(
    request: DeepPartial<HelloRequest>,
    metadata?: grpc.Metadata
  ): Promise<HelloReply> {
    return this.rpc.unary(
      GreeterSayHelloAgainDesc,
      HelloRequest.fromPartial(request),
      metadata
    );
  }
}

export const GreeterDesc = {
  serviceName: "Greeter",
};

export const GreeterSayHelloDesc: UnaryMethodDefinitionish = {
  methodName: "SayHello",
  service: GreeterDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return HelloRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...HelloReply.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const GreeterSayHelloAgainDesc: UnaryMethodDefinitionish = {
  methodName: "SayHelloAgain",
  service: GreeterDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return HelloRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...HelloReply.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR
  extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
    }
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({
            ...this.options?.metadata.headersMap,
            ...metadata?.headersMap,
          })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new Error(response.statusMessage) as any;
            err.code = response.status;
            err.metadata = response.trailers;
            reject(err);
          }
        },
      });
    });
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
