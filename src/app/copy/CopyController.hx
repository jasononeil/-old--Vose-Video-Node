package app.copy;

import app.copy.CopyView;
import domtools.Query;

class CopyController
{
	public var view:CopyView;

	public function new() 
	{
		view = new CopyView(this);

		Query.document.body.appendChild(view.getNode());
	}

}