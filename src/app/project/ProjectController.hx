package app.project;

import client.Client;
import app.project.ProjectView;
import domtools.Query;
import AppConfig;
import js.JQuery;
import app.project.model.Project;
using domtools.Tools;

class ProjectController
{
	public static var projectAPI = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(app.project.ProjectAPI, Client.conn);
	public var view:ProjectView;

	public function new() 
	{
		view = new ProjectView(this);
		view.renderForm();
		view.form.submit(function (e) { 
			e.preventDefault();
			var newProject = view.form.readForm();
			newProject.insert();
		});
		new Query("#controllerarea").append(view);
		
		listProjects();
	}

	public function listProjects()
	{
		projectAPI.listProjects(function (a:Array<Project>) 
		{
			view.listProjects(a);
			// for (project in a)
			// {
			// 	view.addProject(project);
			// }
		});
	}
}