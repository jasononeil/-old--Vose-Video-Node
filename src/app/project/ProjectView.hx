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
	public var form:AutoForm<Project>;

	public function new(c:ProjectController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller").addClass("project");
		
		this.setInnerHTML("<h1>Project Controller</h1>");
	}

	public function listProjects(list:Iterable<Project>)
	{
		var table = new Table<Project>(Project, list);
		this.append(table);
	}

	public function renderForm()
	{
		// Generate a form using autoform...
		form = new AutoForm(Project);
		this.append(form);
	}
}
