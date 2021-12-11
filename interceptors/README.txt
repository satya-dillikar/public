cd /Users/sdillikar/github/public/interceptors/grpcexample
go run *.go


cd  /Users/sdillikar/github/public/interceptors/grpcexample

➜  grpcexample git:(interceptors) ✗ grpcurl -v -cacert cert/ca.cert localhost:9990 list
grpc.reflection.v1alpha.ServerReflection
main.PingPong
➜  grpcexample git:(interceptors) ✗ grpcurl -v -cacert cert/ca.cert localhost:9990 describe main.PingPong
main.PingPong is a service:
service PingPong {
  rpc Ping ( .main.PingRequest ) returns ( .main.PongResponse );
}
➜  grpcexample git:(interceptors) ✗ grpcurl -v -cacert cert/ca.cert localhost:9990 describe .main.PongResponse
main.PongResponse is a message:
message PongResponse {
  bool ok = 1;
}
➜  grpcexample git:(interceptors) ✗ grpcurl -v -cacert cert/ca.cert localhost:9990 describe .main.PingRequest
main.PingRequest is a message:
message PingRequest {
}

➜  grpcexample git:(interceptors) ✗ grpcurl -v -cacert cert/ca.cert localhost:9990 main.PingPong.Ping

Resolved method descriptor:
rpc Ping ( .main.PingRequest ) returns ( .main.PongResponse );

Request metadata to send:
(empty)

Response headers received:
content-type: application/grpc
ping-counts: 1

Response contents:
{
  "ok": true
}

Response trailers received:
(empty)
Sent 0 requests and received 1 response

➜  grpcexample git:(interceptors) ✗ grpcurl -v -cacert cert/ca.cert localhost:9990 main.PingPong.Ping

Resolved method descriptor:
rpc Ping ( .main.PingRequest ) returns ( .main.PongResponse );

Request metadata to send:
(empty)

Response headers received:
content-type: application/grpc
ping-counts: 3

Response contents:
{
  "ok": true
}

Response trailers received:
(empty)
Sent 0 requests and received 1 response


BROWSER

Note:
https://127.0.0.1:8080/

is not same as 
https://localhost:8080/

React does not resolve the hostname (localhost)
