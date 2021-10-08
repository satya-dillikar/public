/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// Package main implements a server for Greeter service.
package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"

	//"google.golang.org/grpc/reflection"
	pb "satya.com/helloworld_buf_ts/gen/proto"
)

const (
	port = ":50051"
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "From server: Hello " + in.GetName()}, nil
}

func (s *server) SayHelloAgain(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	return &pb.HelloReply{Message: "From server: Hello again " + in.GetName()}, nil
}

func main() {

	// Create a listener on TCP port

	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	// Create a gRPC server object
	s := grpc.NewServer()

	// Attach the Greeter service to the server
	pb.RegisterGreeterServer(s, &server{})
	listener_addr := fmt.Sprintf("%v", lis.Addr())
	log.Printf("server listening at %v", listener_addr)
	//if err := s.Serve(lis); err != nil {
	//	log.Fatalf("failed to serve: %v", err)
	//}

	// Serve gRPC Server
	go func() {
		log.Fatalln(s.Serve(lis))
	}()

	// Register reflection service on gRPC server.
	//log.Printf("Register reflection service on gRPC server")
	//reflection.Register(s)

	//listener_addr = fmt.Sprintf("0.0.0.0:%v", port)
	//log.Printf("server listening at %v", listener_addr)

	// add and serve the gRPC-Gateway mux
	// Create a client connection to the gRPC server we just started
	// This is where the gRPC-Gateway proxies the requests
	conn, err := grpc.DialContext(
		context.Background(),
		"0.0.0.0:50051",
		grpc.WithBlock(),
		grpc.WithInsecure(),
	)
	if err != nil {
		log.Fatalln("Failed to dial server:", err)
	}

	gwmux := runtime.NewServeMux()

	// Register Greeter
	err = pb.RegisterGreeterHandler(context.Background(), gwmux, conn)
	if err != nil {
		log.Fatalln("Failed to register gateway:", err)
	}

	// Start HTTP server (and proxy calls to gRPC server endpoint)
	gwServer := &http.Server{
		Addr:    ":8090",
		Handler: gwmux,
	}

	// Open API - http server

	err = gwmux.HandlePath(http.MethodGet, "/openapi.json", runtime.HandlerFunc(func(w http.ResponseWriter, r *http.Request, pathParams map[string]string) {
		http.ServeFile(w, r, "./docs/helloworld-apis.swagger.json")
	}))
	if err != nil {
		log.Fatalln("Failed to serve: %v", err)
		return
	}

	err = gwmux.HandlePath(http.MethodGet, "/docs", runtime.HandlerFunc(func(w http.ResponseWriter, r *http.Request, pathParams map[string]string) {
		http.ServeFile(w, r, "./docs/index.html")
	}))
	if err != nil {
		log.Fatalln("Failed to serve: %v", err)
		return
	}

	log.Println("Serving gRPC-Gateway on http://0.0.0.0:8090")
	log.Fatalln(gwServer.ListenAndServe())

}
