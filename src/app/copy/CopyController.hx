package app.copy;

import app.copy.CopyView;
import domtools.Query;
using domtools.DOMManipulation;

class CopyController
{
	public var view:CopyView;

	public function new() 
	{
		view = new CopyView(this);
		new Query("#controllerarea").append(view);
	}

}