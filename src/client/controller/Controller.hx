package controller;
import controller.InterfaceController;
import erazor.Template;

class Controller
{
	public var template:String;
	private var iface:InterfaceController;

	public function new(i:InterfaceController)
	{
		iface = i;
	}

	private function render(template:String, data:Dynamic)
	{
		var t = new Template(template);
		var html = t.execute(data);
		
		//iface.controllerArea.html(html);
		//trace (iface.controllerArea);
	}
}