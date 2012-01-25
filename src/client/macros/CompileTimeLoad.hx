package macros;
import haxe.macro.Expr;

class CompileTimeLoad 
{
	//
	// Macros
	//

	@:macro public static function getContent(filename:String)
	{
		filename = haxe.macro.Context.resolvePath("../" + filename);
		var string = neko.io.File.getContent(filename);
		
		var pos = haxe.macro.Context.currentPos();
		return { expr : EConst(CString(string)), pos : pos };
	}
}