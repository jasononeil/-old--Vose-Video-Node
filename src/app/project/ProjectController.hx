package app.project;

import client.Client;
import app.project.ProjectView;
import dtx.DOMCollection;
import AppConfig;
import js.JQuery;
import app.project.model.Project;
import autoform.AutoForm;
using Detox;

class ProjectController
{
	public static var projectAPI = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(app.project.ProjectAPI, Client.conn);
	public var view:ProjectView;

	public function new() 
	{
		// Set up the view
		view = new ProjectView(this);

		// Default action
		//list();
	}

	@route("projects/")
	public function list()
	{
		trace ("list");
		Client.showView(view);
		// projectAPI.list(function (a:Array<Project>) 
		// {
		// 	view.listProjects(a);
		// });
	}

	@route("projects/[]/")
	public function read(id:String)
	{
		// Display a grid of progress, showing where each
		// video in the project is up to...
		trace ("read " + id);
	}

	@route("projects/new/")
	public function create()
	{
		trace ("create");
		var form = new AutoForm(Project);
		Client.showView(form);
		form.submit(function (e) { 
			e.preventDefault();
			var newProject = view.form.readForm();
			projectAPI.create(newProject, function(e) {
				trace ("Added new project!");
				list();
			});
		});
	}

	@route("projects/{}/edit/")
	public function update(id:String)
	{
		trace ("update " + id);
		// // save the old ID so we know which project to update
		// var oldID = id;

		// // Read the current project
		// projectAPI.read(id, function (project) {

		// 	// Create a form
		// 	view.renderForm();
		// 	view.form.populateForm(project);

		// 	// On Submit, save the form
		// 	view.form.submit(function (e) {

		// 		e.preventDefault();
		// 		var updatedProject = view.form.readForm();
		// 		projectAPI.update(oldID, updatedProject, function(e) {

		// 			// Once we've saved, reload the list
		// 			list();

		// 		});

		// 	});
		// });

	}

	@route("projects/{}/archive/")
	public function archive(id:String)
	{
		trace ("archive " + id);
	}
}