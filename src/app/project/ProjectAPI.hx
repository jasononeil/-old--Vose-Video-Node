package app.project;

/** 
* List projects, view details, create and edit projects, archive projects
* List videos inside project
* View progress details across all videos
*/
import app.project.model.Project;
import app.video.model.Video;
import js.Node;
import server.api.FileSystem;
import server.Server;
import AppConfig;

class ProjectAPI 
{
	static var api:ProjectAPI = new ProjectAPI();

	public function new()
	{
	}

	@remote public function list(cb:Array<app.project.model.Project>->Void)
	{
		var projects = new Array();

		var folders = Node.fs.readdirSync(AppConfig.projectDir);

		for (folder in folders)
		{
			var filename = AppConfig.projectDir + '/' + folder + "/project.xml";
			if (FileSystem.existsSync(filename))
			{
				var p:Project;
				var fileString = Node.fs.readFileSync(filename, "utf8");
				p = haxe.Unserializer.run(fileString);
				projects.push(p);
			}
		}

		cb(projects);
	}

	@remote public function create(p:app.project.model.Project, cb:Bool->Void)
	{
		var projectDir = AppConfig.projectDir + p.id;
		Node.fs.mkdirSync(projectDir, null);
		
		var fileString = haxe.Serializer.run(p);
		var filename = projectDir + "/project.xml";

		Node.fs.writeFileSync(filename, fileString, "utf8");

		trace ("Just created: " + projectDir);
		trace (p.id);
		trace (p.title);
		trace (p.lecturer);
		trace (p.notes);
		trace (filename);
		trace (fileString);
		cb(true);
	}

	@remote public function read(id:String, cb:app.project.model.Project->Void)
	{
		var filename = AppConfig.projectDir + '/' + id + "/project.xml";
		var project:Project;
		if (FileSystem.existsSync(filename))
		{
			var fileString = Node.fs.readFileSync(filename, "utf8");
			project = haxe.Unserializer.run(fileString);
		}
		else 
		{
			project = null;//new Project();
		}

		cb(project);
	}

	@remote public function update(oldName:String, project:app.project.model.Project, cb:Bool->Void)
	{
		var oldProjectDir = AppConfig.projectDir + oldName;
		var newProjectDir = AppConfig.projectDir + project.id;

		// If the name has changed, move the directory
		if (oldProjectDir != newProjectDir)
		{
			Node.fs.renameSync(oldProjectDir, newProjectDir);
		}
		
		var fileString = haxe.Serializer.run(project);
		var filename = newProjectDir + "/project.xml";

		Node.fs.writeFileSync(filename, fileString, "utf8");

		trace ("Just created: " + newProjectDir);
		cb(true);
	}

	public function archive(projectName:String, cb:Bool->Void)
	{
		
		cb(true);
	}
	
	public function view(projectName:String, cb:Array<app.video.model.Video>->Void)
	{
		var videos = new Array();
		cb(videos);
	}
}