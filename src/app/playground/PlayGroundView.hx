package app.playground;
import app.playground.PlayGroundController;
import client.ui.basic.ActionTable;
import autoform.AutoForm;
import autoform.ui.Button;
import dtx.widget.Widget;
using Detox;

class PlayGroundView extends Widget
{
	public var controller:PlayGroundController;
	// public var form:AutoForm<Project>;

	public function new(c) 
	{
		super ();

		controller = c;

		this.addClass("controller project");
	}
}
