import controller.InterfaceController;

class VoseProductionGUI
{
	public static function main() 
	{
		js.Lib.window.onload = ready;
	}

	public static function ready(e)
	{
		new InterfaceController();
	}
}