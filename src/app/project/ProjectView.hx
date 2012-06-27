package app.project;
import app.project.ProjectController;
import app.project.model.Project;
import erazor.Template;
import client.ui.basic.ActionTable;
import autoform.AutoForm;
import autoform.ui.Button;
import dtx.Widget;
using Detox;

class ProjectView extends Widget
{
	public var controller:ProjectController;
	public var form:AutoForm<Project>;
	static var tpl = Widget.loadTemplate();

	public function new(c:ProjectController) 
	{
		super (tpl);

		controller = c;

		this.addClass("controller").addClass("project");
	}

	public function listProjects(list:Iterable<Project>)
	{
		this.empty();
		var table = new ActionTable<Project, String>(Project, list);
		table.addAction("View", testAction, ButtonType.Primary);
		table.addAction("Edit", controller.update);
		this.append(table);
	}

	public function testAction(id:String)
	{
		trace (id);
	}

	public function renderForm()
	{
		// Generate a form using autoform...
		this.empty();
		form = new AutoForm(Project);
		this.append(form);
	}
}
