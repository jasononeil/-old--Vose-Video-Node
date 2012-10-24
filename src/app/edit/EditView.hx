package app.edit;
import app.edit.EditController;
import dtx.widget.Widget;
using Detox;

class EditView extends Widget
{
	public var controller:EditController;

	public function new(c:EditController) 
	{
		super ();

		controller = c;

		this.addClass("controller").addClass("edit");
	}

}