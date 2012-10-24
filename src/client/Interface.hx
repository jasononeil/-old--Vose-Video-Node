package client;

import erazor.Template;

import app.project.ProjectController;
import app.video.VideoController;
import app.copy.CopyController;
import app.edit.EditController;
import app.slide.SlideController;
import app.author.AuthorController;
import pushstate.PushState;


import dtx.DOMCollection;

import client.ui.menu.Menu;
import client.ui.menu.NavBar;
import Detox;
using Detox;
using StringTools;

class Interface
{
	public var title(getTitle, setTitle):String;

	static var currentlyShowing:String;

	public static var templateFile:String;



	public function new()
	{
		title = "Loading...";

		// Set up the menu
		drawMenu();

		title = "Vose";
	}

	private function drawMenu()
	{
		var nav = new NavBar("Vose Video");
		var menu = nav.menu;

		// add menu items
		menu.addMenuItem("projects/", "List Projects");
		menu.addMenuItem("videos/", "Video");
		menu.addMenuItem("copy", "Copy Clips");
		menu.addMenuItem("edit", "Edit Video");
		menu.addMenuItem("slide", "Create Slides");
		menu.addMenuItem("author", "Author DVD");


		Detox.document.body.appendChild(nav.getNode());
		
		// currently call via the "click" handler, later use SWFAddress.
		new DOMCollection(".menu li").click(function (e)
		{
			// Get the ID of the menu item that was activated.
			// Later we'll try use SWFAddress
			var menuItem:DOMNode = cast e.currentTarget;
			// var id = menuItem.firstChild.attr("href").replace("#","");
			// showController(id);
		});
	}


	public function showController(id:String)
	{
		if (currentlyShowing != id)
		{
			new DOMCollection(".controller").setCSS("display","none");
			new DOMCollection(".controller." + id).setCSS("display","block");
			
			// switch (id)
			// {
			// 	case "copy":
			// 	case "edit":
			// 	case "slides":
			// 	case "dvd":
			// 	default:
			// 		// do nothing
			// }
		}
		
		currentlyShowing = id;
	}

	//
	// Getter / Setter functions 
	//

	private function getTitle()
	{
		return js.Lib.document.title;
	}

	private function setTitle(?string:String)
	{
		var title = "Vose Video Production";
		if (string != null) title = title + ": " + string;
		js.Lib.document.title = title;
		return string;
	}

}