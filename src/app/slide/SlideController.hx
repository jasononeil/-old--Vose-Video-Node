package app.slide;

import app.slide.SlideView;
import dtx.DOMCollection;
using Detox;

class SlideController
{
	public var view:SlideView;
	
	public function new() 
	{
		view = new SlideView(this);
	}

}