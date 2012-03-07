package client.controller;

import client.view.EditView;
import domtools.Query;

class EditController
{
	public var view:EditView;

	public function new() 
	{
		view = new EditView(this);

		Query.document.body.appendChild(view.getNode());
	}

}