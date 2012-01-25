package ui.menu;
using domtools.ElementManipulation;

class Menu extends domtools.AbstractCustomElement
{
	public function new()
	{
		super("ul");
		this.addClass("menu");
	}

	public function addMenuItem(name:String)
	{
		var code = this.innerHTML();
		code += "<li>" + name + "</li>";
		this.setInnerHTML(code);
	}
}