package client.controller;

import client.view.AuthorView;
import domtools.Query;

class AuthorController
{
	public var view:AuthorView;

	public function new() 
	{
		view = new AuthorView(this);

		Query.document.body.appendChild(view.getNode());
	}

}