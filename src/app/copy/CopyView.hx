package app.copy;
import app.copy.CopyController;
import dtx.widget.Widget;
using Detox;

class CopyView extends Widget
{
	public var controller:CopyController;

	public function new(c:CopyController) 
	{
		super ();

		controller = c;

		this.addClass("controller").addClass("copy");
	}

}