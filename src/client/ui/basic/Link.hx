package client.ui.basic;
using domtools.ElementManipulation;

class Link extends domtools.AbstractCustomElement
{
	public function new(?text:String = "Link", ?href:String = "#", ?title:String = null)
	{
		super("a");

		// set the text and link.  Note "text" can also be html.
		this.setAttr("href", href);
		this.setInnerHTML(text);

		// Set the title, default to the text if it is not set
		if (title == null) title = this.text();
		this.setAttr("title",title);
	}
}
