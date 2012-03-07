package app.project;
import js.Node;
import app.project.model.Project;

class ProjectAPI
{
	public function new()
	{
	}

	@remote public function getProjectList(parentPath:String, ?cb:Array<app.project.model.Project>->Void):Void
	{
		var projects = Project.getAll(parentPath);
		cb(projects);
	}

	@remote public function getProject(projectID:String, ?cb:app.project.model.Project->Void):Void
	{
		var p = Project.get(projectID);
		cb(p);
	}
}