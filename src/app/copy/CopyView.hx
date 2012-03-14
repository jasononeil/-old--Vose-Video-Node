package app.copy;
import app.copy.CopyController;
using domtools.Tools;

class CopyView extends domtools.AbstractCustomElement
{
	public var controller:CopyController;

	public function new(c:CopyController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller").addClass("copy");
		this.setText("Copy Controller");
	}

}