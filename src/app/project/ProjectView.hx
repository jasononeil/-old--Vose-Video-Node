package app.project;
import app.project.ProjectController;
import app.project.model.Project;
import erazor.Template;
import client.ui.basic.ActionTable;
import autoform.AutoForm;
import autoform.ui.Button;
import dtx.widget.Widget;
using Detox;

class ProjectView extends Widget
{
	public var controller:ProjectController;
	public var form:AutoForm<Project>;

	public function new(c:ProjectController) 
	{
		super ();

		controller = c;

		this.addClass("controller project");
	}
}
