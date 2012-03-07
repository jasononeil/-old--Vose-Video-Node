package client.controller;

import client.view.ProjectView;
import domtools.Query;

class ProjectController
{
	public var view:ProjectView;

	public function new() 
	{
		view = new ProjectView(this);

		Query.document.body.appendChild(view.getNode());
	}

}