package app.video;

import app.video.VideoView;
import domtools.Query;
using domtools.Tools;

class VideoController
{
	public var view:VideoView;

	public function new() 
	{
		view = new VideoView(this);
		new Query("#controllerarea").append(view);
	}

}