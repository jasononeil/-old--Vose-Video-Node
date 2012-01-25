package controller;
import erazor.Template;
import controller.Controller;
import controller.ProjectController;
import domtools.Query;
import ui.menu.Menu;
using domtools.ElementManipulation;

class InterfaceController
{
	public var title(getTitle, setTitle):String;
	//public var controllerArea:JQuery;

	public static var templateFile:String;

	public function new()
	{
		setTitle("Loading...");

		// Set up the menu
		drawMenu();

		// Set up the controller
		var controllerArea = new Query("div#controller.container");
		controllerArea.setText("Hi");

		/*new JQuery(js.Lib.document).load(function (e) {
			// Define the controller area
			trace ("hi");
			controllerArea = new JQuery("div");
		
			new ProjectController(this);
		});*/
		
	}

	private function drawMenu()
	{
		var menu = new Menu();
		menu.addMenuItem("1");
		menu.addMenuItem("2");
		menu.addMenuItem("3");
		CommonJS.getHtmlDocument().body.appendChild(menu.getNode());
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