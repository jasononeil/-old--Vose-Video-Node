package client;

import client.Interface;
import app.project.ProjectController;
import app.video.VideoController;
import app.copy.CopyController;
import app.edit.EditController;
import app.slide.SlideController;
import app.author.AuthorController;
import pushstate.PushState;
import client.Routing;
import Detox;
using Detox;

class Client
{
	// static var fileSystem;
	// static var launcher;
	static var notifications;
	static var scheduler;

	static var routing:Routing;
	static var ui;
	static var currentPath:String;

	static var projectController;
	static var videoController;
	static var copyController;
	static var editController;
	static var slideController;
	static var authorController;

	public static function main() 
	{
		// Set trace() to go to the firebug console
		haxe.Log.trace = haxe.Firebug.trace;

		// when the window is loaded, run "ready"
		js.Lib.window.onload = ready;

		// Load the remoting API
		initialiseAPI();

		Client.routing = new Routing();

		// Set up the PushState API
		PushState.init();
		PushState.onStateChange.bind(function (path:StateData) {
			currentPath = path.url;
			Client.routing.route(path.url);
		});
	}

	public static function showView(v:DOMCollection)
	{
		// Hide previous views
		var vc = "#view-container".find();
		vc.empty();

		// Append the current view (may already be there)
		vc.append(v);

		// Show the current view
		//nothing for now? Once I add a show() method I'll use that...
	}

	public static function goto(path:String)
	{
		PushState.push(path);
	}

	public static function ready(e)
	{
		Client.ui = new Interface();
		Client.projectController = new ProjectController();
		// Client.videoController = new VideoController();
		Client.copyController = new CopyController();
		Client.editController = new EditController();
		Client.slideController = new SlideController();
		Client.authorController = new AuthorController();
		//Client.ui.showController("project");

		routing.addRoutesFromMetaData(Client.projectController);

		Client.routing.route(currentPath);
	}

	/** Launch the remoting API.  Keep them as statics of the client.  So you call Client.launcher.launch(...) */
	public static var conn = haxe.remoting.HttpAsyncConnection.urlConnect("http://localhost:1337");
	public static function initialiseAPI()
	{
		//Create the remoting Html connection, and set an error handler.
		conn.setErrorHandler( function(err) trace("Error : " + err));

		//Build and instantiate the proxy class with macros.  
		//The full path to the server class is given as a String, but it is NOT compiled into the client.
		//It can be given as a class declaration, but then it is compiled into the client (not what you want)
		// Client.fileSystem = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(server.api.FileSystem, conn);
		// Client.launcher = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(server.api.Launcher, conn);
		Client.notifications = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(server.api.Notifications, conn);
		Client.scheduler = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(server.api.Scheduler, conn);
	}
}