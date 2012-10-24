package app.project;

import client.Client;
import app.project.ProjectListView;
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

	public function new() 
	{
	}

	@route("projects/")
	public function list()
	{
		// Set up the view
		var view = new ProjectListView(this);
		Client.showView(view);
		// projectAPI.list(function (a:Array<Project>) 
		// {
		// 	view.listProjects(a);
		// });
	}

	@route("projects/{}/")
	public function read(id:String)
	{
		// Display a grid of progress, showing where each
		// video in the project is up to...

		var view = new ProjectView(this);
		Client.showView(view);
	}

	@route("projects/new/")
	public function create()
	{
		var form = new AutoForm(Project);
		Client.showView(form);
		form.submit(function (e) { 
			e.preventDefault();
			var newProject = form.readForm();
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