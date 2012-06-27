package app.slide;
import app.slide.SlideController;
import dtx.Widget;
using Detox;

class SlideView extends Widget
{
	public var controller:SlideController;
	static var tpl = Widget.loadTemplate();

	public function new(c:SlideController) 
	{
		super (tpl);

		controller = c;

		this.addClass("controller").addClass("slide");
		this.setText("Slide Controller");
	}

}