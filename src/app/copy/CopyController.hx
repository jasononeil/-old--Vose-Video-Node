package app.copy;

import app.copy.CopyView;
import dtx.DOMCollection;
using Detox;

class CopyController
{
	public var view:CopyView;
	
	public function new() 
	{
		view = new CopyView(this);
	}

}