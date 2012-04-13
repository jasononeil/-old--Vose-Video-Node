package app.author;

import app.author.AuthorView;
import domtools.Query;
using DOMTools;

class AuthorController
{
	public var view:AuthorView;

	public function new() 
	{
		view = new AuthorView(this);
		new Query("#controllerarea").append(view);
	}

}