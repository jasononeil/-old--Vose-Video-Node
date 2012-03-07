package server.api;
import js.Node;

class Scheduler
{
	public function new()
	{
	}

	@remote public function getTheFoo(fooId :String, ?cb:String->Void) :Void
	{
		cb("someFoo");
	}
}