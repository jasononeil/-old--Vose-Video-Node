package app.playground;

import client.Client;
import dtx.DOMCollection;
import AppConfig;
import js.JQuery;
import autoform.AutoForm;
import app.playground.PlayGroundView;
using Detox;

class PlayGroundController
{
	public function new() 
	{
	}

	@route("playground/")
	public function playground()
	{
		// Set up the view
		var view = new PlayGroundView(this);
		Client.showView(view);
		// playgroundAPI.list(function (a:Array<Project>) 
		// {
		// 	view.listProjects(a);
		// });
	}
}