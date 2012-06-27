package app.project.model;


class Project implements haxe.rtti.Infos
{
	@autoform({
		required: true,
		title: "Unit Code",
		display: "text",
		placeholder: "eg. PC301"
	}) public var id:String;

	@autoform({
		required: true,
		title: "Unit Title",
		display: "text",
		placeholder: "eg. Ministry Formation",
		description: "The full title, not including the code"
	}) public var title:String;

	@autoform({
		required: true,
		title: "Lecturer Name",
		placeholder: "eg. Brian Harris"
	}) public var lecturer:String;

	@autoform({
		required: true,
		title: "Year",
		placeholder: "eg. 2012"
	}) public var year:Int;

	@autoform({
		required: true,
		title: "Semester",
		placeholder: "eg. 1 or 2"
	}) public var semester:Int;

	@autoform({
		required: false,
		title: "Notes for this unit",
		display: "textarea",
		description: "You can enter any notes related to this project.",
		placeholder: "eg. This is the VET level version of the unit recorded in 2009."
	}) public var notes:Array<String>;

	public function new()
	{
		
	}
}

