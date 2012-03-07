package server.controller;

/** 
* List projects, view details, create & edit projects, archive projects
* List videos inside project
* View progress details across all videos
*/
import model.Project;
import model.Video;

class ProjectController 
{
	public function new()
	{
		
	}

	public function listProjects():Array<Project>
	{
		var projects = new Array();
		return projects;
	}

	public function addProject(p:Project)
	{
	}

	public function updateProject(currentProjectName:String, newProjectDetails:Project)
	{
		
	}

	public function archiveProject(projectName:String)
	{
		
	}

	
	public function listVideos(projectName):Array<Video>
	{
		throw "this should be part of the model, using #if js & #if nodejs"
		var videos = new Array();
	}
}