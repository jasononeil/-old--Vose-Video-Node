package client.view;
import client.controller.CopyController;
using domtools.ElementManipulation;
using domtools.Traversing;

class CopyView extends domtools.AbstractCustomElement
{
	public var controller:CopyController;

	public function new(c:CopyController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller");
		this.setText("Copy Controller");
	}

}