package server;

// NodeJS imports
import js.Node; 
import js.node.Connect;
import js.node.JsHelper;
import haxe.remoting.NodeJsHtmlConnection;

// API imports
import server.api.FileSystem;
import server.api.Launcher;
import server.api.Notifications;
import server.api.Scheduler;

// Controller API imports
import app.project.ProjectAPI;
import app.video.VideoAPI;
import app.copy.CopyAPI;
import app.edit.EditAPI;
import app.slide.SlideAPI;
import app.author.AuthorAPI;

class Server
{
	var address:String;
	var port:Int;

	public var context:haxe.remoting.Context;

	var fileSystemAPI:FileSystem; 
	var launcherAPI:Launcher; 
	var notificationsAPI:Notifications; 
	var schedulerAPI:Scheduler; 

	var projectAPI:ProjectAPI;
	var videoAPI:VideoAPI;
	var copyAPI:CopyAPI;
	var editAPI:EditAPI;
	var slideAPI:SlideAPI;
	var authorAPI:AuthorAPI;

	static public var inst:Server = null;

	public static function main ()
	{
		new Server("127.0.0.1",1337);
	}

	public function new(address, port)
	{
		// prevent multiple creations of this
		if (inst != null) { throw "Server is a singleton, you should only create this once... "; }

		this.address = address;
		this.port = port;

		var isServerAlreadyRunning = false;
		//TODO: actually check this

		if (isServerAlreadyRunning == false)
		{
			// Setup each of the API objects and add them to the context
			setupAPIContext();

			// create the server and start listening
			createServer();
		}

		// Launch firefox.  Uncomment to enable this...
		//launcherAPI.launch("firefox",["-new-window","http://localhost:1337/"]);
		
		inst = this;
	}
	
	function createServer() :Void
	{
		
		// Set up a NodeJsHtmlConnection - this knows how to deal with incoming remoting requests
		var remotingHandler = new NodeJsHtmlConnection(context);

		// remotingMiddleWare - this might need an explanation.
		// In the NodeJS ecosystem, Connect is a library that allows you to plug in a whole stack of "middleware"
		// that is run on each request.  Each middleware has the chance to do something with the 
		// request - set it, add to it, modify it, log it, gzip it, provide an error message etc.
		// Here we create a new middleWare that is a function that checks if it's a remoting request,
		// and if it is, it does the request, if it's not, it passes it on to the next middleware.
		var remotingMiddleWare = function (req :NodeHttpServerReq, res :NodeHttpServerResp, next :Void->MiddleWare) :Void 
		{
			// use our remotingHandler (which is a NodeJsHtmlConnection) to handle the request
			var result = remotingHandler.handleRequest(req, res);

			// if the handler returned a result of "false", this means it was not a remoting request,
			// it was a normal request.  So we call "next()" to pass it on to the next middleware, 
			// which will know what to do
			if (result == false) 
			{
				next();
			}
		}

		// Now we use connect.createServer(), which is an extension of http.createServer() from haxenode.org's example.
		// The advantage here is that connect() includes all the middleware support we need to get remoting to work.
		var connect:Connect = Node.require('connect');
		trace (js.Node.__dirname);
		var server = connect.createServer(
			// Middleware1: errorhandler, Set to a pre-built one from the "connect" library
			connect.errorHandler({showStack:true, showMessage:true, dumpExceptions:true}), 

			// Middleware2: logger, from the connect library
			connect.logger(),
			
			// Middleware3: our remoting middleware
			remotingMiddleWare, 

			// Middleware4: if it's not a remoting call, look for a static file.  Use connect.static()
			// There's an error in the nodejs_externs typedef where it looks for connect.Static not connect.static.
			// I might ask the mailing list if there's a clean way to make "Static" a function that points to "static"
			//connect.Static(Node.__dirname + "/public/", {redirect:true})
			Reflect.field(connect, "static")(Node.__dirname + "/static/", {redirect:true})
		);

		// tell the server to listen to this port on this IP address
		server.listen(port, address);
		trace ("Listening on " + address + ": " + port);
	}

	function setupAPIContext()
	{
		// Set up a have remoting context, fire up a ServerAPI object, and add it to the context
		context = new haxe.remoting.Context();

		// add the FileSystem API
		//fileSystemAPI = new server.api.FileSystem();
		//context.addObject(haxe.remoting.Macros.getRemotingId(server.api.FileSystem), fileSystemAPI);

		// add the Launcher API
		//launcherAPI = new server.api.Launcher();
		//context.addObject(haxe.remoting.Macros.getRemotingId(server.api.Launcher), launcherAPI);

		// add the Notifications API
		notificationsAPI = new server.api.Notifications();
		context.addObject(haxe.remoting.Macros.getRemotingId(server.api.Notifications), notificationsAPI);

		// add the Scheduler API
		schedulerAPI = new server.api.Scheduler();
		context.addObject(haxe.remoting.Macros.getRemotingId(server.api.Scheduler), schedulerAPI);

		////////
		// Add the APIs for each part of the App
		////////

		// Add the project API
		projectAPI = new ProjectAPI();
		context.addObject(haxe.remoting.Macros.getRemotingId(app.project.ProjectAPI), projectAPI);

		// Add the video API
		videoAPI = new VideoAPI();
		context.addObject(haxe.remoting.Macros.getRemotingId(app.video.VideoAPI), videoAPI);



	}
	
	
}


