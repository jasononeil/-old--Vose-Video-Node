package client.ui.basic;
using DOMTools;

class Link extends domtools.Widget
{
	public function new(?text:String = "Link", ?href:String = "#", ?title:String = null)
	{
		super("<a></a>");

		// set the text and link.  Note "text" can also be html.
		this.setAttr("href", href);
		this.setInnerHTML(text);

		// Set the title, default to the text if it is not set
		if (title == null) title = this.text();
		this.setAttr("title",title);
	}
}
