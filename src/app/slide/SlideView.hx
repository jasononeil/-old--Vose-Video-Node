package app.slide;
import app.slide.SlideController;
using domtools.ElementManipulation;
using domtools.Traversing;

class SlideView extends domtools.AbstractCustomElement
{
	public var controller:SlideController;

	public function new(c:SlideController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller").addClass("slide");
		this.setText("Slide Controller");
	}

}