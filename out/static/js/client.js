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
var client = client || {}
if(!client.view) client.view = {}
client.view.CopyView = $hxClasses["client.view.CopyView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(this,"controller");
	domtools.QueryElementManipulation.setText(this,"Copy Controller");
};
client.view.CopyView.__name__ = ["client","view","CopyView"];
client.view.CopyView.__super__ = domtools.AbstractCustomElement;
client.view.CopyView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: client.view.CopyView
});
client.view.AuthorView = $hxClasses["client.view.AuthorView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(this,"controller");
	domtools.QueryElementManipulation.setText(this,"Author Controller");
};
client.view.AuthorView.__name__ = ["client","view","AuthorView"];
client.view.AuthorView.__super__ = domtools.AbstractCustomElement;
client.view.AuthorView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: client.view.AuthorView
});
var server = server || {}
if(!server.api) server.api = {}
server.api.FileSystemProxy = $hxClasses["server.api.FileSystemProxy"] = function(c) {
	this._conn = c.resolve("server.api.FileSystemService");
};
server.api.FileSystemProxy.__name__ = ["server","api","FileSystemProxy"];
server.api.FileSystemProxy.prototype = {
	_conn: null
	,getTheFoo: function(fooId,cb) {
		this._conn.resolve("getTheFoo").call([fooId],cb);
	}
	,__class__: server.api.FileSystemProxy
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
if(!client.controller) client.controller = {}
client.controller.ProjectController = $hxClasses["client.controller.ProjectController"] = function() {
	this.view = new client.view.ProjectView(this);
	document.body.appendChild(this.view.collection[0]);
};
client.controller.ProjectController.__name__ = ["client","controller","ProjectController"];
client.controller.ProjectController.prototype = {
	view: null
	,__class__: client.controller.ProjectController
}
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
client.controller.SlideController = $hxClasses["client.controller.SlideController"] = function() {
	this.view = new client.view.SlideView(this);
	document.body.appendChild(this.view.collection[0]);
};
client.controller.SlideController.__name__ = ["client","controller","SlideController"];
client.controller.SlideController.prototype = {
	view: null
	,__class__: client.controller.SlideController
}
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
	var firstChildUsed = false;
	var $it0 = parentCollection.collection.iterator();
	while( $it0.hasNext() ) {
		var parent = $it0.next();
		childNode = firstChildUsed || childNode == null?childNode:childNode.cloneNode(true);
		childCollection = firstChildUsed || childCollection == null?childCollection:childCollection.clone();
		domtools.DOMManipulation.append(parent,childNode,childCollection);
		firstChildUsed = true;
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
server.api.LauncherProxy = $hxClasses["server.api.LauncherProxy"] = function(c) {
	this._conn = c.resolve("server.api.LauncherService");
};
server.api.LauncherProxy.__name__ = ["server","api","LauncherProxy"];
server.api.LauncherProxy.prototype = {
	_conn: null
	,launch: function(cmd,args,cb) {
		this._conn.resolve("launch").call([cmd,args],cb);
	}
	,__class__: server.api.LauncherProxy
}
client.view.VideoView = $hxClasses["client.view.VideoView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(this,"controller");
	domtools.QueryElementManipulation.setText(this,"Video Controller");
};
client.view.VideoView.__name__ = ["client","view","VideoView"];
client.view.VideoView.__super__ = domtools.AbstractCustomElement;
client.view.VideoView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: client.view.VideoView
});
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
client.controller.VideoController = $hxClasses["client.controller.VideoController"] = function() {
	this.view = new client.view.VideoView(this);
	document.body.appendChild(this.view.collection[0]);
};
client.controller.VideoController.__name__ = ["client","controller","VideoController"];
client.controller.VideoController.prototype = {
	view: null
	,__class__: client.controller.VideoController
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
client.controller.CopyController = $hxClasses["client.controller.CopyController"] = function() {
	this.view = new client.view.CopyView(this);
	document.body.appendChild(this.view.collection[0]);
};
client.controller.CopyController.__name__ = ["client","controller","CopyController"];
client.controller.CopyController.prototype = {
	view: null
	,__class__: client.controller.CopyController
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
client.view.SlideView = $hxClasses["client.view.SlideView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(this,"controller");
	domtools.QueryElementManipulation.setText(this,"Slide Controller");
};
client.view.SlideView.__name__ = ["client","view","SlideView"];
client.view.SlideView.__super__ = domtools.AbstractCustomElement;
client.view.SlideView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: client.view.SlideView
});
client.controller.EditController = $hxClasses["client.controller.EditController"] = function() {
	this.view = new client.view.EditView(this);
	document.body.appendChild(this.view.collection[0]);
};
client.controller.EditController.__name__ = ["client","controller","EditController"];
client.controller.EditController.prototype = {
	view: null
	,__class__: client.controller.EditController
}
client.Client = $hxClasses["client.Client"] = function() { }
client.Client.__name__ = ["client","Client"];
client.Client.fileSystem = null;
client.Client.launcher = null;
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
	client.Client.projectController = new client.controller.ProjectController();
	client.Client.videoController = new client.controller.VideoController();
	client.Client.copyController = new client.controller.CopyController();
	client.Client.editController = new client.controller.EditController();
	client.Client.slideController = new client.controller.SlideController();
	client.Client.authorController = new client.controller.AuthorController();
}
client.Client.initialiseAPI = function() {
	var conn = haxe.remoting.HttpAsyncConnection.urlConnect("http://localhost:1337");
	conn.setErrorHandler(function(err) {
		haxe.Log.trace("Error : " + err,{ fileName : "Client.hx", lineNumber : 55, className : "client.Client", methodName : "initialiseAPI"});
	});
	client.Client.fileSystem = new server.api.FileSystemProxy(conn);
	client.Client.launcher = new server.api.LauncherProxy(conn);
	client.Client.notifications = new server.api.NotificationsProxy(conn);
	client.Client.scheduler = new server.api.SchedulerProxy(conn);
}
client.Client.prototype = {
	__class__: client.Client
}
client.view.ProjectView = $hxClasses["client.view.ProjectView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(this,"controller");
	domtools.QueryElementManipulation.setText(this,"Project Controller");
};
client.view.ProjectView.__name__ = ["client","view","ProjectView"];
client.view.ProjectView.__super__ = domtools.AbstractCustomElement;
client.view.ProjectView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: client.view.ProjectView
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
if(!client.view.ui) client.view.ui = {}
if(!client.view.ui.menu) client.view.ui.menu = {}
client.view.ui.menu.Menu = $hxClasses["client.view.ui.menu.Menu"] = function() {
	domtools.AbstractCustomElement.call(this,"ul");
	domtools.QueryElementManipulation.addClass(this,"menu");
	this.items = new Hash();
};
client.view.ui.menu.Menu.__name__ = ["client","view","ui","menu","Menu"];
client.view.ui.menu.Menu.__super__ = domtools.AbstractCustomElement;
client.view.ui.menu.Menu.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	items: null
	,addMenuItem: function(id,title) {
		var menuItem = new client.view.ui.menu.MenuItem(id,title);
		domtools.QueryDOMManipulation.appendTo(menuItem,null,this);
		this.items.set(id,menuItem);
	}
	,get: function(id) {
		return this.items.get(id);
	}
	,__class__: client.view.ui.menu.Menu
});
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
client.view.ui.menu.MenuItem = $hxClasses["client.view.ui.menu.MenuItem"] = function(id,text) {
	domtools.AbstractCustomElement.call(this,"li");
	domtools.QueryDOMManipulation.append(this,document.createElement("a"));
	this.a = new domtools.Query(null,this.collection[0]);
	this.setID(id).setText(text);
};
client.view.ui.menu.MenuItem.__name__ = ["client","view","ui","menu","MenuItem"];
client.view.ui.menu.MenuItem.__super__ = domtools.AbstractCustomElement;
client.view.ui.menu.MenuItem.prototype = $extend(domtools.AbstractCustomElement.prototype,{
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
	,__class__: client.view.ui.menu.MenuItem
});
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
client.Interface.templateFile = null;
client.Interface.prototype = {
	title: null
	,currentControllerShowing: null
	,drawMenu: function() {
		var menu = new client.view.ui.menu.Menu();
		menu.addMenuItem("copy","Copy Clips");
		menu.addMenuItem("edit","Edit Video");
		menu.addMenuItem("slides","Create Slides");
		menu.addMenuItem("dvd","Author DVD");
		document.body.appendChild(menu.collection[0]);
		domtools.QueryEventManagement.on(new domtools.Query(".menu li"),"click",this.activateMenuItem.$bind(this));
	}
	,activateMenuItem: function(e) {
		var menuItem = e.currentTarget;
		var id = StringTools.replace(domtools.ElementManipulation.attr(menuItem.firstChild,"href"),"#","");
		if(this.currentControllerShowing != id) switch(id) {
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
		this.currentControllerShowing = id;
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
client.controller.AuthorController = $hxClasses["client.controller.AuthorController"] = function() {
	this.view = new client.view.AuthorView(this);
	document.body.appendChild(this.view.collection[0]);
};
client.controller.AuthorController.__name__ = ["client","controller","AuthorController"];
client.controller.AuthorController.prototype = {
	view: null
	,__class__: client.controller.AuthorController
}
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
client.view.EditView = $hxClasses["client.view.EditView"] = function(c) {
	domtools.AbstractCustomElement.call(this,"div");
	this.controller = c;
	domtools.QueryElementManipulation.addClass(this,"controller");
	domtools.QueryElementManipulation.setText(this,"Edit Controller");
};
client.view.EditView.__name__ = ["client","view","EditView"];
client.view.EditView.__super__ = domtools.AbstractCustomElement;
client.view.EditView.prototype = $extend(domtools.AbstractCustomElement.prototype,{
	controller: null
	,__class__: client.view.EditView
});
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
domtools.ElementManipulation.NodeTypeElement = 1;
domtools.ElementManipulation.NodeTypeAttribute = 2;
domtools.ElementManipulation.NodeTypeText = 3;
hscript.Parser.p1 = 0;
hscript.Parser.readPos = 0;
hscript.Parser.tokenMin = 0;
hscript.Parser.tokenMax = 0;
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
erazor.Parser.at = "@";
erazor.Parser.bracketMismatch = "Bracket mismatch! Inside template, non-paired brackets, '{' or '}', should be replaced by @{'{'} and @{'}'}.";
js.Lib.onerror = null;
client.Client.main()