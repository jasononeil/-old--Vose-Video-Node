package server.api;
import js.Node;

class FileSystem
{
	public function new()
	{
	}

	public static function existsSync(path:String):Bool
	{
		var exists = false;
	    try
		{
		    var stats = Node.fs.lstatSync(path);
		    exists = true;
		}
		catch (e:Dynamic)
		{
		    exists = false;
		}
		return exists;
	}

	public static function isDirSync(path:String):Bool
	{
		var isDir = false;
	    try
		{
		    var stats = Node.fs.lstatSync(path);
		    isDir = stats.isDirectory();
		}
		catch (e:Dynamic)
		{
		    isDir = false;
		}
		return isDir;
	}
}