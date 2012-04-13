package app.author;
import app.author.AuthorController;
using DOMTools;

class AuthorView extends domtools.Widget
{
	public var controller:AuthorController;

	public function new(c:AuthorController) 
	{
		super ("<div></div>");

		controller = c;

		this.addClass("controller").addClass("author");
		this.setText("Author Controller");
	}

}