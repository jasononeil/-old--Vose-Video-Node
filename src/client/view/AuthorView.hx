package client.view;
import client.controller.AuthorController;
using domtools.ElementManipulation;
using domtools.Traversing;

class AuthorView extends domtools.AbstractCustomElement
{
	public var controller:AuthorController;

	public function new(c:AuthorController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller");
		this.setText("Author Controller");
	}

}