package app.edit;
import app.edit.EditController;
using DOMTools;

class EditView extends domtools.Widget
{
	public var controller:EditController;

	public function new(c:EditController) 
	{
		super ("<div></div>");

		controller = c;

		this.addClass("controller").addClass("edit");
		this.setText("Edit Controller");
	}

}