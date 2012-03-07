package client.view;
import client.controller.VideoController;
using domtools.ElementManipulation;
using domtools.Traversing;

class VideoView extends domtools.AbstractCustomElement
{
	public var controller:VideoController;

	public function new(c:VideoController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller");
		this.setText("Video Controller");
	}
}