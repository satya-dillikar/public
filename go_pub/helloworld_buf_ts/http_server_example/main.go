package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello world!")
}

func main() {
	// server from a function
	//http.HandleFunc("/", handler)
	// server directory
	//http.Handle("/", http.FileServer(http.Dir("./docs")))

	//If you only want to serve 1 file and not a full directory, you can use http.ServeFile
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./docs/index.html")
	})
	http.ListenAndServe(":3000", nil)
}
