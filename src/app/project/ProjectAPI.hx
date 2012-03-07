package app.project;

/** 
* List projects, view details, create & edit projects, archive projects
* List videos inside project
* View progress details across all videos
*/
import app.project.model.Project;
import model.Video;

class ProjectAPI 
{
	public function new()
	{
		
	}

	@remote public function listProjects(cb:Array<String>->Void)
	{
		var projects = new Array();
		cb(projects);
	}

	@remote public function addProject(p:String, cb:Bool->Void)
	{
		cb(true);
	}

	@remote public function updateProject(currentProjectName:String, newProjectDetails:String, cb:Bool->Void)
	{
		cb(true);
	}

	public function archiveProject(projectName:String, cb:Bool->Void)
	{
		cb(true);
	}

	
	public function listVideos(projectName, cb:Array<Video>->Void)
	{
		throw "this should be part of the model, using #if js & #if nodejs";
		var videos = new Array();
		cb(videos);
	}
}