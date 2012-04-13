package app.copy;
import app.copy.CopyController;
using DOMTools;

class CopyView extends domtools.Widget
{
	public var controller:CopyController;

	public function new(c:CopyController) 
	{
		super ("<div></div>");

		controller = c;

		this.addClass("controller").addClass("copy");
		this.setText("Copy Controller");
	}

}