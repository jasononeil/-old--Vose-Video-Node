package app.project;
import app.project.ProjectController;
import app.project.model.Project;
import erazor.Template;
import client.ui.basic.Table;
import autoform.AutoForm;
using domtools.Tools;

class ProjectView extends domtools.AbstractCustomElement
{
	public var controller:ProjectController;

	public function new(c:ProjectController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller").addClass("project");
		
		this.setInnerHTML("<h1>Project Controller</h1>");

		this.renderForm();
	}

	public function listProjects(list:Iterable<Project>)
	{
		var table = new Table<Project>(Project, list);
		this.append(table);
	}

	public function renderForm(?o:Project)
	{
		// Generate a form using autoform...
		var form = new AutoForm<Project>(Project);
		this.append(form);

		// if we have an object, set it as the default values
		if (o != null) { populateForm(o); }
	}

	public function populateForm(o:Project)
	{
		
	}

}
