package app.project;
import app.project.ProjectController;
import app.project.model.Project;
import erazor.Template;
using domtools.ElementManipulation;
using domtools.DOMManipulation;
using domtools.Traversing;

class ProjectView extends domtools.AbstractCustomElement
{
	public var controller:ProjectController;

	public function new(c:ProjectController) 
	{
		super ("div");

		controller = c;

		this.addClass("controller").addClass("project");
		
		this.setInnerHTML("<h1>Project Controller</h1><ul></ul>");
	}

	public function addProject(p:Project)
	{
		var projectLine = new ProjectItem(p);
		this.find("ul").append(projectLine);
	}

}

import client.ui.basic.Link;
private class ProjectItem extends domtools.AbstractCustomElement
{
	public function new (p:Project)
	{
		super ("li");

		// Create the link to the unit
		var linkInnerHTML = "<span class='unitCode'></span>: <span class='unitTitle'></span> (<span class='unitLecturer'></span>)";
		var unitLink = new Link(linkInnerHTML, "#", "Open Project");
		unitLink.find("span.unitCode").setText(p.id);
		unitLink.find("span.unitTitle").setText(p.title);
		unitLink.find("span.unitLecturer").setText(p.lecturer);
		unitLink.addClass("unitLink");

		// edit and delete links
		var editLink = new Link("Edit","#");
		var archiveLink = new Link("Archive","#");

		// Add them all
		this.append(unitLink).append(editLink).append(archiveLink);

	}
		
}