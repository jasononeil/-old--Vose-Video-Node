package app.slide;
import app.slide.SlideController;
using DOMTools;

class SlideView extends domtools.Widget
{
	public var controller:SlideController;

	public function new(c:SlideController) 
	{
		super ("<div></div>");

		controller = c;

		this.addClass("controller").addClass("slide");
		this.setText("Slide Controller");
	}

}