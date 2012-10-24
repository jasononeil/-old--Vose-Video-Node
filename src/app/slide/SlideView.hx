package app.slide;
import app.slide.SlideController;
import dtx.widget.Widget;
using Detox;

class SlideView extends Widget
{
	public var controller:SlideController;

	public function new(c:SlideController) 
	{
		super ();

		controller = c;

		this.addClass("controller").addClass("slide");
		this.setText("Slide Controller");
	}

}