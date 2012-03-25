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
		required: false,
		title: "Notes for this unit",
		display: "textarea",
		description: "You can enter any notes related to this project.",
		placeholder: "eg. This is the VET level version of the unit recorded in 2009."
	}) public var notes:Array<String>;

	public function new():Void
	{
		
	}

	#if client
	
	#end // client

	#if server

	public function save()
	{
		
	}

	public static function getAll(path:String)
	{
		var folderList = js.Node.fs.readdirSync(path);
		var projectList:Array<Project> = new Array();
		for (folder in folderList)
		{
			projectList.push(get(folder));
		}
		return projectList;
	}

	public static function get(id:String)
	{
		var o = new Project();
		o.id = id;
		o.title = "The unit titled " + id;
		o.lecturer = "Jason";
		o.notes = new Array();
		return o;
	}

	#end // server
}

