package server.api;
import js.Node;

class FileSystem
{
	public function new()
	{
	}

	@remote public function getTheFoo(fooId :String, ?cb:String->Void) :Void
	{
		cb("someFoo");
	}
}