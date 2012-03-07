package model;
import model.Video;

class Slide 
{
	public var videoID:String;
	public var video(getVideo,null):Video;

	public var templateName:String;
	public var template(getTemplate,null);

	public function new()
	{
		
	}


	function getVideo()
	{
		#if nodejs
			
		#elseif js
			
		#end
	}

	function getTemplate()
	{
		#if nodejs
			
		#elseif js
			
		#end
	}
}

