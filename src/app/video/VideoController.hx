package app.video;

import app.video.VideoView;
import domtools.Query;

class VideoController
{
	public var view:VideoView;

	public function new() 
	{
		view = new VideoView(this);

		Query.document.body.appendChild(view.getNode());
	}

}