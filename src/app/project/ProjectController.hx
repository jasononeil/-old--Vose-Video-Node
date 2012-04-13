package app.project;

import client.Client;
import app.project.ProjectView;
import domtools.Query;
import AppConfig;
import js.JQuery;
import app.project.model.Project;
using DOMTools;

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

	public function read(id:String)
	{
		// Display a grid of progress, showing where each
		// video in the project is up to...
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

	public function update(id:String)
	{
		// save the old ID so we know which project to update
		var oldID = id;

		// Read the current project
		projectAPI.read(id, function (project) {

			// Create a form
			view.renderForm();
			view.form.populateForm(project);

			// On Submit, save the form
			view.form.submit(function (e) {

				e.preventDefault();
				var updatedProject = view.form.readForm();
				projectAPI.update(oldID, updatedProject, function(e) {

					// Once we've saved, reload the list
					list();

				});

			});
		});

	}

	public function archive()
	{
		
	}
}