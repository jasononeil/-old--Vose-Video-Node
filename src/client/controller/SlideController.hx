package client.controller;

import client.view.SlideView;
import domtools.Query;

class SlideController
{
	public var view:SlideView;

	public function new() 
	{
		view = new SlideView(this);

		Query.document.body.appendChild(view.getNode());
	}

}