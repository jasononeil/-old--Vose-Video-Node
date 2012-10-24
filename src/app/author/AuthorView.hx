package app.author;
import app.author.AuthorController;
import dtx.widget.Widget;
using Detox;

class AuthorView extends Widget
{
	public var controller:AuthorController;

	public function new(c:AuthorController) 
	{
		super ();

		controller = c;

		this.addClass("controller").addClass("author");
	}

}