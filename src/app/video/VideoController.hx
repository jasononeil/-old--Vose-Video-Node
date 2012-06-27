package app.video;

import client.Client;
import app.video.VideoView;
import app.video.model.Video;
import dtx.DOMCollection;
using Detox;

class VideoController
{
	public static var videoAPI = haxe.remoting.Macros.buildAndInstantiateRemoteProxyClass(app.video.VideoAPI, Client.conn);

	public var view:VideoView;

	public function new() 
	{
		view = new VideoView(this);

		create();
	}

	@route("videos")
	public function list(?projectID:String)
	{
		videoAPI.setCurrentProject(projectID, null);
		videoAPI.list(function (a:Array<Video>) 
		{
			view.list(a);
		});
	}

	@route("videos/{}/")
	public function read(id:String)
	{
		// An overview of the current video
		// Progress, where we are up to
		// Summary of what is in it
		// Video info (video name, pic, lecturer, etc)
	}

	@route("videos/new/")
	public function create()
	{
		view.renderForm();
		view.form.submit(function (e) { 
			e.preventDefault();
			var newVideo = view.form.readForm();
			videoAPI.create(newVideo, function(e) {
				trace ("Added new video!");
				list();
			});
		});
	}

	@route("videos/edit/{}/")
	public function update(name:String)
	{
		// Read the current project
		videoAPI.read(name, function (video) {

			// save the old ID & name so we know which video to update
			var oldProjectID = video.projectID;
			var oldName = video.name;

			// Create a form
			view.renderForm();
			view.form.populateForm(video);

			// On Submit, save the form
			view.form.submit(function (e) {

				e.preventDefault();
				var updatedVideo = view.form.readForm();
				videoAPI.update(oldName, updatedVideo, function(e) {

					// Once we've saved, reload the list
					list();

				});

			});
		});

	}

	@route("videos/archive/{}/")
	public function archive(id)
	{
		
	}

}