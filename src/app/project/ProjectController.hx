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
		// Set up the view
		view = new ProjectView(this);
		new Query("#controllerarea").append(view);

		// Default action
		list();
	}

	public function list()
	{
		projectAPI.list(function (a:Array<Project>) 
		{
			view.listProjects(a);
		});
	}

	public function read()
	{
		
	}

	public function create()
	{
		view.renderForm();
		view.form.submit(function (e) { 
			e.preventDefault();
			var newProject = view.form.readForm();
			projectAPI.create(newProject, function(e) {
				trace ("Added new project!");
				list();
			});
		});
	}

	public function update()
	{
		
	}

	public function archive()
	{
		
	}
}