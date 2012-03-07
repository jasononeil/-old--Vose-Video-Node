package app.edit;
import app.edit.EditController;
using domtools.ElementManipulation;
using domtools.Traversing;

class EditView extends domtools.AbstractCustomElement
{
	public var controller:EditController;

	public function new(c:EditController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller").addClass("edit");
		this.setText("Edit Controller");
	}

}