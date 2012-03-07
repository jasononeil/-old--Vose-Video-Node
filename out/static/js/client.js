var $_, $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var haxe = haxe || {}
if(!haxe.io) haxe.io = {}
haxe.io.BytesBuffer = $hxClasses["haxe.io.BytesBuffer"] = function() {
	this.b = new Array();
};
haxe.io.BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe.io.BytesBuffer.prototype = {
	b: null
	,addByte: function($byte) {
		this.b.push($byte);
	}
	,add: function(src) {
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0, _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos, _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe.io.Bytes(this.b.length,this.b);
		this.b = null;
		return bytes;
	}
	,__class__: haxe.io.BytesBuffer
}
if(!haxe.remoting) haxe.remoting = {}
haxe.remoting.AsyncConnection = $hxClasses["haxe.remoting.AsyncConnection"] = function() { }
haxe.remoting.AsyncConnection.__name__ = ["haxe","remoting","AsyncConnection"];
haxe.remoting.AsyncConnection.prototype = {
	resolve: null
	,call: null
	,setErrorHandler: null
	,__class__: haxe.remoting.AsyncConnection
}
var app = app || {}
if(!app.slide) app.slide = {}
app.slide.SlideController = $hxClasses["app.slide.SlideController"] = function() {
	this.view = new app.slide.SlideView(this);
	domtools.QueryDOMManipulation.append(new domtools.Query("#controllerarea"),null,this.view);
};
app.slide.SlideController.__name__ = ["app","slide","SlideController"];
app.slide.SlideController.prototype = {
	view: null
	,__class__: app.slide.SlideController
}
haxe.Http = $hxClasses["haxe.Http"] = function(url) {
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
};
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype = {
	url: null
	,async: null
	,postData: null
	,headers: null
	,params: null
	,setHeader: function(header,value) {
		this.headers.set(header,value);
	}
	,setParameter: function(param,value) {
		this.params.set(param,value);
	}
	,setPostData: function(data) {
		this.postData = data;
	}
	,request: function(post) {
		var me = this;
		var r = new js.XMLHttpRequest();
		var onreadystatechange = function() {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(r.responseText); else switch(s) {
			case null: case undefined:
				me.onError("Failed to connect or resolve host");
				break;
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.keys();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlDecode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.keys();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h,this.headers.get(h));
		}
		r.send(uri);
		if(!this.async) onreadystatechange();
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b[s.b.length] = "{";
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = ", ";
			s.add(Std.string(l[0]));
			l = l[1];
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b.join("");
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}
var domtools = domtools || {}
domtools.Query = $hxClasses["domtools.Query"] = function(selector,node,collection) {
	if(selector == null) selector = "";
	this.collection = new Array();
	if(node != null) {
		this.collection.push(node);
		this;
	} else if(collection != null) this.addCollection(collection); else if(selector != "") {
		var nodeList = CommonJS.getAll(selector);
		this.addNodeList(nodeList);
	}
};
domtools.Query.__name__ = ["domtools","Query"];
domtools.Query.__properties__ = {get_window:"get_window",get_document:"get_document"}
domtools.Query.document = null;
domtools.Query.window = null;
domtools.Query.create = function(name) {
	return document.createElement(name);
}
domtools.Query.get_window = function() {
	return window;
}
domtools.Query.get_document = function() {
	return document;
}
domtools.Query.prototype = {
	collection: null
	,length: null
	,iterator: function() {
		return this.collection.iterator();
	}
	,getNode: function(i) {
		if(i == null) i = 0;
		return this.collection[i];
	}
	,eq: function(i) {
		if(i == null) i = 0;
		return new domtools.Query(null,this.collection[i]);
	}
	,first: function() {
		return new domtools.Query(null,this.collection[0]);
	}
	,last: function() {
		return new domtools.Query(null,this.collection[this.collection.length - 1]);
	}
	,add: function(node) {
		return (function($this) {
			var $r;
			$this.collection.push(node);
			$r = $this;
			return $r;
		}(this));
	}
	,addCollection: function(collection) {
		var $it0 = collection.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			this.collection.push(node);
		}
		return this;
	}
	,addNodeList: function(nodeList,elementsOnly) {
		if(elementsOnly == null) elementsOnly = true;
		var _g1 = 0, _g = nodeList.length;
		while(_g1 < _g) {
			var i = _g1++;
			var node = nodeList.item(i);
			if(elementsOnly == false || domtools.ElementManipulation.isElement(node)) {
				this.collection.push(node);
				this;
			}
		}
		return this;
	}
	,removeFromCollection: function(node) {
		return (function($this) {
			var $r;
			$this.collection.remove(node);
			$r = $this;
			return $r;
		}(this));
	}
	,each: function(f) {
		return (function($this) {
			var $r;
			Lambda.iter($this.collection,f);
			$r = $this;
			return $r;
		}(this));
	}
	,filter: function(fn) {
		return new domtools.Query(null,null,Lambda.filter(this.collection,fn));
	}
	,clone: function() {
		var q = new domtools.Query();
		var $it0 = this.collection.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			{
				q.collection.push(node.cloneNode(true));
				q;
			}
		}
		return q;
	}
	,get_length: function() {
		return this.collection.length;
	}
	,__class__: domtools.Query
	,__properties__: {get_length:"get_length"}
}
domtools.AbstractCustomElement = $hxClasses["domtools.AbstractCustomElement"] = function(name) {
	domtools.Query.call(this);
	var elm = document.createElement(name);
	{
		this.collection.push(elm);
		this;
	}
};
domtools.AbstractCustomElement.__name__ = ["domtools","AbstractCustomElement"];
domtools.AbstractCustomElement.__super__ = domtools.Query;
domtools.AbstractCustomElement.prototype = $extend(domtools.Query.prototype,{
	__class__: domtools.AbstractCustomElement
});
app.slide.SlideView = $hxClasses["app.slide.SlideView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.addClass(this,"controller"),"slide");
	domtools.QueryElementManipulation.setText(this,"Slide Controller");
};
app.slide.SlideView.__name__ = ["app","slide","SlideView"];
app.slide.SlideView.__super__ = domtools.AbstractCustomElement;
app.slide.SlideView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: app.slide.SlideView
});
haxe.Serializer = $hxClasses["haxe.Serializer"] = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
};
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype = {
	buf: null
	,cache: null
	,shash: null
	,scount: null
	,useCache: null
	,useEnumIndex: null
	,toString: function() {
		return this.buf.b.join("");
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.add("R");
			this.buf.add(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.add("y");
		s = StringTools.urlEncode(s);
		this.buf.add(s.length);
		this.buf.add(":");
		this.buf.add(s);
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.add("r");
				this.buf.add(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.add("g");
	}
	,serialize: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			this.buf.add("n");
			break;
		case 1:
			if(v == 0) {
				this.buf.add("z");
				return;
			}
			this.buf.add("i");
			this.buf.add(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.add("k"); else if(!Math.isFinite(v)) this.buf.add(v < 0?"m":"p"); else {
				this.buf.add("d");
				this.buf.add(v);
			}
			break;
		case 3:
			this.buf.add(v?"t":"f");
			break;
		case 6:
			var c = $e[2];
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.add("a");
				var l = v["length"];
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.add("n"); else {
								this.buf.add("u");
								this.buf.add(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.add("n"); else {
						this.buf.add("u");
						this.buf.add(ucount);
					}
				}
				this.buf.add("h");
				break;
			case List:
				this.buf.add("l");
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.add("h");
				break;
			case Date:
				var d = v;
				this.buf.add("v");
				this.buf.add(d.toString());
				break;
			case Hash:
				this.buf.add("b");
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.add("h");
				break;
			case IntHash:
				this.buf.add("q");
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.add(":");
					this.buf.add(k);
					this.serialize(v1.get(k));
				}
				this.buf.add("h");
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var chars = "";
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt((b2 << 2 | b3 >> 6) & 63) + b64.charAt(b3 & 63);
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt(b2 << 2 & 63);
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					chars += b64.charAt(b1 >> 2) + b64.charAt(b1 << 4 & 63);
				}
				this.buf.add("s");
				this.buf.add(chars.length);
				this.buf.add(":");
				this.buf.add(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.add("C");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.add("g");
				} else {
					this.buf.add("c");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.add("o");
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.add(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.add(":");
				this.buf.add(v[1]);
			} else this.serializeString(v[0]);
			this.buf.add(":");
			var l = v["length"];
			this.buf.add(l - 2);
			var _g = 2;
			while(_g < l) {
				var i = _g++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeException: function(e) {
		this.buf.add("x");
		this.serialize(e);
	}
	,__class__: haxe.Serializer
}
if(!app.project) app.project = {}
app.project.ProjectView = $hxClasses["app.project.ProjectView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.addClass(this,"controller"),"project");
	domtools.QueryElementManipulation.setInnerHTML(this,"<h1>Project Controller</h1><ul></ul>");
};
app.project.ProjectView.__name__ = ["app","project","ProjectView"];
app.project.ProjectView.__super__ = domtools.AbstractCustomElement;
app.project.ProjectView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,addProject: function(p) {
		var projectLine = new app.project._ProjectView.ProjectItem(p);
		domtools.QueryDOMManipulation.append(domtools.QueryTraversing.find(this,"ul"),null,projectLine);
	}
	,__class__: app.project.ProjectView
});
if(!app.project._ProjectView) app.project._ProjectView = {}
app.project._ProjectView.ProjectItem = $hxClasses["app.project._ProjectView.ProjectItem"] = function(p) {
	domtools.AbstractCustomElement.call(this,"li");
	var linkInnerHTML = "<span class='unitCode'></span>: <span class='unitTitle'></span> (<span class='unitLecturer'></span>)";
	var unitLink = new client.ui.basic.Link(linkInnerHTML,"#","Open Project");
	domtools.QueryElementManipulation.setText(domtools.QueryTraversing.find(unitLink,"span.unitCode"),p.id);
	domtools.QueryElementManipulation.setText(domtools.QueryTraversing.find(unitLink,"span.unitTitle"),p.title);
	domtools.QueryElementManipulation.setText(domtools.QueryTraversing.find(unitLink,"span.unitLecturer"),p.lecturer);
	domtools.QueryElementManipulation.addClass(unitLink,"unitLink");
	var editLink = new client.ui.basic.Link("Edit","#");
	var archiveLink = new client.ui.basic.Link("Archive","#");
	domtools.QueryDOMManipulation.append(domtools.QueryDOMManipulation.append(domtools.QueryDOMManipulation.append(this,null,unitLink),null,editLink),null,archiveLink);
};
app.project._ProjectView.ProjectItem.__name__ = ["app","project","_ProjectView","ProjectItem"];
app.project._ProjectView.ProjectItem.__super__ = domtools.AbstractCustomElement;
app.project._ProjectView.ProjectItem.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	__class__: app.project._ProjectView.ProjectItem
});
if(!app.copy) app.copy = {}
app.copy.CopyView = $hxClasses["app.copy.CopyView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.addClass(this,"controller"),"copy");
	domtools.QueryElementManipulation.setText(this,"Copy Controller");
};
app.copy.CopyView.__name__ = ["app","copy","CopyView"];
app.copy.CopyView.__super__ = domtools.AbstractCustomElement;
app.copy.CopyView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: app.copy.CopyView
});
var AppConfig = $hxClasses["AppConfig"] = function() { }
AppConfig.__name__ = ["AppConfig"];
AppConfig.prototype = {
	__class__: AppConfig
}
var client = client || {}
if(!client.ui) client.ui = {}
if(!client.ui.menu) client.ui.menu = {}
client.ui.menu.Menu = $hxClasses["client.ui.menu.Menu"] = function() {
	domtools.AbstractCustomElement.call(this,"ul");
	domtools.QueryElementManipulation.addClass(this,"menu");
	this.items = new Hash();
};
client.ui.menu.Menu.__name__ = ["client","ui","menu","Menu"];
client.ui.menu.Menu.__super__ = domtools.AbstractCustomElement;
client.ui.menu.Menu.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	items: null
	,addMenuItem: function(id,title) {
		var menuItem = new client.ui.menu.MenuItem(id,title);
		domtools.QueryDOMManipulation.appendTo(menuItem,null,this);
		this.items.set(id,menuItem);
	}
	,get: function(id) {
		return this.items.get(id);
	}
	,__class__: client.ui.menu.Menu
});
domtools.ElementManipulation = $hxClasses["domtools.ElementManipulation"] = function() { }
domtools.ElementManipulation.__name__ = ["domtools","ElementManipulation"];
domtools.ElementManipulation.isElement = function(node) {
	return node.nodeType == domtools.ElementManipulation.NodeTypeElement;
}
domtools.ElementManipulation.attr = function(elm,attName) {
	var ret = "";
	if(domtools.ElementManipulation.isElement(elm)) {
		var element = elm;
		ret = element.getAttribute(attName);
		if(ret == null) ret = "";
	}
	return ret;
}
domtools.ElementManipulation.setAttr = function(elm,attName,attValue) {
	if(elm.nodeType == domtools.ElementManipulation.NodeTypeElement) {
		var element = elm;
		element.setAttribute(attName,attValue);
	}
	return elm;
}
domtools.ElementManipulation.removeAttr = function(elm,attName) {
	if(elm.nodeType == domtools.ElementManipulation.NodeTypeElement) {
		var element = elm;
		element.removeAttribute(attName);
	}
	return elm;
}
domtools.ElementManipulation.hasClass = function(elm,className) {
	return (" " + domtools.ElementManipulation.attr(elm,"class") + " ").indexOf(" " + className + " ") > -1;
}
domtools.ElementManipulation.addClass = function(elm,className) {
	if(domtools.ElementManipulation.hasClass(elm,className) == false) {
		var oldClassName = domtools.ElementManipulation.attr(elm,"class");
		var newClassName = oldClassName == ""?className:oldClassName + " " + className;
		domtools.ElementManipulation.setAttr(elm,"class",newClassName);
	}
	return elm;
}
domtools.ElementManipulation.removeClass = function(elm,className) {
	var classes = domtools.ElementManipulation.attr(elm,"class").split(" ");
	classes.remove(className);
	var newClassValue = classes.join(" ");
	domtools.ElementManipulation.setAttr(elm,"class",newClassValue);
	return elm;
}
domtools.ElementManipulation.toggleClass = function(elm,className) {
	if(domtools.ElementManipulation.hasClass(elm,className)) domtools.ElementManipulation.removeClass(elm,className); else domtools.ElementManipulation.addClass(elm,className);
	return elm;
}
domtools.ElementManipulation.tagName = function(elm) {
	return elm.nodeName.toLowerCase();
}
domtools.ElementManipulation.val = function(elm) {
	return domtools.ElementManipulation.attr(elm,"value");
}
domtools.ElementManipulation.text = function(elm) {
	return elm.textContent;
}
domtools.ElementManipulation.setText = function(elm,text) {
	return (function($this) {
		var $r;
		elm.textContent = text;
		$r = elm;
		return $r;
	}(this));
}
domtools.ElementManipulation.innerHTML = function(elm) {
	var ret = "";
	switch(elm.nodeType) {
	case domtools.ElementManipulation.NodeTypeElement:
		var element = elm;
		ret = element.innerHTML;
		break;
	default:
		ret = elm.textContent;
	}
	return ret;
}
domtools.ElementManipulation.setInnerHTML = function(elm,html) {
	switch(elm.nodeType) {
	case domtools.ElementManipulation.NodeTypeElement:
		var element = elm;
		element.innerHTML = html;
		break;
	default:
		elm.textContent = html;
	}
	return elm;
}
domtools.ElementManipulation.clone = function(elm,deep) {
	if(deep == null) deep = true;
	return elm.cloneNode(deep);
}
domtools.ElementManipulation.prototype = {
	__class__: domtools.ElementManipulation
}
domtools.QueryElementManipulation = $hxClasses["domtools.QueryElementManipulation"] = function() { }
domtools.QueryElementManipulation.__name__ = ["domtools","QueryElementManipulation"];
domtools.QueryElementManipulation.attr = function(query,attName) {
	return query.collection.length > 0?domtools.ElementManipulation.attr(query.collection[0],attName):"";
}
domtools.QueryElementManipulation.setAttr = function(query,attName,attValue) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.setAttr(node,attName,attValue);
	}
	return query;
}
domtools.QueryElementManipulation.removeAttr = function(query,attName) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.removeAttr(node,attName);
	}
	return query;
}
domtools.QueryElementManipulation.hasClass = function(query,className) {
	return query.collection.length > 0?domtools.ElementManipulation.hasClass(query.collection[0],className):false;
}
domtools.QueryElementManipulation.addClass = function(query,className) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.addClass(node,className);
	}
	return query;
}
domtools.QueryElementManipulation.removeClass = function(query,className) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.removeClass(node,className);
	}
	return query;
}
domtools.QueryElementManipulation.toggleClass = function(query,className) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.toggleClass(node,className);
	}
	return query;
}
domtools.QueryElementManipulation.tagName = function(query) {
	return query.collection.length > 0?query.collection[0].nodeName.toLowerCase():"";
}
domtools.QueryElementManipulation.tagNames = function(query) {
	var names = new Array();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		names.push(node.nodeName.toLowerCase());
	}
	return names;
}
domtools.QueryElementManipulation.val = function(query) {
	return query.collection.length > 0?domtools.ElementManipulation.attr(query.collection[0],"value"):"";
}
domtools.QueryElementManipulation.text = function(query) {
	var text = "";
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		text = text + node.textContent;
	}
	return text;
}
domtools.QueryElementManipulation.setText = function(query,text) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		{
			node.textContent = text;
			node;
		}
	}
	return query;
}
domtools.QueryElementManipulation.innerHTML = function(query) {
	var ret = "";
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		ret += domtools.ElementManipulation.innerHTML(node);
	}
	return ret;
}
domtools.QueryElementManipulation.setInnerHTML = function(query,html) {
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.ElementManipulation.setInnerHTML(node,html);
	}
	return query;
}
domtools.QueryElementManipulation.clone = function(query,deep) {
	if(deep == null) deep = true;
	var newQuery = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		{
			newQuery.collection.push(node.cloneNode(true));
			newQuery;
		}
	}
	return newQuery;
}
domtools.QueryElementManipulation.prototype = {
	__class__: domtools.QueryElementManipulation
}
client.ui.menu.NavBar = $hxClasses["client.ui.menu.NavBar"] = function(brand,fixed) {
	if(fixed == null) fixed = true;
	if(brand == null) brand = "";
	domtools.AbstractCustomElement.call(this,"div");
	domtools.QueryElementManipulation.addClass(this,"navbar");
	domtools.QueryElementManipulation.addClass(this,"navbar-fixed-top");
	var navbarInner = domtools.ElementManipulation.addClass(document.createElement("div"),"navbar-inner");
	var container = domtools.ElementManipulation.addClass(document.createElement("div"),"container");
	if(brand != "") {
		var link = new client.ui.basic.Link(brand,"/#","Homepage: " + brand);
		domtools.QueryElementManipulation.addClass(link,"brand");
		domtools.DOMManipulation.append(container,null,link);
	}
	this.menu = new client.ui.menu.Menu();
	domtools.QueryElementManipulation.addClass(this.menu,"nav");
	domtools.DOMManipulation.append(container,null,this.menu);
	domtools.DOMManipulation.append(navbarInner,container);
	domtools.QueryDOMManipulation.append(this,navbarInner);
};
client.ui.menu.NavBar.__name__ = ["client","ui","menu","NavBar"];
client.ui.menu.NavBar.__super__ = domtools.AbstractCustomElement;
client.ui.menu.NavBar.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	menu: null
	,__class__: client.ui.menu.NavBar
});
domtools.EventManagement = $hxClasses["domtools.EventManagement"] = function() { }
domtools.EventManagement.__name__ = ["domtools","EventManagement"];
domtools.EventManagement.triggerHandler = function(target,event) {
	return target;
}
domtools.EventManagement.on = function(target,eventType,listener) {
	var elm = target;
	elm.addEventListener(eventType,listener,false);
	return target;
}
domtools.EventManagement.off = function(target,eventType,listener) {
	var elm = target;
	elm.removeEventListener(eventType,listener,false);
	return target;
}
domtools.EventManagement.one = function(target,eventType,listener) {
	var fn = null;
	fn = function(e) {
		listener(e);
		target.removeEventListener(eventType,fn,false);
	};
	target.addEventListener(eventType,fn,false);
	return target;
}
domtools.EventManagement.mousedown = function(target,listener) {
	return domtools.EventManagement.on(target,"mousedown",listener);
}
domtools.EventManagement.mouseenter = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseover",listener);
}
domtools.EventManagement.mouseleave = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseout",listener);
}
domtools.EventManagement.mousemove = function(target,listener) {
	return domtools.EventManagement.on(target,"mousemove",listener);
}
domtools.EventManagement.mouseout = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseout",listener);
}
domtools.EventManagement.mouseover = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseover",listener);
}
domtools.EventManagement.mouseup = function(target,listener) {
	return domtools.EventManagement.on(target,"mouseup",listener);
}
domtools.EventManagement.keydown = function(target,listener) {
	return domtools.EventManagement.on(target,"keydown",listener);
}
domtools.EventManagement.keypress = function(target,listener) {
	return domtools.EventManagement.on(target,"keypress",listener);
}
domtools.EventManagement.keyup = function(target,listener) {
	return domtools.EventManagement.on(target,"keyup",listener);
}
domtools.EventManagement.hover = function(target,listener1,listener2) {
	domtools.EventManagement.on(target,"mouseover",listener1);
	if(listener2 == null) domtools.EventManagement.on(target,"mouseout",listener1); else domtools.EventManagement.on(target,"mouseout",listener2);
	return target;
}
domtools.EventManagement.submit = function(target,listener) {
	return domtools.EventManagement.on(target,"submit",listener);
}
domtools.EventManagement.toggleClick = function(target,listenerFirstClick,listenerSecondClick) {
	var fn1 = null;
	var fn2 = null;
	fn1 = function(e) {
		listenerFirstClick(e);
		target.removeEventListener("click",fn1,false);
		target.addEventListener("click",fn2,false);
	};
	fn2 = function(e) {
		listenerSecondClick(e);
		target.removeEventListener("click",fn2,false);
		target.addEventListener("click",fn1,false);
	};
	target.addEventListener("click",fn1,false);
	return target;
}
domtools.EventManagement.blur = function(target,listener) {
	return domtools.EventManagement.on(target,"blur",listener);
}
domtools.EventManagement.change = function(target,listener) {
	return domtools.EventManagement.on(target,"change",listener);
}
domtools.EventManagement.click = function(target,listener) {
	return domtools.EventManagement.on(target,"click",listener);
}
domtools.EventManagement.dblclick = function(target,listener) {
	return domtools.EventManagement.on(target,"dblclick",listener);
}
domtools.EventManagement.focus = function(target,listener) {
	return domtools.EventManagement.on(target,"focus",listener);
}
domtools.EventManagement.focusIn = function(target,listener) {
	return domtools.EventManagement.on(target,"focusIn",listener);
}
domtools.EventManagement.focusOut = function(target,listener) {
	return domtools.EventManagement.on(target,"focusOut",listener);
}
domtools.EventManagement.resize = function(target,listener) {
	return domtools.EventManagement.on(target,"resize",listener);
}
domtools.EventManagement.scroll = function(target,listener) {
	return domtools.EventManagement.on(target,"scroll",listener);
}
domtools.EventManagement.select = function(target,listener) {
	return domtools.EventManagement.on(target,"select",listener);
}
domtools.EventManagement.load = function(target,listener) {
	return domtools.EventManagement.on(target,"load",listener);
}
domtools.EventManagement.unload = function(target,listener) {
	return domtools.EventManagement.on(target,"unload",listener);
}
domtools.EventManagement.error = function(target,listener) {
	return domtools.EventManagement.on(target,"error",listener);
}
domtools.EventManagement.ready = function(target,listener) {
	return domtools.EventManagement.on(target,"ready",listener);
}
domtools.EventManagement.prototype = {
	__class__: domtools.EventManagement
}
domtools.QueryEventManagement = $hxClasses["domtools.QueryEventManagement"] = function() { }
domtools.QueryEventManagement.__name__ = ["domtools","QueryEventManagement"];
domtools.QueryEventManagement.on = function(targetCollection,eventType,listener) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var target = $it0.next();
		domtools.EventManagement.on(target,eventType,listener);
	}
	return targetCollection;
}
domtools.QueryEventManagement.off = function(targetCollection,eventType,listener) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var target = $it0.next();
		domtools.EventManagement.off(target,eventType,listener);
	}
	return targetCollection;
}
domtools.QueryEventManagement.one = function(targetCollection,eventType,listener) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var target = $it0.next();
		domtools.EventManagement.one(target,eventType,listener);
	}
	return targetCollection;
}
domtools.QueryEventManagement.mousedown = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mousedown",listener);
}
domtools.QueryEventManagement.mouseenter = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseenter",listener);
}
domtools.QueryEventManagement.mouseleave = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseleave",listener);
}
domtools.QueryEventManagement.mousemove = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mousemove",listener);
}
domtools.QueryEventManagement.mouseout = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseout",listener);
}
domtools.QueryEventManagement.mouseover = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseover",listener);
}
domtools.QueryEventManagement.mouseup = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"mouseup",listener);
}
domtools.QueryEventManagement.keydown = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"keydown",listener);
}
domtools.QueryEventManagement.keypress = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"keypress",listener);
}
domtools.QueryEventManagement.keyup = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"keyup",listener);
}
domtools.QueryEventManagement.hover = function(targetCollection,listener1,listener2) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.EventManagement.hover(node,listener1,listener2);
	}
	return targetCollection;
}
domtools.QueryEventManagement.submit = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"submit",listener);
}
domtools.QueryEventManagement.toggleClick = function(targetCollection,listenerFirstClick,listenerSecondClick) {
	var $it0 = targetCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var target = $it0.next();
		domtools.EventManagement.toggleClick(target,listenerFirstClick,listenerSecondClick);
	}
	return targetCollection;
}
domtools.QueryEventManagement.blur = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"blur",listener);
}
domtools.QueryEventManagement.change = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"change",listener);
}
domtools.QueryEventManagement.click = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"click",listener);
}
domtools.QueryEventManagement.dblclick = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"dblclick",listener);
}
domtools.QueryEventManagement.focus = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"focus",listener);
}
domtools.QueryEventManagement.focusIn = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"focusIn",listener);
}
domtools.QueryEventManagement.focusOut = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"focusOut",listener);
}
domtools.QueryEventManagement.resize = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"resize",listener);
}
domtools.QueryEventManagement.scroll = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"scroll",listener);
}
domtools.QueryEventManagement.select = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"select",listener);
}
domtools.QueryEventManagement.load = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"load",listener);
}
domtools.QueryEventManagement.unload = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"unload",listener);
}
domtools.QueryEventManagement.error = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"error",listener);
}
domtools.QueryEventManagement.ready = function(target,listener) {
	return domtools.QueryEventManagement.on(target,"ready",listener);
}
domtools.QueryEventManagement.prototype = {
	__class__: domtools.QueryEventManagement
}
haxe.io.Input = $hxClasses["haxe.io.Input"] = function() { }
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype = {
	bigEndian: null
	,readByte: function() {
		return (function($this) {
			var $r;
			throw "Not implemented";
			return $r;
		}(this));
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,close: function() {
	}
	,setEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readAll: function(bufsize) {
		if(bufsize == null) bufsize = 16384;
		var buf = haxe.io.Bytes.alloc(bufsize);
		var total = new haxe.io.BytesBuffer();
		try {
			while(true) {
				var len = this.readBytes(buf,0,bufsize);
				if(len == 0) throw haxe.io.Error.Blocked;
				total.addBytes(buf,0,len);
			}
		} catch( e ) {
			if( js.Boot.__instanceof(e,haxe.io.Eof) ) {
			} else throw(e);
		}
		return total.getBytes();
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = haxe.io.Bytes.alloc(nbytes);
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) throw haxe.io.Error.Blocked;
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readUntil: function(end) {
		var buf = new StringBuf();
		var last;
		while((last = this.readByte()) != end) buf.b[buf.b.length] = String.fromCharCode(last);
		return buf.b.join("");
	}
	,readLine: function() {
		var buf = new StringBuf();
		var last;
		var s;
		try {
			while((last = this.readByte()) != 10) buf.b[buf.b.length] = String.fromCharCode(last);
			s = buf.b.join("");
			if(s.charCodeAt(s.length - 1) == 13) s = s.substr(0,-1);
		} catch( e ) {
			if( js.Boot.__instanceof(e,haxe.io.Eof) ) {
				s = buf.b.join("");
				if(s.length == 0) throw e;
			} else throw(e);
		}
		return s;
	}
	,readFloat: function() {
		throw "Not implemented";
		return 0;
	}
	,readDouble: function() {
		throw "Not implemented";
		return 0;
	}
	,readInt8: function() {
		var n = this.readByte();
		if(n >= 128) return n - 256;
		return n;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n = this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
		if((n & 32768) != 0) return n - 65536;
		return n;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		return this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
	}
	,readInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var n = this.bigEndian?ch3 | ch2 << 8 | ch1 << 16:ch1 | ch2 << 8 | ch3 << 16;
		if((n & 8388608) != 0) return n - 16777216;
		return n;
	}
	,readUInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		return this.bigEndian?ch3 | ch2 << 8 | ch1 << 16:ch1 | ch2 << 8 | ch3 << 16;
	}
	,readInt31: function() {
		var ch1, ch2, ch3, ch4;
		if(this.bigEndian) {
			ch4 = this.readByte();
			ch3 = this.readByte();
			ch2 = this.readByte();
			ch1 = this.readByte();
		} else {
			ch1 = this.readByte();
			ch2 = this.readByte();
			ch3 = this.readByte();
			ch4 = this.readByte();
		}
		if((ch4 & 128) == 0 != ((ch4 & 64) == 0)) throw haxe.io.Error.Overflow;
		return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
	}
	,readUInt30: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if((this.bigEndian?ch1:ch4) >= 64) throw haxe.io.Error.Overflow;
		return this.bigEndian?ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24:ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		return this.bigEndian?(ch1 << 8 | ch2) << 16 | (ch3 << 8 | ch4):(ch4 << 8 | ch3) << 16 | (ch2 << 8 | ch1);
	}
	,readString: function(len) {
		var b = haxe.io.Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,__class__: haxe.io.Input
	,__properties__: {set_bigEndian:"setEndian"}
}
haxe.io.BytesInput = $hxClasses["haxe.io.BytesInput"] = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw haxe.io.Error.OutsideBounds;
	this.b = b.b;
	this.pos = pos;
	this.len = len;
};
haxe.io.BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe.io.BytesInput.__super__ = haxe.io.Input;
haxe.io.BytesInput.prototype = $extend(haxe.io.Input.prototype,{
	b: null
	,pos: null
	,len: null
	,readByte: function() {
		if(this.len == 0) throw new haxe.io.Eof();
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe.io.Error.OutsideBounds;
		if(this.len == 0 && len > 0) throw new haxe.io.Eof();
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe.io.BytesInput
});
var server = server || {}
if(!server.api) server.api = {}
server.api.SchedulerProxy = $hxClasses["server.api.SchedulerProxy"] = function(c) {
	this._conn = c.resolve("server.api.SchedulerService");
};
server.api.SchedulerProxy.__name__ = ["server","api","SchedulerProxy"];
server.api.SchedulerProxy.prototype = {
	_conn: null
	,getTheFoo: function(fooId,cb) {
		this._conn.resolve("getTheFoo").call([fooId],cb);
	}
	,__class__: server.api.SchedulerProxy
}
domtools.DOMManipulation = $hxClasses["domtools.DOMManipulation"] = function() { }
domtools.DOMManipulation.__name__ = ["domtools","DOMManipulation"];
domtools.DOMManipulation.append = function(parent,childNode,childCollection) {
	if(childNode != null) parent.appendChild(childNode); else if(childCollection != null) {
		var $it0 = childCollection.collection.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			parent.appendChild(child);
		}
	}
	return parent;
}
domtools.DOMManipulation.prepend = function(parent,newChildNode,newChildCollection) {
	if(newChildNode != null) domtools.DOMManipulation.insertThisBefore(newChildNode,parent.firstChild); else if(newChildCollection != null) domtools.QueryDOMManipulation.insertThisBefore(newChildCollection,parent.firstChild);
	return parent;
}
domtools.DOMManipulation.appendTo = function(child,parentNode,parentCollection) {
	if(parentNode != null) domtools.DOMManipulation.append(parentNode,child); else if(parentCollection != null) domtools.QueryDOMManipulation.append(parentCollection,child);
	return child;
}
domtools.DOMManipulation.prependTo = function(child,parentNode,parentCollection) {
	return domtools.DOMManipulation.insertThisBefore(child,parentNode.firstChild,parentCollection);
}
domtools.DOMManipulation.insertThisBefore = function(content,targetNode,targetCollection) {
	if(targetNode != null) targetNode.parentNode.insertBefore(content,targetNode); else if(targetCollection != null) {
		var firstChildUsed = false;
		var $it0 = targetCollection.collection.iterator();
		while( $it0.hasNext() ) {
			var target = $it0.next();
			var childToInsert;
			if(firstChildUsed) {
				childToInsert = content;
				firstChildUsed = true;
			} else childToInsert = content.cloneNode(true);
			target.parentNode.insertBefore(childToInsert,target);
		}
	}
	return content;
}
domtools.DOMManipulation.insertThisAfter = function(content,targetNode,targetCollection) {
	return domtools.DOMManipulation.insertThisBefore(content,targetNode.nextSibling,targetCollection);
}
domtools.DOMManipulation.beforeThisInsert = function(target,contentNode,contentQuery) {
	if(contentNode != null) domtools.DOMManipulation.insertThisBefore(contentNode,target); else if(contentQuery != null) domtools.QueryDOMManipulation.insertThisBefore(contentQuery,target);
	return target;
}
domtools.DOMManipulation.afterThisInsert = function(target,contentNode,contentQuery) {
	if(contentNode != null) domtools.DOMManipulation.insertThisBefore(contentNode,target.nextSibling,null); else if(contentQuery != null) domtools.QueryDOMManipulation.insertThisBefore(contentQuery,target.nextSibling,domtools.QueryTraversing.next(null));
	return target;
}
domtools.DOMManipulation.remove = function(childToRemove) {
	childToRemove.parentNode.removeChild(childToRemove);
	return childToRemove;
}
domtools.DOMManipulation.empty = function(container) {
	while(container.hasChildNodes()) container.removeChild(container.firstChild);
	return container;
}
domtools.DOMManipulation.prototype = {
	__class__: domtools.DOMManipulation
}
domtools.QueryDOMManipulation = $hxClasses["domtools.QueryDOMManipulation"] = function() { }
domtools.QueryDOMManipulation.__name__ = ["domtools","QueryDOMManipulation"];
domtools.QueryDOMManipulation.append = function(parentCollection,childNode,childCollection) {
	var firstChildUsed = true;
	var $it0 = parentCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var parent = $it0.next();
		childNode = firstChildUsed || childNode == null?childNode:childNode.cloneNode(true);
		childCollection = firstChildUsed || childCollection == null?childCollection:childCollection.clone();
		domtools.DOMManipulation.append(parent,childNode,childCollection);
		firstChildUsed = false;
	}
	return parentCollection;
}
domtools.QueryDOMManipulation.prepend = function(parentCollection,childNode,childCollection) {
	var firstChildUsed = false;
	var $it0 = parentCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var parent = $it0.next();
		childNode = firstChildUsed || childNode == null?childNode:childNode.cloneNode(true);
		childCollection = firstChildUsed || childCollection == null?childCollection:childCollection.clone();
		domtools.DOMManipulation.prepend(parent,childNode,childCollection);
		firstChildUsed = true;
	}
	return parentCollection;
}
domtools.QueryDOMManipulation.appendTo = function(children,parentNode,parentCollection) {
	if(parentNode != null) domtools.DOMManipulation.append(parentNode,null,children); else if(parentCollection != null) domtools.QueryDOMManipulation.append(parentCollection,null,children);
	return children;
}
domtools.QueryDOMManipulation.prependTo = function(children,parentNode,parentCollection) {
	return domtools.QueryDOMManipulation.insertThisBefore(children,parentNode.firstChild,domtools.QueryTraversing.firstChildren(parentCollection));
}
domtools.QueryDOMManipulation.insertThisBefore = function(content,targetNode,targetCollection) {
	if(targetNode != null) {
		var $it0 = content.collection.iterator();
		while( $it0.hasNext() ) {
			var childToAdd = $it0.next();
			domtools.DOMManipulation.insertThisBefore(childToAdd,targetNode);
		}
	} else if(targetCollection != null) {
		var firstChildUsed = false;
		var childCollection = content;
		var $it1 = targetCollection.collection.iterator();
		while( $it1.hasNext() ) {
			var target = $it1.next();
			childCollection = firstChildUsed?childCollection:childCollection.clone();
			domtools.QueryDOMManipulation.insertThisBefore(childCollection,target);
			firstChildUsed = true;
		}
	}
	return content;
}
domtools.QueryDOMManipulation.insertThisAfter = function(content,targetNode,targetCollection) {
	return domtools.QueryDOMManipulation.insertThisBefore(content,targetNode.nextSibling,domtools.QueryTraversing.next(targetCollection));
}
domtools.QueryDOMManipulation.beforeThisInsert = function(target,contentNode,contentCollection) {
	if(contentNode != null) domtools.DOMManipulation.insertThisBefore(contentNode,null,target); else if(contentCollection != null) domtools.QueryDOMManipulation.insertThisBefore(contentCollection,null,target);
	return target;
}
domtools.QueryDOMManipulation.afterThisInsert = function(target,contentNode,contentCollection) {
	if(contentNode != null) domtools.DOMManipulation.insertThisBefore(contentNode,null.nextSibling,target); else if(contentCollection != null) domtools.QueryDOMManipulation.insertThisBefore(contentCollection,null.nextSibling,domtools.QueryTraversing.next(target));
	return target;
}
domtools.QueryDOMManipulation.remove = function(nodesToRemove) {
	var $it0 = nodesToRemove.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.DOMManipulation.remove(node);
	}
	return nodesToRemove;
}
domtools.QueryDOMManipulation.empty = function(containers) {
	var $it0 = containers.collection.iterator();
	while( $it0.hasNext() ) {
		var container = $it0.next();
		while(container.hasChildNodes()) container.removeChild(container.firstChild);
	}
	return containers;
}
domtools.QueryDOMManipulation.prototype = {
	__class__: domtools.QueryDOMManipulation
}
haxe.io.Eof = $hxClasses["haxe.io.Eof"] = function() {
};
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
}
app.project.ProjectAPIProxy = $hxClasses["app.project.ProjectAPIProxy"] = function(c) {
	this._conn = c.resolve("app.project.ProjectAPIService");
};
app.project.ProjectAPIProxy.__name__ = ["app","project","ProjectAPIProxy"];
app.project.ProjectAPIProxy.prototype = {
	_conn: null
	,listProjects: function(cb) {
		this._conn.resolve("listProjects").call([],cb);
	}
	,addProject: function(p,cb) {
		this._conn.resolve("addProject").call([p],cb);
	}
	,updateProject: function(currentProjectName,newProjectDetails,cb) {
		this._conn.resolve("updateProject").call([currentProjectName,newProjectDetails],cb);
	}
	,__class__: app.project.ProjectAPIProxy
}
var hscript = hscript || {}
hscript.Token = $hxClasses["hscript.Token"] = { __ename__ : ["hscript","Token"], __constructs__ : ["TEof","TConst","TId","TOp","TPOpen","TPClose","TBrOpen","TBrClose","TDot","TComma","TSemicolon","TBkOpen","TBkClose","TQuestion","TDoubleDot"] }
hscript.Token.TEof = ["TEof",0];
hscript.Token.TEof.toString = $estr;
hscript.Token.TEof.__enum__ = hscript.Token;
hscript.Token.TConst = function(c) { var $x = ["TConst",1,c]; $x.__enum__ = hscript.Token; $x.toString = $estr; return $x; }
hscript.Token.TId = function(s) { var $x = ["TId",2,s]; $x.__enum__ = hscript.Token; $x.toString = $estr; return $x; }
hscript.Token.TOp = function(s) { var $x = ["TOp",3,s]; $x.__enum__ = hscript.Token; $x.toString = $estr; return $x; }
hscript.Token.TPOpen = ["TPOpen",4];
hscript.Token.TPOpen.toString = $estr;
hscript.Token.TPOpen.__enum__ = hscript.Token;
hscript.Token.TPClose = ["TPClose",5];
hscript.Token.TPClose.toString = $estr;
hscript.Token.TPClose.__enum__ = hscript.Token;
hscript.Token.TBrOpen = ["TBrOpen",6];
hscript.Token.TBrOpen.toString = $estr;
hscript.Token.TBrOpen.__enum__ = hscript.Token;
hscript.Token.TBrClose = ["TBrClose",7];
hscript.Token.TBrClose.toString = $estr;
hscript.Token.TBrClose.__enum__ = hscript.Token;
hscript.Token.TDot = ["TDot",8];
hscript.Token.TDot.toString = $estr;
hscript.Token.TDot.__enum__ = hscript.Token;
hscript.Token.TComma = ["TComma",9];
hscript.Token.TComma.toString = $estr;
hscript.Token.TComma.__enum__ = hscript.Token;
hscript.Token.TSemicolon = ["TSemicolon",10];
hscript.Token.TSemicolon.toString = $estr;
hscript.Token.TSemicolon.__enum__ = hscript.Token;
hscript.Token.TBkOpen = ["TBkOpen",11];
hscript.Token.TBkOpen.toString = $estr;
hscript.Token.TBkOpen.__enum__ = hscript.Token;
hscript.Token.TBkClose = ["TBkClose",12];
hscript.Token.TBkClose.toString = $estr;
hscript.Token.TBkClose.__enum__ = hscript.Token;
hscript.Token.TQuestion = ["TQuestion",13];
hscript.Token.TQuestion.toString = $estr;
hscript.Token.TQuestion.__enum__ = hscript.Token;
hscript.Token.TDoubleDot = ["TDoubleDot",14];
hscript.Token.TDoubleDot.toString = $estr;
hscript.Token.TDoubleDot.__enum__ = hscript.Token;
hscript.Parser = $hxClasses["hscript.Parser"] = function() {
	this.line = 1;
	this.opChars = "+*/-=!><&|^%~";
	this.identChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	var priorities = [["%"],["*","/"],["+","-"],["<<",">>",">>>"],["|","&","^"],["==","!=",">","<",">=","<="],["..."],["&&"],["||"],["=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","|=","&=","^="]];
	this.opPriority = new Hash();
	this.opRightAssoc = new Hash();
	var _g1 = 0, _g = priorities.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g2 = 0, _g3 = priorities[i];
		while(_g2 < _g3.length) {
			var x = _g3[_g2];
			++_g2;
			this.opPriority.set(x,i);
			if(i == 9) this.opRightAssoc.set(x,true);
		}
	}
	this.unops = new Hash();
	var _g = 0, _g1 = ["!","++","--","-","~"];
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		this.unops.set(x,x == "++" || x == "--");
	}
};
hscript.Parser.__name__ = ["hscript","Parser"];
hscript.Parser.prototype = {
	line: null
	,opChars: null
	,identChars: null
	,opPriority: null
	,opRightAssoc: null
	,unops: null
	,allowJSON: null
	,allowTypes: null
	,input: null
	,'char': null
	,ops: null
	,idents: null
	,tokens: null
	,error: function(err,pmin,pmax) {
		throw err;
	}
	,invalidChar: function(c) {
		throw hscript.Error.EInvalidChar(c);
	}
	,parseString: function(s) {
		this.line = 1;
		return this.parse(new haxe.io.StringInput(s));
	}
	,parse: function(s) {
		this.tokens = new haxe.FastList();
		this["char"] = -1;
		this.input = s;
		this.ops = new Array();
		this.idents = new Array();
		var _g1 = 0, _g = this.opChars.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.ops[this.opChars.charCodeAt(i)] = true;
		}
		var _g1 = 0, _g = this.identChars.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.idents[this.identChars.charCodeAt(i)] = true;
		}
		var a = new Array();
		while(true) {
			var tk = this.token();
			if(tk == hscript.Token.TEof) break;
			this.tokens.add(tk);
			a.push(this.parseFullExpr());
		}
		return a.length == 1?a[0]:hscript.Expr.EBlock(a);
	}
	,unexpected: function(tk) {
		throw hscript.Error.EUnexpected(this.tokenString(tk));
		return null;
	}
	,push: function(tk) {
		this.tokens.add(tk);
	}
	,ensure: function(tk) {
		var t = this.token();
		if(t != tk) this.unexpected(t);
	}
	,expr: function(e) {
		return e;
	}
	,pmin: function(e) {
		return 0;
	}
	,pmax: function(e) {
		return 0;
	}
	,mk: function(e,pmin,pmax) {
		return e;
	}
	,isBlock: function(e) {
		return (function($this) {
			var $r;
			var $e = (e);
			switch( $e[1] ) {
			case 4:
			case 21:
				$r = true;
				break;
			case 14:
				var e1 = $e[3];
				$r = $this.isBlock(e1);
				break;
			case 2:
				var e1 = $e[4];
				$r = e1 != null && $this.isBlock(e1);
				break;
			case 9:
				var e2 = $e[4], e1 = $e[3];
				$r = e2 != null?$this.isBlock(e2):$this.isBlock(e1);
				break;
			case 6:
				var e1 = $e[4];
				$r = $this.isBlock(e1);
				break;
			case 7:
				var e1 = $e[4], prefix = $e[3];
				$r = !prefix && $this.isBlock(e1);
				break;
			case 10:
				var e1 = $e[3];
				$r = $this.isBlock(e1);
				break;
			case 11:
				var e1 = $e[4];
				$r = $this.isBlock(e1);
				break;
			case 15:
				var e1 = $e[2];
				$r = e1 != null && $this.isBlock(e1);
				break;
			default:
				$r = false;
			}
			return $r;
		}(this));
	}
	,parseFullExpr: function() {
		var e = this.parseExpr();
		var tk = this.token();
		if(tk != hscript.Token.TSemicolon && tk != hscript.Token.TEof) {
			if(this.isBlock(e)) this.tokens.add(tk); else this.unexpected(tk);
		}
		return e;
	}
	,parseObject: function(p1) {
		var fl = new Array();
		try {
			while(true) {
				var tk = this.token();
				var id = null;
				var $e = (tk);
				switch( $e[1] ) {
				case 2:
					var i = $e[2];
					id = i;
					break;
				case 1:
					var c = $e[2];
					if(!this.allowJSON) this.unexpected(tk);
					var $e = (c);
					switch( $e[1] ) {
					case 2:
						var s = $e[2];
						id = s;
						break;
					default:
						this.unexpected(tk);
					}
					break;
				case 7:
					throw "__break__";
					break;
				default:
					this.unexpected(tk);
				}
				this.ensure(hscript.Token.TDoubleDot);
				fl.push({ name : id, e : this.parseExpr()});
				tk = this.token();
				switch( (tk)[1] ) {
				case 7:
					throw "__break__";
					break;
				case 9:
					break;
				default:
					this.unexpected(tk);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return this.parseExprNext(hscript.Expr.EObject(fl));
	}
	,parseExpr: function() {
		var tk = this.token();
		var $e = (tk);
		switch( $e[1] ) {
		case 2:
			var id = $e[2];
			var e = this.parseStructure(id);
			if(e == null) e = hscript.Expr.EIdent(id);
			return this.parseExprNext(e);
		case 1:
			var c = $e[2];
			return this.parseExprNext(hscript.Expr.EConst(c));
		case 4:
			var e = this.parseExpr();
			this.ensure(hscript.Token.TPClose);
			return this.parseExprNext(hscript.Expr.EParent(e));
		case 6:
			tk = this.token();
			var $e = (tk);
			switch( $e[1] ) {
			case 7:
				return this.parseExprNext(hscript.Expr.EObject([]));
			case 2:
				var id = $e[2];
				var tk2 = this.token();
				this.tokens.add(tk2);
				this.tokens.add(tk);
				switch( (tk2)[1] ) {
				case 14:
					return this.parseExprNext(this.parseObject(0));
				default:
				}
				break;
			case 1:
				var c = $e[2];
				if(this.allowJSON) {
					switch( (c)[1] ) {
					case 2:
						var tk2 = this.token();
						this.tokens.add(tk2);
						this.tokens.add(tk);
						switch( (tk2)[1] ) {
						case 14:
							return this.parseExprNext(this.parseObject(0));
						default:
						}
						break;
					default:
						this.tokens.add(tk);
					}
				} else this.tokens.add(tk);
				break;
			default:
				this.tokens.add(tk);
			}
			var a = new Array();
			while(true) {
				a.push(this.parseFullExpr());
				tk = this.token();
				if(tk == hscript.Token.TBrClose) break;
				this.tokens.add(tk);
			}
			return hscript.Expr.EBlock(a);
		case 3:
			var op = $e[2];
			if(this.unops.exists(op)) return this.makeUnop(op,this.parseExpr());
			return this.unexpected(tk);
		case 11:
			var a = new Array();
			tk = this.token();
			while(tk != hscript.Token.TBkClose) {
				this.tokens.add(tk);
				a.push(this.parseExpr());
				tk = this.token();
				if(tk == hscript.Token.TComma) tk = this.token();
			}
			return this.parseExprNext(hscript.Expr.EArrayDecl(a));
		default:
			return this.unexpected(tk);
		}
	}
	,makeUnop: function(op,e) {
		return (function($this) {
			var $r;
			var $e = (e);
			switch( $e[1] ) {
			case 6:
				var e2 = $e[4], e1 = $e[3], bop = $e[2];
				$r = hscript.Expr.EBinop(bop,$this.makeUnop(op,e1),e2);
				break;
			case 22:
				var e3 = $e[4], e2 = $e[3], e1 = $e[2];
				$r = hscript.Expr.ETernary($this.makeUnop(op,e1),e2,e3);
				break;
			default:
				$r = hscript.Expr.EUnop(op,true,e);
			}
			return $r;
		}(this));
	}
	,makeBinop: function(op,e1,e) {
		return (function($this) {
			var $r;
			var $e = (e);
			switch( $e[1] ) {
			case 6:
				var e3 = $e[4], e2 = $e[3], op2 = $e[2];
				$r = $this.opPriority.get(op) <= $this.opPriority.get(op2) && !$this.opRightAssoc.exists(op)?hscript.Expr.EBinop(op2,$this.makeBinop(op,e1,e2),e3):hscript.Expr.EBinop(op,e1,e);
				break;
			case 22:
				var e4 = $e[4], e3 = $e[3], e2 = $e[2];
				$r = $this.opRightAssoc.exists(op)?hscript.Expr.EBinop(op,e1,e):hscript.Expr.ETernary($this.makeBinop(op,e1,e2),e3,e4);
				break;
			default:
				$r = hscript.Expr.EBinop(op,e1,e);
			}
			return $r;
		}(this));
	}
	,parseStructure: function(id) {
		return (function($this) {
			var $r;
			switch(id) {
			case "if":
				$r = (function($this) {
					var $r;
					var cond = $this.parseExpr();
					var e1 = $this.parseExpr();
					var e2 = null;
					var semic = false;
					var tk = $this.token();
					if(tk == hscript.Token.TSemicolon) {
						semic = true;
						tk = $this.token();
					}
					if(Type.enumEq(tk,hscript.Token.TId("else"))) e2 = $this.parseExpr(); else {
						$this.tokens.add(tk);
						if(semic) $this.tokens.add(hscript.Token.TSemicolon);
					}
					$r = hscript.Expr.EIf(cond,e1,e2);
					return $r;
				}($this));
				break;
			case "var":
				$r = (function($this) {
					var $r;
					var tk = $this.token();
					var ident = null;
					var $e = (tk);
					switch( $e[1] ) {
					case 2:
						var id1 = $e[2];
						ident = id1;
						break;
					default:
						$this.unexpected(tk);
					}
					tk = $this.token();
					var t = null;
					if(tk == hscript.Token.TDoubleDot && $this.allowTypes) {
						t = $this.parseType();
						tk = $this.token();
					}
					var e = null;
					if(Type.enumEq(tk,hscript.Token.TOp("="))) e = $this.parseExpr(); else $this.tokens.add(tk);
					$r = hscript.Expr.EVar(ident,t,e);
					return $r;
				}($this));
				break;
			case "while":
				$r = (function($this) {
					var $r;
					var econd = $this.parseExpr();
					var e = $this.parseExpr();
					$r = hscript.Expr.EWhile(econd,e);
					return $r;
				}($this));
				break;
			case "for":
				$r = (function($this) {
					var $r;
					$this.ensure(hscript.Token.TPOpen);
					var tk = $this.token();
					var vname = null;
					var $e = (tk);
					switch( $e[1] ) {
					case 2:
						var id1 = $e[2];
						vname = id1;
						break;
					default:
						$this.unexpected(tk);
					}
					tk = $this.token();
					if(!Type.enumEq(tk,hscript.Token.TId("in"))) $this.unexpected(tk);
					var eiter = $this.parseExpr();
					$this.ensure(hscript.Token.TPClose);
					var e = $this.parseExpr();
					$r = hscript.Expr.EFor(vname,eiter,e);
					return $r;
				}($this));
				break;
			case "break":
				$r = hscript.Expr.EBreak;
				break;
			case "continue":
				$r = hscript.Expr.EContinue;
				break;
			case "else":
				$r = $this.unexpected(hscript.Token.TId(id));
				break;
			case "function":
				$r = (function($this) {
					var $r;
					var tk = $this.token();
					var name = null;
					var $e = (tk);
					switch( $e[1] ) {
					case 2:
						var id1 = $e[2];
						name = id1;
						break;
					default:
						$this.tokens.add(tk);
					}
					$this.ensure(hscript.Token.TPOpen);
					var args = new Array();
					tk = $this.token();
					if(tk != hscript.Token.TPClose) try {
						while(true) {
							var name1 = null;
							var $e = (tk);
							switch( $e[1] ) {
							case 2:
								var id1 = $e[2];
								name1 = id1;
								break;
							default:
								$this.unexpected(tk);
							}
							tk = $this.token();
							var t = null;
							if(tk == hscript.Token.TDoubleDot && $this.allowTypes) {
								t = $this.parseType();
								tk = $this.token();
							}
							args.push({ name : name1, t : t});
							switch( (tk)[1] ) {
							case 9:
								break;
							case 5:
								throw "__break__";
								break;
							default:
								$this.unexpected(tk);
							}
							tk = $this.token();
						}
					} catch( e ) { if( e != "__break__" ) throw e; }
					var ret = null;
					if($this.allowTypes) {
						tk = $this.token();
						if(tk != hscript.Token.TDoubleDot) $this.tokens.add(tk); else ret = $this.parseType();
					}
					var body = $this.parseExpr();
					$r = hscript.Expr.EFunction(args,body,name,ret);
					return $r;
				}($this));
				break;
			case "return":
				$r = (function($this) {
					var $r;
					var tk = $this.token();
					$this.tokens.add(tk);
					var e = tk == hscript.Token.TSemicolon?null:$this.parseExpr();
					$r = hscript.Expr.EReturn(e);
					return $r;
				}($this));
				break;
			case "new":
				$r = (function($this) {
					var $r;
					var a = new Array();
					var tk = $this.token();
					var $e = (tk);
					switch( $e[1] ) {
					case 2:
						var id1 = $e[2];
						a.push(id1);
						break;
					default:
						$this.unexpected(tk);
					}
					try {
						while(true) {
							tk = $this.token();
							switch( (tk)[1] ) {
							case 8:
								tk = $this.token();
								var $e = (tk);
								switch( $e[1] ) {
								case 2:
									var id1 = $e[2];
									a.push(id1);
									break;
								default:
									$this.unexpected(tk);
								}
								break;
							case 4:
								throw "__break__";
								break;
							default:
								$this.unexpected(tk);
							}
						}
					} catch( e ) { if( e != "__break__" ) throw e; }
					var args = $this.parseExprList(hscript.Token.TPClose);
					$r = hscript.Expr.ENew(a.join("."),args);
					return $r;
				}($this));
				break;
			case "throw":
				$r = (function($this) {
					var $r;
					var e = $this.parseExpr();
					$r = hscript.Expr.EThrow(e);
					return $r;
				}($this));
				break;
			case "try":
				$r = (function($this) {
					var $r;
					var e = $this.parseExpr();
					var tk = $this.token();
					if(!Type.enumEq(tk,hscript.Token.TId("catch"))) $this.unexpected(tk);
					$this.ensure(hscript.Token.TPOpen);
					tk = $this.token();
					var vname = (function($this) {
						var $r;
						var $e = (tk);
						switch( $e[1] ) {
						case 2:
							var id1 = $e[2];
							$r = id1;
							break;
						default:
							$r = $this.unexpected(tk);
						}
						return $r;
					}($this));
					$this.ensure(hscript.Token.TDoubleDot);
					var t = null;
					if($this.allowTypes) t = $this.parseType(); else {
						tk = $this.token();
						if(!Type.enumEq(tk,hscript.Token.TId("Dynamic"))) $this.unexpected(tk);
					}
					$this.ensure(hscript.Token.TPClose);
					var ec = $this.parseExpr();
					$r = hscript.Expr.ETry(e,vname,t,ec);
					return $r;
				}($this));
				break;
			default:
				$r = null;
			}
			return $r;
		}(this));
	}
	,parseExprNext: function(e1) {
		var tk = this.token();
		var $e = (tk);
		switch( $e[1] ) {
		case 3:
			var op = $e[2];
			if(this.unops.get(op)) {
				if(this.isBlock(e1) || (function($this) {
					var $r;
					switch( (e1)[1] ) {
					case 3:
						$r = true;
						break;
					default:
						$r = false;
					}
					return $r;
				}(this))) {
					this.tokens.add(tk);
					return e1;
				}
				return this.parseExprNext(hscript.Expr.EUnop(op,false,e1));
			}
			return this.makeBinop(op,e1,this.parseExpr());
		case 8:
			tk = this.token();
			var field = null;
			var $e = (tk);
			switch( $e[1] ) {
			case 2:
				var id = $e[2];
				field = id;
				break;
			default:
				this.unexpected(tk);
			}
			return this.parseExprNext(hscript.Expr.EField(e1,field));
		case 4:
			return this.parseExprNext(hscript.Expr.ECall(e1,this.parseExprList(hscript.Token.TPClose)));
		case 11:
			var e2 = this.parseExpr();
			this.ensure(hscript.Token.TBkClose);
			return this.parseExprNext(hscript.Expr.EArray(e1,e2));
		case 13:
			var e2 = this.parseExpr();
			this.ensure(hscript.Token.TDoubleDot);
			var e3 = this.parseExpr();
			return hscript.Expr.ETernary(e1,e2,e3);
		default:
			this.tokens.add(tk);
			return e1;
		}
	}
	,parseType: function() {
		var t = this.token();
		var $e = (t);
		switch( $e[1] ) {
		case 2:
			var v = $e[2];
			var path = [v];
			while(true) {
				t = this.token();
				if(t != hscript.Token.TDot) break;
				t = this.token();
				var $e = (t);
				switch( $e[1] ) {
				case 2:
					var v1 = $e[2];
					path.push(v1);
					break;
				default:
					this.unexpected(t);
				}
			}
			var params = null;
			var $e = (t);
			switch( $e[1] ) {
			case 3:
				var op = $e[2];
				if(op == "<") {
					params = [];
					try {
						while(true) {
							params.push(this.parseType());
							t = this.token();
							var $e = (t);
							switch( $e[1] ) {
							case 9:
								continue;
								break;
							case 3:
								var op1 = $e[2];
								if(op1 == ">") throw "__break__";
								break;
							default:
							}
							this.unexpected(t);
						}
					} catch( e ) { if( e != "__break__" ) throw e; }
				}
				break;
			default:
				this.tokens.add(t);
			}
			return this.parseTypeNext(hscript.CType.CTPath(path,params));
		case 4:
			var t1 = this.parseType();
			this.ensure(hscript.Token.TPClose);
			return this.parseTypeNext(hscript.CType.CTParent(t1));
		case 6:
			var fields = [];
			try {
				while(true) {
					t = this.token();
					var $e = (t);
					switch( $e[1] ) {
					case 7:
						throw "__break__";
						break;
					case 2:
						var name = $e[2];
						this.ensure(hscript.Token.TDoubleDot);
						fields.push({ name : name, t : this.parseType()});
						t = this.token();
						switch( (t)[1] ) {
						case 9:
							break;
						case 7:
							throw "__break__";
							break;
						default:
							this.unexpected(t);
						}
						break;
					default:
						this.unexpected(t);
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			return this.parseTypeNext(hscript.CType.CTAnon(fields));
		default:
			return this.unexpected(t);
		}
	}
	,parseTypeNext: function(t) {
		var tk = this.token();
		var $e = (tk);
		switch( $e[1] ) {
		case 3:
			var op = $e[2];
			if(op != "->") {
				this.tokens.add(tk);
				return t;
			}
			break;
		default:
			this.tokens.add(tk);
			return t;
		}
		var t2 = this.parseType();
		var $e = (t2);
		switch( $e[1] ) {
		case 1:
			var ret = $e[3], args = $e[2];
			args.unshift(t);
			return t2;
		default:
			return hscript.CType.CTFun([t],t2);
		}
	}
	,parseExprList: function(etk) {
		var args = new Array();
		var tk = this.token();
		if(tk == etk) return args;
		this.tokens.add(tk);
		try {
			while(true) {
				args.push(this.parseExpr());
				tk = this.token();
				switch( (tk)[1] ) {
				case 9:
					break;
				default:
					if(tk == etk) throw "__break__";
					this.unexpected(tk);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return args;
	}
	,incPos: function() {
	}
	,readChar: function() {
		null;
		return (function($this) {
			var $r;
			try {
				$r = $this.input.readByte();
			} catch( e ) {
				$r = 0;
			}
			return $r;
		}(this));
	}
	,readString: function(until) {
		var c;
		var b = new haxe.io.BytesOutput();
		var esc = false;
		var old = this.line;
		var s = this.input;
		while(true) {
			try {
				null;
				c = s.readByte();
			} catch( e ) {
				this.line = old;
				throw hscript.Error.EUnterminatedString;
			}
			if(esc) {
				esc = false;
				switch(c) {
				case 110:
					b.writeByte(10);
					break;
				case 114:
					b.writeByte(13);
					break;
				case 116:
					b.writeByte(9);
					break;
				case 39:case 34:case 92:
					b.writeByte(c);
					break;
				case 47:
					if(this.allowJSON) b.writeByte(c); else this.invalidChar(c);
					break;
				case 117:
					if(!this.allowJSON) throw this.invalidChar(c);
					var code;
					try {
						null;
						null;
						null;
						null;
						code = s.readString(4);
					} catch( e ) {
						this.line = old;
						throw hscript.Error.EUnterminatedString;
					}
					var k = 0;
					var _g = 0;
					while(_g < 4) {
						var i = _g++;
						k <<= 4;
						var $char = code.charCodeAt(i);
						switch($char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							k += $char - 48;
							break;
						case 65:case 66:case 67:case 68:case 69:case 70:
							k += $char - 55;
							break;
						case 97:case 98:case 99:case 100:case 101:case 102:
							k += $char - 87;
							break;
						default:
							this.invalidChar($char);
						}
					}
					if(k <= 127) b.writeByte(k); else if(k <= 2047) {
						b.writeByte(192 | k >> 6);
						b.writeByte(128 | k & 63);
					} else {
						b.writeByte(224 | k >> 12);
						b.writeByte(128 | k >> 6 & 63);
						b.writeByte(128 | k & 63);
					}
					break;
				default:
					this.invalidChar(c);
				}
			} else if(c == 92) esc = true; else if(c == until) break; else {
				if(c == 10) this.line++;
				b.writeByte(c);
			}
		}
		return b.getBytes().toString();
	}
	,token: function() {
		if(!(this.tokens.head == null)) return this.tokens.pop();
		var $char;
		if(this["char"] < 0) $char = this.readChar(); else {
			$char = this["char"];
			this["char"] = -1;
		}
		while(true) {
			switch($char) {
			case 0:
				return hscript.Token.TEof;
			case 32:case 9:case 13:
				break;
			case 10:
				this.line++;
				break;
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				var n = ($char - 48) * 1.0;
				var exp = 0;
				while(true) {
					$char = this.readChar();
					exp *= 10;
					switch($char) {
					case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
						n = n * 10 + ($char - 48);
						break;
					case 46:
						if(exp > 0) {
							if(exp == 10 && this.readChar() == 46) {
								this.tokens.add(hscript.Token.TOp("..."));
								var i = Std["int"](n);
								return hscript.Token.TConst(i == n?hscript.Const.CInt(i):hscript.Const.CFloat(n));
							}
							this.invalidChar($char);
						}
						exp = 1;
						break;
					case 120:
						if(n > 0 || exp > 0) this.invalidChar($char);
						var n1 = 0 | 0;
						while(true) {
							$char = this.readChar();
							switch($char) {
							case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
								n1 = (n1 << 4) + ($char - 48) | 0;
								break;
							case 65:case 66:case 67:case 68:case 69:case 70:
								n1 = (n1 << 4) + ($char - 55) | 0;
								break;
							case 97:case 98:case 99:case 100:case 101:case 102:
								n1 = (n1 << 4) + ($char - 87) | 0;
								break;
							default:
								this["char"] = $char;
								var v = (function($this) {
									var $r;
									try {
										$r = hscript.Const.CInt((function($this) {
											var $r;
											if((n1 >> 30 & 1) != n1 >>> 31) throw "Overflow " + n1;
											$r = n1;
											return $r;
										}($this)));
									} catch( e ) {
										$r = hscript.Const.CInt32(n1);
									}
									return $r;
								}(this));
								return hscript.Token.TConst(v);
							}
						}
						break;
					default:
						this["char"] = $char;
						var i = Std["int"](n);
						return hscript.Token.TConst(exp > 0?hscript.Const.CFloat(n * 10 / exp):i == n?hscript.Const.CInt(i):hscript.Const.CFloat(n));
					}
				}
				break;
			case 59:
				return hscript.Token.TSemicolon;
			case 40:
				return hscript.Token.TPOpen;
			case 41:
				return hscript.Token.TPClose;
			case 44:
				return hscript.Token.TComma;
			case 46:
				$char = this.readChar();
				switch($char) {
				case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
					var n = $char - 48;
					var exp = 1;
					while(true) {
						$char = this.readChar();
						exp *= 10;
						switch($char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							n = n * 10 + ($char - 48);
							break;
						default:
							this["char"] = $char;
							return hscript.Token.TConst(hscript.Const.CFloat(n / exp));
						}
					}
					break;
				case 46:
					$char = this.readChar();
					if($char != 46) this.invalidChar($char);
					return hscript.Token.TOp("...");
				default:
					this["char"] = $char;
					return hscript.Token.TDot;
				}
				break;
			case 123:
				return hscript.Token.TBrOpen;
			case 125:
				return hscript.Token.TBrClose;
			case 91:
				return hscript.Token.TBkOpen;
			case 93:
				return hscript.Token.TBkClose;
			case 39:
				return hscript.Token.TConst(hscript.Const.CString(this.readString(39)));
			case 34:
				return hscript.Token.TConst(hscript.Const.CString(this.readString(34)));
			case 63:
				return hscript.Token.TQuestion;
			case 58:
				return hscript.Token.TDoubleDot;
			default:
				if(this.ops[$char]) {
					var op = String.fromCharCode($char);
					while(true) {
						$char = this.readChar();
						if(!this.ops[$char]) {
							if(op.charCodeAt(0) == 47) return this.tokenComment(op,$char);
							this["char"] = $char;
							return hscript.Token.TOp(op);
						}
						op += String.fromCharCode($char);
					}
				}
				if(this.idents[$char]) {
					var id = String.fromCharCode($char);
					while(true) {
						$char = this.readChar();
						if(!this.idents[$char]) {
							this["char"] = $char;
							return hscript.Token.TId(id);
						}
						id += String.fromCharCode($char);
					}
				}
				this.invalidChar($char);
			}
			$char = this.readChar();
		}
		return null;
	}
	,tokenComment: function(op,$char) {
		var c = op.charCodeAt(1);
		var s = this.input;
		if(c == 47) {
			try {
				while($char != 10 && $char != 13) {
					null;
					$char = s.readByte();
				}
				this["char"] = $char;
			} catch( e ) {
			}
			return this.token();
		}
		if(c == 42) {
			var old = this.line;
			try {
				while(true) {
					while($char != 42) {
						if($char == 10) this.line++;
						null;
						$char = s.readByte();
					}
					null;
					$char = s.readByte();
					if($char == 47) break;
				}
			} catch( e ) {
				this.line = old;
				throw hscript.Error.EUnterminatedComment;
			}
			return this.token();
		}
		this["char"] = $char;
		return hscript.Token.TOp(op);
	}
	,constString: function(c) {
		return (function($this) {
			var $r;
			var $e = (c);
			switch( $e[1] ) {
			case 0:
				var v = $e[2];
				$r = Std.string(v);
				break;
			case 3:
				var v = $e[2];
				$r = Std.string(v);
				break;
			case 1:
				var f = $e[2];
				$r = Std.string(f);
				break;
			case 2:
				var s = $e[2];
				$r = s;
				break;
			}
			return $r;
		}(this));
	}
	,tokenString: function(t) {
		return (function($this) {
			var $r;
			var $e = (t);
			switch( $e[1] ) {
			case 0:
				$r = "<eof>";
				break;
			case 1:
				var c = $e[2];
				$r = $this.constString(c);
				break;
			case 2:
				var s = $e[2];
				$r = s;
				break;
			case 3:
				var s = $e[2];
				$r = s;
				break;
			case 4:
				$r = "(";
				break;
			case 5:
				$r = ")";
				break;
			case 6:
				$r = "{";
				break;
			case 7:
				$r = "}";
				break;
			case 8:
				$r = ".";
				break;
			case 9:
				$r = ",";
				break;
			case 10:
				$r = ";";
				break;
			case 11:
				$r = "[";
				break;
			case 12:
				$r = "]";
				break;
			case 13:
				$r = "?";
				break;
			case 14:
				$r = ":";
				break;
			}
			return $r;
		}(this));
	}
	,__class__: hscript.Parser
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) return true;
	}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		return f(a);
	};
}
Reflect.prototype = {
	__class__: Reflect
}
var erazor = erazor || {}
erazor.Template = $hxClasses["erazor.Template"] = function(template) {
	this.template = template;
};
erazor.Template.__name__ = ["erazor","Template"];
erazor.Template.prototype = {
	template: null
	,variables: null
	,execute: function(content) {
		var buffer = new StringBuf();
		var parsedBlocks = new erazor.Parser().parse(this.template);
		var script = new erazor.ScriptBuilder("__b__").build(parsedBlocks);
		var parser = new hscript.Parser();
		var program = parser.parseString(script);
		var interp = new erazor.hscript.EnhancedInterp();
		this.variables = interp.variables;
		var bufferStack = [];
		this.setInterpreterVars(interp,content);
		interp.variables.set("__b__",buffer);
		interp.variables.set("__string_buf__",function(current) {
			bufferStack.push(current);
			return new StringBuf();
		});
		interp.variables.set("__restore_buf__",function() {
			return bufferStack.pop();
		});
		interp.execute(program);
		return buffer.b.join("");
	}
	,setInterpreterVars: function(interp,content) {
		if(Std["is"](content,Hash)) {
			var hash = content;
			var $it0 = hash.keys();
			while( $it0.hasNext() ) {
				var field = $it0.next();
				interp.variables.set(field,hash.get(field));
			}
		} else {
			var _g = 0, _g1 = Reflect.fields(content);
			while(_g < _g1.length) {
				var field = _g1[_g];
				++_g;
				interp.variables.set(field,Reflect.field(content,field));
			}
		}
	}
	,__class__: erazor.Template
}
if(!app.author) app.author = {}
app.author.AuthorController = $hxClasses["app.author.AuthorController"] = function() {
	this.view = new app.author.AuthorView(this);
	domtools.QueryDOMManipulation.append(new domtools.Query("#controllerarea"),null,this.view);
};
app.author.AuthorController.__name__ = ["app","author","AuthorController"];
app.author.AuthorController.prototype = {
	view: null
	,__class__: app.author.AuthorController
}
haxe.FastCell = $hxClasses["haxe.FastCell"] = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
haxe.FastCell.__name__ = ["haxe","FastCell"];
haxe.FastCell.prototype = {
	elt: null
	,next: null
	,__class__: haxe.FastCell
}
haxe.FastList = $hxClasses["haxe.FastList"] = function() {
};
haxe.FastList.__name__ = ["haxe","FastList"];
haxe.FastList.prototype = {
	head: null
	,add: function(item) {
		this.head = new haxe.FastCell(item,this.head);
	}
	,first: function() {
		return this.head == null?null:this.head.elt;
	}
	,pop: function() {
		var k = this.head;
		if(k == null) return null; else {
			this.head = k.next;
			return k.elt;
		}
	}
	,isEmpty: function() {
		return this.head == null;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.head;
		while(l != null) {
			if(l.elt == v) {
				if(prev == null) this.head = l.next; else prev.next = l.next;
				break;
			}
			prev = l;
			l = l.next;
		}
		return l != null;
	}
	,iterator: function() {
		var l = this.head;
		return { hasNext : function() {
			return l != null;
		}, next : function() {
			var k = l;
			l = k.next;
			return k.elt;
		}};
	}
	,toString: function() {
		var a = new Array();
		var l = this.head;
		while(l != null) {
			a.push(l.elt);
			l = l.next;
		}
		return "{" + a.join(",") + "}";
	}
	,__class__: haxe.FastList
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIter
}
domtools.Traversing = $hxClasses["domtools.Traversing"] = function() { }
domtools.Traversing.__name__ = ["domtools","Traversing"];
domtools.Traversing.children = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new domtools.Query();
	if(domtools.ElementManipulation.isElement(node)) children.addNodeList(node.childNodes,elementsOnly);
	return children;
}
domtools.Traversing.firstChildren = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var firstChild = null;
	if(domtools.ElementManipulation.isElement(node)) {
		var e = node.firstChild;
		while(elementsOnly == true && e != null && domtools.ElementManipulation.isElement(e) == false) e = e.nextSibling;
		if(e != null) firstChild = e;
	}
	return firstChild;
}
domtools.Traversing.lastChildren = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var lastChild = null;
	if(domtools.ElementManipulation.isElement(node)) {
		var e = node.lastChild;
		while(elementsOnly == true && e != null && domtools.ElementManipulation.isElement(e) == false) e = e.previousSibling;
		if(e != null) lastChild = e;
	}
	return lastChild;
}
domtools.Traversing.parent = function(node) {
	return node.parentNode != null?node.parentNode:null;
}
domtools.Traversing.ancestors = function(node) {
	var ancestors = new domtools.Query();
	{
		ancestors.collection.push(domtools.Traversing.parent(node));
		ancestors;
	}
	if(ancestors.collection.length > 0) ancestors.addCollection(domtools.QueryTraversing.parent(ancestors));
	return ancestors;
}
domtools.Traversing.next = function(node) {
	return node.nextSibling != null?node.nextSibling:null;
}
domtools.Traversing.prev = function(node) {
	return node.previousSibling != null?node.previousSibling:null;
}
domtools.Traversing.find = function(node,selector) {
	var newQuery = new domtools.Query();
	if(domtools.ElementManipulation.isElement(node)) {
		var element = node;
		newQuery.addNodeList(element.querySelectorAll(selector));
	}
	return newQuery;
}
domtools.Traversing.prototype = {
	__class__: domtools.Traversing
}
domtools.QueryTraversing = $hxClasses["domtools.QueryTraversing"] = function() { }
domtools.QueryTraversing.__name__ = ["domtools","QueryTraversing"];
domtools.QueryTraversing.children = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(domtools.ElementManipulation.isElement(node)) children.addNodeList(node.childNodes,elementsOnly);
	}
	return children;
}
domtools.QueryTraversing.firstChildren = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(domtools.ElementManipulation.isElement(node)) {
			var e = node.firstChild;
			while(elementsOnly == true && e != null && domtools.ElementManipulation.isElement(e) == false) e = e.nextSibling;
			if(e != null) {
				children.collection.push(e);
				children;
			}
		}
	}
	return children;
}
domtools.QueryTraversing.lastChildren = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(domtools.ElementManipulation.isElement(node)) {
			var e = node.lastChild;
			while(elementsOnly == true && e != null && domtools.ElementManipulation.isElement(e) == false) e = e.previousSibling;
			if(e != null) {
				children.collection.push(e);
				children;
			}
		}
	}
	return children;
}
domtools.QueryTraversing.parent = function(query) {
	var parents = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(node.parentNode != null) {
			parents.collection.push(node.parentNode);
			parents;
		}
	}
	return parents;
}
domtools.QueryTraversing.ancestors = function(query) {
	var ancestors = domtools.QueryTraversing.parent(query);
	if(ancestors.collection.length > 0) ancestors.addCollection(domtools.QueryTraversing.parent(ancestors));
	return ancestors;
}
domtools.QueryTraversing.next = function(query) {
	var siblings = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		var sibling = node.nextSibling;
		if(sibling != null) {
			siblings.collection.push(sibling);
			siblings;
		}
	}
	return siblings;
}
domtools.QueryTraversing.prev = function(query) {
	var siblings = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		var sibling = node.previousSibling;
		if(sibling != null) {
			siblings.collection.push(sibling);
			siblings;
		}
	}
	return siblings;
}
domtools.QueryTraversing.find = function(query,selector) {
	var newQuery = new domtools.Query();
	var $it0 = query.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		if(domtools.ElementManipulation.isElement(node)) {
			var element = node;
			newQuery.addNodeList(element.querySelectorAll(selector));
		}
	}
	return newQuery;
}
domtools.QueryTraversing.prototype = {
	__class__: domtools.QueryTraversing
}
haxe.remoting.HttpAsyncConnection = $hxClasses["haxe.remoting.HttpAsyncConnection"] = function(data,path) {
	this.__data = data;
	this.__path = path;
};
haxe.remoting.HttpAsyncConnection.__name__ = ["haxe","remoting","HttpAsyncConnection"];
haxe.remoting.HttpAsyncConnection.__interfaces__ = [haxe.remoting.AsyncConnection];
haxe.remoting.HttpAsyncConnection.urlConnect = function(url) {
	return new haxe.remoting.HttpAsyncConnection({ url : url, error : function(e) {
		throw e;
	}},[]);
}
haxe.remoting.HttpAsyncConnection.prototype = {
	__data: null
	,__path: null
	,resolve: function(name) {
		var c = new haxe.remoting.HttpAsyncConnection(this.__data,this.__path.copy());
		c.__path.push(name);
		return c;
	}
	,setErrorHandler: function(h) {
		this.__data.error = h;
	}
	,call: function(params,onResult) {
		var h = new haxe.Http(this.__data.url);
		var s = new haxe.Serializer();
		s.serialize(this.__path);
		s.serialize(params);
		h.setHeader("X-Haxe-Remoting","1");
		h.setParameter("__x",s.toString());
		var error = this.__data.error;
		h.onData = function(response) {
			var ok = true;
			var ret;
			try {
				if(response.substr(0,3) != "hxr") throw "Invalid response : '" + response + "'";
				var s1 = new haxe.Unserializer(response.substr(3));
				ret = s1.unserialize();
			} catch( err ) {
				ret = null;
				ok = false;
				error(err);
			}
			if(ok && onResult != null) onResult(ret);
		};
		h.onError = error;
		h.request(true);
	}
	,__class__: haxe.remoting.HttpAsyncConnection
}
client.Client = $hxClasses["client.Client"] = function() { }
client.Client.__name__ = ["client","Client"];
client.Client.notifications = null;
client.Client.scheduler = null;
client.Client.ui = null;
client.Client.projectController = null;
client.Client.videoController = null;
client.Client.copyController = null;
client.Client.editController = null;
client.Client.slideController = null;
client.Client.authorController = null;
client.Client.main = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.window.onload = client.Client.ready;
	client.Client.initialiseAPI();
}
client.Client.ready = function(e) {
	client.Client.ui = new client.Interface();
	client.Client.projectController = new app.project.ProjectController();
	client.Client.videoController = new app.video.VideoController();
	client.Client.copyController = new app.copy.CopyController();
	client.Client.editController = new app.edit.EditController();
	client.Client.slideController = new app.slide.SlideController();
	client.Client.authorController = new app.author.AuthorController();
}
client.Client.initialiseAPI = function() {
	client.Client.conn.setErrorHandler(function(err) {
		haxe.Log.trace("Error : " + err,{ fileName : "Client.hx", lineNumber : 55, className : "client.Client", methodName : "initialiseAPI"});
	});
	client.Client.notifications = new server.api.NotificationsProxy(client.Client.conn);
	client.Client.scheduler = new server.api.SchedulerProxy(client.Client.conn);
}
client.Client.prototype = {
	__class__: client.Client
}
app.project.ProjectController = $hxClasses["app.project.ProjectController"] = function() {
	this.view = new app.project.ProjectView(this);
	domtools.QueryDOMManipulation.append(new domtools.Query("#controllerarea"),null,this.view);
	this.listProjects();
};
app.project.ProjectController.__name__ = ["app","project","ProjectController"];
app.project.ProjectController.prototype = {
	view: null
	,listProjects: function() {
		var me = this;
		app.project.ProjectController.projectAPI.listProjects(function(a) {
			var _g = 0;
			while(_g < a.length) {
				var project = a[_g];
				++_g;
				me.view.addProject(project);
			}
		});
	}
	,__class__: app.project.ProjectController
}
hscript.Interp = $hxClasses["hscript.Interp"] = function() {
	this.locals = new Hash();
	this.declared = new Array();
	this.variables = new Hash();
	this.variables.set("null",null);
	this.variables.set("true",true);
	this.variables.set("false",false);
	this.variables.set("trace",function(e) {
		haxe.Log.trace(Std.string(e),{ fileName : "hscript", lineNumber : 0});
	});
	this.initOps();
};
hscript.Interp.__name__ = ["hscript","Interp"];
hscript.Interp.prototype = {
	variables: null
	,locals: null
	,binops: null
	,declared: null
	,initOps: function() {
		var me = this;
		this.binops = new Hash();
		this.binops.set("+",function(e1,e2) {
			return me.expr(e1) + me.expr(e2);
		});
		this.binops.set("-",function(e1,e2) {
			return me.expr(e1) - me.expr(e2);
		});
		this.binops.set("*",function(e1,e2) {
			return me.expr(e1) * me.expr(e2);
		});
		this.binops.set("/",function(e1,e2) {
			return me.expr(e1) / me.expr(e2);
		});
		this.binops.set("%",function(e1,e2) {
			return me.expr(e1) % me.expr(e2);
		});
		this.binops.set("&",function(e1,e2) {
			return me.expr(e1) & me.expr(e2);
		});
		this.binops.set("|",function(e1,e2) {
			return me.expr(e1) | me.expr(e2);
		});
		this.binops.set("^",function(e1,e2) {
			return me.expr(e1) ^ me.expr(e2);
		});
		this.binops.set("<<",function(e1,e2) {
			return me.expr(e1) << me.expr(e2);
		});
		this.binops.set(">>",function(e1,e2) {
			return me.expr(e1) >> me.expr(e2);
		});
		this.binops.set(">>>",function(e1,e2) {
			return me.expr(e1) >>> me.expr(e2);
		});
		this.binops.set("==",function(e1,e2) {
			return me.expr(e1) == me.expr(e2);
		});
		this.binops.set("!=",function(e1,e2) {
			return me.expr(e1) != me.expr(e2);
		});
		this.binops.set(">=",function(e1,e2) {
			return me.expr(e1) >= me.expr(e2);
		});
		this.binops.set("<=",function(e1,e2) {
			return me.expr(e1) <= me.expr(e2);
		});
		this.binops.set(">",function(e1,e2) {
			return me.expr(e1) > me.expr(e2);
		});
		this.binops.set("<",function(e1,e2) {
			return me.expr(e1) < me.expr(e2);
		});
		this.binops.set("||",function(e1,e2) {
			return me.expr(e1) == true || me.expr(e2) == true;
		});
		this.binops.set("&&",function(e1,e2) {
			return me.expr(e1) == true && me.expr(e2) == true;
		});
		this.binops.set("=",this.assign.$bind(this));
		this.binops.set("...",function(e1,e2) {
			return new IntIter(me.expr(e1),me.expr(e2));
		});
		this.assignOp("+=",function(v1,v2) {
			return v1 + v2;
		});
		this.assignOp("-=",function(v1,v2) {
			return v1 - v2;
		});
		this.assignOp("*=",function(v1,v2) {
			return v1 * v2;
		});
		this.assignOp("/=",function(v1,v2) {
			return v1 / v2;
		});
		this.assignOp("%=",function(v1,v2) {
			return v1 % v2;
		});
		this.assignOp("&=",function(v1,v2) {
			return v1 & v2;
		});
		this.assignOp("|=",function(v1,v2) {
			return v1 | v2;
		});
		this.assignOp("^=",function(v1,v2) {
			return v1 ^ v2;
		});
		this.assignOp("<<=",function(v1,v2) {
			return v1 << v2;
		});
		this.assignOp(">>=",function(v1,v2) {
			return v1 >> v2;
		});
		this.assignOp(">>>=",function(v1,v2) {
			return v1 >>> v2;
		});
	}
	,assign: function(e1,e2) {
		var v = this.expr(e2);
		var $e = (e1);
		switch( $e[1] ) {
		case 1:
			var id = $e[2];
			var l = this.locals.get(id);
			if(l == null) this.variables.set(id,v); else l.r = v;
			break;
		case 5:
			var f = $e[3], e = $e[2];
			v = this.set(this.expr(e),f,v);
			break;
		case 16:
			var index = $e[3], e = $e[2];
			this.expr(e)[this.expr(index)] = v;
			break;
		default:
			throw hscript.Error.EInvalidOp("=");
		}
		return v;
	}
	,assignOp: function(op,fop) {
		var me = this;
		this.binops.set(op,function(e1,e2) {
			return me.evalAssignOp(op,fop,e1,e2);
		});
	}
	,evalAssignOp: function(op,fop,e1,e2) {
		var v;
		var $e = (e1);
		switch( $e[1] ) {
		case 1:
			var id = $e[2];
			var l = this.locals.get(id);
			v = fop(this.expr(e1),this.expr(e2));
			if(l == null) this.variables.set(id,v); else l.r = v;
			break;
		case 5:
			var f = $e[3], e = $e[2];
			var obj = this.expr(e);
			v = fop(this.get(obj,f),this.expr(e2));
			v = this.set(obj,f,v);
			break;
		case 16:
			var index = $e[3], e = $e[2];
			var arr = this.expr(e);
			var index1 = this.expr(index);
			v = fop(arr[index1],this.expr(e2));
			arr[index1] = v;
			break;
		default:
			throw hscript.Error.EInvalidOp(op);
		}
		return v;
	}
	,increment: function(e,prefix,delta) {
		var $e = (e);
		switch( $e[1] ) {
		case 1:
			var id = $e[2];
			var l = this.locals.get(id);
			var v = l == null?this.variables.get(id):l.r;
			if(prefix) {
				v += delta;
				if(l == null) this.variables.set(id,v); else l.r = v;
			} else if(l == null) this.variables.set(id,v + delta); else l.r = v + delta;
			return v;
		case 5:
			var f = $e[3], e1 = $e[2];
			var obj = this.expr(e1);
			var v = this.get(obj,f);
			if(prefix) {
				v += delta;
				this.set(obj,f,v);
			} else this.set(obj,f,v + delta);
			return v;
		case 16:
			var index = $e[3], e1 = $e[2];
			var arr = this.expr(e1);
			var index1 = this.expr(index);
			var v = arr[index1];
			if(prefix) {
				v += delta;
				arr[index1] = v;
			} else arr[index1] = v + delta;
			return v;
		default:
			throw hscript.Error.EInvalidOp(delta > 0?"++":"--");
		}
	}
	,execute: function(expr) {
		this.locals = new Hash();
		return this.exprReturn(expr);
	}
	,exprReturn: function(e) {
		try {
			return this.expr(e);
		} catch( e1 ) {
			if( js.Boot.__instanceof(e1,hscript._Interp.Stop) ) {
				var $e = (e1);
				switch( $e[1] ) {
				case 0:
					throw "Invalid break";
					break;
				case 1:
					throw "Invalid continue";
					break;
				case 2:
					var v = $e[2];
					return v;
				}
			} else throw(e1);
		}
		return null;
	}
	,duplicate: function(h) {
		var h2 = new Hash();
		var $it0 = h.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			h2.set(k,h.get(k));
		}
		return h2;
	}
	,restore: function(old) {
		while(this.declared.length > old) {
			var d = this.declared.pop();
			this.locals.set(d.n,d.old);
		}
	}
	,expr: function(e) {
		var $e = (e);
		switch( $e[1] ) {
		case 0:
			var c = $e[2];
			var $e = (c);
			switch( $e[1] ) {
			case 0:
				var v = $e[2];
				return v;
			case 3:
				var v = $e[2];
				return v;
			case 1:
				var f = $e[2];
				return f;
			case 2:
				var s = $e[2];
				return s;
			}
			break;
		case 1:
			var id = $e[2];
			var l = this.locals.get(id);
			if(l != null) return l.r;
			var v = this.variables.get(id);
			if(v == null && !this.variables.exists(id)) throw hscript.Error.EUnknownVariable(id);
			return v;
		case 2:
			var e1 = $e[4], n = $e[2];
			this.declared.push({ n : n, old : this.locals.get(n)});
			this.locals.set(n,{ r : e1 == null?null:this.expr(e1)});
			return null;
		case 3:
			var e1 = $e[2];
			return this.expr(e1);
		case 4:
			var exprs = $e[2];
			var old = this.declared.length;
			var v = null;
			var _g = 0;
			while(_g < exprs.length) {
				var e1 = exprs[_g];
				++_g;
				v = this.expr(e1);
			}
			this.restore(old);
			return v;
		case 5:
			var f = $e[3], e1 = $e[2];
			return this.get(this.expr(e1),f);
		case 6:
			var e2 = $e[4], e1 = $e[3], op = $e[2];
			var fop = this.binops.get(op);
			if(fop == null) throw hscript.Error.EInvalidOp(op);
			return fop(e1,e2);
		case 7:
			var e1 = $e[4], prefix = $e[3], op = $e[2];
			switch(op) {
			case "!":
				return this.expr(e1) != true;
			case "-":
				return -this.expr(e1);
			case "++":
				return this.increment(e1,prefix,1);
			case "--":
				return this.increment(e1,prefix,-1);
			case "~":
				return ~this.expr(e1);
			default:
				throw hscript.Error.EInvalidOp(op);
			}
			break;
		case 8:
			var params = $e[3], e1 = $e[2];
			var args = new Array();
			var _g = 0;
			while(_g < params.length) {
				var p = params[_g];
				++_g;
				args.push(this.expr(p));
			}
			var $e = (e1);
			switch( $e[1] ) {
			case 5:
				var f = $e[3], e2 = $e[2];
				var obj = this.expr(e2);
				if(obj == null) throw hscript.Error.EInvalidAccess(f);
				return this.call(obj,Reflect.field(obj,f),args);
			default:
				return this.call(null,this.expr(e1),args);
			}
			break;
		case 9:
			var e2 = $e[4], e1 = $e[3], econd = $e[2];
			return this.expr(econd) == true?this.expr(e1):e2 == null?null:this.expr(e2);
		case 10:
			var e1 = $e[3], econd = $e[2];
			this.whileLoop(econd,e1);
			return null;
		case 11:
			var e1 = $e[4], it = $e[3], v = $e[2];
			this.forLoop(v,it,e1);
			return null;
		case 12:
			throw hscript._Interp.Stop.SBreak;
			break;
		case 13:
			throw hscript._Interp.Stop.SContinue;
			break;
		case 15:
			var e1 = $e[2];
			throw hscript._Interp.Stop.SReturn(e1 == null?null:this.expr(e1));
			break;
		case 14:
			var name = $e[4], fexpr = $e[3], params = $e[2];
			var capturedLocals = this.duplicate(this.locals);
			var me = this;
			var f = function(args) {
				if(args.length != params.length) throw "Invalid number of parameters";
				var old = me.locals;
				me.locals = me.duplicate(capturedLocals);
				var _g1 = 0, _g = params.length;
				while(_g1 < _g) {
					var i = _g1++;
					me.locals.set(params[i].name,{ r : args[i]});
				}
				var r = null;
				try {
					r = me.exprReturn(fexpr);
				} catch( e1 ) {
					me.locals = old;
					throw e1;
				}
				me.locals = old;
				return r;
			};
			var f1 = Reflect.makeVarArgs(f);
			if(name != null) this.variables.set(name,f1);
			return f1;
		case 17:
			var arr = $e[2];
			var a = new Array();
			var _g = 0;
			while(_g < arr.length) {
				var e1 = arr[_g];
				++_g;
				a.push(this.expr(e1));
			}
			return a;
		case 16:
			var index = $e[3], e1 = $e[2];
			return this.expr(e1)[this.expr(index)];
		case 18:
			var params = $e[3], cl = $e[2];
			var a = new Array();
			var _g = 0;
			while(_g < params.length) {
				var e1 = params[_g];
				++_g;
				a.push(this.expr(e1));
			}
			return this.cnew(cl,a);
		case 19:
			var e1 = $e[2];
			throw this.expr(e1);
			break;
		case 20:
			var ecatch = $e[5], n = $e[3], e1 = $e[2];
			var old = this.declared.length;
			try {
				var v = this.expr(e1);
				this.restore(old);
				return v;
			} catch( $e0 ) {
				if( js.Boot.__instanceof($e0,hscript._Interp.Stop) ) {
					var err = $e0;
					throw err;
				} else {
				var err = $e0;
				this.restore(old);
				this.declared.push({ n : n, old : this.locals.get(n)});
				this.locals.set(n,{ r : err});
				var v = this.expr(ecatch);
				this.restore(old);
				return v;
				}
			}
			break;
		case 21:
			var fl = $e[2];
			var o = { };
			var _g = 0;
			while(_g < fl.length) {
				var f = fl[_g];
				++_g;
				this.set(o,f.name,this.expr(f.e));
			}
			return o;
		case 22:
			var e2 = $e[4], e1 = $e[3], econd = $e[2];
			return this.expr(econd) == true?this.expr(e1):this.expr(e2);
		}
		return null;
	}
	,whileLoop: function(econd,e) {
		var old = this.declared.length;
		try {
			while(this.expr(econd) == true) try {
				this.expr(e);
			} catch( err ) {
				if( js.Boot.__instanceof(err,hscript._Interp.Stop) ) {
					switch( (err)[1] ) {
					case 1:
						break;
					case 0:
						throw "__break__";
						break;
					case 2:
						throw err;
						break;
					}
				} else throw(err);
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		this.restore(old);
	}
	,makeIterator: function(v) {
		try {
			v = v.iterator();
		} catch( e ) {
		}
		if(v.hasNext == null || v.next == null) throw hscript.Error.EInvalidIterator(v);
		return v;
	}
	,forLoop: function(n,it,e) {
		var old = this.declared.length;
		this.declared.push({ n : n, old : this.locals.get(n)});
		var it1 = this.makeIterator(this.expr(it));
		try {
			while(it1.hasNext()) {
				this.locals.set(n,{ r : it1.next()});
				try {
					this.expr(e);
				} catch( err ) {
					if( js.Boot.__instanceof(err,hscript._Interp.Stop) ) {
						switch( (err)[1] ) {
						case 1:
							break;
						case 0:
							throw "__break__";
							break;
						case 2:
							throw err;
							break;
						}
					} else throw(err);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		this.restore(old);
	}
	,get: function(o,f) {
		if(o == null) throw hscript.Error.EInvalidAccess(f);
		return Reflect.field(o,f);
	}
	,set: function(o,f,v) {
		if(o == null) throw hscript.Error.EInvalidAccess(f);
		o[f] = v;
		return v;
	}
	,call: function(o,f,args) {
		return f.apply(o,args);
	}
	,cnew: function(cl,args) {
		return Type.createInstance(Type.resolveClass(cl),args);
	}
	,__class__: hscript.Interp
}
if(!erazor.hscript) erazor.hscript = {}
erazor.hscript.EnhancedInterp = $hxClasses["erazor.hscript.EnhancedInterp"] = function() {
	hscript.Interp.call(this);
};
erazor.hscript.EnhancedInterp.__name__ = ["erazor","hscript","EnhancedInterp"];
erazor.hscript.EnhancedInterp.__super__ = hscript.Interp;
erazor.hscript.EnhancedInterp.prototype = $extend(hscript.Interp.prototype,{
	get: function(o,f) {
		if(o == null) throw hscript.Error.EInvalidAccess(f);
		return Reflect.field(o,f);
	}
	,call: function(o,f,args) {
		args = args.concat([null,null,null,null,null]);
		return f.apply(o,args);
	}
	,__class__: erazor.hscript.EnhancedInterp
});
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		cl = null;
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		e = null;
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype = {
	__class__: Type
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype = {
	__class__: js.Boot
}
haxe.Firebug = $hxClasses["haxe.Firebug"] = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	} catch( e ) {
		return false;
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.setErrorHandler(haxe.Firebug.onError);
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		buf += "Called from " + s + "\n";
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = inf != null && inf.customParams != null?inf.customParams[0]:null;
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = inf == null?"error":"log";
	console[type]((inf == null?"":inf.fileName + ":" + inf.lineNumber + " : ") + Std.string(v));
}
haxe.Firebug.prototype = {
	__class__: haxe.Firebug
}
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h[key] != null;
	}
	,remove: function(key) {
		if(this.h[key] == null) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = new Array();
		for( x in this.h ) a.push(x);
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: IntHash
}
if(!app.video) app.video = {}
app.video.VideoController = $hxClasses["app.video.VideoController"] = function() {
	this.view = new app.video.VideoView(this);
	domtools.QueryDOMManipulation.append(new domtools.Query("#controllerarea"),null,this.view);
};
app.video.VideoController.__name__ = ["app","video","VideoController"];
app.video.VideoController.prototype = {
	view: null
	,__class__: app.video.VideoController
}
app.video.VideoView = $hxClasses["app.video.VideoView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.addClass(this,"controller"),"video");
	domtools.QueryElementManipulation.setText(this,"Video Controller");
};
app.video.VideoView.__name__ = ["app","video","VideoView"];
app.video.VideoView.__super__ = domtools.AbstractCustomElement;
app.video.VideoView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: app.video.VideoView
});
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = new Array();
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b[this.b.length] = x == null?"null":x;
	}
	,addSub: function(s,pos,len) {
		this.b[this.b.length] = s.substr(pos,len);
	}
	,addChar: function(c) {
		this.b[this.b.length] = String.fromCharCode(c);
	}
	,toString: function() {
		return this.b.join("");
	}
	,b: null
	,__class__: StringBuf
}
var CommonJS = $hxClasses["CommonJS"] = function() { }
CommonJS.__name__ = ["CommonJS"];
CommonJS.getWindow = function() {
	var window = window;
	return window;
}
CommonJS.getHtmlDocument = function() {
	var htmlDocument = document;
	return htmlDocument;
}
CommonJS.newElement = function(elementType,htmlElement) {
	var htmlDocument = CommonJS.getHtmlDocument();
	if(htmlElement == null) htmlElement = htmlDocument.body;
	return htmlElement.createElement(elementType);
}
CommonJS.get = function(domSelection) {
	var htmlDocument = CommonJS.getHtmlDocument();
	return htmlDocument.body.querySelector(domSelection);
}
CommonJS.getAll = function(domSelection) {
	var htmlDocument = CommonJS.getHtmlDocument();
	return htmlDocument.body.querySelectorAll(domSelection);
}
CommonJS.stopEventPropergation = function(event) {
	if(event.stopPropagation != null) event.stopPropagation(); else if(event.cancelBubble != null) event.cancelBubble = true;
	if(event.preventDefault != null) event.preventDefault(); else if(event.returnValue != null) event.returnValue = false;
}
CommonJS.addEventListener = function(domSelection,eventType,eventHandler,useCapture) {
	if(useCapture == null) useCapture = true;
	var nodeList = CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.addEventListener(eventType,eventHandler,useCapture);
	}
}
CommonJS.removeEventListener = function(domSelection,eventType,eventHandler,useCapture) {
	if(useCapture == null) useCapture = true;
	var nodeList = CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.removeEventListener(eventType,eventHandler,useCapture);
	}
}
CommonJS.getComputedStyle = function(element,style) {
	var computedStyle;
	var htmlDocument = CommonJS.getHtmlDocument();
	if(element.currentStyle != null) computedStyle = element.currentStyle; else computedStyle = htmlDocument.defaultView.getComputedStyle(element,null);
	return computedStyle.getPropertyValue(style);
}
CommonJS.setStyle = function(domSelection,cssStyle,value) {
	var nodeList = CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.style[cssStyle] = value;
	}
}
CommonJS.prototype = {
	__class__: CommonJS
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
Lambda.prototype = {
	__class__: Lambda
}
erazor.ScriptBuilder = $hxClasses["erazor.ScriptBuilder"] = function(context) {
	this.context = context;
};
erazor.ScriptBuilder.__name__ = ["erazor","ScriptBuilder"];
erazor.ScriptBuilder.prototype = {
	context: null
	,build: function(blocks) {
		var buffer = new StringBuf();
		var _g = 0;
		while(_g < blocks.length) {
			var block = blocks[_g];
			++_g;
			buffer.add(this.blockToString(block));
		}
		return buffer.b.join("");
	}
	,blockToString: function(block) {
		var $e = (block);
		switch( $e[1] ) {
		case 0:
			var s = $e[2];
			return this.context + ".add('" + StringTools.replace(s,"'","\\'") + "');\n";
		case 1:
			var s = $e[2];
			return s + "\n";
		case 2:
			var s = $e[2];
			return this.context + ".add(" + s + ");\n";
		}
	}
	,__class__: erazor.ScriptBuilder
}
haxe.io.StringInput = $hxClasses["haxe.io.StringInput"] = function(s) {
	haxe.io.BytesInput.call(this,haxe.io.Bytes.ofString(s));
};
haxe.io.StringInput.__name__ = ["haxe","io","StringInput"];
haxe.io.StringInput.__super__ = haxe.io.BytesInput;
haxe.io.StringInput.prototype = $extend(haxe.io.BytesInput.prototype,{
	__class__: haxe.io.StringInput
});
haxe.io.Output = $hxClasses["haxe.io.Output"] = function() { }
haxe.io.Output.__name__ = ["haxe","io","Output"];
haxe.io.Output.prototype = {
	bigEndian: null
	,writeByte: function(c) {
		throw "Not implemented";
	}
	,writeBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
		while(k > 0) {
			this.writeByte(b[pos]);
			pos++;
			k--;
		}
		return len;
	}
	,flush: function() {
	}
	,close: function() {
	}
	,setEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) throw haxe.io.Error.Blocked;
			p += k;
			l -= k;
		}
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,writeFloat: function(x) {
		throw "Not implemented";
	}
	,writeDouble: function(x) {
		throw "Not implemented";
	}
	,writeInt8: function(x) {
		if(x < -128 || x >= 128) throw haxe.io.Error.Overflow;
		this.writeByte(x & 255);
	}
	,writeInt16: function(x) {
		if(x < -32768 || x >= 32768) throw haxe.io.Error.Overflow;
		this.writeUInt16(x & 65535);
	}
	,writeUInt16: function(x) {
		if(x < 0 || x >= 65536) throw haxe.io.Error.Overflow;
		if(this.bigEndian) {
			this.writeByte(x >> 8);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8);
		}
	}
	,writeInt24: function(x) {
		if(x < -8388608 || x >= 8388608) throw haxe.io.Error.Overflow;
		this.writeUInt24(x & 16777215);
	}
	,writeUInt24: function(x) {
		if(x < 0 || x >= 16777216) throw haxe.io.Error.Overflow;
		if(this.bigEndian) {
			this.writeByte(x >> 16);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16);
		}
	}
	,writeInt31: function(x) {
		if(x < -1073741824 || x >= 1073741824) throw haxe.io.Error.Overflow;
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,writeUInt30: function(x) {
		if(x < 0 || x >= 1073741824) throw haxe.io.Error.Overflow;
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(haxe.Int32.toInt(x >>> 24));
			this.writeByte(haxe.Int32.toInt(x >>> 16) & 255);
			this.writeByte(haxe.Int32.toInt(x >>> 8) & 255);
			this.writeByte(haxe.Int32.toInt(x & (255 | 0)));
		} else {
			this.writeByte(haxe.Int32.toInt(x & (255 | 0)));
			this.writeByte(haxe.Int32.toInt(x >>> 8) & 255);
			this.writeByte(haxe.Int32.toInt(x >>> 16) & 255);
			this.writeByte(haxe.Int32.toInt(x >>> 24));
		}
	}
	,prepare: function(nbytes) {
	}
	,writeInput: function(i,bufsize) {
		if(bufsize == null) bufsize = 4096;
		var buf = haxe.io.Bytes.alloc(bufsize);
		try {
			while(true) {
				var len = i.readBytes(buf,0,bufsize);
				if(len == 0) throw haxe.io.Error.Blocked;
				var p = 0;
				while(len > 0) {
					var k = this.writeBytes(buf,p,len);
					if(k == 0) throw haxe.io.Error.Blocked;
					p += k;
					len -= k;
				}
			}
		} catch( e ) {
			if( js.Boot.__instanceof(e,haxe.io.Eof) ) {
			} else throw(e);
		}
	}
	,writeString: function(s) {
		var b = haxe.io.Bytes.ofString(s);
		this.writeFullBytes(b,0,b.length);
	}
	,__class__: haxe.io.Output
	,__properties__: {set_bigEndian:"setEndian"}
}
erazor.TBlock = $hxClasses["erazor.TBlock"] = { __ename__ : ["erazor","TBlock"], __constructs__ : ["literal","codeBlock","printBlock"] }
erazor.TBlock.literal = function(s) { var $x = ["literal",0,s]; $x.__enum__ = erazor.TBlock; $x.toString = $estr; return $x; }
erazor.TBlock.codeBlock = function(s) { var $x = ["codeBlock",1,s]; $x.__enum__ = erazor.TBlock; $x.toString = $estr; return $x; }
erazor.TBlock.printBlock = function(s) { var $x = ["printBlock",2,s]; $x.__enum__ = erazor.TBlock; $x.toString = $estr; return $x; }
domtools.Style = $hxClasses["domtools.Style"] = function() { }
domtools.Style.__name__ = ["domtools","Style"];
domtools.Style.getComputedStyle = function(node) {
	var style = null;
	if(domtools.ElementManipulation.isElement(node)) {
	}
	return style;
}
domtools.Style.css = function(node,property) {
	domtools.Style.getComputedStyle(node).getPropertyValue("property");
}
domtools.Style.setCSS = function(node,property,value) {
	if(domtools.ElementManipulation.isElement(node)) {
		var style = node.style;
		style[property] = value;
	}
}
domtools.Style.innerWidth = function(node) {
	var style = domtools.Style.getComputedStyle(node);
	if(style != null) {
	}
	return 0;
}
domtools.Style.prototype = {
	__class__: domtools.Style
}
domtools.QueryStyle = $hxClasses["domtools.QueryStyle"] = function() { }
domtools.QueryStyle.__name__ = ["domtools","QueryStyle"];
domtools.QueryStyle.setCSS = function(collection,property,value) {
	var $it0 = collection.collection.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		domtools.Style.setCSS(node,property,value);
	}
}
domtools.QueryStyle.prototype = {
	__class__: domtools.QueryStyle
}
app.copy.CopyController = $hxClasses["app.copy.CopyController"] = function() {
	this.view = new app.copy.CopyView(this);
	domtools.QueryDOMManipulation.append(new domtools.Query("#controllerarea"),null,this.view);
};
app.copy.CopyController.__name__ = ["app","copy","CopyController"];
app.copy.CopyController.prototype = {
	view: null
	,__class__: app.copy.CopyController
}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype = {
	__class__: haxe.Log
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		try {
			key = "$" + key;
			return this.hasOwnProperty.call(this.h,key);
		} catch( e ) {
			for(var i in this.h) if( i == key ) return true;
			return false;
		}
	}
	,remove: function(key) {
		if(!this.exists(key)) return false;
		delete(this.h["$" + key]);
		return true;
	}
	,keys: function() {
		var a = new Array();
		for(var i in this.h) a.push(i.substr(1));
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: Hash
}
client.Interface = $hxClasses["client.Interface"] = function() {
	this.setTitle("Loading...");
	this.drawMenu();
	this.setTitle("Vose");
};
client.Interface.__name__ = ["client","Interface"];
client.Interface.currentControllerShowing = null;
client.Interface.templateFile = null;
client.Interface.activateMenuItem = function(e) {
	var menuItem = e.currentTarget;
	var id = StringTools.replace(domtools.ElementManipulation.attr(menuItem.firstChild,"href"),"#","");
	if(client.Interface.currentControllerShowing != id) {
		domtools.QueryStyle.setCSS(new domtools.Query(".controller"),"display","none");
		haxe.Log.trace(id,{ fileName : "Interface.hx", lineNumber : 76, className : "client.Interface", methodName : "activateMenuItem"});
		domtools.QueryStyle.setCSS(new domtools.Query(".controller." + id),"display","block");
		switch(id) {
		case "copy":
			break;
		case "edit":
			break;
		case "slides":
			break;
		case "dvd":
			break;
		default:
		}
	}
	client.Interface.currentControllerShowing = id;
}
client.Interface.prototype = {
	title: null
	,drawMenu: function() {
		var nav = new client.ui.menu.NavBar("Vose Video");
		var menu = nav.menu;
		menu.addMenuItem("project","Project");
		menu.addMenuItem("video","Video");
		menu.addMenuItem("copy","Copy Clips");
		menu.addMenuItem("edit","Edit Video");
		menu.addMenuItem("slide","Create Slides");
		menu.addMenuItem("author","Author DVD");
		document.body.appendChild(nav.collection[0]);
		domtools.QueryEventManagement.on(new domtools.Query(".menu li"),"click",client.Interface.activateMenuItem);
	}
	,getTitle: function() {
		return js.Lib.document.title;
	}
	,setTitle: function(string) {
		var title = "Vose Video Production";
		if(string != null) title = title + ": " + string;
		js.Lib.document.title = title;
		return string;
	}
	,__class__: client.Interface
	,__properties__: {set_title:"setTitle",get_title:"getTitle"}
}
haxe.remoting.Macros = $hxClasses["haxe.remoting.Macros"] = function() { }
haxe.remoting.Macros.__name__ = ["haxe","remoting","Macros"];
haxe.remoting.Macros.prototype = {
	__class__: haxe.remoting.Macros
}
if(!app.edit) app.edit = {}
app.edit.EditView = $hxClasses["app.edit.EditView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.addClass(this,"controller"),"edit");
	domtools.QueryElementManipulation.setText(this,"Edit Controller");
};
app.edit.EditView.__name__ = ["app","edit","EditView"];
app.edit.EditView.__super__ = domtools.AbstractCustomElement;
app.edit.EditView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: app.edit.EditView
});
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype = {
	__class__: Std
}
if(!client.ui.basic) client.ui.basic = {}
client.ui.basic.Link = $hxClasses["client.ui.basic.Link"] = function(text,href,title) {
	if(href == null) href = "#";
	if(text == null) text = "Link";
	domtools.AbstractCustomElement.call(this,"a");
	domtools.QueryElementManipulation.setAttr(this,"href",href);
	domtools.QueryElementManipulation.setInnerHTML(this,text);
	if(title == null) title = domtools.QueryElementManipulation.text(this);
	domtools.QueryElementManipulation.setAttr(this,"title",title);
};
client.ui.basic.Link.__name__ = ["client","ui","basic","Link"];
client.ui.basic.Link.__super__ = domtools.AbstractCustomElement;
client.ui.basic.Link.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	__class__: client.ui.basic.Link
});
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		this.r.m = this.r.exec(s);
		this.r.s = s;
		this.r.l = RegExp.leftContext;
		this.r.r = RegExp.rightContext;
		return this.r.m != null;
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
		return this.r.l;
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		if(this.r.r == null) {
			var sz = this.r.m.index + this.r.m[0].length;
			return this.r.s.substr(sz,this.r.s.length - sz);
		}
		return this.r.r;
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.add(this.matchedLeft());
			buf.add(f(this));
			s = this.matchedRight();
		}
		buf.b[buf.b.length] = s == null?"null":s;
		return buf.b.join("");
	}
	,__class__: EReg
}
client.ui.menu.MenuItem = $hxClasses["client.ui.menu.MenuItem"] = function(id,text) {
	domtools.AbstractCustomElement.call(this,"li");
	domtools.QueryDOMManipulation.append(this,document.createElement("a"));
	this.a = domtools.QueryTraversing.firstChildren(this);
	this.setID(id).setText(text);
};
client.ui.menu.MenuItem.__name__ = ["client","ui","menu","MenuItem"];
client.ui.menu.MenuItem.__super__ = domtools.AbstractCustomElement;
client.ui.menu.MenuItem.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	a: null
	,id: null
	,text: null
	,setID: function(id) {
		this.id = id;
		domtools.QueryElementManipulation.addClass(this,"menulink-" + id);
		domtools.QueryElementManipulation.setAttr(this.a,"href","#" + id);
		return this;
	}
	,setText: function(text) {
		this.text = text;
		domtools.QueryElementManipulation.setText(this.a,text);
		return this;
	}
	,__class__: client.ui.menu.MenuItem
});
app.author.AuthorView = $hxClasses["app.author.AuthorView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(domtools.QueryElementManipulation.addClass(this,"controller"),"author");
	domtools.QueryElementManipulation.setText(this,"Author Controller");
};
app.author.AuthorView.__name__ = ["app","author","AuthorView"];
app.author.AuthorView.__super__ = domtools.AbstractCustomElement;
app.author.AuthorView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: app.author.AuthorView
});
hscript.Const = $hxClasses["hscript.Const"] = { __ename__ : ["hscript","Const"], __constructs__ : ["CInt","CFloat","CString","CInt32"] }
hscript.Const.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = hscript.Const; $x.toString = $estr; return $x; }
hscript.Const.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = hscript.Const; $x.toString = $estr; return $x; }
hscript.Const.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = hscript.Const; $x.toString = $estr; return $x; }
hscript.Const.CInt32 = function(v) { var $x = ["CInt32",3,v]; $x.__enum__ = hscript.Const; $x.toString = $estr; return $x; }
hscript.Expr = $hxClasses["hscript.Expr"] = { __ename__ : ["hscript","Expr"], __constructs__ : ["EConst","EIdent","EVar","EParent","EBlock","EField","EBinop","EUnop","ECall","EIf","EWhile","EFor","EBreak","EContinue","EFunction","EReturn","EArray","EArrayDecl","ENew","EThrow","ETry","EObject","ETernary"] }
hscript.Expr.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EIdent = function(v) { var $x = ["EIdent",1,v]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EVar = function(n,t,e) { var $x = ["EVar",2,n,t,e]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EParent = function(e) { var $x = ["EParent",3,e]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EBlock = function(e) { var $x = ["EBlock",4,e]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EField = function(e,f) { var $x = ["EField",5,e,f]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EBinop = function(op,e1,e2) { var $x = ["EBinop",6,op,e1,e2]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EUnop = function(op,prefix,e) { var $x = ["EUnop",7,op,prefix,e]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.ECall = function(e,params) { var $x = ["ECall",8,e,params]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EIf = function(cond,e1,e2) { var $x = ["EIf",9,cond,e1,e2]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EWhile = function(cond,e) { var $x = ["EWhile",10,cond,e]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EFor = function(v,it,e) { var $x = ["EFor",11,v,it,e]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EBreak = ["EBreak",12];
hscript.Expr.EBreak.toString = $estr;
hscript.Expr.EBreak.__enum__ = hscript.Expr;
hscript.Expr.EContinue = ["EContinue",13];
hscript.Expr.EContinue.toString = $estr;
hscript.Expr.EContinue.__enum__ = hscript.Expr;
hscript.Expr.EFunction = function(args,e,name,ret) { var $x = ["EFunction",14,args,e,name,ret]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EReturn = function(e) { var $x = ["EReturn",15,e]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EArray = function(e,index) { var $x = ["EArray",16,e,index]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EArrayDecl = function(e) { var $x = ["EArrayDecl",17,e]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.ENew = function(cl,params) { var $x = ["ENew",18,cl,params]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EThrow = function(e) { var $x = ["EThrow",19,e]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.ETry = function(e,v,t,ecatch) { var $x = ["ETry",20,e,v,t,ecatch]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.EObject = function(fl) { var $x = ["EObject",21,fl]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.Expr.ETernary = function(cond,e1,e2) { var $x = ["ETernary",22,cond,e1,e2]; $x.__enum__ = hscript.Expr; $x.toString = $estr; return $x; }
hscript.CType = $hxClasses["hscript.CType"] = { __ename__ : ["hscript","CType"], __constructs__ : ["CTPath","CTFun","CTAnon","CTParent"] }
hscript.CType.CTPath = function(path,params) { var $x = ["CTPath",0,path,params]; $x.__enum__ = hscript.CType; $x.toString = $estr; return $x; }
hscript.CType.CTFun = function(args,ret) { var $x = ["CTFun",1,args,ret]; $x.__enum__ = hscript.CType; $x.toString = $estr; return $x; }
hscript.CType.CTAnon = function(fields) { var $x = ["CTAnon",2,fields]; $x.__enum__ = hscript.CType; $x.toString = $estr; return $x; }
hscript.CType.CTParent = function(t) { var $x = ["CTParent",3,t]; $x.__enum__ = hscript.CType; $x.toString = $estr; return $x; }
hscript.Error = $hxClasses["hscript.Error"] = { __ename__ : ["hscript","Error"], __constructs__ : ["EInvalidChar","EUnexpected","EUnterminatedString","EUnterminatedComment","EUnknownVariable","EInvalidIterator","EInvalidOp","EInvalidAccess"] }
hscript.Error.EInvalidChar = function(c) { var $x = ["EInvalidChar",0,c]; $x.__enum__ = hscript.Error; $x.toString = $estr; return $x; }
hscript.Error.EUnexpected = function(s) { var $x = ["EUnexpected",1,s]; $x.__enum__ = hscript.Error; $x.toString = $estr; return $x; }
hscript.Error.EUnterminatedString = ["EUnterminatedString",2];
hscript.Error.EUnterminatedString.toString = $estr;
hscript.Error.EUnterminatedString.__enum__ = hscript.Error;
hscript.Error.EUnterminatedComment = ["EUnterminatedComment",3];
hscript.Error.EUnterminatedComment.toString = $estr;
hscript.Error.EUnterminatedComment.__enum__ = hscript.Error;
hscript.Error.EUnknownVariable = function(v) { var $x = ["EUnknownVariable",4,v]; $x.__enum__ = hscript.Error; $x.toString = $estr; return $x; }
hscript.Error.EInvalidIterator = function(v) { var $x = ["EInvalidIterator",5,v]; $x.__enum__ = hscript.Error; $x.toString = $estr; return $x; }
hscript.Error.EInvalidOp = function(op) { var $x = ["EInvalidOp",6,op]; $x.__enum__ = hscript.Error; $x.toString = $estr; return $x; }
hscript.Error.EInvalidAccess = function(f) { var $x = ["EInvalidAccess",7,f]; $x.__enum__ = hscript.Error; $x.toString = $estr; return $x; }
haxe.Unserializer = $hxClasses["haxe.Unserializer"] = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.cca(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,getResolver: function() {
		return this.resolver;
	}
	,get: function(p) {
		return this.buf.cca(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.cca(this.pos) == 103) break;
			var k = this.unserialize();
			if(!Std["is"](k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		var constr = Reflect.field(edecl,tag);
		if(constr == null) throw "Unknown enum tag " + Type.getEnumName(edecl) + "." + tag;
		if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) {
			this.cache.push(constr);
			return constr;
		}
		var args = new Array();
		while(nargs > 0) {
			args.push(this.unserialize());
			nargs -= 1;
		}
		var e = constr.apply(edecl,args);
		this.cache.push(e);
		return e;
	}
	,unserialize: function() {
		switch(this.buf.cca(this.pos++)) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.cca(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(this.buf.substr(p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = this.buf.substr(this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.cca(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			return this.unserializeEnum(edecl,this.unserialize());
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			return this.unserializeEnum(edecl,tag);
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new Hash();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.cca(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new IntHash();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.cca(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.cca(this.pos++);
			}
			if(c != 104) throw "Invalid IntHash format";
			return h;
		case 118:
			var d = Date.fromString(this.buf.substr(this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.cca(i++)];
				var c2 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.cca(i++)];
				var c2 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.cca(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
}
server.api.NotificationsProxy = $hxClasses["server.api.NotificationsProxy"] = function(c) {
	this._conn = c.resolve("server.api.NotificationsService");
};
server.api.NotificationsProxy.__name__ = ["server","api","NotificationsProxy"];
server.api.NotificationsProxy.prototype = {
	_conn: null
	,getTheFoo: function(fooId,cb) {
		this._conn.resolve("getTheFoo").call([fooId],cb);
	}
	,__class__: server.api.NotificationsProxy
}
app.edit.EditController = $hxClasses["app.edit.EditController"] = function() {
	this.view = new app.edit.EditView(this);
	domtools.QueryDOMManipulation.append(new domtools.Query("#controllerarea"),null,this.view);
};
app.edit.EditController.__name__ = ["app","edit","EditController"];
app.edit.EditController.prototype = {
	view: null
	,__class__: app.edit.EditController
}
if(!app.project.model) app.project.model = {}
app.project.model.Project = $hxClasses["app.project.model.Project"] = function() {
};
app.project.model.Project.__name__ = ["app","project","model","Project"];
app.project.model.Project.prototype = {
	id: null
	,title: null
	,lecturer: null
	,notes: null
	,oldID: null
	,save: function() {
	}
	,__class__: app.project.model.Project
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.io.BytesOutput = $hxClasses["haxe.io.BytesOutput"] = function() {
	this.b = new haxe.io.BytesBuffer();
};
haxe.io.BytesOutput.__name__ = ["haxe","io","BytesOutput"];
haxe.io.BytesOutput.__super__ = haxe.io.Output;
haxe.io.BytesOutput.prototype = $extend(haxe.io.Output.prototype,{
	b: null
	,writeByte: function(c) {
		this.b.b.push(c);
	}
	,writeBytes: function(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe.io.BytesOutput
});
if(!erazor._Parser) erazor._Parser = {}
erazor._Parser.ParseContext = $hxClasses["erazor._Parser.ParseContext"] = { __ename__ : ["erazor","_Parser","ParseContext"], __constructs__ : ["literal","code"] }
erazor._Parser.ParseContext.literal = ["literal",0];
erazor._Parser.ParseContext.literal.toString = $estr;
erazor._Parser.ParseContext.literal.__enum__ = erazor._Parser.ParseContext;
erazor._Parser.ParseContext.code = ["code",1];
erazor._Parser.ParseContext.code.toString = $estr;
erazor._Parser.ParseContext.code.__enum__ = erazor._Parser.ParseContext;
erazor._Parser.ParseResult = $hxClasses["erazor._Parser.ParseResult"] = { __ename__ : ["erazor","_Parser","ParseResult"], __constructs__ : ["keepGoing","doneIncludeCurrent","doneSkipCurrent"] }
erazor._Parser.ParseResult.keepGoing = ["keepGoing",0];
erazor._Parser.ParseResult.keepGoing.toString = $estr;
erazor._Parser.ParseResult.keepGoing.__enum__ = erazor._Parser.ParseResult;
erazor._Parser.ParseResult.doneIncludeCurrent = ["doneIncludeCurrent",1];
erazor._Parser.ParseResult.doneIncludeCurrent.toString = $estr;
erazor._Parser.ParseResult.doneIncludeCurrent.__enum__ = erazor._Parser.ParseResult;
erazor._Parser.ParseResult.doneSkipCurrent = ["doneSkipCurrent",2];
erazor._Parser.ParseResult.doneSkipCurrent.toString = $estr;
erazor._Parser.ParseResult.doneSkipCurrent.__enum__ = erazor._Parser.ParseResult;
erazor.Parser = $hxClasses["erazor.Parser"] = function() {
	this.condMatch = new EReg("^@(?:if|for|while)\\b","");
	this.inConditionalMatch = new EReg("^(?:\\}[\\s\r\n]*else if\\b|\\}[\\s\r\n]*else[\\s\r\n]*{)","");
	this.variableChar = new EReg("^[_\\w\\.]$","");
};
erazor.Parser.__name__ = ["erazor","Parser"];
erazor.Parser.prototype = {
	condMatch: null
	,inConditionalMatch: null
	,variableChar: null
	,context: null
	,bracketStack: null
	,conditionalStack: null
	,parseScriptPart: function(template,startBrace,endBrace) {
		var insideSingleQuote = false;
		var insideDoubleQuote = false;
		var stack = startBrace == ""?1:0;
		var i = -1;
		while(++i < template.length) {
			var $char = template.charAt(i);
			if(!insideDoubleQuote && !insideSingleQuote) switch($char) {
			case startBrace:
				++stack;
				break;
			case endBrace:
				--stack;
				if(stack == 0) return template.substr(0,i + 1);
				if(stack < 0) throw "Unbalanced braces for block: " + template.substr(0,100) + " ...";
				break;
			case "\"":
				insideDoubleQuote = true;
				break;
			case "'":
				insideSingleQuote = true;
				break;
			} else if(insideDoubleQuote && $char == "\"" && template.charAt(i - 1) != "\\") insideDoubleQuote = false; else if(insideSingleQuote && $char == "'" && template.charAt(i - 1) != "\\") insideSingleQuote = false;
		}
		throw "Failed to find a closing delimiter for the script block: " + template.substr(0,100);
	}
	,parseContext: function(template) {
		if(this.peek(template) == erazor.Parser.at && this.peek(template,1) != erazor.Parser.at) return erazor._Parser.ParseContext.code;
		if(this.conditionalStack > 0 && this.peek(template) == "}") {
			switch( (this.bracketStack[this.bracketStack.length - 1])[1] ) {
			case 1:
				return erazor._Parser.ParseContext.code;
			default:
			}
		}
		return erazor._Parser.ParseContext.literal;
	}
	,accept: function(template,acceptor,throwAtEnd) {
		return this.parseString(template,function(chr) {
			return acceptor(chr)?erazor._Parser.ParseResult.keepGoing:erazor._Parser.ParseResult.doneSkipCurrent;
		},throwAtEnd);
	}
	,isIdentifier: function($char,first) {
		if(first == null) first = true;
		return first?$char >= "a" && $char <= "z" || $char >= "A" && $char <= "Z" || $char == "_":$char >= "a" && $char <= "z" || $char >= "A" && $char <= "Z" || $char >= "0" && $char <= "9" || $char == "_";
	}
	,acceptIdentifier: function(template) {
		var first = true;
		var self = this;
		return this.accept(template,function(chr) {
			var status = self.isIdentifier(chr,first);
			first = false;
			return status;
		},false);
	}
	,acceptBracket: function(template,bracket) {
		return this.parseScriptPart(template,bracket,bracket == "("?")":"]");
	}
	,parseBlock: function(template) {
		return this.context == erazor._Parser.ParseContext.code?this.parseCodeBlock(template):this.parseLiteral(template);
	}
	,parseConditional: function(template) {
		var str = this.parseScriptPart(template,"","{");
		return { block : erazor.TBlock.codeBlock(str.substr(1)), length : str.length};
	}
	,peek: function(template,offset) {
		if(offset == null) offset = 0;
		return template.length > offset?template.charAt(offset):null;
	}
	,parseVariable: function(template) {
		var output = "";
		var $char = null;
		var part = null;
		template = template.substr(1);
		do {
			part = this.acceptIdentifier(template);
			template = template.substr(part.length);
			output += part;
			$char = this.peek(template);
			while($char == "(" || $char == "[") {
				part = this.acceptBracket(template,$char);
				template = template.substr(part.length);
				output += part;
				$char = this.peek(template);
			}
			if($char == "." && this.isIdentifier(this.peek(template,1))) {
				template = template.substr(1);
				output += ".";
			} else break;
		} while($char != null);
		return { block : erazor.TBlock.printBlock(output), length : output.length + 1};
	}
	,parseVariableChar: function($char) {
		return this.variableChar.match($char)?erazor._Parser.ParseResult.keepGoing:erazor._Parser.ParseResult.doneSkipCurrent;
	}
	,parseCodeBlock: function(template) {
		if(this.bracketStack.length > 0 && this.peek(template) == "}") {
			if(this.inConditionalMatch.match(template)) {
				var str = this.parseScriptPart(template,"","{");
				return { block : erazor.TBlock.codeBlock(str), length : str.length};
			}
			if((function($this) {
				var $r;
				switch( ($this.bracketStack.pop())[1] ) {
				case 1:
					$r = --$this.conditionalStack < 0;
					break;
				default:
					$r = true;
				}
				return $r;
			}(this))) throw erazor.Parser.bracketMismatch;
			return { block : erazor.TBlock.codeBlock("}"), length : 1};
		}
		if(this.condMatch.match(template)) {
			this.bracketStack.push(erazor._Parser.ParseContext.code);
			++this.conditionalStack;
			return this.parseConditional(template);
		}
		if(this.peek(template) == "@" && this.isIdentifier(this.peek(template,1))) return this.parseVariable(template);
		var startBrace = this.peek(template,1);
		var endBrace = startBrace == "{"?"}":")";
		var str = this.parseScriptPart(template.substr(1),startBrace,endBrace);
		var noBraces = StringTools.trim(str.substr(1,str.length - 2));
		if(startBrace == "{") return { block : erazor.TBlock.codeBlock(noBraces), length : str.length + 1}; else return { block : erazor.TBlock.printBlock(noBraces), length : str.length + 1};
	}
	,parseString: function(str,modifier,throwAtEnd) {
		var insideSingleQuote = false;
		var insideDoubleQuote = false;
		var i = -1;
		while(++i < str.length) {
			var $char = str.charAt(i);
			if(!insideDoubleQuote && !insideSingleQuote) {
				switch( (modifier($char))[1] ) {
				case 1:
					return str.substr(0,i + 1);
				case 2:
					return str.substr(0,i);
				case 0:
					break;
				}
				if($char == "\"") insideDoubleQuote = true; else if($char == "'") insideSingleQuote = true;
			} else if(insideDoubleQuote && $char == "\"" && str.charAt(i - 1) != "\\") insideDoubleQuote = false; else if(insideSingleQuote && $char == "'" && str.charAt(i - 1) != "\\") insideSingleQuote = false;
		}
		if(throwAtEnd) throw "Failed to find a closing delimiter: " + str.substr(0,100);
		return str;
	}
	,parseLiteral: function(template) {
		var len = template.length;
		var i = -1;
		while(++i < len) {
			var $char = template.charAt(i);
			switch($char) {
			case erazor.Parser.at:
				if(len > i + 1 && template.charAt(i + 1) != erazor.Parser.at) return { block : erazor.TBlock.literal(this.escapeLiteral(template.substr(0,i))), length : i};
				++i;
				break;
			case "}":
				if(this.bracketStack.length > 0) {
					switch( (this.bracketStack[this.bracketStack.length - 1])[1] ) {
					case 1:
						return { block : erazor.TBlock.literal(this.escapeLiteral(template.substr(0,i))), length : i};
					case 0:
						this.bracketStack.pop();
						break;
					}
				} else throw erazor.Parser.bracketMismatch;
				break;
			case "{":
				this.bracketStack.push(erazor._Parser.ParseContext.literal);
				break;
			}
		}
		return { block : erazor.TBlock.literal(this.escapeLiteral(template)), length : len};
	}
	,escapeLiteral: function(input) {
		return StringTools.replace(input,erazor.Parser.at + erazor.Parser.at,erazor.Parser.at);
	}
	,parse: function(template) {
		var output = new Array();
		this.bracketStack = [];
		this.conditionalStack = 0;
		while(template != "") {
			this.context = this.parseContext(template);
			var block = this.parseBlock(template);
			if(block.block != null) output.push(block.block);
			template = template.substr(block.length);
		}
		if(this.bracketStack.length != 0) throw erazor.Parser.bracketMismatch;
		return output;
	}
	,__class__: erazor.Parser
}
haxe.io.Bytes = $hxClasses["haxe.io.Bytes"] = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	length: null
	,b: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length?this.length:other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(str.charCodeAt(i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b[s.b.length] = String.fromCharCode(chars[c >> 4]);
			s.b[s.b.length] = String.fromCharCode(chars[c & 15]);
		}
		return s.b.join("");
	}
	,getData: function() {
		return this.b;
	}
	,__class__: haxe.io.Bytes
}
haxe.Int32 = $hxClasses["haxe.Int32"] = function() { }
haxe.Int32.__name__ = ["haxe","Int32"];
haxe.Int32.make = function(a,b) {
	return a << 16 | b;
}
haxe.Int32.ofInt = function(x) {
	return x | 0;
}
haxe.Int32.clamp = function(x) {
	return x | 0;
}
haxe.Int32.toInt = function(x) {
	if((x >> 30 & 1) != x >>> 31) throw "Overflow " + x;
	return x;
}
haxe.Int32.toNativeInt = function(x) {
	return x;
}
haxe.Int32.add = function(a,b) {
	return a + b | 0;
}
haxe.Int32.sub = function(a,b) {
	return a - b | 0;
}
haxe.Int32.mul = function(a,b) {
	return a * b | 0;
}
haxe.Int32.div = function(a,b) {
	return Std["int"](a / b);
}
haxe.Int32.mod = function(a,b) {
	return a % b;
}
haxe.Int32.shl = function(a,b) {
	return a << b;
}
haxe.Int32.shr = function(a,b) {
	return a >> b;
}
haxe.Int32.ushr = function(a,b) {
	return a >>> b;
}
haxe.Int32.and = function(a,b) {
	return a & b;
}
haxe.Int32.or = function(a,b) {
	return a | b;
}
haxe.Int32.xor = function(a,b) {
	return a ^ b;
}
haxe.Int32.neg = function(a) {
	return -a;
}
haxe.Int32.isNeg = function(a) {
	return a < 0;
}
haxe.Int32.isZero = function(a) {
	return a == 0;
}
haxe.Int32.complement = function(a) {
	return ~a;
}
haxe.Int32.compare = function(a,b) {
	return a - b;
}
haxe.Int32.ucompare = function(a,b) {
	if(a < 0) return b < 0?~b - ~a:1;
	return b < 0?-1:a - b;
}
haxe.Int32.prototype = {
	__class__: haxe.Int32
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype = {
	__class__: StringTools
}
if(!hscript._Interp) hscript._Interp = {}
hscript._Interp.Stop = $hxClasses["hscript._Interp.Stop"] = { __ename__ : ["hscript","_Interp","Stop"], __constructs__ : ["SBreak","SContinue","SReturn"] }
hscript._Interp.Stop.SBreak = ["SBreak",0];
hscript._Interp.Stop.SBreak.toString = $estr;
hscript._Interp.Stop.SBreak.__enum__ = hscript._Interp.Stop;
hscript._Interp.Stop.SContinue = ["SContinue",1];
hscript._Interp.Stop.SContinue.toString = $estr;
hscript._Interp.Stop.SContinue.__enum__ = hscript._Interp.Stop;
hscript._Interp.Stop.SReturn = function(v) { var $x = ["SReturn",2,v]; $x.__enum__ = hscript._Interp.Stop; $x.toString = $estr; return $x; }
js.Boot.__res = {}
js.Boot.__init();
{
	Object.prototype.iterator = function() {
      var o = this.instanceKeys();
      var y = this;
      return {
        cur : 0,
        arr : o,
        hasNext: function() { return this.cur < this.arr.length; },
        next: function() { return y[this.arr[this.cur++]]; }
      };
    }
	Object.prototype.instanceKeys = function(proto) {
      var keys = [];
      proto = !proto;
      for(var i in this) {
        if(proto && Object.prototype[i]) continue;
        keys.push(i);
      }
      return keys;
    }
}
js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	/*!
 * jQuery JavaScript Library v1.5
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Jan 31 08:31:29 2011 -0500
 */
(function(a,b){function b$(a){return d.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function bX(a){if(!bR[a]){var b=d("<"+a+">").appendTo("body"),c=b.css("display");b.remove();if(c==="none"||c==="")c="block";bR[a]=c}return bR[a]}function bW(a,b){var c={};d.each(bV.concat.apply([],bV.slice(0,b)),function(){c[this]=a});return c}function bJ(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var e=a.dataTypes,f=a.converters,g,h=e.length,i,j=e[0],k,l,m,n,o;for(g=1;g<h;g++){k=j,j=e[g];if(j==="*")j=k;else if(k!=="*"&&k!==j){l=k+" "+j,m=f[l]||f["* "+j];if(!m){o=b;for(n in f){i=n.split(" ");if(i[0]===k||i[0]==="*"){o=f[i[1]+" "+j];if(o){n=f[n],n===!0?m=o:o===!0&&(m=n);break}}}}!m&&!o&&d.error("No conversion from "+l.replace(" "," to ")),m!==!0&&(c=m?m(c):o(n(c)))}}return c}function bI(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bH(a,b,c,e){d.isArray(b)&&b.length?d.each(b,function(b,f){c||bp.test(a)?e(a,f):bH(a+"["+(typeof f==="object"||d.isArray(f)?b:"")+"]",f,c,e)}):c||b==null||typeof b!=="object"?e(a,b):d.isArray(b)||d.isEmptyObject(b)?e(a,""):d.each(b,function(b,d){bH(a+"["+b+"]",d,c,e)})}function bG(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bD,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l==="string"&&(g[l]?l=b:(c.dataTypes.unshift(l),l=bG(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bG(a,c,d,e,"*",g));return l}function bF(a){return function(b,c){typeof b!=="string"&&(c=b,b="*");if(d.isFunction(c)){var e=b.toLowerCase().split(bz),f=0,g=e.length,h,i,j;for(;f<g;f++)h=e[f],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bn(a,b,c){var e=b==="width"?bh:bi,f=b==="width"?a.offsetWidth:a.offsetHeight;if(c==="border")return f;d.each(e,function(){c||(f-=parseFloat(d.css(a,"padding"+this))||0),c==="margin"?f+=parseFloat(d.css(a,"margin"+this))||0:f-=parseFloat(d.css(a,"border"+this+"Width"))||0});return f}function _(a,b){b.src?d.ajax({url:b.src,async:!1,dataType:"script"}):d.globalEval(b.text||b.textContent||b.innerHTML||""),b.parentNode&&b.parentNode.removeChild(b)}function $(a,b){if(b.nodeType===1){var c=b.nodeName.toLowerCase();b.clearAttributes(),b.mergeAttributes(a);if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(d.expando)}}function Z(a,b){if(b.nodeType===1&&d.hasData(a)){var c=d.expando,e=d.data(a),f=d.data(b,e);if(e=e[c]){var g=e.events;f=f[c]=d.extend({},e);if(g){delete f.handle,f.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)d.event.add(b,h,g[h][i],g[h][i].data)}}}}function Y(a,b){return d.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function O(a,b,c){if(d.isFunction(b))return d.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return d.grep(a,function(a,d){return a===b===c});if(typeof b==="string"){var e=d.grep(a,function(a){return a.nodeType===1});if(J.test(b))return d.filter(b,e,!c);b=d.filter(b,e)}return d.grep(a,function(a,e){return d.inArray(a,b)>=0===c})}function N(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function F(a,b){return(a&&a!=="*"?a+".":"")+b.replace(q,"`").replace(r,"&")}function E(a){var b,c,e,f,g,h,i,j,k,l,m,n,p,q=[],r=[],s=d._data(this,u);typeof s==="function"&&(s=s.events);if(a.liveFired!==this&&s&&s.live&&!a.target.disabled&&(!a.button||a.type!=="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var t=s.live.slice(0);for(i=0;i<t.length;i++)g=t[i],g.origType.replace(o,"")===a.type?r.push(g.selector):t.splice(i--,1);f=d(a.target).closest(r,a.currentTarget);for(j=0,k=f.length;j<k;j++){m=f[j];for(i=0;i<t.length;i++){g=t[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))){h=m.elem,e=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,e=d(a.relatedTarget).closest(g.selector)[0];(!e||e!==h)&&q.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=q.length;j<k;j++){f=q[j];if(c&&f.level>c)break;a.currentTarget=f.elem,a.data=f.handleObj.data,a.handleObj=f.handleObj,p=f.handleObj.origHandler.apply(f.elem,arguments);if(p===!1||a.isPropagationStopped()){c=f.level,p===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function C(a,b,c){c[0].type=a;return d.event.handle.apply(b,c)}function w(){return!0}function v(){return!1}function f(a,c,f){if(f===b&&a.nodeType===1){f=a.getAttribute("data-"+c);if(typeof f==="string"){try{f=f==="true"?!0:f==="false"?!1:f==="null"?null:d.isNaN(f)?e.test(f)?d.parseJSON(f):f:parseFloat(f)}catch(g){}d.data(a,c,f)}else f=b}return f}var c=a.document,d=function(){function I(){if(!d.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(I,1);return}d.ready()}}var d=function(a,b){return new d.fn.init(a,b,g)},e=a.jQuery,f=a.$,g,h=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,i=/\S/,j=/^\s+/,k=/\s+$/,l=/\d/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=navigator.userAgent,w,x=!1,y,z="then done fail isResolved isRejected promise".split(" "),A,B=Object.prototype.toString,C=Object.prototype.hasOwnProperty,D=Array.prototype.push,E=Array.prototype.slice,F=String.prototype.trim,G=Array.prototype.indexOf,H={};d.fn=d.prototype={constructor:d,init:function(a,e,f){var g,i,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!e&&c.body){this.context=c,this[0]=c.body,this.selector="body",this.length=1;return this}if(typeof a==="string"){g=h.exec(a);if(!g||!g[1]&&e)return!e||e.jquery?(e||f).find(a):this.constructor(e).find(a);if(g[1]){e=e instanceof d?e[0]:e,k=e?e.ownerDocument||e:c,j=m.exec(a),j?d.isPlainObject(e)?(a=[c.createElement(j[1])],d.fn.attr.call(a,e,!0)):a=[k.createElement(j[1])]:(j=d.buildFragment([g[1]],[k]),a=(j.cacheable?d.clone(j.fragment):j.fragment).childNodes);return d.merge(this,a)}i=c.getElementById(g[2]);if(i&&i.parentNode){if(i.id!==g[2])return f.find(a);this.length=1,this[0]=i}this.context=c,this.selector=a;return this}if(d.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return d.makeArray(a,this)},selector:"",jquery:"1.5",length:0,size:function(){return this.length},toArray:function(){return E.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var e=this.constructor();d.isArray(a)?D.apply(e,a):d.merge(e,a),e.prevObject=this,e.context=this.context,b==="find"?e.selector=this.selector+(this.selector?" ":"")+c:b&&(e.selector=this.selector+"."+b+"("+c+")");return e},each:function(a,b){return d.each(this,a,b)},ready:function(a){d.bindReady(),y.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(E.apply(this,arguments),"slice",E.call(arguments).join(","))},map:function(a){return this.pushStack(d.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:D,sort:[].sort,splice:[].splice},d.fn.init.prototype=d.fn,d.extend=d.fn.extend=function(){var a,c,e,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i==="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!=="object"&&!d.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){e=i[c],f=a[c];if(i===f)continue;l&&f&&(d.isPlainObject(f)||(g=d.isArray(f)))?(g?(g=!1,h=e&&d.isArray(e)?e:[]):h=e&&d.isPlainObject(e)?e:{},i[c]=d.extend(l,h,f)):f!==b&&(i[c]=f)}return i},d.extend({noConflict:function(b){a.$=f,b&&(a.jQuery=e);return d},isReady:!1,readyWait:1,ready:function(a){a===!0&&d.readyWait--;if(!d.readyWait||a!==!0&&!d.isReady){if(!c.body)return setTimeout(d.ready,1);d.isReady=!0;if(a!==!0&&--d.readyWait>0)return;y.resolveWith(c,[d]),d.fn.trigger&&d(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!x){x=!0;if(c.readyState==="complete")return setTimeout(d.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",A,!1),a.addEventListener("load",d.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",A),a.attachEvent("onload",d.ready);var b=!1;try{b=a.frameElement==null}catch(e){}c.documentElement.doScroll&&b&&I()}}},isFunction:function(a){return d.type(a)==="function"},isArray:Array.isArray||function(a){return d.type(a)==="array"},isWindow:function(a){return a&&typeof a==="object"&&"setInterval"in a},isNaN:function(a){return a==null||!l.test(a)||isNaN(a)},type:function(a){return a==null?String(a):H[B.call(a)]||"object"},isPlainObject:function(a){if(!a||d.type(a)!=="object"||a.nodeType||d.isWindow(a))return!1;if(a.constructor&&!C.call(a,"constructor")&&!C.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a){}return c===b||C.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!=="string"||!b)return null;b=d.trim(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return a.JSON&&a.JSON.parse?a.JSON.parse(b):(new Function("return "+b))();d.error("Invalid JSON: "+b)},parseXML:function(b,c,e){a.DOMParser?(e=new DOMParser,c=e.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),e=c.documentElement,(!e||!e.nodeName||e.nodeName==="parsererror")&&d.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(a){if(a&&i.test(a)){var b=c.getElementsByTagName("head")[0]||c.documentElement,e=c.createElement("script");e.type="text/javascript",d.support.scriptEval()?e.appendChild(c.createTextNode(a)):e.text=a,b.insertBefore(e,b.firstChild),b.removeChild(e)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,e){var f,g=0,h=a.length,i=h===b||d.isFunction(a);if(e){if(i){for(f in a)if(c.apply(a[f],e)===!1)break}else for(;g<h;)if(c.apply(a[g++],e)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(var j=a[0];g<h&&c.call(j,g,j)!==!1;j=a[++g]){}return a},trim:F?function(a){return a==null?"":F.call(a)}:function(a){return a==null?"":(a+"").replace(j,"").replace(k,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var e=d.type(a);a.length==null||e==="string"||e==="function"||e==="regexp"||d.isWindow(a)?D.call(c,a):d.merge(c,a)}return c},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length==="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,b,c){var d=[],e;for(var f=0,g=a.length;f<g;f++)e=b(a[f],f,c),e!=null&&(d[d.length]=e);return d.concat.apply([],d)},guid:1,proxy:function(a,c,e){arguments.length===2&&(typeof c==="string"?(e=a,a=e[c],c=b):c&&!d.isFunction(c)&&(e=c,c=b)),!c&&a&&(c=function(){return a.apply(e||this,arguments)}),a&&(c.guid=a.guid=a.guid||c.guid||d.guid++);return c},access:function(a,c,e,f,g,h){var i=a.length;if(typeof c==="object"){for(var j in c)d.access(a,j,c[j],f,g,e);return a}if(e!==b){f=!h&&f&&d.isFunction(e);for(var k=0;k<i;k++)g(a[k],c,f?e.call(a[k],k,g(a[k],c)):e,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},_Deferred:function(){var a=[],b,c,e,f={done:function(){if(!e){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=d.type(i),j==="array"?f.done.apply(f,i):j==="function"&&a.push(i);k&&f.resolveWith(k[0],k[1])}return this},resolveWith:function(d,f){if(!e&&!b&&!c){c=1;try{while(a[0])a.shift().apply(d,f)}finally{b=[d,f],c=0}}return this},resolve:function(){f.resolveWith(d.isFunction(this.promise)?this.promise():this,arguments);return this},isResolved:function(){return c||b},cancel:function(){e=1,a=[];return this}};return f},Deferred:function(a){var b=d._Deferred(),c=d._Deferred(),e;d.extend(b,{then:function(a,c){b.done(a).fail(c);return this},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,promise:function(a,c){if(a==null){if(e)return e;e=a={}}c=z.length;while(c--)a[z[c]]=b[z[c]];return a}}),b.then(c.cancel,b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){var b=arguments,c=b.length,e=c<=1&&a&&d.isFunction(a.promise)?a:d.Deferred(),f=e.promise(),g;c>1?(g=Array(c),d.each(b,function(a,b){d.when(b).then(function(b){g[a]=arguments.length>1?E.call(arguments,0):b,--c||e.resolveWith(f,g)},e.reject)})):e!==a&&e.resolve(a);return f},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}d.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.subclass=this.subclass,a.fn.init=function b(b,c){c&&c instanceof d&&!(c instanceof a)&&(c=a(c));return d.fn.init.call(this,b,c,e)},a.fn.init.prototype=a.fn;var e=a(c);return a},browser:{}}),y=d._Deferred(),d.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){H["[object "+b+"]"]=b.toLowerCase()}),w=d.uaMatch(v),w.browser&&(d.browser[w.browser]=!0,d.browser.version=w.version),d.browser.webkit&&(d.browser.safari=!0),G&&(d.inArray=function(a,b){return G.call(b,a)}),i.test(" ")&&(j=/^[\s\xA0]+/,k=/[\s\xA0]+$/),g=d(c),c.addEventListener?A=function(){c.removeEventListener("DOMContentLoaded",A,!1),d.ready()}:c.attachEvent&&(A=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",A),d.ready())});return a.jQuery=a.$=d}();(function(){d.support={};var b=c.createElement("div");b.style.display="none",b.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var e=b.getElementsByTagName("*"),f=b.getElementsByTagName("a")[0],g=c.createElement("select"),h=g.appendChild(c.createElement("option"));if(e&&e.length&&f){d.support={leadingWhitespace:b.firstChild.nodeType===3,tbody:!b.getElementsByTagName("tbody").length,htmlSerialize:!!b.getElementsByTagName("link").length,style:/red/.test(f.getAttribute("style")),hrefNormalized:f.getAttribute("href")==="/a",opacity:/^0.55$/.test(f.style.opacity),cssFloat:!!f.style.cssFloat,checkOn:b.getElementsByTagName("input")[0].value==="on",optSelected:h.selected,deleteExpando:!0,optDisabled:!1,checkClone:!1,_scriptEval:null,noCloneEvent:!0,boxModel:null,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableHiddenOffsets:!0},g.disabled=!0,d.support.optDisabled=!h.disabled,d.support.scriptEval=function(){if(d.support._scriptEval===null){var b=c.documentElement,e=c.createElement("script"),f="script"+d.now();e.type="text/javascript";try{e.appendChild(c.createTextNode("window."+f+"=1;"))}catch(g){}b.insertBefore(e,b.firstChild),a[f]?(d.support._scriptEval=!0,delete a[f]):d.support._scriptEval=!1,b.removeChild(e),b=e=f=null}return d.support._scriptEval};try{delete b.test}catch(i){d.support.deleteExpando=!1}b.attachEvent&&b.fireEvent&&(b.attachEvent("onclick",function j(){d.support.noCloneEvent=!1,b.detachEvent("onclick",j)}),b.cloneNode(!0).fireEvent("onclick")),b=c.createElement("div"),b.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";var k=c.createDocumentFragment();k.appendChild(b.firstChild),d.support.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,d(function(){var a=c.createElement("div"),b=c.getElementsByTagName("body")[0];if(b){a.style.width=a.style.paddingLeft="1px",b.appendChild(a),d.boxModel=d.support.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,d.support.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",d.support.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";var e=a.getElementsByTagName("td");d.support.reliableHiddenOffsets=e[0].offsetHeight===0,e[0].style.display="",e[1].style.display="none",d.support.reliableHiddenOffsets=d.support.reliableHiddenOffsets&&e[0].offsetHeight===0,a.innerHTML="",b.removeChild(a).style.display="none",a=e=null}});var l=function(a){var b=c.createElement("div");a="on"+a;if(!b.attachEvent)return!0;var d=a in b;d||(b.setAttribute(a,"return;"),d=typeof b[a]==="function"),b=null;return d};d.support.submitBubbles=l("submit"),d.support.changeBubbles=l("change"),b=e=f=null}})();var e=/^(?:\{.*\}|\[.*\])$/;d.extend({cache:{},uuid:0,expando:"jQuery"+(d.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?d.cache[a[d.expando]]:a[d.expando];return!!a&&!d.isEmptyObject(a)},data:function(a,c,e,f){if(d.acceptData(a)){var g=d.expando,h=typeof c==="string",i,j=a.nodeType,k=j?d.cache:a,l=j?a[d.expando]:a[d.expando]&&d.expando;if((!l||f&&l&&!k[l][g])&&h&&e===b)return;l||(j?a[d.expando]=l=++d.uuid:l=d.expando),k[l]||(k[l]={}),typeof c==="object"&&(f?k[l][g]=d.extend(k[l][g],c):k[l]=d.extend(k[l],c)),i=k[l],f&&(i[g]||(i[g]={}),i=i[g]),e!==b&&(i[c]=e);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[c]:i}},removeData:function(b,c,e){if(d.acceptData(b)){var f=d.expando,g=b.nodeType,h=g?d.cache:b,i=g?b[d.expando]:d.expando;if(!h[i])return;if(c){var j=e?h[i][f]:h[i];if(j){delete j[c];if(!d.isEmptyObject(j))return}}if(e){delete h[i][f];if(!d.isEmptyObject(h[i]))return}var k=h[i][f];d.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},h[i][f]=k):g&&(d.support.deleteExpando?delete b[d.expando]:b.removeAttribute?b.removeAttribute(d.expando):b[d.expando]=null)}},_data:function(a,b,c){return d.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=d.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),d.fn.extend({data:function(a,c){var e=null;if(typeof a==="undefined"){if(this.length){e=d.data(this[0]);if(this[0].nodeType===1){var g=this[0].attributes,h;for(var i=0,j=g.length;i<j;i++)h=g[i].name,h.indexOf("data-")===0&&(h=h.substr(5),f(this[0],h,e[h]))}}return e}if(typeof a==="object")return this.each(function(){d.data(this,a)});var k=a.split(".");k[1]=k[1]?"."+k[1]:"";if(c===b){e=this.triggerHandler("getData"+k[1]+"!",[k[0]]),e===b&&this.length&&(e=d.data(this[0],a),e=f(this[0],a,e));return e===b&&k[1]?this.data(k[0]):e}return this.each(function(){var b=d(this),e=[k[0],c];b.triggerHandler("setData"+k[1]+"!",e),d.data(this,a,c),b.triggerHandler("changeData"+k[1]+"!",e)})},removeData:function(a){return this.each(function(){d.removeData(this,a)})}}),d.extend({queue:function(a,b,c){if(a){b=(b||"fx")+"queue";var e=d._data(a,b);if(!c)return e||[];!e||d.isArray(c)?e=d._data(a,b,d.makeArray(c)):e.push(c);return e}},dequeue:function(a,b){b=b||"fx";var c=d.queue(a,b),e=c.shift();e==="inprogress"&&(e=c.shift()),e&&(b==="fx"&&c.unshift("inprogress"),e.call(a,function(){d.dequeue(a,b)})),c.length||d.removeData(a,b+"queue",!0)}}),d.fn.extend({queue:function(a,c){typeof a!=="string"&&(c=a,a="fx");if(c===b)return d.queue(this[0],a);return this.each(function(b){var e=d.queue(this,a,c);a==="fx"&&e[0]!=="inprogress"&&d.dequeue(this,a)})},dequeue:function(a){return this.each(function(){d.dequeue(this,a)})},delay:function(a,b){a=d.fx?d.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){d.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var g=/[\n\t\r]/g,h=/\s+/,i=/\r/g,j=/^(?:href|src|style)$/,k=/^(?:button|input)$/i,l=/^(?:button|input|object|select|textarea)$/i,m=/^a(?:rea)?$/i,n=/^(?:radio|checkbox)$/i;d.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"},d.fn.extend({attr:function(a,b){return d.access(this,a,b,!0,d.attr)},removeAttr:function(a,b){return this.each(function(){d.attr(this,a,""),this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.addClass(a.call(this,b,c.attr("class")))});if(a&&typeof a==="string"){var b=(a||"").split(h);for(var c=0,e=this.length;c<e;c++){var f=this[c];if(f.nodeType===1)if(f.className){var g=" "+f.className+" ",i=f.className;for(var j=0,k=b.length;j<k;j++)g.indexOf(" "+b[j]+" ")<0&&(i+=" "+b[j]);f.className=d.trim(i)}else f.className=a}}return this},removeClass:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.removeClass(a.call(this,b,c.attr("class")))});if(a&&typeof a==="string"||a===b){var c=(a||"").split(h);for(var e=0,f=this.length;e<f;e++){var i=this[e];if(i.nodeType===1&&i.className)if(a){var j=(" "+i.className+" ").replace(g," ");for(var k=0,l=c.length;k<l;k++)j=j.replace(" "+c[k]+" "," ");i.className=d.trim(j)}else i.className=""}}return this},toggleClass:function(a,b){var c=typeof a,e=typeof b==="boolean";if(d.isFunction(a))return this.each(function(c){var e=d(this);e.toggleClass(a.call(this,c,e.attr("class"),b),b)});return this.each(function(){if(c==="string"){var f,g=0,i=d(this),j=b,k=a.split(h);while(f=k[g++])j=e?j:!i.hasClass(f),i[j?"addClass":"removeClass"](f)}else if(c==="undefined"||c==="boolean")this.className&&d._data(this,"__className__",this.className),this.className=this.className||a===!1?"":d._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(g," ").indexOf(b)>-1)return!0;return!1},val:function(a){if(!arguments.length){var c=this[0];if(c){if(d.nodeName(c,"option")){var e=c.attributes.value;return!e||e.specified?c.value:c.text}if(d.nodeName(c,"select")){var f=c.selectedIndex,g=[],h=c.options,j=c.type==="select-one";if(f<0)return null;for(var k=j?f:0,l=j?f+1:h.length;k<l;k++){var m=h[k];if(m.selected&&(d.support.optDisabled?!m.disabled:m.getAttribute("disabled")===null)&&(!m.parentNode.disabled||!d.nodeName(m.parentNode,"optgroup"))){a=d(m).val();if(j)return a;g.push(a)}}return g}if(n.test(c.type)&&!d.support.checkOn)return c.getAttribute("value")===null?"on":c.value;return(c.value||"").replace(i,"")}return b}var o=d.isFunction(a);return this.each(function(b){var c=d(this),e=a;if(this.nodeType===1){o&&(e=a.call(this,b,c.val())),e==null?e="":typeof e==="number"?e+="":d.isArray(e)&&(e=d.map(e,function(a){return a==null?"":a+""}));if(d.isArray(e)&&n.test(this.type))this.checked=d.inArray(c.val(),e)>=0;else if(d.nodeName(this,"select")){var f=d.makeArray(e);d("option",this).each(function(){this.selected=d.inArray(d(this).val(),f)>=0}),f.length||(this.selectedIndex=-1)}else this.value=e}})}}),d.extend({attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,e,f){if(!a||a.nodeType===3||a.nodeType===8||a.nodeType===2)return b;if(f&&c in d.attrFn)return d(a)[c](e);var g=a.nodeType!==1||!d.isXMLDoc(a),h=e!==b;c=g&&d.props[c]||c;if(a.nodeType===1){var i=j.test(c);if(c==="selected"&&!d.support.optSelected){var n=a.parentNode;n&&(n.selectedIndex,n.parentNode&&n.parentNode.selectedIndex)}if((c in a||a[c]!==b)&&g&&!i){h&&(c==="type"&&k.test(a.nodeName)&&a.parentNode&&d.error("type property can't be changed"),e===null?a.nodeType===1&&a.removeAttribute(c):a[c]=e);if(d.nodeName(a,"form")&&a.getAttributeNode(c))return a.getAttributeNode(c).nodeValue;if(c==="tabIndex"){var o=a.getAttributeNode("tabIndex");return o&&o.specified?o.value:l.test(a.nodeName)||m.test(a.nodeName)&&a.href?0:b}return a[c]}if(!d.support.style&&g&&c==="style"){h&&(a.style.cssText=""+e);return a.style.cssText}h&&a.setAttribute(c,""+e);if(!a.attributes[c]&&(a.hasAttribute&&!a.hasAttribute(c)))return b;var p=!d.support.hrefNormalized&&g&&i?a.getAttribute(c,2):a.getAttribute(c);return p===null?b:p}h&&(a[c]=e);return a[c]}});var o=/\.(.*)$/,p=/^(?:textarea|input|select)$/i,q=/\./g,r=/ /g,s=/[^\w\s.|`]/g,t=function(a){return a.replace(s,"\\$&")},u="events";d.event={add:function(c,e,f,g){if(c.nodeType!==3&&c.nodeType!==8){d.isWindow(c)&&(c!==a&&!c.frameElement)&&(c=a);if(f===!1)f=v;else if(!f)return;var h,i;f.handler&&(h=f,f=h.handler),f.guid||(f.guid=d.guid++);var j=d._data(c);if(!j)return;var k=j[u],l=j.handle;typeof k==="function"?(l=k.handle,k=k.events):k||(c.nodeType||(j[u]=j=function(){}),j.events=k={}),l||(j.handle=l=function(){return typeof d!=="undefined"&&!d.event.triggered?d.event.handle.apply(l.elem,arguments):b}),l.elem=c,e=e.split(" ");var m,n=0,o;while(m=e[n++]){i=h?d.extend({},h):{handler:f,data:g},m.indexOf(".")>-1?(o=m.split("."),m=o.shift(),i.namespace=o.slice(0).sort().join(".")):(o=[],i.namespace=""),i.type=m,i.guid||(i.guid=f.guid);var p=k[m],q=d.event.special[m]||{};if(!p){p=k[m]=[];if(!q.setup||q.setup.call(c,g,o,l)===!1)c.addEventListener?c.addEventListener(m,l,!1):c.attachEvent&&c.attachEvent("on"+m,l)}q.add&&(q.add.call(c,i),i.handler.guid||(i.handler.guid=f.guid)),p.push(i),d.event.global[m]=!0}c=null}},global:{},remove:function(a,c,e,f){if(a.nodeType!==3&&a.nodeType!==8){e===!1&&(e=v);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=d.hasData(a)&&d._data(a),w=s&&s[u];if(!s||!w)return;typeof w==="function"&&(s=w,w=w.events),c&&c.type&&(e=c.handler,c=c.type);if(!c||typeof c==="string"&&c.charAt(0)==="."){c=c||"";for(h in w)d.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+d.map(m.slice(0).sort(),t).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=w[h];if(!p)continue;if(!e){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))d.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=d.event.special[h]||{};for(j=f||0;j<p.length;j++){q=p[j];if(e.guid===q.guid){if(l||n.test(q.namespace))f==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(f!=null)break}}if(p.length===0||f!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&d.removeEvent(a,h,s.handle),g=null,delete w[h]}if(d.isEmptyObject(w)){var x=s.handle;x&&(x.elem=null),delete s.events,delete s.handle,typeof s==="function"?d.removeData(a,u,!0):d.isEmptyObject(s)&&d.removeData(a,b,!0)}}},trigger:function(a,c,e){var f=a.type||a,g=arguments[3];if(!g){a=typeof a==="object"?a[d.expando]?a:d.extend(d.Event(f),a):d.Event(f),f.indexOf("!")>=0&&(a.type=f=f.slice(0,-1),a.exclusive=!0),e||(a.stopPropagation(),d.event.global[f]&&d.each(d.cache,function(){var b=d.expando,e=this[b];e&&e.events&&e.events[f]&&d.event.trigger(a,c,e.handle.elem)}));if(!e||e.nodeType===3||e.nodeType===8)return b;a.result=b,a.target=e,c=d.makeArray(c),c.unshift(a)}a.currentTarget=e;var h=e.nodeType?d._data(e,"handle"):(d._data(e,u)||{}).handle;h&&h.apply(e,c);var i=e.parentNode||e.ownerDocument;try{e&&e.nodeName&&d.noData[e.nodeName.toLowerCase()]||e["on"+f]&&e["on"+f].apply(e,c)===!1&&(a.result=!1,a.preventDefault())}catch(j){}if(!a.isPropagationStopped()&&i)d.event.trigger(a,c,i,!0);else if(!a.isDefaultPrevented()){var k,l=a.target,m=f.replace(o,""),n=d.nodeName(l,"a")&&m==="click",p=d.event.special[m]||{};if((!p._default||p._default.call(e,a)===!1)&&!n&&!(l&&l.nodeName&&d.noData[l.nodeName.toLowerCase()])){try{l[m]&&(k=l["on"+m],k&&(l["on"+m]=null),d.event.triggered=!0,l[m]())}catch(q){}k&&(l["on"+m]=k),d.event.triggered=!1}}},handle:function(c){var e,f,g,h,i,j=[],k=d.makeArray(arguments);c=k[0]=d.event.fix(c||a.event),c.currentTarget=this,e=c.type.indexOf(".")<0&&!c.exclusive,e||(g=c.type.split("."),c.type=g.shift(),j=g.slice(0).sort(),h=new RegExp("(^|\\.)"+j.join("\\.(?:.*\\.)?")+"(\\.|$)")),c.namespace=c.namespace||j.join("."),i=d._data(this,u),typeof i==="function"&&(i=i.events),f=(i||{})[c.type];if(i&&f){f=f.slice(0);for(var l=0,m=f.length;l<m;l++){var n=f[l];if(e||h.test(n.namespace)){c.handler=n.handler,c.data=n.data,c.handleObj=n;var o=n.handler.apply(this,k);o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[d.expando])return a;var e=a;a=d.Event(e);for(var f=this.props.length,g;f;)g=this.props[--f],a[g]=e[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=c.documentElement,i=c.body;a.pageX=a.clientX+(h&&h.scrollLeft||i&&i.scrollLeft||0)-(h&&h.clientLeft||i&&i.clientLeft||0),a.pageY=a.clientY+(h&&h.scrollTop||i&&i.scrollTop||0)-(h&&h.clientTop||i&&i.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:d.proxy,special:{ready:{setup:d.bindReady,teardown:d.noop},live:{add:function(a){d.event.add(this,F(a.origType,a.selector),d.extend({},a,{handler:E,guid:a.handler.guid}))},remove:function(a){d.event.remove(this,F(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){d.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},d.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},d.Event=function(a){if(!this.preventDefault)return new d.Event(a);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?w:v):this.type=a,this.timeStamp=d.now(),this[d.expando]=!0},d.Event.prototype={preventDefault:function(){this.isDefaultPrevented=w;var a=this.originalEvent;a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=w;var a=this.originalEvent;a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=w,this.stopPropagation()},isDefaultPrevented:v,isPropagationStopped:v,isImmediatePropagationStopped:v};var x=function(a){var b=a.relatedTarget;try{while(b&&b!==this)b=b.parentNode;b!==this&&(a.type=a.data,d.event.handle.apply(this,arguments))}catch(c){}},y=function(a){a.type=a.data,d.event.handle.apply(this,arguments)};d.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){d.event.special[a]={setup:function(c){d.event.add(this,b,c&&c.selector?y:x,a)},teardown:function(a){d.event.remove(this,b,a&&a.selector?y:x)}}}),d.support.submitBubbles||(d.event.special.submit={setup:function(a,c){if(this.nodeName&&this.nodeName.toLowerCase()!=="form")d.event.add(this,"click.specialSubmit",function(a){var c=a.target,e=c.type;if((e==="submit"||e==="image")&&d(c).closest("form").length){a.liveFired=b;return C("submit",this,arguments)}}),d.event.add(this,"keypress.specialSubmit",function(a){var c=a.target,e=c.type;if((e==="text"||e==="password")&&d(c).closest("form").length&&a.keyCode===13){a.liveFired=b;return C("submit",this,arguments)}});else return!1},teardown:function(a){d.event.remove(this,".specialSubmit")}});if(!d.support.changeBubbles){var z,A=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?d.map(a.options,function(a){return a.selected}).join("-"):"":a.nodeName.toLowerCase()==="select"&&(c=a.selectedIndex);return c},B=function B(a){var c=a.target,e,f;if(p.test(c.nodeName)&&!c.readOnly){e=d._data(c,"_change_data"),f=A(c),(a.type!=="focusout"||c.type!=="radio")&&d._data(c,"_change_data",f);if(e===b||f===e)return;if(e!=null||f){a.type="change",a.liveFired=b;return d.event.trigger(a,arguments[1],c)}}};d.event.special.change={filters:{focusout:B,beforedeactivate:B,click:function(a){var b=a.target,c=b.type;if(c==="radio"||c==="checkbox"||b.nodeName.toLowerCase()==="select")return B.call(this,a)},keydown:function(a){var b=a.target,c=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")return B.call(this,a)},beforeactivate:function(a){var b=a.target;d._data(b,"_change_data",A(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in z)d.event.add(this,c+".specialChange",z[c]);return p.test(this.nodeName)},teardown:function(a){d.event.remove(this,".specialChange");return p.test(this.nodeName)}},z=d.event.special.change.filters,z.focus=z.beforeactivate}c.addEventListener&&d.each({focus:"focusin",blur:"focusout"},function(a,b){function c(a){a=d.event.fix(a),a.type=b;return d.event.handle.call(this,a)}d.event.special[b]={setup:function(){this.addEventListener(a,c,!0)},teardown:function(){this.removeEventListener(a,c,!0)}}}),d.each(["bind","one"],function(a,c){d.fn[c]=function(a,e,f){if(typeof a==="object"){for(var g in a)this[c](g,e,a[g],f);return this}if(d.isFunction(e)||e===!1)f=e,e=b;var h=c==="one"?d.proxy(f,function(a){d(this).unbind(a,h);return f.apply(this,arguments)}):f;if(a==="unload"&&c!=="one")this.one(a,e,f);else for(var i=0,j=this.length;i<j;i++)d.event.add(this[i],a,h,e);return this}}),d.fn.extend({unbind:function(a,b){if(typeof a!=="object"||a.preventDefault)for(var e=0,f=this.length;e<f;e++)d.event.remove(this[e],a,b);else for(var c in a)this.unbind(c,a[c]);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){d.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var c=d.Event(a);c.preventDefault(),c.stopPropagation(),d.event.trigger(c,b,this[0]);return c.result}},toggle:function(a){var b=arguments,c=1;while(c<b.length)d.proxy(a,b[c++]);return this.click(d.proxy(a,function(e){var f=(d._data(this,"lastToggle"+a.guid)||0)%c;d._data(this,"lastToggle"+a.guid,f+1),e.preventDefault();return b[f].apply(this,arguments)||!1}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var D={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};d.each(["live","die"],function(a,c){d.fn[c]=function(a,e,f,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:d(this.context);if(typeof a==="object"&&!a.preventDefault){for(var p in a)n[c](p,e,a[p],m);return this}d.isFunction(e)&&(f=e,e=b),a=(a||"").split(" ");while((h=a[i++])!=null){j=o.exec(h),k="",j&&(k=j[0],h=h.replace(o,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,h==="focus"||h==="blur"?(a.push(D[h]+k),h=h+k):h=(D[h]||h)+k;if(c==="live")for(var q=0,r=n.length;q<r;q++)d.event.add(n[q],"live."+F(h,m),{data:e,selector:m,handler:f,origType:h,origHandler:f,preType:l});else n.unbind("live."+F(h,m),f)}return this}}),d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){d.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},d.attrFn&&(d.attrFn[b]=!0)}),function(){function s(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var j=d[g];if(j){var k=!1;j=j[a];while(j){if(j.sizcache===c){k=d[j.sizset];break}if(j.nodeType===1){f||(j.sizcache=c,j.sizset=g);if(typeof b!=="string"){if(j===b){k=!0;break}}else if(i.filter(b,[j]).length>0){k=j;break}}j=j[a]}d[g]=k}}}function r(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,f=Object.prototype.toString,g=!1,h=!0;[0,0].sort(function(){h=!1;return 0});var i=function(b,d,e,g){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!=="string")return e;var l,m,o,p,q,r,s,u,v=!0,w=i.isXML(d),x=[],y=b;do{a.exec(""),l=a.exec(y);if(l){y=l[3],x.push(l[1]);if(l[2]){p=l[3];break}}}while(l);if(x.length>1&&k.exec(b))if(x.length===2&&j.relative[x[0]])m=t(x[0]+x[1],d);else{m=j.relative[x[0]]?[d]:i(x.shift(),d);while(x.length)b=x.shift(),j.relative[b]&&(b+=x.shift()),m=t(b,m)}else{!g&&x.length>1&&d.nodeType===9&&!w&&j.match.ID.test(x[0])&&!j.match.ID.test(x[x.length-1])&&(q=i.find(x.shift(),d,w),d=q.expr?i.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:n(g)}:i.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),m=q.expr?i.filter(q.expr,q.set):q.set,x.length>0?o=n(m):v=!1;while(x.length)r=x.pop(),s=r,j.relative[r]?s=x.pop():r="",s==null&&(s=d),j.relative[r](o,s,w)}else o=x=[]}o||(o=m),o||i.error(r||b);if(f.call(o)==="[object Array]")if(v)if(d&&d.nodeType===1)for(u=0;o[u]!=null;u++)o[u]&&(o[u]===!0||o[u].nodeType===1&&i.contains(d,o[u]))&&e.push(m[u]);else for(u=0;o[u]!=null;u++)o[u]&&o[u].nodeType===1&&e.push(m[u]);else e.push.apply(e,o);else n(o,e);p&&(i(p,h,e,g),i.uniqueSort(e));return e};i.uniqueSort=function(a){if(p){g=h,a.sort(p);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},i.matches=function(a,b){return i(a,null,null,b)},i.matchesSelector=function(a,b){return i(b,null,null,[a]).length>0},i.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=j.order.length;e<f;e++){var g,h=j.order[e];if(g=j.leftMatch[h].exec(a)){var i=g[1];g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(/\\/g,""),d=j.find[h](g,b,c);if(d!=null){a=a.replace(j.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!=="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},i.filter=function(a,c,d,e){var f,g,h=a,k=[],l=c,m=c&&c[0]&&i.isXML(c[0]);while(a&&c.length){for(var n in j.filter)if((f=j.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=j.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;l===k&&(k=[]);if(j.preFilter[n]){f=j.preFilter[n](f,l,d,k,e,m);if(f){if(f===!0)continue}else g=o=!0}if(f)for(var s=0;(p=l[s])!=null;s++)if(p){o=q(p,f,s,l);var t=e^!!o;d&&o!=null?t?g=!0:l[s]=!1:t&&(k.push(p),g=!0)}if(o!==b){d||(l=k),a=a.replace(j.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)i.error(a);else break;h=a}return l},i.error=function(a){throw"Syntax error, unrecognized expression: "+a};var j=i.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")}},relative:{"+":function(a,b){var c=typeof b==="string",d=c&&!/\W/.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1){}a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&i.filter(b,a,!0)},">":function(a,b){var c,d=typeof b==="string",e=0,f=a.length;if(d&&!/\W/.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&i.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=s;typeof b==="string"&&!/\W/.test(b)&&(b=b.toLowerCase(),d=b,g=r),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=s;typeof b==="string"&&!/\W/.test(b)&&(b=b.toLowerCase(),d=b,g=r),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!=="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(/\\/g,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(/\\/g,"")},TAG:function(a,b){return a[1].toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||i.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&i.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(/\\/g,"");!f&&j.attrMap[g]&&(a[1]=j.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(/\\/g,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=i(b[3],null,null,c);else{var g=i.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(j.match.POS.test(b[0])||j.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!i(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){return"text"===a.type},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=j.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||i.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,k=g.length;h<k;h++)if(g[h]===a)return!1;return!0}i.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=j.attrHandle[c]?j.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=j.setFilters[e];if(f)return f(a,c,b,d)}}},k=j.match.POS,l=function(a,b){return"\\"+(b-0+1)};for(var m in j.match)j.match[m]=new RegExp(j.match[m].source+/(?![^\[]*\])(?![^\(]*\))/.source),j.leftMatch[m]=new RegExp(/(^(?:.|\r|\n)*?)/.source+j.match[m].source.replace(/\\(\d+)/g,l));var n=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(o){n=function(a,b){var c=0,d=b||[];if(f.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length==="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var p,q;c.documentElement.compareDocumentPosition?p=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(p=function(a,b){var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(a===b){g=!0;return 0}if(h===i)return q(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return q(e[k],f[k]);return k===c?q(a,f[k],-1):q(e[k],b,1)},q=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),i.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=i.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(j.find.ID=function(a,c,d){if(typeof c.getElementById!=="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!=="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},j.filter.ID=function(a,b){var c=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(j.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!=="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(j.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=i,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){i=function(b,e,f,g){e=e||c;if(!g&&!i.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return n(e.getElementsByTagName(b),f);if(h[2]&&j.find.CLASS&&e.getElementsByClassName)return n(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return n([e.body],f);if(h&&h[3]){var k=e.getElementById(h[3]);if(!k||!k.parentNode)return n([],f);if(k.id===h[3])return n([k],f)}try{return n(e.querySelectorAll(b),f)}catch(l){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e.getAttribute("id"),o=m||d,p=e.parentNode,q=/^\s*[+~]/.test(b);m?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),q&&p&&(e=e.parentNode);try{if(!q||p)return n(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(r){}finally{m||e.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)i[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector,d=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(e){d=!0}b&&(i.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!i.isXML(a))try{if(d||!j.match.PSEUDO.test(c)&&!/!=/.test(c))return b.call(a,c)}catch(e){}return i(c,null,null,[a]).length>0})}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;j.order.splice(1,0,"CLASS"),j.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!=="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?i.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?i.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:i.contains=function(){return!1},i.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var t=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=j.match.PSEUDO.exec(a))e+=c[0],a=a.replace(j.match.PSEUDO,"");a=j.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)i(a,f[g],d);return i.filter(e,d)};d.find=i,d.expr=i.selectors,d.expr[":"]=d.expr.filters,d.unique=i.uniqueSort,d.text=i.getText,d.isXMLDoc=i.isXML,d.contains=i.contains}();var G=/Until$/,H=/^(?:parents|prevUntil|prevAll)/,I=/,/,J=/^.[^:#\[\.,]*$/,K=Array.prototype.slice,L=d.expr.match.POS,M={children:!0,contents:!0,next:!0,prev:!0};d.fn.extend({find:function(a){var b=this.pushStack("","find",a),c=0;for(var e=0,f=this.length;e<f;e++){c=b.length,d.find(a,this[e],b);if(e>0)for(var g=c;g<b.length;g++)for(var h=0;h<c;h++)if(b[h]===b[g]){b.splice(g--,1);break}}return b},has:function(a){var b=d(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(d.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(O(this,a,!1),"not",a)},filter:function(a){return this.pushStack(O(this,a,!0),"filter",a)},is:function(a){return!!a&&d.filter(a,this).length>0},closest:function(a,b){var c=[],e,f,g=this[0];if(d.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(e=0,f=a.length;e<f;e++)i=a[e],j[i]||(j[i]=d.expr.match.POS.test(i)?d(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:d(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=L.test(a)?d(a,b||this.context):null;for(e=0,f=this.length;e<f;e++){g=this[e];while(g){if(l?l.index(g)>-1:d.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b)break}}c=c.length>1?d.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a==="string")return d.inArray(this[0],a?d(a):this.parent().children());return d.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a==="string"?d(a,b):d.makeArray(a),e=d.merge(this.get(),c);return this.pushStack(N(c[0])||N(e[0])?e:d.unique(e))},andSelf:function(){return this.add(this.prevObject)}}),d.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return d.dir(a,"parentNode")},parentsUntil:function(a,b,c){return d.dir(a,"parentNode",c)},next:function(a){return d.nth(a,2,"nextSibling")},prev:function(a){return d.nth(a,2,"previousSibling")},nextAll:function(a){return d.dir(a,"nextSibling")},prevAll:function(a){return d.dir(a,"previousSibling")},nextUntil:function(a,b,c){return d.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return d.dir(a,"previousSibling",c)},siblings:function(a){return d.sibling(a.parentNode.firstChild,a)},children:function(a){return d.sibling(a.firstChild)},contents:function(a){return d.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:d.makeArray(a.childNodes)}},function(a,b){d.fn[a]=function(c,e){var f=d.map(this,b,c),g=K.call(arguments);G.test(a)||(e=c),e&&typeof e==="string"&&(f=d.filter(e,f)),f=this.length>1&&!M[a]?d.unique(f):f,(this.length>1||I.test(e))&&H.test(a)&&(f=f.reverse());return this.pushStack(f,a,g.join(","))}}),d.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?d.find.matchesSelector(b[0],a)?[b[0]]:[]:d.find.matches(a,b)},dir:function(a,c,e){var f=[],g=a[c];while(g&&g.nodeType!==9&&(e===b||g.nodeType!==1||!d(g).is(e)))g.nodeType===1&&f.push(g),g=g[c];return f},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var P=/ jQuery\d+="(?:\d+|null)"/g,Q=/^\s+/,R=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,S=/<([\w:]+)/,T=/<tbody/i,U=/<|&#?\w+;/,V=/<(?:script|object|embed|option|style)/i,W=/checked\s*(?:[^=]|=\s*.checked.)/i,X={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};X.optgroup=X.option,X.tbody=X.tfoot=X.colgroup=X.caption=X.thead,X.th=X.td,d.support.htmlSerialize||(X._default=[1,"div<div>","</div>"]),d.fn.extend({text:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.text(a.call(this,b,c.text()))});if(typeof a!=="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return d.text(this)},wrapAll:function(a){if(d.isFunction(a))return this.each(function(b){d(this).wrapAll(a.call(this,b))});if(this[0]){var b=d(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(d.isFunction(a))return this.each(function(b){d(this).wrapInner(a.call(this,b))});return this.each(function(){var b=d(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){d(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){d.nodeName(this,"body")||d(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=d(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,d(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,e;(e=this[c])!=null;c++)if(!a||d.filter(a,[e]).length)!b&&e.nodeType===1&&(d.cleanData(e.getElementsByTagName("*")),d.cleanData([e])),e.parentNode&&e.parentNode.removeChild(e);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&d.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!0:a,b=b==null?a:b;return this.map(function(){return d.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(P,""):null;if(typeof a!=="string"||V.test(a)||!d.support.leadingWhitespace&&Q.test(a)||X[(S.exec(a)||["",""])[1].toLowerCase()])d.isFunction(a)?this.each(function(b){var c=d(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);else{a=a.replace(R,"<$1></$2>");try{for(var c=0,e=this.length;c<e;c++)this[c].nodeType===1&&(d.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(f){this.empty().append(a)}}return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(d.isFunction(a))return this.each(function(b){var c=d(this),e=c.html();c.replaceWith(a.call(this,b,e))});typeof a!=="string"&&(a=d(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;d(this).remove(),b?d(b).before(a):d(c).append(a)})}return this.pushStack(d(d.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,e){var f,g,h,i,j=a[0],k=[];if(!d.support.checkClone&&arguments.length===3&&typeof j==="string"&&W.test(j))return this.each(function(){d(this).domManip(a,c,e,!0)});if(d.isFunction(j))return this.each(function(f){var g=d(this);a[0]=j.call(this,f,c?g.html():b),g.domManip(a,c,e)});if(this[0]){i=j&&j.parentNode,d.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?f={fragment:i}:f=d.buildFragment(a,this,k),h=f.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&d.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)e.call(c?Y(this[l],g):this[l],f.cacheable||m>1&&l<n?d.clone(h,!0,!0):h)}k.length&&d.each(k,_)}return this}}),d.buildFragment=function(a,b,e){var f,g,h,i=b&&b[0]?b[0].ownerDocument||b[0]:c;a.length===1&&typeof a[0]==="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!V.test(a[0])&&(d.support.checkClone||!W.test(a[0]))&&(g=!0,h=d.fragments[a[0]],h&&(h!==1&&(f=h))),f||(f=i.createDocumentFragment(),d.clean(a,i,f,e)),g&&(d.fragments[a[0]]=h?f:1);return{fragment:f,cacheable:g}},d.fragments={},d.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){d.fn[a]=function(c){var e=[],f=d(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&f.length===1){f[b](this[0]);return this}for(var h=0,i=f.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();d(f[h])[b](j),e=e.concat(j)}return this.pushStack(e,a,f.selector)}}),d.extend({clone:function(a,b,c){var e=a.cloneNode(!0),f,g,h;if(!d.support.noCloneEvent&&(a.nodeType===1||a.nodeType===11)&&!d.isXMLDoc(a)){f=a.getElementsByTagName("*"),g=e.getElementsByTagName("*");for(h=0;f[h];++h)$(f[h],g[h]);$(a,e)}if(b){Z(a,e);if(c&&"getElementsByTagName"in a){f=a.getElementsByTagName("*"),g=e.getElementsByTagName("*");if(f.length)for(h=0;f[h];++h)Z(f[h],g[h])}}return e},clean:function(a,b,e,f){b=b||c,typeof b.createElement==="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var g=[];for(var h=0,i;(i=a[h])!=null;h++){typeof i==="number"&&(i+="");if(!i)continue;if(typeof i!=="string"||U.test(i)){if(typeof i==="string"){i=i.replace(R,"<$1></$2>");var j=(S.exec(i)||["",""])[1].toLowerCase(),k=X[j]||X._default,l=k[0],m=b.createElement("div");m.innerHTML=k[1]+i+k[2];while(l--)m=m.lastChild;if(!d.support.tbody){var n=T.test(i),o=j==="table"&&!n?m.firstChild&&m.firstChild.childNodes:k[1]==="<table>"&&!n?m.childNodes:[];for(var p=o.length-1;p>=0;--p)d.nodeName(o[p],"tbody")&&!o[p].childNodes.length&&o[p].parentNode.removeChild(o[p])}!d.support.leadingWhitespace&&Q.test(i)&&m.insertBefore(b.createTextNode(Q.exec(i)[0]),m.firstChild),i=m.childNodes}}else i=b.createTextNode(i);i.nodeType?g.push(i):g=d.merge(g,i)}if(e)for(h=0;g[h];h++)!f||!d.nodeName(g[h],"script")||g[h].type&&g[h].type.toLowerCase()!=="text/javascript"?(g[h].nodeType===1&&g.splice.apply(g,[h+1,0].concat(d.makeArray(g[h].getElementsByTagName("script")))),e.appendChild(g[h])):f.push(g[h].parentNode?g[h].parentNode.removeChild(g[h]):g[h]);return g},cleanData:function(a){var b,c,e=d.cache,f=d.expando,g=d.event.special,h=d.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&d.noData[j.nodeName.toLowerCase()])continue;c=j[d.expando];if(c){b=e[c]&&e[c][f];if(b&&b.events){for(var k in b.events)g[k]?d.event.remove(j,k):d.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[d.expando]:j.removeAttribute&&j.removeAttribute(d.expando),delete e[c]}}}});var ba=/alpha\([^)]*\)/i,bb=/opacity=([^)]*)/,bc=/-([a-z])/ig,bd=/([A-Z])/g,be=/^-?\d+(?:px)?$/i,bf=/^-?\d/,bg={position:"absolute",visibility:"hidden",display:"block"},bh=["Left","Right"],bi=["Top","Bottom"],bj,bk,bl,bm=function(a,b){return b.toUpperCase()};d.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return d.access(this,a,c,!0,function(a,c,e){return e!==b?d.style(a,c,e):d.css(a,c)})},d.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bj(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0},cssProps:{"float":d.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,e,f){if(a&&a.nodeType!==3&&a.nodeType!==8&&a.style){var g,h=d.camelCase(c),i=a.style,j=d.cssHooks[h];c=d.cssProps[h]||h;if(e===b){if(j&&"get"in j&&(g=j.get(a,!1,f))!==b)return g;return i[c]}if(typeof e==="number"&&isNaN(e)||e==null)return;typeof e==="number"&&!d.cssNumber[h]&&(e+="px");if(!j||!("set"in j)||(e=j.set(a,e))!==b)try{i[c]=e}catch(k){}}},css:function(a,c,e){var f,g=d.camelCase(c),h=d.cssHooks[g];c=d.cssProps[g]||g;if(h&&"get"in h&&(f=h.get(a,!0,e))!==b)return f;if(bj)return bj(a,c,g)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]},camelCase:function(a){return a.replace(bc,bm)}}),d.curCSS=d.css,d.each(["height","width"],function(a,b){d.cssHooks[b]={get:function(a,c,e){var f;if(c){a.offsetWidth!==0?f=bn(a,b,e):d.swap(a,bg,function(){f=bn(a,b,e)});if(f<=0){f=bj(a,b,b),f==="0px"&&bl&&(f=bl(a,b,b));if(f!=null)return f===""||f==="auto"?"0px":f}if(f<0||f==null){f=a.style[b];return f===""||f==="auto"?"0px":f}return typeof f==="string"?f:f+"px"}},set:function(a,b){if(!be.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),d.support.opacity||(d.cssHooks.opacity={get:function(a,b){return bb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style;c.zoom=1;var e=d.isNaN(b)?"":"alpha(opacity="+b*100+")",f=c.filter||"";c.filter=ba.test(f)?f.replace(ba,e):c.filter+" "+e}}),c.defaultView&&c.defaultView.getComputedStyle&&(bk=function(a,c,e){var f,g,h;e=e.replace(bd,"-$1").toLowerCase();if(!(g=a.ownerDocument.defaultView))return b;if(h=g.getComputedStyle(a,null))f=h.getPropertyValue(e),f===""&&!d.contains(a.ownerDocument.documentElement,a)&&(f=d.style(a,e));return f}),c.documentElement.currentStyle&&(bl=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!be.test(d)&&bf.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bj=bk||bl,d.expr&&d.expr.filters&&(d.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!d.support.reliableHiddenOffsets&&(a.style.display||d.css(a,"display"))==="none"},d.expr.filters.visible=function(a){return!d.expr.filters.hidden(a)});var bo=/%20/g,bp=/\[\]$/,bq=/\r?\n/g,br=/#.*$/,bs=/^(.*?):\s*(.*?)\r?$/mg,bt=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bu=/^(?:GET|HEAD)$/,bv=/^\/\//,bw=/\?/,bx=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,by=/^(?:select|textarea)/i,bz=/\s+/,bA=/([?&])_=[^&]*/,bB=/^(\w+:)\/\/([^\/?#:]+)(?::(\d+))?/,bC=d.fn.load,bD={},bE={};d.fn.extend({load:function(a,b,c){if(typeof a!=="string"&&bC)return bC.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var f=a.slice(e,a.length);a=a.slice(0,e)}var g="GET";b&&(d.isFunction(b)?(c=b,b=null):typeof b==="object"&&(b=d.param(b,d.ajaxSettings.traditional),g="POST"));var h=this;d.ajax({url:a,type:g,dataType:"html",data:b,complete:function(a,b,e){e=a.responseText,a.isResolved()&&(a.done(function(a){e=a}),h.html(f?d("<div>").append(e.replace(bx,"")).find(f):e)),c&&h.each(c,[e,b,a])}});return this},serialize:function(){return d.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?d.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||by.test(this.nodeName)||bt.test(this.type))}).map(function(a,b){var c=d(this).val();return c==null?null:d.isArray(c)?d.map(c,function(a,c){return{name:b.name,value:a.replace(bq,"\r\n")}}):{name:b.name,value:c.replace(bq,"\r\n")}}).get()}}),d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){d.fn[b]=function(a){return this.bind(b,a)}}),d.each(["get","post"],function(a,b){d[b]=function(a,c,e,f){d.isFunction(c)&&(f=f||e,e=c,c=null);return d.ajax({type:b,url:a,data:c,success:e,dataType:f})}}),d.extend({getScript:function(a,b){return d.get(a,null,b,"script")},getJSON:function(a,b,c){return d.get(a,b,c,"json")},ajaxSetup:function(a){d.extend(!0,d.ajaxSettings,a),a.context&&(d.ajaxSettings.context=a.context)},ajaxSettings:{url:location.href,global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":d.parseJSON,"text xml":d.parseXML}},ajaxPrefilter:bF(bD),ajaxTransport:bF(bE),ajax:function(a,e){function w(a,c,e,l){if(t!==2){t=2,p&&clearTimeout(p),o=b,m=l||"",v.readyState=a?4:0;var n,q,r,s=e?bI(f,v,e):b,u,w;if(a>=200&&a<300||a===304){if(f.ifModified){if(u=v.getResponseHeader("Last-Modified"))d.lastModified[f.url]=u;if(w=v.getResponseHeader("Etag"))d.etag[f.url]=w}if(a===304)c="notmodified",n=!0;else try{q=bJ(f,s),c="success",n=!0}catch(x){c="parsererror",r=x}}else r=c,a&&(c="error",a<0&&(a=0));v.status=a,v.statusText=c,n?i.resolveWith(g,[q,c,v]):i.rejectWith(g,[v,c,r]),v.statusCode(k),k=b,f.global&&h.trigger("ajax"+(n?"Success":"Error"),[v,f,n?q:r]),j.resolveWith(g,[v,c]),f.global&&(h.trigger("ajaxComplete",[v,f]),--d.active||d.event.trigger("ajaxStop"))}}typeof e!=="object"&&(e=a,a=b),e=e||{};var f=d.extend(!0,{},d.ajaxSettings,e),g=(f.context=("context"in e?e:d.ajaxSettings).context)||f,h=g===f?d.event:d(g),i=d.Deferred(),j=d._Deferred(),k=f.statusCode||{},l={},m,n,o,p,q=c.location,r=q.protocol||"http:",s,t=0,u,v={readyState:0,setRequestHeader:function(a,b){t===0&&(l[a.toLowerCase()]=b);return this},getAllResponseHeaders:function(){return t===2?m:null},getResponseHeader:function(a){var b;if(t===2){if(!n){n={};while(b=bs.exec(m))n[b[1].toLowerCase()]=b[2]}b=n[a.toLowerCase()]}return b||null},abort:function(a){a=a||"abort",o&&o.abort(a),w(0,a);return this}};i.promise(v),v.success=v.done,v.error=v.fail,v.complete=j.done,v.statusCode=function(a){if(a){var b;if(t<2)for(b in a)k[b]=[k[b],a[b]];else b=a[v.status],v.then(b,b)}return this},f.url=(""+(a||f.url)).replace(br,"").replace(bv,r+"//"),f.dataTypes=d.trim(f.dataType||"*").toLowerCase().split(bz),f.crossDomain||(s=bB.exec(f.url.toLowerCase()),f.crossDomain=s&&(s[1]!=r||s[2]!=q.hostname||(s[3]||(s[1]==="http:"?80:443))!=(q.port||(r==="http:"?80:443)))),f.data&&f.processData&&typeof f.data!=="string"&&(f.data=d.param(f.data,f.traditional)),bG(bD,f,e,v),f.type=f.type.toUpperCase(),f.hasContent=!bu.test(f.type),f.global&&d.active++===0&&d.event.trigger("ajaxStart");if(!f.hasContent){f.data&&(f.url+=(bw.test(f.url)?"&":"?")+f.data);if(f.cache===!1){var x=d.now(),y=f.url.replace(bA,"$1_="+x);f.url=y+(y===f.url?(bw.test(f.url)?"&":"?")+"_="+x:"")}}if(f.data&&f.hasContent&&f.contentType!==!1||e.contentType)l["content-type"]=f.contentType;f.ifModified&&(d.lastModified[f.url]&&(l["if-modified-since"]=d.lastModified[f.url]),d.etag[f.url]&&(l["if-none-match"]=d.etag[f.url])),l.accept=f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+(f.dataTypes[0]!=="*"?", */*; q=0.01":""):f.accepts["*"];for(u in f.headers)l[u.toLowerCase()]=f.headers[u];if(!f.beforeSend||f.beforeSend.call(g,v,f)!==!1&&t!==2){for(u in {success:1,error:1,complete:1})v[u](f[u]);o=bG(bE,f,e,v);if(o){t=v.readyState=1,f.global&&h.trigger("ajaxSend",[v,f]),f.async&&f.timeout>0&&(p=setTimeout(function(){v.abort("timeout")},f.timeout));try{o.send(l,w)}catch(z){status<2?w(-1,z):d.error(z)}}else w(-1,"No Transport")}else w(0,"abort"),v=!1;return v},param:function(a,c){var e=[],f=function(a,b){b=d.isFunction(b)?b():b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=d.ajaxSettings.traditional);if(d.isArray(a)||a.jquery)d.each(a,function(){f(this.name,this.value)});else for(var g in a)bH(g,a[g],c,f);return e.join("&").replace(bo,"+")}}),d.extend({active:0,lastModified:{},etag:{}});var bK=d.now(),bL=/(\=)\?(&|$)|()\?\?()/i;d.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return d.expando+"_"+bK++}}),d.ajaxPrefilter("json jsonp",function(b,c,e){e=typeof b.data==="string";if(b.dataTypes[0]==="jsonp"||c.jsonpCallback||c.jsonp!=null||b.jsonp!==!1&&(bL.test(b.url)||e&&bL.test(b.data))){var f,g=b.jsonpCallback=d.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h=a[g],i=b.url,j=b.data,k="$1"+g+"$2";b.jsonp!==!1&&(i=i.replace(bL,k),b.url===i&&(e&&(j=j.replace(bL,k)),b.data===j&&(i+=(/\?/.test(i)?"&":"?")+b.jsonp+"="+g))),b.url=i,b.data=j,a[g]=function(a){f=[a]},b.complete=[function(){a[g]=h;if(h)f&&d.isFunction(h)&&a[g](f[0]);else try{delete a[g]}catch(b){}},b.complete],b.converters["script json"]=function(){f||d.error(g+" was not called");return f[0]},b.dataTypes[0]="json";return"script"}}),d.ajaxSetup({accepts:{script:"text/javascript, application/javascript"},contents:{script:/javascript/},converters:{"text script":function(a){d.globalEval(a);return a}}}),d.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),d.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var bM=d.now(),bN={},bO,bP;d.ajaxSettings.xhr=a.ActiveXObject?function(){if(a.location.protocol!=="file:")try{return new a.XMLHttpRequest}catch(b){}try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(c){}}:function(){return new a.XMLHttpRequest};try{bP=d.ajaxSettings.xhr()}catch(bQ){}d.support.ajax=!!bP,d.support.cors=bP&&"withCredentials"in bP,bP=b,d.support.ajax&&d.ajaxTransport(function(b){if(!b.crossDomain||d.support.cors){var c;return{send:function(e,f){bO||(bO=1,d(a).bind("unload",function(){d.each(bN,function(a,b){b.onreadystatechange&&b.onreadystatechange(1)})}));var g=b.xhr(),h;b.username?g.open(b.type,b.url,b.async,b.username,b.password):g.open(b.type,b.url,b.async),(!b.crossDomain||b.hasContent)&&!e["x-requested-with"]&&(e["x-requested-with"]="XMLHttpRequest");try{d.each(e,function(a,b){g.setRequestHeader(a,b)})}catch(i){}g.send(b.hasContent&&b.data||null),c=function(a,e){if(c&&(e||g.readyState===4)){c=0,h&&(g.onreadystatechange=d.noop,delete bN[h]);if(e)g.readyState!==4&&g.abort();else{var i=g.status,j,k=g.getAllResponseHeaders(),l={},m=g.responseXML;m&&m.documentElement&&(l.xml=m),l.text=g.responseText;try{j=g.statusText}catch(n){j=""}i=i===0?!b.crossDomain||j?k?304:0:302:i==1223?204:i,f(i,j,l,k)}}},b.async&&g.readyState!==4?(h=bM++,bN[h]=g,g.onreadystatechange=c):c()},abort:function(){c&&c(0,1)}}}});var bR={},bS=/^(?:toggle|show|hide)$/,bT=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,bU,bV=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];d.fn.extend({show:function(a,b,c){var e,f;if(a||a===0)return this.animate(bW("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)e=this[g],f=e.style.display,!d._data(e,"olddisplay")&&f==="none"&&(f=e.style.display=""),f===""&&d.css(e,"display")==="none"&&d._data(e,"olddisplay",bX(e.nodeName));for(g=0;g<h;g++){e=this[g],f=e.style.display;if(f===""||f==="none")e.style.display=d._data(e,"olddisplay")||""}return this},hide:function(a,b,c){if(a||a===0)return this.animate(bW("hide",3),a,b,c);for(var e=0,f=this.length;e<f;e++){var g=d.css(this[e],"display");g!=="none"&&!d._data(this[e],"olddisplay")&&d._data(this[e],"olddisplay",g)}for(e=0;e<f;e++)this[e].style.display="none";return this},_toggle:d.fn.toggle,toggle:function(a,b,c){var e=typeof a==="boolean";d.isFunction(a)&&d.isFunction(b)?this._toggle.apply(this,arguments):a==null||e?this.each(function(){var b=e?a:d(this).is(":hidden");d(this)[b?"show":"hide"]()}):this.animate(bW("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,e){var f=d.speed(b,c,e);if(d.isEmptyObject(a))return this.each(f.complete);return this[f.queue===!1?"each":"queue"](function(){var b=d.extend({},f),c,e=this.nodeType===1,g=e&&d(this).is(":hidden"),h=this;for(c in a){var i=d.camelCase(c);c!==i&&(a[i]=a[c],delete a[c],c=i);if(a[c]==="hide"&&g||a[c]==="show"&&!g)return b.complete.call(this);if(e&&(c==="height"||c==="width")){b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(d.css(this,"display")==="inline"&&d.css(this,"float")==="none")if(d.support.inlineBlockNeedsLayout){var j=bX(this.nodeName);j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)}else this.style.display="inline-block"}d.isArray(a[c])&&((b.specialEasing=b.specialEasing||{})[c]=a[c][1],a[c]=a[c][0])}b.overflow!=null&&(this.style.overflow="hidden"),b.curAnim=d.extend({},a),d.each(a,function(c,e){var f=new d.fx(h,b,c);if(bS.test(e))f[e==="toggle"?g?"show":"hide":e](a);else{var i=bT.exec(e),j=f.cur()||0;if(i){var k=parseFloat(i[2]),l=i[3]||"px";l!=="px"&&(d.style(h,c,(k||1)+l),j=(k||1)/f.cur()*j,d.style(h,c,j+l)),i[1]&&(k=(i[1]==="-="?-1:1)*k+j),f.custom(j,k,l)}else f.custom(j,e,"")}});return!0})},stop:function(a,b){var c=d.timers;a&&this.queue([]),this.each(function(){for(var a=c.length-1;a>=0;a--)c[a].elem===this&&(b&&c[a](!0),c.splice(a,1))}),b||this.dequeue();return this}}),d.each({slideDown:bW("show",1),slideUp:bW("hide",1),slideToggle:bW("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){d.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),d.extend({speed:function(a,b,c){var e=a&&typeof a==="object"?d.extend({},a):{complete:c||!c&&b||d.isFunction(a)&&a,duration:a,easing:c&&b||b&&!d.isFunction(b)&&b};e.duration=d.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in d.fx.speeds?d.fx.speeds[e.duration]:d.fx.speeds._default,e.old=e.complete,e.complete=function(){e.queue!==!1&&d(this).dequeue(),d.isFunction(e.old)&&e.old.call(this)};return e},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig||(b.orig={})}}),d.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(d.fx.step[this.prop]||d.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a=parseFloat(d.css(this.elem,this.prop));return a||0},custom:function(a,b,c){function g(a){return e.step(a)}var e=this,f=d.fx;this.startTime=d.now(),this.start=a,this.end=b,this.unit=c||this.unit||"px",this.now=this.start,this.pos=this.state=0,g.elem=this.elem,g()&&d.timers.push(g)&&!bU&&(bU=setInterval(f.tick,f.interval))},show:function(){this.options.orig[this.prop]=d.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),d(this.elem).show()},hide:function(){this.options.orig[this.prop]=d.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=d.now(),c=!0;if(a||b>=this.options.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),this.options.curAnim[this.prop]=!0;for(var e in this.options.curAnim)this.options.curAnim[e]!==!0&&(c=!1);if(c){if(this.options.overflow!=null&&!d.support.shrinkWrapBlocks){var f=this.elem,g=this.options;d.each(["","X","Y"],function(a,b){f.style["overflow"+b]=g.overflow[a]})}this.options.hide&&d(this.elem).hide();if(this.options.hide||this.options.show)for(var h in this.options.curAnim)d.style(this.elem,h,this.options.orig[h]);this.options.complete.call(this.elem)}return!1}var i=b-this.startTime;this.state=i/this.options.duration;var j=this.options.specialEasing&&this.options.specialEasing[this.prop],k=this.options.easing||(d.easing.swing?"swing":"linear");this.pos=d.easing[j||k](this.state,i,0,1,this.options.duration),this.now=this.start+(this.end-this.start)*this.pos,this.update();return!0}},d.extend(d.fx,{tick:function(){var a=d.timers;for(var b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||d.fx.stop()},interval:13,stop:function(){clearInterval(bU),bU=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){d.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),d.expr&&d.expr.filters&&(d.expr.filters.animated=function(a){return d.grep(d.timers,function(b){return a===b.elem}).length});var bY=/^t(?:able|d|h)$/i,bZ=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?d.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){d.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return d.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(e){}var f=b.ownerDocument,g=f.documentElement;if(!c||!d.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=f.body,i=b$(f),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||d.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||d.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:d.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){d.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return d.offset.bodyOffset(b);d.offset.initialize();var c,e=b.offsetParent,f=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(d.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===e&&(l+=b.offsetTop,m+=b.offsetLeft,d.offset.doesNotAddBorder&&(!d.offset.doesAddBorderForTableAndCells||!bY.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),f=e,e=b.offsetParent),d.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;d.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},d.offset={initialize:function(){var a=c.body,b=c.createElement("div"),e,f,g,h,i=parseFloat(d.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";d.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),e=b.firstChild,f=e.firstChild,h=e.nextSibling.firstChild.firstChild,this.doesNotAddBorder=f.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,f.style.position="fixed",f.style.top="20px",this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15,f.style.position=f.style.top="",e.style.overflow="hidden",e.style.position="relative",this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),a=b=e=f=g=h=null,d.offset.initialize=d.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;d.offset.initialize(),d.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(d.css(a,"marginTop"))||0,c+=parseFloat(d.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var e=d.css(a,"position");e==="static"&&(a.style.position="relative");var f=d(a),g=f.offset(),h=d.css(a,"top"),i=d.css(a,"left"),j=e==="absolute"&&d.inArray("auto",[h,i])>-1,k={},l={},m,n;j&&(l=f.position()),m=j?l.top:parseInt(h,10)||0,n=j?l.left:parseInt(i,10)||0,d.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):f.css(k)}},d.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),e=bZ.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(d.css(a,"marginTop"))||0,c.left-=parseFloat(d.css(a,"marginLeft"))||0,e.top+=parseFloat(d.css(b[0],"borderTopWidth"))||0,e.left+=parseFloat(d.css(b[0],"borderLeftWidth"))||0;return{top:c.top-e.top,left:c.left-e.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&(!bZ.test(a.nodeName)&&d.css(a,"position")==="static"))a=a.offsetParent;return a})}}),d.each(["Left","Top"],function(a,c){var e="scroll"+c;d.fn[e]=function(c){var f=this[0],g;if(!f)return null;if(c!==b)return this.each(function(){g=b$(this),g?g.scrollTo(a?d(g).scrollLeft():c,a?c:d(g).scrollTop()):this[e]=c});g=b$(f);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:d.support.boxModel&&g.document.documentElement[e]||g.document.body[e]:f[e]}}),d.each(["Height","Width"],function(a,c){var e=c.toLowerCase();d.fn["inner"+c]=function(){return this[0]?parseFloat(d.css(this[0],e,"padding")):null},d.fn["outer"+c]=function(a){return this[0]?parseFloat(d.css(this[0],e,a?"margin":"border")):null},d.fn[e]=function(a){var f=this[0];if(!f)return a==null?null:this;if(d.isFunction(a))return this.each(function(b){var c=d(this);c[e](a.call(this,b,c[e]()))});if(d.isWindow(f)){var g=f.document.documentElement["client"+c];return f.document.compatMode==="CSS1Compat"&&g||f.document.body["client"+c]||g}if(f.nodeType===9)return Math.max(f.documentElement["client"+c],f.body["scroll"+c],f.documentElement["scroll"+c],f.body["offset"+c],f.documentElement["offset"+c]);if(a===b){var h=d.css(f,e),i=parseFloat(h);return d.isNaN(i)?h:i}return this.css(e,typeof a==="string"?a:a+"px")}})})(window);
;
	var q = window.jQuery;
	js.JQuery = q;
	q.fn.noBubble = q.fn.bind;
	q.fn.loadURL = q.fn.load;
	q.fn.toggleClick = q.fn.toggle;
	q.of = q;
	q.fn.iterator = function() {
		return { pos : 0, j : this, hasNext : function() {
			return this.pos < this.j.length;
		}, next : function() {
			return $(this.j[this.pos++]);
		}};
	};
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
AppConfig.projectDir = "/home/jason/VoseProjects/";
domtools.ElementManipulation.NodeTypeElement = 1;
domtools.ElementManipulation.NodeTypeAttribute = 2;
domtools.ElementManipulation.NodeTypeText = 3;
hscript.Parser.p1 = 0;
hscript.Parser.readPos = 0;
hscript.Parser.tokenMin = 0;
hscript.Parser.tokenMax = 0;
client.Client.conn = haxe.remoting.HttpAsyncConnection.urlConnect("http://localhost:1337");
app.project.ProjectController.projectAPI = new app.project.ProjectAPIProxy(client.Client.conn);
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
erazor.Parser.at = "@";
erazor.Parser.bracketMismatch = "Bracket mismatch! Inside template, non-paired brackets, '{' or '}', should be replaced by @{'{'} and @{'}'}.";
js.Lib.onerror = null;
client.Client.main()