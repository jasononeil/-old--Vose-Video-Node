package client.ui.menu;

using Detox;
import dtx.DOMCollection;
import client.ui.menu.Menu;
import client.ui.basic.Link;

class NavBar extends dtx.Widget 
{
	public var menu:Menu;

	public function new(?brand:String = "", ?fixed:Bool = true)
	{
		// Set up the main navbar div
		super("<div></div>");
		this.addClass("navbar");
		this.addClass("navbar-fixed-top");

		// Set up the bits needed by twitter bootstrap
		var navbarInner = "div".create().addClass("navbar-inner");
		var container = "div".create().addClass("container");
		
		// add a brand if need be
		if (brand != "")
		{
			var link = new Link(brand, "/#", "Homepage: " + brand);
			link.addClass("brand");
			container.append(link);
		}

		// Create a menuDetox
		menu = new Menu();
		menu.addClass("nav");
		
		// Join them all together
		container.append(menu);
		navbarInner.append(container);
		this.append(navbarInner);
	}
}