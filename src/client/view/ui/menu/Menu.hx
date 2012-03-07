package client.view.ui.menu;
import client.view.ui.menu.MenuItem;
import domtools.Query;
using domtools.ElementManipulation;
using domtools.DOMManipulation;
using domtools.EventManagement;

class Menu extends domtools.AbstractCustomElement
{
	public var items:Hash<MenuItem>;

	public function new()
	{
		super("ul");
		this.addClass("menu");

		items = new Hash();
	}

	public function addMenuItem(id:String, title:String)
	{
		// create the menu item and append it to the menu
		var menuItem = new MenuItem(id, title);
		menuItem.appendTo(this);

		// save it to a hash for referencing later
		items.set(id, menuItem);
	}

	public function get(id:String)
	{
		return items.get(id);
	}	
}