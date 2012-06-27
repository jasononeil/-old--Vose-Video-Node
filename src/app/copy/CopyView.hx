package app.copy;
import app.copy.CopyController;
import dtx.Widget;
using Detox;

class CopyView extends Widget
{
	public var controller:CopyController;
	static var tpl = Widget.loadTemplate();

	public function new(c:CopyController) 
	{
		super (tpl);

		controller = c;

		this.addClass("controller").addClass("copy");
	}

}