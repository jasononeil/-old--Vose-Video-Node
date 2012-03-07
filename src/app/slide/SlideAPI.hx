package app.slide;

/**
* - everything we need to do on the server for slides
* - provide a list of slide templates for the given project
* - provide the slide templates for the client
* - receive the slide template and data object back, compile and save
* - open in inkscape to edit
*/
class SlideAPI 
{
	public function new()
	{
		
	}

	public function slideTemplates(p:Project):Hash<String>
	{
		var templates = new Hash();
		// find the list of templates
		// return the actual templates
		return templates;
	}

	public function singleTemplate(p:Project, templateName:String):String
	{
		return "";
	}

	public function saveSlide(v:Video, data:Dynamic, 
}