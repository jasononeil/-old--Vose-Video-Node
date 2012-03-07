package client.controller;

import client.view.VideoView;
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