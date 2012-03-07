package server.api;
import js.Node;

class Launcher
{
	public function new()
	{
	}

	@remote public function launch(cmd:String, ?args:Array<String>, ?cb:Bool->Void)
	{
		// default to empty args
		if (args == null) args = new Array();
		
		// Launch (spawn) the new process
		js.Node.childProcess.spawn(cmd, args);

		// If there's a callback, run it
		if (cb != null) cb(true);
	}
}