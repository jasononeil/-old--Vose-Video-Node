package client.ui.menu;
import domtools.Query;
using domtools.Tools;

class MenuItem extends domtools.AbstractCustomElement
{
	private var a:Query;
	public var id(default,null):String;
	public var text(default,null):String;

	public function new(id:String, text:String)
	{
		super("li");

		// create the "<a href>"
		this.append(Query.create("a"));
		a = this.firstChildren();

		this.setID(id).setText(text);
	}

	public function setID(id:String)
	{
		this.id = id;
		this.addClass("menulink-" + id);
		a.setAttr("href","#" + id);
		return this;
	}

	public function setText(text:String)
	{
		this.text = text;
		a.setText(text);
		return this;
	}
}