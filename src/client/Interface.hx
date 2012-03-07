package client;

import erazor.Template;

import app.project.ProjectController;
import app.video.VideoController;
import app.copy.CopyController;
import app.edit.EditController;
import app.slide.SlideController;
import app.author.AuthorController;



import domtools.Query;

import client.ui.menu.Menu;
using domtools.ElementManipulation;
using domtools.EventManagement;
using domtools.Traversing;
using domtools.Style;
using StringTools;

class Interface
{
	public var title(getTitle, setTitle):String;

	private var currentControllerShowing:String;

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
		var menu = new Menu();

		// add menu items
		menu.addMenuItem("copy", "Copy Clips");
		menu.addMenuItem("edit", "Edit Video");
		menu.addMenuItem("slides", "Create Slides");
		menu.addMenuItem("dvd", "Author DVD");

		Query.document.body.appendChild(menu.getNode());
		
		// currently call via the "click" handler, later use SWFAddress.
		new Query(".menu li").click(activateMenuItem);

	}

	private function activateMenuItem(e:Event)
	{
		// Get the ID of the menu item that was activated.
		// Later we'll try use SWFAddress
		var menuItem:Node = cast e.currentTarget;
		var id = menuItem.firstChild.attr("href").replace("#","");

		if (currentControllerShowing != id)
		{
			//new Query(".controller").setCSS("display","hidden");
			switch (id)
			{
				case "copy":
				case "edit":
				case "slides":
				case "dvd":
				default:
					// do nothing
			}
		}
		
		currentControllerShowing = id;
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