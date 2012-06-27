package app.video;
import app.video.VideoController;
import app.video.model.Video;
import erazor.Template;
import client.ui.basic.ActionTable;
import autoform.AutoForm;
import autoform.ui.Button;
import dtx.Widget;
using Detox;

class VideoView extends Widget
{
	public var controller:VideoController;
	public var form:AutoForm<Video>;
	static var tpl = Widget.loadTemplate();

	public function new(c:VideoController) 
	{
		super (tpl);

		controller = c;

		this.addClass("controller").addClass("video");
		
		this.setInnerHTML("<h1>Video Controller</h1>");
	}

	public function list(list:Iterable<Video>)
	{
		this.empty();
		var table = new ActionTable<Video, String>(Video, list);
		table.addAction("View", testAction, ButtonType.Primary);
		table.addAction("Edit", controller.update);
		this.append(table);
	}

	public function testAction(id:String)
	{
		trace (id);
	}

	public function renderForm()
	{
		// Generate a form using autoform...
		this.empty();
		form = new AutoForm(Video);
		this.append(form);
	}
}
