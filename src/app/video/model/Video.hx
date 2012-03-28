package app.video.model;
import app.project.model.Project;

class Video implements haxe.rtti.Infos
{
	@autoform({
		required: true,
		title: "Project ID",
		display: "text",
		placeholder: "eg. PC301"
	}) public var projectID:String;

	@autoform({
		required: true,
		title: "Video Name",
		display: "text",
		placeholder: "eg. Week01"
	}) public var name:String;

	@autoform({
		required: true,
		title: "Lecturer Name",
		placeholder: "eg. Brian Harris"
	}) public var lecturer:String;

	@autoform({
		required: false,
		title: "Notes for this unit",
		display: "textarea",
		description: "You can enter any notes related to this video.",
		placeholder: "eg. Only 1st hour recorded.  The rest was a group discussion."
	}) public var notes:String;

	public function new(project:Project)
	{
		if (project != null)
		{
			this.projectID = project.id;
			this.lecturer = project.lecturer;
		}
			
	}
}

