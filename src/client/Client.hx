package client;

import client.Interface;
import client.controller.ProjectController;
import client.controller.VideoController;
import client.controller.CopyController;
import client.controller.EditController;
import client.controller.SlideController;
import client.controller.AuthorController;


class Client
{
	static var fileSystem;
	static var launcher;
	static var notifications;
	static var scheduler;

	static var ui;
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
	}

	public static function ready(e)
	{
		Client.ui = new Interface();
		Client.projectController = new ProjectController();
		Client.videoController = new VideoController();
		Client.copyController = new CopyController();
		Client.editController = new EditController();
		Client.slideController = new SlideController();
		Client.authorController = new AuthorController();
	}

	/** Launch the remoting API.  Keep them as statics of the client.  So you call Client.launcher.launch(...) */
	public static function initialiseAPI()
	{
		//Create the remoting Html connection, and set an error handler.
		var conn = haxe.remoting.HttpAsyncConnection.urlConnect("http://localhost:1337");
		conn.setErrorHandler( function(err) trace("Error : " + err));

		//Build and instantiate the proxy class with macros.  
		//The full path to the server class is given as a String, but it is NOT compiled into the client.
		//It can be given as a class declaration, but then it is compiled into the client (not what you want)
		Client.fileSystem = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(server.api.FileSystem, conn);
		Client.launcher = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(server.api.Launcher, conn);
		Client.notifications = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(server.api.Notifications, conn);
		Client.scheduler = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(server.api.Scheduler, conn);
	}
}