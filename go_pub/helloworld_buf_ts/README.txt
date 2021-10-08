
https://grpc-ecosystem.github.io/grpc-gateway/docs/mapping/grpc_api_configuration/
https://grpc-ecosystem.github.io/grpc-gateway/docs/mapping/customizing_openapi_output/


ACTUAL commands


cd github/projects/go_playground/grpc-example/helloworld_buf
rm go.mod go.sum
rm -rf gen/proto
rm -rf docs/helloworld-apis.swagger.json

tree .
.
├── README.txt
├── buf.gen.yaml
├── gen
├── greeter_client
│   └── main.go
├── greeter_server
│   └── main.go
└── proto
    ├── buf.yaml
    └── helloworld.proto


go mod init satya.com/helloworld_buf_ts




change all
helloworld.proto
option go_package = "satya.com/helloworld_buf_ts/gen/proto";

greeter_client/main.go
import pb "satya.com/helloworld_buf_ts/gen/proto"

greeter_server/main.go
import pb "satya.com/helloworld_buf_ts/gen/proto"

#update buf.yaml
#update buf.gen.yaml

cd /Users/sdillikar/github/projects/java_playground/reactprojects/my-app3-ts/
yarn add ts-proto
ls node_modules/.bin/protoc-gen-ts_proto

mkdir -p src/gen


buf mod update proto
buf generate proto


go mod tidy


tree  .
.
├── README.txt
├── buf.gen.yaml
├── gen
│   └── proto
│       ├── helloworld.pb.go
│       ├── helloworld.pb.gw.go
│       └── helloworld_grpc.pb.go
├── go.mod
├── go.sum
├── greeter_client
│   └── main.go
├── greeter_server
│   └── main.go
└── proto
    ├── buf.lock
    ├── buf.yaml
    └── helloworld.proto


method-1:
go run greeter_server/main.go
go run greeter_client/main.go Alice

method-2:
➜  helloworld_buf_gw git:(main) ✗ go run greeter_server/main.go
2021/10/06 12:16:23 server listening at [::]:50051
2021/10/06 12:16:23 server listening at 0.0.0.0::50051
2021/10/06 12:16:23 Serving gRPC-Gateway on http://0.0.0.0:8090
2021/10/06 12:16:38 Received: sa


curl -X POST -k http://127.0.0.1:8090/v1/example/echo -d '{"name" : "satya"}'


To enable grpcurl
add below lines to  greeter_server/main.go

import "google.golang.org/grpc/reflection"

// Register reflection service on gRPC server.
reflection.Register(s)


grpcurl -plaintext 0.0.0.0:50051 list
Greeter
grpc.reflection.v1alpha.ServerReflection


grpcurl -plaintext  0.0.0.0:50051 describe Greeter
Greeter is a service:
service Greeter {
  rpc SayHello ( .HelloRequest ) returns ( .HelloReply ) {
    option (.google.api.http) = { post:"/v1/example/echo" body:"*"  };
  }
  rpc SayHelloAgain ( .HelloRequest ) returns ( .HelloReply );
}

grpcurl -plaintext  0.0.0.0:50051 describe HelloRequest
HelloRequest is a message:
message HelloRequest {
  string name = 1;
}
grpcurl -plaintext  0.0.0.0:50051 describe HelloReply
HelloReply is a message:
message HelloReply {
  string message = 1;
}

grpcurl -plaintext -d '{ "name" : "sunny"}' 0.0.0.0:50051 Greeter.SayHello
{
  "message": "From server: Hello sunny"
}

grpcurl -plaintext -d '{ "name" : "sunny"}' 0.0.0.0:50051 Greeter.SayHelloAgain
{
  "message": "From server: Hello again sunny"
}

HTTP SERVER:
 go run greeter_server/main.go
2021/10/06 16:46:41 server listening at [::]:50051
2021/10/06 16:46:41 Serving gRPC-Gateway on http://0.0.0.0:8090

HTTP CLIENT:

curl http://127.0.0.1:8090/docs
curl http://127.0.0.1:8090/openapi.json