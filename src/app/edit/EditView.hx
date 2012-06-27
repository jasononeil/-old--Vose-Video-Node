package app.edit;
import app.edit.EditController;
import dtx.Widget;
using Detox;

class EditView extends Widget
{
	public var controller:EditController;
	static var tpl = Widget.loadTemplate();

	public function new(c:EditController) 
	{
		super (tpl);

		controller = c;

		this.addClass("controller").addClass("edit");
	}

}