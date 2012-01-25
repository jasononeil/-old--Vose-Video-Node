package server;

import js.Node; 

class VoseProductionNode 
{
	public static function main() 
	{
		
		var server = Node.http.createServer(handleRequest); 
		server.listen(1337,"localhost"); trace( 'Server running at http://127.0.0.1:1337/' ); 
	} 

	public static function handleRequest(req:NodeHttpServerReq, res:NodeHttpServerResp)
	{
		var arg = req.url.substr(1);
		trace ("Try launch: " + arg);

		Node.childProcess.spawn(arg, []);

		res.setHeader("Content-Type","text/plain"); 
		res.writeHead(200); 
		res.end('Hello Haxe World\n'); 
	}
}