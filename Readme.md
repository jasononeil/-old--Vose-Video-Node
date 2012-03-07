Overall Plan
============

NODEJS Plan
-----------

Start Server
 - check for multiple instances
   - handover / launchBrowser()
   - start server, continue
 - create controller objects
   - scheduler (running processes)
   - launcher
   - notifications (basically an event listener)
   - filesystem, file <--> string
 - create remoting context, add scheduler, launcher, notifications, filesystem
 - onRequest
   - if (remoting) -> haxe.remoting.NodeHttpConnection.handleRequest(context)
   - else -> load direct file
 - launchBrowser()

Client
------

* Load HTML, CSS
* Load VoseClient.js
    * Load interface
    * Load "ApiClient" (with "ApiProxy"), localhost:1337/api/
    * Use "ApiClient.proxy.filesystem"
       or "ApiClient.proxy.notifications"
       etc.
    * handle processing, templating etc client side
    * handle models client side.
        * getAll() returns array of file locations, via api
        * get(path) returns object at path, via api
        * save(path) saves to path, via api
        * new() - creates new empty object

MVC Pattern
===========

Models
------

 * Project - uses filesystem
 * ProjectInfo - uses xml
 * Video - uses filesystem
 * VideoInfo - uses xml
 * Slides - uses xml (for data, then renders to svg / png)
 * DVDStructure - uses xml

Views
-----
One view for each controller, extending AbstractDomElement or Autoform

Controllers
-----------

 * ProjectController (find projects, start new projects, edit project settings / defaults, dashboard)
 * VideoController (name of week, lecturer, archive, view)
 * CopyController (mount device, copy, cancel, delete)
 * EditController (getHelp, generateProject, launch, getSegments, render)
 * SlideController ()
 * AuthorController ()

Server APIs
===========

  * Scheduler
  * Launcher
  * Notifications
  * Filesystem

Scheduler
---------

  * var numberOfCores
  * var currentlyProcessing:Array<ScheduleItem>
  * var queue:Array<ScheduleItem>
  * var currentlyProcessing:Bool

  * start() - start processing the queue
  * pauseAfter() - let the current jobs complete, but pause after
  * cancel() - cancel current jobs (but re-add them to the queue)

  * add()
  * remove(item)
  * get(i)
  * iterator() = currentlyProcessing + queue, in that order
  * sort(by sort value - decided on client)

**ScheduleItem**

  * new() [can be extended]
  * title
  * completeEvent
  * command - 
  * args []


Launcher
--------

  * launchGUIApplication()

Notifications
-------------

  * new(n:Notification)
  * 


Client Controllers
==================

