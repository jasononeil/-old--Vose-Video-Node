package client.view;
import client.controller.ProjectController;
using domtools.ElementManipulation;
using domtools.Traversing;

class ProjectView extends domtools.AbstractCustomElement
{
	public var controller:ProjectController;

	public function new(c:ProjectController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller");
		this.setText("Project Controller");
	}

}