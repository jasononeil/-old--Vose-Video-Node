package app.edit;

import app.edit.EditView;
import dtx.DOMCollection;
using Detox;

class EditController
{
	public var view:EditView;

	public function new() 
	{
		view = new EditView(this);
	}

}