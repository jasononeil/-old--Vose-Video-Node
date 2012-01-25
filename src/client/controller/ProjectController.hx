package controller;
import macros.CompileTimeLoad;
import controller.Controller;

class ProjectController extends Controller
{
	
	public function new(i:controller.InterfaceController) 
	{
		super(i);
		template = CompileTimeLoad.getContent("view/body.html");
		render(template,{});
	}


}