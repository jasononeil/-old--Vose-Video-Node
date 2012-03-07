package app.edit;

import app.edit.EditView;
import domtools.Query;
using domtools.DOMManipulation;

class EditController
{
	public var view:EditView;

	public function new() 
	{
		view = new EditView(this);
		new Query("#controllerarea").append(view);
	}

}