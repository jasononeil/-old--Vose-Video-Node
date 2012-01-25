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
 - create remoting context, add scheduler, notifications, filesystem
 - onRequest
   - if (req == direct file) -> load direct file
   - if (req == api) -> haxe.remoting.NodeHttpConnection.handleRequest(context)
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

Server APIs
===========

There are 4:
  * Scheduler
  * Launcher
  * Notifications
  * Filesystem

Client Controllers
==================

