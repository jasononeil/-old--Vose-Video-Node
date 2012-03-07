package app.slide;

import app.slide.SlideView;
import domtools.Query;
using domtools.DOMManipulation;

class SlideController
{
	public var view:SlideView;

	public function new() 
	{
		view = new SlideView(this);
		new Query("#controllerarea").append(view);
	}

}