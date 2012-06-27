package client;
using StringTools;

class Routing 
{
	var routes:Hash<Route>;
	var routePatterns:Hash<String>;
	// routes[/mypath/] = { controller: obj, action: "actionName" }
	// routePatterns[/mypath/{}/] = ~/\/mypath\/([a-zA-Z0-9_-.])+\//
	
	public function new()
	{
		routes = new Hash();
		routePatterns = new Hash();
	}

	public function route(path:String)
	{
		var r:Route = null;
		var args:Array<Dynamic> = [];

		if (routes.exists(path) && path.indexOf("[]") < 0 && path.indexOf("{}") < 0)
		{
			// If path is an exact match, use that route (unless it is a regex)
			r = routes.get(path);
		}

		if (r == null) 
		{
			// otherwise, loop through and see if any regex's match
			for (key in routePatterns.keys())
			{
				var ereg = new EReg(routePatterns.get(key), "g");

				if (ereg.match(path))
				{
					// Get all of the Regex matches and save them to an array
					var i = 1;
					while (true)
					{
						try 
						{
							args.push(ereg.matched(i));
							i++;
						}
						catch (e:Dynamic)
						{
							// We have all our matches (arguments), so
							// break out of the while() loop
							break;
						}
					}
					// We have a match, so break out of the for() loop
					r = routes.get(key);
					break;
				}
			}
		}

		// By now we should have a route, and an argument list (which may be empty)
		if (r != null)
		{
			//trace (r.action);
			//trace ("  " + args);
			
			// Call controller.action(arg1, arg2, ...)
			Reflect.callMethod(r.controller, Reflect.field(r.controller, r.action), args);
		}	
	}

	public function addRoute(path:String, controller:Dynamic, actionName:String)
	{
		// Save the route
		routes.set(path, { controller: controller, action: actionName });

		// If the route contains {} or [], set it up as a regex
		if (path.indexOf("[]") > -1 || path.indexOf("{}") > -1)
		{
			var pattern = "^" + path + "$"; // must match the entire string
			pattern = pattern.replace("[]", "([0-9]+)"); // capture numbers
			pattern = pattern.replace("{}", "([a-zA-Z0-9-_]+)"); // capture strings
			routePatterns.set(path, pattern);
		}
	}

	/**
	* @route("projects") - matches domain.com/projects
	* @route("projects/test") - matches domain.com/projects/test
	* @route("projects/{}/") - matches domain.com/some-string/ and passes "some-string" as arg1
	* @route("projects/{}/edit/[]") - matches domain.com/string/edit/12 and passes "string" and `12` (int) as args 
	*/
	public function addRoutesFromMetaData(controller:Dynamic)
	{
		var type = Type.getClass(controller);
		var metadata = haxe.rtti.Meta.getFields(type);
		for (methodName in Type.getInstanceFields(type))
		{
			// if the field has metadata
			var o = Reflect.field(metadata, methodName);
			if (o != null)
			{
				// if it has the route metadata
				var arr = Reflect.field(o, "route");
				if (arr != null)
				{
					// Metadata in the form @meta("test",2) becomes = ["test",2]
					var route = Std.string(arr[0]);
					addRoute(route, controller, methodName);
				}
			}
		}
	}
}

typedef Route = { 
	controller:Dynamic, 
	action:String 
}