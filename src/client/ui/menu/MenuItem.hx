package client.ui.menu;
import dtx.DOMCollection;
using Detox;

class MenuItem extends dtx.Widget
{
	private var a:DOMCollection;
	public var id(default,null):String;
	public var text(default,null):String;

	public function new(id:String, text:String)
	{
		super("<li></li>");

		// create the "<a href>"
		this.append("a".create());
		a = this.firstChildren();

		this.setID(id).setText(text);
	}

	public function setID(id:String)
	{
		this.id = id;
		this.addClass("menulink-" + id);
		a.setAttr("rel","pushstate");
		a.setAttr("href","/" + id);
		return this;
	}

	public function setText(text:String)
	{
		this.text = text;
		a.setText(text);
		return this;
	}
}