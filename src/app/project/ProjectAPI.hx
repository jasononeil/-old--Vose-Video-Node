package app.project;

/** 
* List projects, view details, create & edit projects, archive projects
* List videos inside project
* View progress details across all videos
*/
import app.project.model.Project;
import app.video.model.Video;
import js.Node;
import server.api.FileSystem;
import server.Server;

class ProjectAPI 
{
	static var api:ProjectAPI = new ProjectAPI();

	public function new()
	{
	}

	@remote public function listProjects(cb:Array<app.project.model.Project>->Void)
	{
		var projects = new Array();

		var folders = Node.fs.readdirSync(AppConfig.projectDir);

		for (folder in folders)
		{
			if (FileSystem.existsSync(AppConfig.projectDir + '/' + folder + "/project.xml"))
			{
				var p = new Project();
				p.id = folder;
				p.title = folder + "unit";
				projects.push(p);
			}
		}

		cb(projects);
	}

	@remote public function addProject(p:app.project.model.Project, cb:Bool->Void)
	{
		cb(true);
	}

	@remote public function updateProject(currentProjectName:String, newProjectDetails:app.project.model.Project, cb:Bool->Void)
	{
		cb(true);
	}

	public function archiveProject(projectName:String, cb:Bool->Void)
	{
		cb(true);
	}

	
	public function listVideos(projectName:String, cb:Array<app.video.model.Video>->Void)
	{
		throw "this should be part of the model, using #if js & #if nodejs";
		var videos = new Array();
		cb(videos);
	}
}