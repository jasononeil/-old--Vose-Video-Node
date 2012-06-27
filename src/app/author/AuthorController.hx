package app.author;

import app.author.AuthorView;
import dtx.DOMCollection;
using Detox;

class AuthorController
{
	public var view:AuthorView;

	public function new() 
	{
		view = new AuthorView(this);
	}

}