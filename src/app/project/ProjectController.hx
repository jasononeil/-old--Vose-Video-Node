package app.project;

import client.Client;
import app.project.ProjectView;
import domtools.Query;
import AppConfig;
import js.JQuery;
import app.project.model.Project;

class ProjectController
{
	public static var projectAPI = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(app.project.ProjectAPI, Client.conn);
	public var view:ProjectView;

	public function new() 
	{
		view = new ProjectView(this);
		Query.document.body.appendChild(view.getNode());
		
		listProjects();
	}

	public function listProjects()
	{
		trace (AppConfig.projectDir);
		projectAPI.listProjects(function (a:Array<String>) 
		{
			for (project in a)
			{
				//view.addProject(project);
			}
		});
	}
}