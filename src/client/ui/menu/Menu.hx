package client.ui.menu;
import client.ui.menu.MenuItem;
import dtx.DOMCollection;
using Detox;

@template("<ul></ul>")
class Menu extends dtx.widget.Widget
{
	public var items:Hash<MenuItem>;

	public function new()
	{
		super();
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