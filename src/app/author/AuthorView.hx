package app.author;
import app.author.AuthorController;
import dtx.Widget;
using Detox;

class AuthorView extends Widget
{
	public var controller:AuthorController;
	static var tpl = Widget.loadTemplate();

	public function new(c:AuthorController) 
	{
		super (tpl);

		controller = c;

		this.addClass("controller").addClass("author");
	}

}