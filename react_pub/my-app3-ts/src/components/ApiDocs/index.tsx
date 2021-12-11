import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function ApiDocs() {
	return <SwaggerUI url="http://127.0.0.1:3000/albums"/>;
	//return <SwaggerUI url="/helloworld-apis.swagger.json"/>;
	//return <SwaggerUI url="https://api.mna.dev.spsapps.net/swagger/?format=openapi"/>
  }

/* 
interface Request {
[k: string]: any;
}

function authenticate(req: Request): Request {
	req.url = req.url.replace("http://127.0.0.1:8090", `${window.location.host}`);
	return req;
}

export default function ApiDocs() {
return <SwaggerUI url="http://127.0.0.1:8090/openapi.json" />;
}  */