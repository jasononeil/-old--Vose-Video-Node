package app.video;


import app.project.model.Project;
import app.video.model.Video;
import js.Node;
import server.api.FileSystem;
import server.Server;
import AppConfig;

/**
* Creating a video within a project
* Editing the details for that video (lecturer etc)
* Showing a summary of progress
*/


class VideoAPI
{
	static var api:VideoAPI = new VideoAPI();

	public var currentProjectID:String;


	public function new()
	{
		currentProjectID = "";
	}

	@remote public function setCurrentProject(id:String, cb:Dynamic->Void)
	{
		currentProjectID = id;
	}

	@remote public function list(cb:Array<app.video.model.Video>->Void)
	{
		var videos = new Array();

		var projectFolders:Array<String>;
		// either go through a specified folder, or all of them
		if (currentProjectID == "")
			projectFolders = Node.fs.readdirSync(AppConfig.projectDir);
		else
			projectFolders = [currentProjectID];
		
		// go through each folder and check for videos
		for (folder in projectFolders)
		{
			// Check if it's a project directory
			var projectFolder = AppConfig.projectDir + '/' + folder;
			var filename = projectFolder + "/project.xml";
			if (FileSystem.existsSync(filename))
			{
				// If it is, search for all subdirs that have video.xml
				var vidFolders = Node.fs.readdirSync(projectFolder);

				for (folder in vidFolders)
				{
					var vidFolder = projectFolder + "/" + folder;
					var filename = vidFolder + "/video.xml";
					if (FileSystem.existsSync(filename))
					{
						var v:Video;
						var fileString = Node.fs.readFileSync(filename, "utf8");
						v = haxe.Unserializer.run(fileString);
						videos.push(v);
					}
				}
			}
		}

		cb(videos);
	}

	@remote public function create(v:app.video.model.Video, cb:Bool->Void)
	{
		var videoDir = AppConfig.projectDir + v.projectID + "/" + v.name;
		Node.fs.mkdirSync(videoDir, null);
		
		var fileString = haxe.Serializer.run(v);
		var filename = videoDir + "/video.xml";

		Node.fs.writeFileSync(filename, fileString, "utf8");

		trace ("Just created: " + videoDir);
		cb(true);
	}

	@remote public function read(videoName:String, cb:app.video.model.Video->Void)
	{
		var filename = AppConfig.projectDir + '/' + currentProjectID + "/" + videoName + "/video.xml";
		var video:Video;
		if (FileSystem.existsSync(filename))
		{
			var fileString = Node.fs.readFileSync(filename, "utf8");
			video = haxe.Unserializer.run(fileString);
		}
		else 
		{
			video = null;//new Project();
		}

		cb(video);
	}

	@remote public function update(oldName:String, video:app.video.model.Video, cb:Bool->Void)
	{
		var oldVideoDir = AppConfig.projectDir + currentProjectID + "/" + oldName;
		var newVideoDir = AppConfig.projectDir + video.projectID + "/" + video.name;

		// If the name has changed, move the directory
		if (oldVideoDir != newVideoDir)
		{
			Node.fs.renameSync(oldVideoDir, newVideoDir);
			currentProjectID = video.projectID;
		}
		
		var fileString = haxe.Serializer.run(video);
		var filename = newVideoDir + "/video.xml";

		Node.fs.writeFileSync(filename, fileString, "utf8");

		trace ("Just created: " + newVideoDir);
		cb(true);
	}

	public function archive(videoName:String, cb:Bool->Void)
	{
		cb(true);
	}
	
	public function view(cb:Array<app.video.model.Video>->Void)
	{
		var videos = new Array();
		cb(videos);
	}
}