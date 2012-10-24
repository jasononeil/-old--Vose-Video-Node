package app.project;
import app.project.ProjectController;
import app.project.model.Project;
import erazor.Template;
import client.ui.basic.ActionTable;
import autoform.AutoForm;
import autoform.ui.Button;
import dtx.widget.Widget;
using Detox;

class ProjectListView extends Widget
{
	public var controller:ProjectController;
	public var form:AutoForm<Project>;

	public function new(c:ProjectController) 
	{
		super ();

		controller = c;

		this.addClass("controller").addClass("project");
	}

	public function listProjects(list:Iterable<Project>)
	{
		// this.empty();
		// var table = new ActionTable<Project, String>(Project, list);
		// table.addAction("View", testAction, ButtonType.Primary);
		// table.addAction("Edit", controller.update);
		// this.append(table);
	}
}
