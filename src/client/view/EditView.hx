package client.view;
import client.controller.EditController;
using domtools.ElementManipulation;
using domtools.Traversing;

class EditView extends domtools.AbstractCustomElement
{
	public var controller:EditController;

	public function new(c:EditController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller");
		this.setText("Edit Controller");
	}

}