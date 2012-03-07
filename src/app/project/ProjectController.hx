package app.project;

import client.Client;
import app.project.ProjectView;
import domtools.Query;
import AppConfig;
import js.JQuery;
import app.project.model.Project;
using domtools.DOMManipulation;
using domtools.ElementManipulation;

class ProjectController
{
	public static var projectAPI = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(app.project.ProjectAPI, Client.conn);
	public var view:ProjectView;

	public function new() 
	{
		view = new ProjectView(this);
		new Query("#controllerarea").append(view);
		
		listProjects();
	}

	public function listProjects()
	{
		projectAPI.listProjects(function (a:Array<Project>) 
		{
			for (project in a)
			{
				view.addProject(project);
			}
		});
	}
}