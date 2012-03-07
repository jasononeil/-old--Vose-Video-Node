package server.api;
import js.Node;

class Notifications
{
	public function new()
	{
	}

	@remote public function getTheFoo(fooId :String, ?cb:String->Void) :Void
	{
		cb("someFoo");
	}
}