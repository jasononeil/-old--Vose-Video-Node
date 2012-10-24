var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var AppConfig = $hxClasses["AppConfig"] = function() { }
AppConfig.__name__ = ["AppConfig"];
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
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.b += Std.string(this.matchedLeft());
			buf.b += Std.string(f(this));
			s = this.matchedRight();
		}
		buf.b += Std.string(s);
		return buf.b;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,h: null
	,__class__: Hash
}
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
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
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = { };
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,h: null
	,__class__: IntHash
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
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
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b += Std.string("{");
		while(l != null) {
			if(first) first = false; else s.b += Std.string(", ");
			s.b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s.b += Std.string("}");
		return s.b;
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
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
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
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
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
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
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
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
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
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,b: null
	,__class__: StringBuf
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
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
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
		ns += HxOverrides.substr(c,0,l - sl);
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
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
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
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
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
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
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
		if(v.__name__ || v.__ename__) return ValueType.TObject;
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
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var Xml = $hxClasses["Xml"] = function() {
};
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype = {
	toString: function() {
		if(this.nodeType == Xml.PCData) return this._nodeValue;
		if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
		if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
		if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
		if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
		var s = new StringBuf();
		if(this.nodeType == Xml.Element) {
			s.b += Std.string("<");
			s.b += Std.string(this._nodeName);
			var $it0 = this._attributes.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				s.b += Std.string(" ");
				s.b += Std.string(k);
				s.b += Std.string("=\"");
				s.b += Std.string(this._attributes.get(k));
				s.b += Std.string("\"");
			}
			if(this._children.length == 0) {
				s.b += Std.string("/>");
				return s.b;
			}
			s.b += Std.string(">");
		}
		var $it1 = this.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			s.b += Std.string(x.toString());
		}
		if(this.nodeType == Xml.Element) {
			s.b += Std.string("</");
			s.b += Std.string(this._nodeName);
			s.b += Std.string(">");
		}
		return s.b;
	}
	,insertChild: function(x,pos) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.splice(pos,0,x);
	}
	,removeChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		var b = HxOverrides.remove(this._children,x);
		if(b) x._parent = null;
		return b;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k++;
				if(n.nodeType == Xml.Element && n._nodeName == name) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.keys();
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.remove(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,getParent: function() {
		return this._parent;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,_parent: null
	,_children: null
	,_attributes: null
	,_nodeValue: null
	,_nodeName: null
	,parent: null
	,nodeValue: null
	,nodeName: null
	,nodeType: null
	,__class__: Xml
	,__properties__: {set_nodeName:"setNodeName",get_nodeName:"getNodeName",set_nodeValue:"setNodeValue",get_nodeValue:"getNodeValue",get_parent:"getParent"}
}
var app = app || {}
if(!app.author) app.author = {}
app.author.AuthorController = $hxClasses["app.author.AuthorController"] = function() {
	this.view = new app.author.AuthorView(this);
};
app.author.AuthorController.__name__ = ["app","author","AuthorController"];
app.author.AuthorController.prototype = {
	view: null
	,__class__: app.author.AuthorController
}
var dtx = dtx || {}
dtx.DOMCollection = $hxClasses["dtx.DOMCollection"] = function(selector,node,collection) {
	if(selector == null) selector = "";
	this.collection = new Array();
	if(node != null) {
		if(node != null) {
			if(Lambda.has(this.collection,node) == false) this.collection.push(node);
		}
		this;
	}
	if(collection != null) this.addCollection(collection);
	if(selector != "") {
		var nodeList = ((function($this) {
			var $r;
			if(dtx.Tools.document == null) dtx.Tools.document = document;
			$r = dtx.Tools.document;
			return $r;
		}(this))).querySelectorAll(selector,null);
		this.addNodeList(nodeList);
	}
};
dtx.DOMCollection.__name__ = ["dtx","DOMCollection"];
dtx.DOMCollection.prototype = {
	get_length: function() {
		return this.collection.length;
	}
	,clone: function(deep) {
		if(deep == null) deep = true;
		var q = new dtx.DOMCollection();
		var $it0 = HxOverrides.iter(this.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			q.add(node.cloneNode(deep));
		}
		return q;
	}
	,filter: function(fn) {
		var newCollection;
		if(fn != null) {
			var filtered = Lambda.filter(this.collection,fn);
			newCollection = new dtx.DOMCollection(null,null,filtered);
		} else newCollection = new dtx.DOMCollection(null,null,this.collection);
		return newCollection;
	}
	,each: function(f) {
		if(f != null) Lambda.iter(this.collection,f);
		return this;
	}
	,removeNode: function(n) {
		HxOverrides.remove(this.collection,n);
	}
	,removeFromCollection: function(node,nodeCollection) {
		if(node != null) HxOverrides.remove(this.collection,node);
		if(nodeCollection != null) {
			var $it0 = HxOverrides.iter(nodeCollection.collection);
			while( $it0.hasNext() ) {
				var n = $it0.next();
				HxOverrides.remove(this.collection,n);
			}
		}
		return this;
	}
	,addNodeList: function(nodeList,elementsOnly) {
		if(elementsOnly == null) elementsOnly = true;
		var _g1 = 0, _g = nodeList.length;
		while(_g1 < _g) {
			var i = _g1++;
			var node = nodeList.item(i);
			if(elementsOnly == false || dtx.single.ElementManipulation.isElement(node)) {
				if(node != null) {
					if(Lambda.has(this.collection,node) == false) this.collection.push(node);
				}
				this;
			}
		}
		return this;
	}
	,addCollection: function(collection,elementsOnly) {
		if(elementsOnly == null) elementsOnly = false;
		if(collection != null) {
			var $it0 = $iterator(collection)();
			while( $it0.hasNext() ) {
				var node = $it0.next();
				if(elementsOnly == false || dtx.single.ElementManipulation.isElement(node)) {
					if(node != null) {
						if(Lambda.has(this.collection,node) == false) this.collection.push(node);
					}
					this;
				}
			}
		}
		return this;
	}
	,add: function(node) {
		if(node != null) {
			if(Lambda.has(this.collection,node) == false) this.collection.push(node);
		}
		return this;
	}
	,last: function() {
		return new dtx.DOMCollection(null,this.collection[this.collection.length - 1]);
	}
	,first: function() {
		return new dtx.DOMCollection(null,this.collection[0]);
	}
	,eq: function(i) {
		if(i == null) i = 0;
		return new dtx.DOMCollection(null,this.collection[i]);
	}
	,getNode: function(i) {
		if(i == null) i = 0;
		return this.collection[i];
	}
	,iterator: function() {
		return HxOverrides.iter(this.collection);
	}
	,length: null
	,collection: null
	,__class__: dtx.DOMCollection
	,__properties__: {get_length:"get_length"}
}
if(!dtx.widget) dtx.widget = {}
dtx.widget.Widget = $hxClasses["dtx.widget.Widget"] = function(tpl) {
	this._tpl = "<div></div>";
	dtx.DOMCollection.call(this);
	if(tpl != null) this._tpl = tpl;
	var q = dtx.Tools.parse(this.get_template());
	this.collection = q.collection;
};
dtx.widget.Widget.__name__ = ["dtx","widget","Widget"];
dtx.widget.Widget.__super__ = dtx.DOMCollection;
dtx.widget.Widget.prototype = $extend(dtx.DOMCollection.prototype,{
	get_template: function() {
		return this._tpl;
	}
	,_tpl: null
	,__class__: dtx.widget.Widget
});
app.author.AuthorView = $hxClasses["app.author.AuthorView"] = function(c) {
	dtx.widget.Widget.call(this);
	this.controller = c;
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"controller"),"author");
};
app.author.AuthorView.__name__ = ["app","author","AuthorView"];
app.author.AuthorView.__super__ = dtx.widget.Widget;
app.author.AuthorView.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<div>This is my copy template!</div>";
	}
	,controller: null
	,__class__: app.author.AuthorView
});
if(!app.copy) app.copy = {}
app.copy.CopyController = $hxClasses["app.copy.CopyController"] = function() {
	this.view = new app.copy.CopyView(this);
};
app.copy.CopyController.__name__ = ["app","copy","CopyController"];
app.copy.CopyController.prototype = {
	view: null
	,__class__: app.copy.CopyController
}
app.copy.CopyView = $hxClasses["app.copy.CopyView"] = function(c) {
	dtx.widget.Widget.call(this);
	this.controller = c;
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"controller"),"copy");
};
app.copy.CopyView.__name__ = ["app","copy","CopyView"];
app.copy.CopyView.__super__ = dtx.widget.Widget;
app.copy.CopyView.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<div/>";
	}
	,controller: null
	,__class__: app.copy.CopyView
});
if(!app.edit) app.edit = {}
app.edit.EditController = $hxClasses["app.edit.EditController"] = function() {
	this.view = new app.edit.EditView(this);
};
app.edit.EditController.__name__ = ["app","edit","EditController"];
app.edit.EditController.prototype = {
	view: null
	,__class__: app.edit.EditController
}
app.edit.EditView = $hxClasses["app.edit.EditView"] = function(c) {
	dtx.widget.Widget.call(this);
	this.controller = c;
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"controller"),"edit");
};
app.edit.EditView.__name__ = ["app","edit","EditView"];
app.edit.EditView.__super__ = dtx.widget.Widget;
app.edit.EditView.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<div>This is my copy template!</div>";
	}
	,controller: null
	,__class__: app.edit.EditView
});
if(!app.project) app.project = {}
app.project.ProjectAPIProxy = $hxClasses["app.project.ProjectAPIProxy"] = function(c) {
	this._conn = c.resolve("app.project.ProjectAPIService");
};
app.project.ProjectAPIProxy.__name__ = ["app","project","ProjectAPIProxy"];
app.project.ProjectAPIProxy.prototype = {
	update: function(oldName,project,cb) {
		this._conn.resolve("update").call([oldName,project],cb);
	}
	,read: function(id,cb) {
		this._conn.resolve("read").call([id],cb);
	}
	,create: function(p,cb) {
		this._conn.resolve("create").call([p],cb);
	}
	,list: function(cb) {
		this._conn.resolve("list").call([],cb);
	}
	,_conn: null
	,__class__: app.project.ProjectAPIProxy
}
var haxe = haxe || {}
if(!haxe.remoting) haxe.remoting = {}
haxe.remoting.AsyncConnection = $hxClasses["haxe.remoting.AsyncConnection"] = function() { }
haxe.remoting.AsyncConnection.__name__ = ["haxe","remoting","AsyncConnection"];
haxe.remoting.AsyncConnection.prototype = {
	setErrorHandler: null
	,call: null
	,resolve: null
	,__class__: haxe.remoting.AsyncConnection
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
	call: function(params,onResult) {
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
				if(HxOverrides.substr(response,0,3) != "hxr") throw "Invalid response : '" + response + "'";
				var s1 = new haxe.Unserializer(HxOverrides.substr(response,3,null));
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
	,setErrorHandler: function(h) {
		this.__data.error = h;
	}
	,resolve: function(name) {
		var c = new haxe.remoting.HttpAsyncConnection(this.__data,this.__path.slice());
		c.__path.push(name);
		return c;
	}
	,__path: null
	,__data: null
	,__class__: haxe.remoting.HttpAsyncConnection
}
var client = client || {}
client.Client = $hxClasses["client.Client"] = function() { }
client.Client.__name__ = ["client","Client"];
client.Client.notifications = null;
client.Client.scheduler = null;
client.Client.routing = null;
client.Client.ui = null;
client.Client.currentPath = null;
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
	client.Client.routing = new client.Routing();
	pushstate.PushState.init();
	pushstate.PushState.onStateChange.bind(function(path) {
		client.Client.currentPath = path.url;
		client.Client.routing.route(path.url);
	});
}
client.Client.showView = function(v) {
	var vc = dtx.Tools.find("#view-container");
	dtx.collection.DOMManipulation.empty(vc);
	dtx.collection.DOMManipulation.append(vc,null,v);
}
client.Client["goto"] = function(path) {
	pushstate.PushState.push(path);
}
client.Client.ready = function(e) {
	client.Client.ui = new client.Interface();
	client.Client.projectController = new app.project.ProjectController();
	client.Client.copyController = new app.copy.CopyController();
	client.Client.editController = new app.edit.EditController();
	client.Client.slideController = new app.slide.SlideController();
	client.Client.authorController = new app.author.AuthorController();
	client.Client.routing.addRoutesFromMetaData(client.Client.projectController);
	client.Client.routing.route(client.Client.currentPath);
}
client.Client.initialiseAPI = function() {
	client.Client.conn.setErrorHandler(function(err) {
		haxe.Log.trace("Error : " + err,{ fileName : "Client.hx", lineNumber : 93, className : "client.Client", methodName : "initialiseAPI"});
	});
	client.Client.notifications = new server.api.NotificationsProxy(client.Client.conn);
	client.Client.scheduler = new server.api.SchedulerProxy(client.Client.conn);
}
app.project.ProjectController = $hxClasses["app.project.ProjectController"] = function() {
};
app.project.ProjectController.__name__ = ["app","project","ProjectController"];
app.project.ProjectController.prototype = {
	archive: function(id) {
		haxe.Log.trace("archive " + id,{ fileName : "ProjectController.hx", lineNumber : 94, className : "app.project.ProjectController", methodName : "archive"});
	}
	,update: function(id) {
		haxe.Log.trace("update " + id,{ fileName : "ProjectController.hx", lineNumber : 63, className : "app.project.ProjectController", methodName : "update"});
	}
	,create: function() {
		var _g = this;
		var form = new autoform.AutoForm(app.project.model.Project);
		client.Client.showView(form);
		dtx.collection.EventManagement.on(form,"submit",function(e) {
			e.preventDefault();
			var newProject = form.readForm();
			app.project.ProjectController.projectAPI.create(newProject,function(e1) {
				haxe.Log.trace("Added new project!",{ fileName : "ProjectController.hx", lineNumber : 54, className : "app.project.ProjectController", methodName : "create"});
				_g.list();
			});
		});
	}
	,read: function(id) {
		var view = new app.project.ProjectView(this);
		client.Client.showView(view);
	}
	,list: function() {
		var view = new app.project.ProjectListView(this);
		client.Client.showView(view);
	}
	,__class__: app.project.ProjectController
}
app.project.ProjectListView = $hxClasses["app.project.ProjectListView"] = function(c) {
	dtx.widget.Widget.call(this);
	this.controller = c;
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"controller"),"project");
};
app.project.ProjectListView.__name__ = ["app","project","ProjectListView"];
app.project.ProjectListView.__super__ = dtx.widget.Widget;
app.project.ProjectListView.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<div><div class=\"row-fluid\"><div class=\"span8\"><h1 class=\"pull-left\">All Projects</h1><a href=\"/projects/new/\" class=\"btn btn-primary pull-right\" rel=\"pushstate\">New Project</a><table class=\"table table-bordered table-striped\"><thead><tr><th>Name</th><th>Videos Ready</th><th>Actions</th></tr></thead><tbody><tr><td>PC301</td><td><div class=\"progress progress-success\"><div class=\"bar\" style=\"width: 60%;\">6/10</div></div></td><td><div class=\"btn-group pull-right\"><a href=\"/projects/PC301/\" class=\"btn\" rel=\"pushstate\">Open</a><button class=\"btn dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"/></button><ul class=\"dropdown-menu\"><li><a href=\"#\">Edit</a></li><li><a href=\"#\">Archive</a></li></ul></div></td></tr><tr><td>NT301</td><td><div class=\"progress progress-success\"><div class=\"bar\" style=\"width: 20%;\">2/10</div></div></td><td><div class=\"btn-group pull-right\"><a href=\"/projects/PC301/\" class=\"btn\" rel=\"pushstate\">Open</a><button class=\"btn dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"/></button><ul class=\"dropdown-menu\"><li><a href=\"#\">Edit</a></li><li><a href=\"#\">Archive</a></li></ul></div></td></tr></tbody></table><h4 class=\"pull-left\">Archived Projects (6)</h4><button class=\"btn pull-right\">Show</button><table class=\"table table-bordered table-striped\"><thead><tr><th>Name</th><th>Videos Ready</th><th>Actions</th></tr></thead><tbody><tr><td>PC301</td><td><div class=\"progress progress-success\"><div class=\"bar\" style=\"width: 60%;\">6/10</div></div></td><td><div class=\"btn-group pull-right\"><a href=\"/projects/PC301/\" class=\"btn\" rel=\"pushstate\">Open</a><button class=\"btn dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"/></button><ul class=\"dropdown-menu\"><li><a href=\"#\">Edit</a></li><li><a href=\"#\">Un-Archive</a></li></ul></div></td></tr><tr><td>NT301</td><td><div class=\"progress progress-success\"><div class=\"bar\" style=\"width: 20%;\">2/10</div></div></td><td><div class=\"btn-group pull-right\"><a href=\"/projects/PC301/\" class=\"btn\" rel=\"pushstate\">Open</a><button class=\"btn dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"/></button><ul class=\"dropdown-menu\"><li><a href=\"#\">Edit</a></li><li><a href=\"#\">Archive</a></li></ul></div></td></tr></tbody></table></div><div class=\"span4\"><h3>Welcome</h3><p>                This is an overview of all of your projects (for \n                instance, all units).  Each of these contains a bunch\n                of videos.  The progress bar represents how many videos\n                have been finished, out of how many there are total.</p><p>                You can create a new Project by clicking the \"New\" button.</p></div></div><p>Stuff goes here</p></div>";
	}
	,listProjects: function(list) {
	}
	,form: null
	,controller: null
	,__class__: app.project.ProjectListView
});
app.project.ProjectView = $hxClasses["app.project.ProjectView"] = function(c) {
	dtx.widget.Widget.call(this);
	this.controller = c;
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"controller"),"project");
};
app.project.ProjectView.__name__ = ["app","project","ProjectView"];
app.project.ProjectView.__super__ = dtx.widget.Widget;
app.project.ProjectView.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<div><div class=\"row-fluid\"><div class=\"span8\"><h1 class=\"pull-left\">Ministry Formation (PC301)</h1><a href=\"/videos/new/\" class=\"btn btn-primary pull-right\" rel=\"pushstate\">New Video</a><p class=\"clear\"><span class=\"label\">Semester 1</span><span class=\"label\">2012</span><span class=\"label\">Brian Harris</span></p><table class=\"table table-bordered table-striped\"><thead><tr><th>Name</th><th>Progress</th><th>Actions</th></tr></thead><tbody><tr><td>PC301</td><td><div class=\"progress progress-success\"><div class=\"bar\" style=\"width: 60%;\">60%</div></div></td><td><div class=\"btn-toolbar pull-right\"><a href=\"/projects/PC301/\" class=\"btn btn-success\" rel=\"pushstate\">Setup</a><a href=\"/projects/PC301/\" class=\"btn btn-success\" rel=\"pushstate\">Editing</a><a href=\"/projects/PC301/\" class=\"btn btn-primary\" rel=\"pushstate\">Slides</a><a href=\"/projects/PC301/\" class=\"btn\" rel=\"pushstate\">Author</a><a href=\"/projects/PC301/\" class=\"btn\" rel=\"pushstate\">Make ISO</a></div></td></tr><tr><td>NT301</td><td><div class=\"progress progress-success\"><div class=\"bar\" style=\"width: 20%;\">20%</div></div></td><td><div class=\"btn-toolbar pull-right\"><a href=\"/projects/PC301/\" class=\"btn btn-success\" rel=\"pushstate\">Setup</a><a href=\"/projects/PC301/\" class=\"btn btn-success\" rel=\"pushstate\">Editing</a><a href=\"/projects/PC301/\" class=\"btn btn-primary\" rel=\"pushstate\">Slides</a><a href=\"/projects/PC301/\" class=\"btn\" rel=\"pushstate\">Author</a><a href=\"/projects/PC301/\" class=\"btn\" rel=\"pushstate\">Make ISO</a></div></td></tr></tbody></table><h3>Unit description will go here.</h3><p>This unit is for VET level.  It will be offered primarily by distance.</p><p>Hoping to launch online content to go with it.</p></div><div class=\"span4\"><h3>Videos for PC301</h3><p>                To the left is a list of all the videos so far for this project.  You can create a new one (copying files, entering info etc) by clicking the \"New Video\" button. </p><p>                The table shows how far each video has progressed.</p><ul><li>Green: Completed, working</li><li>Blue: Current stage - continue from here</li><li>Grey: not available yet, finish other things first</li></ul></div></div></div>";
	}
	,form: null
	,controller: null
	,__class__: app.project.ProjectView
});
if(!haxe.rtti) haxe.rtti = {}
haxe.rtti.Infos = $hxClasses["haxe.rtti.Infos"] = function() { }
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
if(!app.project.model) app.project.model = {}
app.project.model.Project = $hxClasses["app.project.model.Project"] = function() {
};
app.project.model.Project.__name__ = ["app","project","model","Project"];
app.project.model.Project.__interfaces__ = [haxe.rtti.Infos];
app.project.model.Project.prototype = {
	notes: null
	,semester: null
	,year: null
	,lecturer: null
	,title: null
	,id: null
	,__class__: app.project.model.Project
}
if(!app.slide) app.slide = {}
app.slide.SlideController = $hxClasses["app.slide.SlideController"] = function() {
	this.view = new app.slide.SlideView(this);
};
app.slide.SlideController.__name__ = ["app","slide","SlideController"];
app.slide.SlideController.prototype = {
	view: null
	,__class__: app.slide.SlideController
}
app.slide.SlideView = $hxClasses["app.slide.SlideView"] = function(c) {
	dtx.widget.Widget.call(this);
	this.controller = c;
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"controller"),"slide");
	dtx.collection.ElementManipulation.setText(this,"Slide Controller");
};
app.slide.SlideView.__name__ = ["app","slide","SlideView"];
app.slide.SlideView.__super__ = dtx.widget.Widget;
app.slide.SlideView.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<div>This is my copy template!</div>";
	}
	,controller: null
	,__class__: app.slide.SlideView
});
if(!app.video) app.video = {}
app.video.VideoAPIProxy = $hxClasses["app.video.VideoAPIProxy"] = function(c) {
	this._conn = c.resolve("app.video.VideoAPIService");
};
app.video.VideoAPIProxy.__name__ = ["app","video","VideoAPIProxy"];
app.video.VideoAPIProxy.prototype = {
	update: function(oldName,video,cb) {
		this._conn.resolve("update").call([oldName,video],cb);
	}
	,read: function(videoName,cb) {
		this._conn.resolve("read").call([videoName],cb);
	}
	,create: function(v,cb) {
		this._conn.resolve("create").call([v],cb);
	}
	,list: function(cb) {
		this._conn.resolve("list").call([],cb);
	}
	,setCurrentProject: function(id,cb) {
		this._conn.resolve("setCurrentProject").call([id],cb);
	}
	,_conn: null
	,__class__: app.video.VideoAPIProxy
}
app.video.VideoController = $hxClasses["app.video.VideoController"] = function() {
	this.view = new app.video.VideoView(this);
	this.create();
};
app.video.VideoController.__name__ = ["app","video","VideoController"];
app.video.VideoController.prototype = {
	archive: function(id) {
	}
	,update: function(name) {
		var _g = this;
		app.video.VideoController.videoAPI.read(name,function(video) {
			var oldProjectID = video.projectID;
			var oldName = video.name;
			_g.view.renderForm();
			_g.view.form.populateForm(video);
			dtx.collection.EventManagement.on(_g.view.form,"submit",function(e) {
				e.preventDefault();
				var updatedVideo = _g.view.form.readForm();
				app.video.VideoController.videoAPI.update(oldName,updatedVideo,function(e1) {
					_g.list();
				});
			});
		});
	}
	,create: function() {
		var _g = this;
		this.view.renderForm();
		dtx.collection.EventManagement.on(this.view.form,"submit",function(e) {
			e.preventDefault();
			var newVideo = _g.view.form.readForm();
			app.video.VideoController.videoAPI.create(newVideo,function(e1) {
				haxe.Log.trace("Added new video!",{ fileName : "VideoController.hx", lineNumber : 49, className : "app.video.VideoController", methodName : "create"});
				_g.list();
			});
		});
	}
	,read: function(id) {
	}
	,list: function(projectID) {
		var _g = this;
		app.video.VideoController.videoAPI.setCurrentProject(projectID,null);
		app.video.VideoController.videoAPI.list(function(a) {
			_g.view.list(a);
		});
	}
	,view: null
	,__class__: app.video.VideoController
}
app.video.VideoView = $hxClasses["app.video.VideoView"] = function(c) {
	dtx.widget.Widget.call(this);
	this.controller = c;
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"controller"),"video");
	dtx.collection.ElementManipulation.setInnerHTML(this,"<h1>Video Controller</h1>");
};
app.video.VideoView.__name__ = ["app","video","VideoView"];
app.video.VideoView.__super__ = dtx.widget.Widget;
app.video.VideoView.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<div>This is my copy template!</div>";
	}
	,renderForm: function() {
		dtx.collection.DOMManipulation.empty(this);
		this.form = new autoform.AutoForm(app.video.model.Video);
		dtx.collection.DOMManipulation.append(this,null,this.form);
	}
	,testAction: function(id) {
		haxe.Log.trace(id,{ fileName : "VideoView.hx", lineNumber : 38, className : "app.video.VideoView", methodName : "testAction"});
	}
	,list: function(list) {
		dtx.collection.DOMManipulation.empty(this);
		var table = new client.ui.basic.ActionTable(app.video.model.Video,list);
		table.addAction("View",$bind(this,this.testAction),autoform.ui.ButtonType.Primary);
		table.addAction("Edit",($_=this.controller,$bind($_,$_.update)));
		dtx.collection.DOMManipulation.append(this,null,table);
	}
	,form: null
	,controller: null
	,__class__: app.video.VideoView
});
if(!app.video.model) app.video.model = {}
app.video.model.Video = $hxClasses["app.video.model.Video"] = function(project) {
	if(project != null) {
		this.projectID = project.id;
		this.lecturer = project.lecturer;
	}
};
app.video.model.Video.__name__ = ["app","video","model","Video"];
app.video.model.Video.__interfaces__ = [haxe.rtti.Infos];
app.video.model.Video.prototype = {
	notes: null
	,lecturer: null
	,name: null
	,projectID: null
	,__class__: app.video.model.Video
}
var autoform = autoform || {}
autoform.AbstractField = $hxClasses["autoform.AbstractField"] = function() {
	dtx.widget.Widget.call(this);
};
autoform.AbstractField.__name__ = ["autoform","AbstractField"];
autoform.AbstractField.__super__ = dtx.widget.Widget;
autoform.AbstractField.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "";
	}
	,set: function(object) {
		throw "Abstract Method";
	}
	,get: function() {
		throw "Abstract Method";
		return null;
	}
	,__class__: autoform.AbstractField
});
autoform.AbstractRenderer = $hxClasses["autoform.AbstractRenderer"] = function(form) {
	this.displays = new Hash();
	this.form = form;
};
autoform.AbstractRenderer.__name__ = ["autoform","AbstractRenderer"];
autoform.AbstractRenderer.guessDisplay = function(field) {
	var display;
	if(field.display != "") display = field.display; else display = (function($this) {
		var $r;
		switch(field.type) {
		case "String":
			$r = "text";
			break;
		case "Int":
			$r = "number/int";
			break;
		case "Float":
			$r = "number/float";
			break;
		case "Date":
			$r = "date";
			break;
		case "Bool":
			$r = "checkbox";
			break;
		case "Array<Bool>":
			$r = "checkbox";
			break;
		case "function":
			$r = null;
			break;
		default:
			$r = "text";
		}
		return $r;
	}(this));
	return display;
}
autoform.AbstractRenderer.prototype = {
	run: function(fields) {
	}
	,displays: null
	,form: null
	,__class__: autoform.AbstractRenderer
}
autoform.AutoForm = $hxClasses["autoform.AutoForm"] = function(c,formID) {
	dtx.widget.Widget.call(this,"<form></form>");
	if(formID == null) {
		autoform.AutoForm.formIDIncrement = autoform.AutoForm.formIDIncrement + 1;
		formID = "af-" + autoform.AutoForm.formIDIncrement;
	}
	this.formID = formID;
	this.fieldsInfo = new Array();
	this.fields = new Hash();
	this.classval = c;
	var rttiString = c.__rtti;
	var rtti = Xml.parse(rttiString).firstElement();
	this.meta = haxe.rtti.Meta.getFields(c);
	var fieldsXml = rtti.elements();
	while( fieldsXml.hasNext() ) {
		var field = fieldsXml.next();
		if(Lambda.has(["implements","extends"],field.getNodeName()) == false) this.fieldsInfo.push(new autoform.FieldInfo(field,rtti,this.meta,formID));
	}
	var renderer = new autoform.renderer.DefaultRenderer(this);
	renderer.run(this.fieldsInfo);
};
autoform.AutoForm.__name__ = ["autoform","AutoForm"];
autoform.AutoForm.__super__ = dtx.widget.Widget;
autoform.AutoForm.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<div/>";
	}
	,readForm: function(originalObject) {
		var object;
		var isNewObject = true;
		if(originalObject == null) object = Type.createInstance(this.classval,[]); else object = originalObject;
		var $it0 = this.fields.keys();
		while( $it0.hasNext() ) {
			var fieldName = $it0.next();
			var field = this.fields.get(fieldName);
			var value = field.get();
			object[fieldName] = value;
		}
		return object;
	}
	,populateForm: function(object) {
		var $it0 = this.fields.keys();
		while( $it0.hasNext() ) {
			var fieldName = $it0.next();
			var field = this.fields.get(fieldName);
			var value = Reflect.field(object,fieldName);
			field.set(value);
		}
	}
	,fields: null
	,fieldsInfo: null
	,meta: null
	,rtti: null
	,classval: null
	,formID: null
	,__class__: autoform.AutoForm
});
autoform.FieldInfo = $hxClasses["autoform.FieldInfo"] = function(field,rtti,meta,formID_in) {
	this.id = "";
	this.title = "";
	this.type = "null";
	this.required = false;
	this.description = "";
	this.help = "";
	this.placeholder = "";
	this.validDescription = "";
	this.validatorString = "";
	this.validator = null;
	this.display = "";
	this.displayOptions = { };
	this.formID = formID_in;
	this.formPrefix = this.formID + "-";
	this.id = field.getNodeName();
	this.title = this.id;
	this.fullID = this.formID + "-" + this.id;
	if(field.firstChild() != null) {
		var firstChild = field;
		var isMethod = firstChild.exists("set") && firstChild.get("set") == "method";
		if(isMethod) this.type = "function"; else {
			var pathsFound = 0;
			do {
				firstChild = firstChild.firstChild();
				var path = firstChild.get("path");
				this.type = pathsFound == 0?path:this.type + "<" + path;
				pathsFound++;
			} while(firstChild.firstChild() != null);
			while(pathsFound > 1) {
				this.type = this.type + ">";
				pathsFound--;
			}
		}
	}
	var fieldMeta = Reflect.field(meta,this.id);
	if(fieldMeta != null) {
		if(Reflect.field(fieldMeta,"autoform") != null) {
			var autoform = fieldMeta.autoform[0];
			this.title = Reflect.field(autoform,"title");
			if(this.title == null) this.title = "";
			this.required = Reflect.field(autoform,"required");
			if(this.required == null) this.required = false;
			this.description = Reflect.field(autoform,"description");
			if(this.description == null) this.description = "";
			this.help = Reflect.field(autoform,"help");
			if(this.help == null) this.help = "";
			this.placeholder = Reflect.field(autoform,"placeholder");
			if(this.placeholder == null) this.placeholder = "";
			this.validatorString = Reflect.field(autoform,"validatorString");
			if(this.validatorString == null) this.validatorString = "";
			this.validator = this.createValidatorFunction(this.validatorString);
			this.display = Reflect.field(autoform,"display");
			if(this.display == null) this.display = "";
			this.displayOptions = Reflect.field(autoform,"displayOptions");
			if(this.displayOptions == null) this.displayOptions = "";
		}
	}
};
autoform.FieldInfo.__name__ = ["autoform","FieldInfo"];
autoform.FieldInfo.prototype = {
	createValidatorFunction: function(validatorString) {
		var fn = null;
		return fn;
	}
	,fullID: null
	,formPrefix: null
	,formID: null
	,displayOptions: null
	,display: null
	,validator: null
	,validatorString: null
	,validDescription: null
	,placeholder: null
	,help: null
	,description: null
	,required: null
	,type: null
	,title: null
	,id: null
	,__class__: autoform.FieldInfo
}
if(!autoform.renderer) autoform.renderer = {}
autoform.renderer.DefaultRenderer = $hxClasses["autoform.renderer.DefaultRenderer"] = function(form) {
	autoform.AbstractRenderer.call(this,form);
	this.displays.set("text",autoform.ui.TextField);
	this.displays.set("textarea",autoform.ui.TextArea);
	this.displays.set("hidden",autoform.ui.HiddenField);
	this.displays.set("checkbox",autoform.ui.CheckBox);
};
autoform.renderer.DefaultRenderer.__name__ = ["autoform","renderer","DefaultRenderer"];
autoform.renderer.DefaultRenderer.__super__ = autoform.AbstractRenderer;
autoform.renderer.DefaultRenderer.prototype = $extend(autoform.AbstractRenderer.prototype,{
	run: function(fieldsInfo) {
		var _g = 0;
		while(_g < fieldsInfo.length) {
			var field = fieldsInfo[_g];
			++_g;
			var thisClass = String;
			var element;
			var display = autoform.AbstractRenderer.guessDisplay(field);
			if(display != null) {
				var classOfFieldUI = this.displays.exists(display)?this.displays.get(display):this.displays.get("text");
				element = Type.createInstance(classOfFieldUI,[field]);
				dtx.collection.DOMManipulation.appendTo(element,null,this.form);
				this.form.fields.set(field.id,element);
			}
		}
		var buttonGroup = dtx.single.ElementManipulation.addClass(dtx.Tools.create("div"),"form-actions");
		var submit = new autoform.ui.Button("Save",true);
		var cancel = new autoform.ui.Button("Cancel",null,autoform.ui.ButtonType.Default);
		dtx.single.DOMManipulation.append(dtx.single.DOMManipulation.append(buttonGroup,null,submit),null,cancel);
		dtx.single.DOMManipulation.appendTo(buttonGroup,null,this.form);
	}
	,__class__: autoform.renderer.DefaultRenderer
});
if(!autoform.ui) autoform.ui = {}
autoform.ui.Button = $hxClasses["autoform.ui.Button"] = function(text,isSubmit,type) {
	if(isSubmit == null) isSubmit = false;
	if(text == null) text = "Button";
	dtx.widget.Widget.call(this);
	dtx.collection.ElementManipulation.addClass(this,"btn");
	dtx.collection.ElementManipulation.setText(this,text);
	if(isSubmit) {
		dtx.collection.ElementManipulation.setAttr(this,"type","submit");
		if(type == null) type = autoform.ui.ButtonType.Primary;
	}
	if(type != null) this.setType(type);
};
autoform.ui.Button.__name__ = ["autoform","ui","Button"];
autoform.ui.Button.__super__ = dtx.widget.Widget;
autoform.ui.Button.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<button class=\"btn\"/>";
	}
	,getClassForType: function(inType) {
		var cls = "";
		if(inType == autoform.ui.ButtonType.Default) cls = "";
		if(inType == autoform.ui.ButtonType.Primary) cls = "btn-primary";
		if(inType == autoform.ui.ButtonType.Info) cls = "btn-info";
		if(inType == autoform.ui.ButtonType.Success) cls = "btn-success";
		if(inType == autoform.ui.ButtonType.Warning) cls = "btn-warning";
		if(inType == autoform.ui.ButtonType.Danger) cls = "btn-danger";
		if(inType == autoform.ui.ButtonType.Inverse) cls = "btn-inverse";
		return cls;
	}
	,setType: function(t) {
		dtx.collection.ElementManipulation.removeClass(this,this.getClassForType(this.type));
		dtx.collection.ElementManipulation.addClass(this,this.getClassForType(t));
		return t;
	}
	,type: null
	,__class__: autoform.ui.Button
	,__properties__: $extend(dtx.widget.Widget.prototype.__properties__,{set_type:"setType"})
});
autoform.ui.ButtonType = $hxClasses["autoform.ui.ButtonType"] = { __ename__ : ["autoform","ui","ButtonType"], __constructs__ : ["Default","Primary","Info","Success","Warning","Danger","Inverse"] }
autoform.ui.ButtonType.Default = ["Default",0];
autoform.ui.ButtonType.Default.toString = $estr;
autoform.ui.ButtonType.Default.__enum__ = autoform.ui.ButtonType;
autoform.ui.ButtonType.Primary = ["Primary",1];
autoform.ui.ButtonType.Primary.toString = $estr;
autoform.ui.ButtonType.Primary.__enum__ = autoform.ui.ButtonType;
autoform.ui.ButtonType.Info = ["Info",2];
autoform.ui.ButtonType.Info.toString = $estr;
autoform.ui.ButtonType.Info.__enum__ = autoform.ui.ButtonType;
autoform.ui.ButtonType.Success = ["Success",3];
autoform.ui.ButtonType.Success.toString = $estr;
autoform.ui.ButtonType.Success.__enum__ = autoform.ui.ButtonType;
autoform.ui.ButtonType.Warning = ["Warning",4];
autoform.ui.ButtonType.Warning.toString = $estr;
autoform.ui.ButtonType.Warning.__enum__ = autoform.ui.ButtonType;
autoform.ui.ButtonType.Danger = ["Danger",5];
autoform.ui.ButtonType.Danger.toString = $estr;
autoform.ui.ButtonType.Danger.__enum__ = autoform.ui.ButtonType;
autoform.ui.ButtonType.Inverse = ["Inverse",6];
autoform.ui.ButtonType.Inverse.toString = $estr;
autoform.ui.ButtonType.Inverse.__enum__ = autoform.ui.ButtonType;
autoform.ui.CheckBox = $hxClasses["autoform.ui.CheckBox"] = function(field) {
	autoform.AbstractField.call(this);
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"af-field-container"),field.id);
	dtx.collection.ElementManipulation.setInnerHTML(this,"<div><input /><label></label></div>");
	dtx.collection.ElementManipulation.addClass(dtx.collection.Traversing.find(this,"div"),"checkbox");
	dtx.collection.ElementManipulation.setAttr(dtx.collection.ElementManipulation.setAttr(dtx.collection.Traversing.find(this,"input"),"type","checkbox"),"id",field.fullID);
	dtx.collection.ElementManipulation.setAttr(dtx.collection.ElementManipulation.setText(dtx.collection.Traversing.find(this,"label"),field.title),"for",field.fullID);
	if(field.description != "") dtx.collection.DOMManipulation.prepend(this,dtx.single.ElementManipulation.setText(dtx.Tools.create("p"),field.description));
};
autoform.ui.CheckBox.__name__ = ["autoform","ui","CheckBox"];
autoform.ui.CheckBox.__super__ = autoform.AbstractField;
autoform.ui.CheckBox.prototype = $extend(autoform.AbstractField.prototype,{
	get_template: function() {
		return "<div/>";
	}
	,__class__: autoform.ui.CheckBox
});
autoform.ui.HiddenField = $hxClasses["autoform.ui.HiddenField"] = function(field) {
	autoform.AbstractField.call(this);
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.setInnerHTML(this,"<input />"),field.id);
	dtx.collection.ElementManipulation.setAttr(dtx.collection.ElementManipulation.setAttr(dtx.collection.Traversing.find(this,"input"),"type","hidden"),"id",field.fullID);
};
autoform.ui.HiddenField.__name__ = ["autoform","ui","HiddenField"];
autoform.ui.HiddenField.__super__ = autoform.AbstractField;
autoform.ui.HiddenField.prototype = $extend(autoform.AbstractField.prototype,{
	get_template: function() {
		return "<div/>";
	}
	,set: function(o) {
		dtx.collection.ElementManipulation.setVal(dtx.collection.Traversing.find(this,"input"),o);
	}
	,get: function() {
		return dtx.collection.ElementManipulation.val(dtx.collection.Traversing.find(this,"input"));
	}
	,__class__: autoform.ui.HiddenField
});
autoform.ui.TextArea = $hxClasses["autoform.ui.TextArea"] = function(field) {
	autoform.AbstractField.call(this);
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"af-field-container"),field.id);
	dtx.collection.ElementManipulation.setInnerHTML(this,"<label></label><textarea></textarea><span />");
	dtx.collection.ElementManipulation.setAttr(dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.setAttr(dtx.collection.Traversing.find(this,"textarea"),"id",field.fullID),".input"),"placeholder",field.placeholder);
	dtx.collection.ElementManipulation.setAttr(dtx.collection.ElementManipulation.setText(dtx.collection.Traversing.find(this,"label"),field.title),"for",field.fullID);
	if(field.description != "") dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.setText(dtx.collection.Traversing.find(this,"span"),field.description),"help-inline");
};
autoform.ui.TextArea.__name__ = ["autoform","ui","TextArea"];
autoform.ui.TextArea.__super__ = autoform.AbstractField;
autoform.ui.TextArea.prototype = $extend(autoform.AbstractField.prototype,{
	get_template: function() {
		return "<div/>";
	}
	,set: function(o) {
		dtx.collection.ElementManipulation.setText(dtx.collection.Traversing.find(this,"textarea"),o);
	}
	,get: function() {
		return dtx.collection.ElementManipulation.val(dtx.collection.Traversing.find(this,"textarea"));
	}
	,__class__: autoform.ui.TextArea
});
autoform.ui.TextField = $hxClasses["autoform.ui.TextField"] = function(field) {
	autoform.AbstractField.call(this);
	dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.addClass(this,"af-field-container"),field.id);
	dtx.collection.ElementManipulation.setInnerHTML(this,"<label></label><input /><span />");
	dtx.collection.ElementManipulation.setAttr(dtx.collection.ElementManipulation.setAttr(dtx.collection.Traversing.find(this,"input"),"type","text"),"id",field.fullID);
	dtx.collection.ElementManipulation.setAttr(dtx.collection.ElementManipulation.setText(dtx.collection.Traversing.find(this,"label"),field.title),"for",field.fullID);
	if(field.description != "") dtx.collection.ElementManipulation.addClass(dtx.collection.ElementManipulation.setText(dtx.collection.Traversing.find(this,"span"),field.description),"help-inline");
	if(field.placeholder != "") dtx.collection.ElementManipulation.setAttr(dtx.collection.Traversing.find(this,"input"),"placeholder",field.placeholder);
};
autoform.ui.TextField.__name__ = ["autoform","ui","TextField"];
autoform.ui.TextField.__super__ = autoform.AbstractField;
autoform.ui.TextField.prototype = $extend(autoform.AbstractField.prototype,{
	get_template: function() {
		return "<div/>";
	}
	,set: function(o) {
		dtx.collection.ElementManipulation.setVal(dtx.collection.Traversing.find(this,"input"),o);
	}
	,get: function() {
		return dtx.collection.ElementManipulation.val(dtx.collection.Traversing.find(this,"input"));
	}
	,__class__: autoform.ui.TextField
});
client.Interface = $hxClasses["client.Interface"] = function() {
	this.setTitle("Loading...");
	this.drawMenu();
	this.setTitle("Vose");
};
client.Interface.__name__ = ["client","Interface"];
client.Interface.currentlyShowing = null;
client.Interface.templateFile = null;
client.Interface.prototype = {
	setTitle: function(string) {
		var title = "Vose Video Production";
		if(string != null) title = title + ": " + string;
		js.Lib.document.title = title;
		return string;
	}
	,getTitle: function() {
		return js.Lib.document.title;
	}
	,showController: function(id) {
		if(client.Interface.currentlyShowing != id) {
			dtx.collection.Style.setCSS(new dtx.DOMCollection(".controller"),"display","none");
			dtx.collection.Style.setCSS(new dtx.DOMCollection(".controller." + id),"display","block");
		}
		client.Interface.currentlyShowing = id;
	}
	,drawMenu: function() {
		var nav = new client.ui.menu.NavBar("Vose Video");
		var menu = nav.menu;
		menu.addMenuItem("projects/","List Projects");
		menu.addMenuItem("video","Video");
		menu.addMenuItem("copy","Copy Clips");
		menu.addMenuItem("edit","Edit Video");
		menu.addMenuItem("slide","Create Slides");
		menu.addMenuItem("author","Author DVD");
		((function($this) {
			var $r;
			if(dtx.Tools.document == null) dtx.Tools.document = document;
			$r = dtx.Tools.document;
			return $r;
		}(this))).body.appendChild(nav.collection[0]);
		dtx.collection.EventManagement.on(new dtx.DOMCollection(".menu li"),"click",function(e) {
			var menuItem = e.currentTarget;
		});
	}
	,title: null
	,__class__: client.Interface
	,__properties__: {set_title:"setTitle",get_title:"getTitle"}
}
client.Routing = $hxClasses["client.Routing"] = function() {
	this.routes = new Hash();
	this.routePatterns = new Hash();
};
client.Routing.__name__ = ["client","Routing"];
client.Routing.prototype = {
	addRoutesFromMetaData: function(controller) {
		var type = Type.getClass(controller);
		var metadata = haxe.rtti.Meta.getFields(type);
		var _g = 0, _g1 = Type.getInstanceFields(type);
		while(_g < _g1.length) {
			var methodName = _g1[_g];
			++_g;
			var o = Reflect.field(metadata,methodName);
			if(o != null) {
				var arr = Reflect.field(o,"route");
				if(arr != null) {
					var route = Std.string(arr[0]);
					this.addRoute(route,controller,methodName);
				}
			}
		}
	}
	,addRoute: function(path,controller,actionName) {
		this.routes.set(path,{ controller : controller, action : actionName});
		if(path.indexOf("[]") > -1 || path.indexOf("{}") > -1) {
			var pattern = "^" + path + "$";
			pattern = StringTools.replace(pattern,"[]","([0-9]+)");
			pattern = StringTools.replace(pattern,"{}","([a-zA-Z0-9-_]+)");
			this.routePatterns.set(path,pattern);
		}
	}
	,route: function(path) {
		var r = null;
		var args = [];
		if(this.routes.exists(path) && path.indexOf("[]") < 0 && path.indexOf("{}") < 0) r = this.routes.get(path);
		if(r == null) {
			var $it0 = this.routePatterns.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				var ereg = new EReg(this.routePatterns.get(key),"g");
				if(ereg.match(path)) {
					var i = 1;
					while(true) try {
						args.push(ereg.matched(i));
						i++;
					} catch( e ) {
						break;
					}
					r = this.routes.get(key);
					break;
				}
			}
		}
		if(r != null) Reflect.field(r.controller,r.action).apply(r.controller,args);
	}
	,routePatterns: null
	,routes: null
	,__class__: client.Routing
}
if(!client.ui) client.ui = {}
if(!client.ui.basic) client.ui.basic = {}
client.ui.basic.Table = $hxClasses["client.ui.basic.Table"] = function(type,list) {
	dtx.widget.Widget.call(this);
	this.fields = new Hash();
	this.type = type;
	this.createTable();
	dtx.collection.ElementManipulation.addClass(this,"table");
	dtx.collection.ElementManipulation.addClass(this,"table-striped");
	if(list != null) this.populateTable(list);
};
client.ui.basic.Table.__name__ = ["client","ui","basic","Table"];
client.ui.basic.Table.__super__ = dtx.widget.Widget;
client.ui.basic.Table.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<table/>";
	}
	,populateTable: function(list) {
		var $it0 = $iterator(list)();
		while( $it0.hasNext() ) {
			var object = $it0.next();
			var tr = dtx.Tools.create("tr");
			dtx.single.DOMManipulation.append(this.tbody,tr);
			var $it1 = this.fields.keys();
			while( $it1.hasNext() ) {
				var field = $it1.next();
				var td = dtx.Tools.create("td");
				var value = Reflect.field(object,field);
				dtx.single.ElementManipulation.setText(td,value);
				dtx.single.DOMManipulation.append(tr,td);
				dtx.single.ElementManipulation.addClass(td,field);
				if(field == "id") dtx.single.ElementManipulation.setAttr(tr,"data-id",value);
			}
		}
	}
	,createTable: function() {
		this.thead = dtx.Tools.create("thead");
		this.tbody = dtx.Tools.create("tbody");
		dtx.collection.DOMManipulation.append(this,this.thead);
		dtx.collection.DOMManipulation.append(this,this.tbody);
		var _g = 0, _g1 = Type.getInstanceFields(this.type);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			haxe.Log.trace("I should check metadata here",{ fileName : "Table.hx", lineNumber : 43, className : "client.ui.basic.Table", methodName : "createTable"});
			if(field != "insert") {
				var th = dtx.Tools.create("th");
				dtx.single.ElementManipulation.setText(th,field);
				dtx.single.DOMManipulation.append(this.thead,th);
				this.fields.set(field,"Field: " + field);
			}
		}
	}
	,tbody: null
	,thead: null
	,fields: null
	,type: null
	,__class__: client.ui.basic.Table
});
client.ui.basic.ActionTable = $hxClasses["client.ui.basic.ActionTable"] = function(type,list) {
	client.ui.basic.Table.call(this,type,list);
};
client.ui.basic.ActionTable.__name__ = ["client","ui","basic","ActionTable"];
client.ui.basic.ActionTable.__super__ = client.ui.basic.Table;
client.ui.basic.ActionTable.prototype = $extend(client.ui.basic.Table.prototype,{
	get_template: function() {
		return "";
	}
	,addAction: function(label,action,type) {
		var $it0 = HxOverrides.iter(dtx.single.Traversing.find(this.tbody,"tr").collection);
		while( $it0.hasNext() ) {
			var tr = $it0.next();
			var td = dtx.single.Traversing.find(tr,"td.actions");
			if(td.collection.length == 0) {
				td = dtx.Tools.create("td").toDOMCollection();
				dtx.collection.ElementManipulation.addClass(td,"actions");
				dtx.collection.DOMManipulation.appendTo(td,tr);
			}
			var btn = [new autoform.ui.Button(label,null,type)];
			dtx.collection.EventManagement.on(btn[0],"click",(function(btn) {
				return function(e) {
					var td1 = dtx.collection.Traversing.parent(btn[0]);
					var tr1 = dtx.collection.Traversing.parent(td1);
					var id = dtx.collection.ElementManipulation.attr(tr1,"data-id");
					action(id);
				};
			})(btn));
			dtx.collection.DOMManipulation.append(td,null,btn[0]);
		}
	}
	,populateTable: function(list) {
		client.ui.basic.Table.prototype.populateTable.call(this,list);
	}
	,createTable: function() {
		client.ui.basic.Table.prototype.createTable.call(this);
		var th = dtx.Tools.create("th");
		dtx.single.ElementManipulation.setText(th,"Actions");
		dtx.single.DOMManipulation.append(this.thead,th);
	}
	,__class__: client.ui.basic.ActionTable
});
client.ui.basic.Link = $hxClasses["client.ui.basic.Link"] = function(text,href,title) {
	if(href == null) href = "#";
	if(text == null) text = "Link";
	dtx.widget.Widget.call(this);
	dtx.collection.ElementManipulation.setAttr(this,"href",href);
	dtx.collection.ElementManipulation.setInnerHTML(this,text);
	if(title == null) title = dtx.collection.ElementManipulation.text(this);
	dtx.collection.ElementManipulation.setAttr(this,"title",title);
};
client.ui.basic.Link.__name__ = ["client","ui","basic","Link"];
client.ui.basic.Link.__super__ = dtx.widget.Widget;
client.ui.basic.Link.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<a/>";
	}
	,__class__: client.ui.basic.Link
});
if(!client.ui.menu) client.ui.menu = {}
client.ui.menu.Menu = $hxClasses["client.ui.menu.Menu"] = function() {
	dtx.widget.Widget.call(this);
	dtx.collection.ElementManipulation.addClass(this,"menu");
	this.items = new Hash();
};
client.ui.menu.Menu.__name__ = ["client","ui","menu","Menu"];
client.ui.menu.Menu.__super__ = dtx.widget.Widget;
client.ui.menu.Menu.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<ul/>";
	}
	,get: function(id) {
		return this.items.get(id);
	}
	,addMenuItem: function(id,title) {
		var menuItem = new client.ui.menu.MenuItem(id,title);
		dtx.collection.DOMManipulation.appendTo(menuItem,null,this);
		this.items.set(id,menuItem);
	}
	,items: null
	,__class__: client.ui.menu.Menu
});
client.ui.menu.MenuItem = $hxClasses["client.ui.menu.MenuItem"] = function(id,text) {
	dtx.widget.Widget.call(this);
	dtx.collection.DOMManipulation.append(this,dtx.Tools.create("a"));
	this.a = dtx.collection.Traversing.firstChildren(this);
	this.setID(id).setText(text);
};
client.ui.menu.MenuItem.__name__ = ["client","ui","menu","MenuItem"];
client.ui.menu.MenuItem.__super__ = dtx.widget.Widget;
client.ui.menu.MenuItem.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<li/>";
	}
	,setText: function(text) {
		this.text = text;
		dtx.collection.ElementManipulation.setText(this.a,text);
		return this;
	}
	,setID: function(id) {
		this.id = id;
		dtx.collection.ElementManipulation.addClass(this,"menulink-" + id);
		dtx.collection.ElementManipulation.setAttr(this.a,"rel","pushstate");
		dtx.collection.ElementManipulation.setAttr(this.a,"href","/" + id);
		return this;
	}
	,text: null
	,id: null
	,a: null
	,__class__: client.ui.menu.MenuItem
});
client.ui.menu.NavBar = $hxClasses["client.ui.menu.NavBar"] = function(brand,fixed) {
	if(fixed == null) fixed = true;
	if(brand == null) brand = "";
	dtx.widget.Widget.call(this);
	dtx.collection.ElementManipulation.addClass(this,"navbar");
	dtx.collection.ElementManipulation.addClass(this,"navbar-fixed-top");
	var navbarInner = dtx.single.ElementManipulation.addClass(dtx.Tools.create("div"),"navbar-inner");
	var container = dtx.single.ElementManipulation.addClass(dtx.Tools.create("div"),"container");
	if(brand != "") {
		var link = new client.ui.basic.Link(brand,"/#","Homepage: " + brand);
		dtx.collection.ElementManipulation.addClass(link,"brand");
		dtx.single.DOMManipulation.append(container,null,link);
	}
	this.menu = new client.ui.menu.Menu();
	dtx.collection.ElementManipulation.addClass(this.menu,"nav");
	dtx.single.DOMManipulation.append(container,null,this.menu);
	dtx.single.DOMManipulation.append(navbarInner,container);
	dtx.collection.DOMManipulation.append(this,navbarInner);
};
client.ui.menu.NavBar.__name__ = ["client","ui","menu","NavBar"];
client.ui.menu.NavBar.__super__ = dtx.widget.Widget;
client.ui.menu.NavBar.prototype = $extend(dtx.widget.Widget.prototype,{
	get_template: function() {
		return "<div/>";
	}
	,menu: null
	,__class__: client.ui.menu.NavBar
});
dtx.DOMType = $hxClasses["dtx.DOMType"] = function() { }
dtx.DOMType.__name__ = ["dtx","DOMType"];
dtx.Tools = $hxClasses["dtx.Tools"] = function() {
};
dtx.Tools.__name__ = ["dtx","Tools"];
dtx.Tools.__properties__ = {get_window:"get_window",get_body:"get_body",get_document:"get_document"}
dtx.Tools.document = null;
dtx.Tools.body = null;
dtx.Tools.window = null;
dtx.Tools.find = function(selector) {
	return new dtx.DOMCollection(selector);
}
dtx.Tools.create = function(name) {
	var elm = null;
	if(name != null) try {
		elm = document.createElement(name);
	} catch( e ) {
		elm = null;
	}
	return elm;
}
dtx.Tools.parse = function(html) {
	var q;
	if(html != null && html != "") {
		var n = dtx.Tools.create("div");
		dtx.single.ElementManipulation.setInnerHTML(n,html);
		q = dtx.single.Traversing.children(n,false);
	} else q = new dtx.DOMCollection();
	return q;
}
dtx.Tools.toDOMNode = function(eventHandler) {
	var elm;
	try {
		elm = eventHandler;
	} catch( e ) {
		elm = null;
	}
	return elm;
}
dtx.Tools.get_document = function() {
	if(dtx.Tools.document == null) dtx.Tools.document = document;
	return dtx.Tools.document;
}
dtx.Tools.setDocument = function(newDocument) {
	if(newDocument != null) {
		if(newDocument.nodeType == dtx.DOMType.DOCUMENT_NODE || newDocument.nodeType == dtx.DOMType.ELEMENT_NODE) dtx.Tools.document = newDocument;
	}
}
dtx.Tools.get_window = function() {
	return window;
}
dtx.Tools.get_body = function() {
	return ((function($this) {
		var $r;
		if(dtx.Tools.document == null) dtx.Tools.document = document;
		$r = dtx.Tools.document;
		return $r;
	}(this))).body;
}
dtx.Tools.ready = function(f) {
	(function(h,a,c,k){if(h[a]==null&&h[c]){h[a]="loading";h[c](k,c=function(){h[a]="complete";h.removeEventListener(k,c,!1)},!1)}})(document,"readyState","addEventListener","DOMContentLoaded");;
	/in/.test(document.readyState) ? setTimeout("dtx.Tools.ready("+f+")", 9) : f();;
}
dtx.Tools.prototype = {
	__class__: dtx.Tools
}
if(!dtx.collection) dtx.collection = {}
dtx.collection.DOMManipulation = $hxClasses["dtx.collection.DOMManipulation"] = function() { }
dtx.collection.DOMManipulation.__name__ = ["dtx","collection","DOMManipulation"];
dtx.collection.DOMManipulation.append = function(parentCollection,childNode,childCollection) {
	var firstChildUsed = false;
	if(parentCollection != null) {
		var $it0 = HxOverrides.iter(parentCollection.collection);
		while( $it0.hasNext() ) {
			var parent = $it0.next();
			childNode = firstChildUsed && childNode != null?childNode.cloneNode(true):childNode;
			childCollection = firstChildUsed && childCollection != null?childCollection.clone():childCollection;
			dtx.single.DOMManipulation.append(parent,childNode,childCollection);
			firstChildUsed = true;
		}
	}
	return parentCollection;
}
dtx.collection.DOMManipulation.prepend = function(parentCollection,childNode,childCollection) {
	var firstChildUsed = false;
	if(parentCollection != null) {
		var $it0 = HxOverrides.iter(parentCollection.collection);
		while( $it0.hasNext() ) {
			var parent = $it0.next();
			if(firstChildUsed == false) firstChildUsed = true; else {
				if(childNode != null) childNode = childNode.cloneNode(true);
				if(childCollection != null) childCollection = childCollection.clone(true);
			}
			dtx.single.DOMManipulation.prepend(parent,childNode,childCollection);
		}
	}
	return parentCollection;
}
dtx.collection.DOMManipulation.appendTo = function(children,parentNode,parentCollection) {
	if(parentNode != null) dtx.single.DOMManipulation.append(parentNode,null,children);
	if(parentCollection != null) dtx.collection.DOMManipulation.append(parentCollection,null,children);
	return children;
}
dtx.collection.DOMManipulation.prependTo = function(children,parentNode,parentCollection) {
	if(children != null) {
		children.collection.reverse();
		var $it0 = HxOverrides.iter(children.collection);
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(parentNode != null) {
				if(parentNode.hasChildNodes()) dtx.single.DOMManipulation.insertThisBefore(child,parentNode.firstChild,parentCollection); else dtx.single.DOMManipulation.append(parentNode,child);
			}
			if(parentCollection != null) dtx.collection.DOMManipulation.prepend(parentCollection,child);
			child;
		}
	}
	return children;
}
dtx.collection.DOMManipulation.insertThisBefore = function(content,targetNode,targetCollection) {
	if(content != null) {
		if(targetNode != null) {
			var $it0 = HxOverrides.iter(content.collection);
			while( $it0.hasNext() ) {
				var childToAdd = $it0.next();
				dtx.single.DOMManipulation.insertThisBefore(childToAdd,targetNode);
			}
		}
		if(targetCollection != null) {
			var firstChildUsed = false;
			var childCollection = content;
			var $it1 = HxOverrides.iter(targetCollection.collection);
			while( $it1.hasNext() ) {
				var target = $it1.next();
				childCollection = firstChildUsed?childCollection.clone():childCollection;
				dtx.collection.DOMManipulation.insertThisBefore(childCollection,target);
				firstChildUsed = true;
			}
		}
	}
	return content;
}
dtx.collection.DOMManipulation.insertThisAfter = function(content,targetNode,targetCollection) {
	if(content != null) {
		if(targetNode != null) {
			var currentTarget = targetNode;
			var $it0 = HxOverrides.iter(content.collection);
			while( $it0.hasNext() ) {
				var childToAdd = $it0.next();
				dtx.single.DOMManipulation.insertThisAfter(childToAdd,currentTarget,null);
				currentTarget = childToAdd;
			}
		}
		if(targetCollection != null) {
			var firstChildUsed = false;
			var childCollection = content;
			var $it1 = HxOverrides.iter(targetCollection.collection);
			while( $it1.hasNext() ) {
				var target = $it1.next();
				childCollection = firstChildUsed?childCollection.clone():childCollection;
				dtx.collection.DOMManipulation.insertThisAfter(childCollection,target);
				firstChildUsed = true;
			}
		}
	}
	return content;
}
dtx.collection.DOMManipulation.beforeThisInsert = function(target,contentNode,contentCollection) {
	if(contentNode != null) dtx.single.DOMManipulation.insertThisBefore(contentNode,null,target);
	if(contentCollection != null) dtx.collection.DOMManipulation.insertThisBefore(contentCollection,null,target);
	return target;
}
dtx.collection.DOMManipulation.afterThisInsert = function(target,contentNode,contentCollection) {
	if(contentNode != null) dtx.single.DOMManipulation.insertThisAfter(contentNode,null,target);
	if(contentCollection != null) dtx.collection.DOMManipulation.insertThisAfter(contentCollection,null,target);
	return target;
}
dtx.collection.DOMManipulation.remove = function(nodesToRemove) {
	if(nodesToRemove != null) {
		var $it0 = HxOverrides.iter(nodesToRemove.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			dtx.single.DOMManipulation.remove(node);
		}
	}
	return nodesToRemove;
}
dtx.collection.DOMManipulation.removeFromDOM = function(nodesToRemove) {
	return dtx.collection.DOMManipulation.remove(nodesToRemove);
}
dtx.collection.DOMManipulation.removeChildren = function(parents,childToRemove,childrenToRemove) {
	if(parents != null) {
		var $it0 = HxOverrides.iter(parents.collection);
		while( $it0.hasNext() ) {
			var parent = $it0.next();
			dtx.single.DOMManipulation.removeChildren(parent,childToRemove,childrenToRemove);
		}
	}
	return parents;
}
dtx.collection.DOMManipulation.replaceWith = function(target,contentNode,contentQuery) {
	if(contentNode != null) dtx.single.DOMManipulation.insertThisAfter(contentNode,null,target);
	if(contentQuery != null) dtx.collection.DOMManipulation.insertThisAfter(contentQuery,null,target);
	target;
	dtx.collection.DOMManipulation.remove(target);
	return target;
}
dtx.collection.DOMManipulation.empty = function(containers) {
	if(containers != null) {
		var $it0 = HxOverrides.iter(containers.collection);
		while( $it0.hasNext() ) {
			var container = $it0.next();
			while(container.hasChildNodes()) container.removeChild(container.firstChild);
		}
	}
	return containers;
}
dtx.collection.ElementManipulation = $hxClasses["dtx.collection.ElementManipulation"] = function() { }
dtx.collection.ElementManipulation.__name__ = ["dtx","collection","ElementManipulation"];
dtx.collection.ElementManipulation.index = function(q) {
	return dtx.single.ElementManipulation.index(q.collection[0]);
}
dtx.collection.ElementManipulation.attr = function(query,attName) {
	return query != null && query.collection.length > 0?dtx.single.ElementManipulation.attr(query.collection[0],attName):"";
}
dtx.collection.ElementManipulation.setAttr = function(query,attName,attValue) {
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			dtx.single.ElementManipulation.setAttr(node,attName,attValue);
		}
	}
	return query;
}
dtx.collection.ElementManipulation.removeAttr = function(query,attName) {
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			dtx.single.ElementManipulation.removeAttr(node,attName);
		}
	}
	return query;
}
dtx.collection.ElementManipulation.hasClass = function(query,className) {
	var result = false;
	if(query != null && query.collection.length > 0) {
		result = true;
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(dtx.single.ElementManipulation.hasClass(node,className) == false) {
				result = false;
				break;
			}
		}
	}
	return result;
}
dtx.collection.ElementManipulation.addClass = function(query,className) {
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			dtx.single.ElementManipulation.addClass(node,className);
		}
	}
	return query;
}
dtx.collection.ElementManipulation.removeClass = function(query,className) {
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			dtx.single.ElementManipulation.removeClass(node,className);
		}
	}
	return query;
}
dtx.collection.ElementManipulation.toggleClass = function(query,className) {
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			dtx.single.ElementManipulation.toggleClass(node,className);
		}
	}
	return query;
}
dtx.collection.ElementManipulation.tagName = function(query) {
	return query != null && query.collection.length > 0?dtx.single.ElementManipulation.tagName(query.collection[0]):"";
}
dtx.collection.ElementManipulation.val = function(query) {
	return query != null && query.collection.length > 0?dtx.single.ElementManipulation.val(query.collection[0]):"";
}
dtx.collection.ElementManipulation.setVal = function(query,val) {
	var value = Std.string(val);
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			dtx.single.ElementManipulation.setVal(node,value);
		}
	}
	return query;
}
dtx.collection.ElementManipulation.text = function(query) {
	var text = "";
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			text = text + dtx.single.ElementManipulation.text(node);
		}
	}
	return text;
}
dtx.collection.ElementManipulation.setText = function(query,text) {
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			dtx.single.ElementManipulation.setText(node,text);
		}
	}
	return query;
}
dtx.collection.ElementManipulation.innerHTML = function(query) {
	var ret = "";
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			ret += dtx.single.ElementManipulation.innerHTML(node);
		}
	}
	return ret;
}
dtx.collection.ElementManipulation.setInnerHTML = function(query,html) {
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			dtx.single.ElementManipulation.setInnerHTML(node,html);
		}
	}
	return query;
}
dtx.collection.ElementManipulation.html = function(collection) {
	var str = "";
	if(collection != null) {
		var $it0 = HxOverrides.iter(collection.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			str += dtx.single.ElementManipulation.html(node);
		}
	}
	return str;
}
dtx.collection.EventManagement = $hxClasses["dtx.collection.EventManagement"] = function() { }
dtx.collection.EventManagement.__name__ = ["dtx","collection","EventManagement"];
dtx.collection.EventManagement.on = function(targetCollection,BneventType,listener) {
	var $it0 = HxOverrides.iter(targetCollection.collection);
	while( $it0.hasNext() ) {
		var target = $it0.next();
		bean.on(target,BneventType,listener);
		target;
	}
	return targetCollection;
}
dtx.collection.EventManagement.off = function(targetCollection,BneventType,listener) {
	var $it0 = HxOverrides.iter(targetCollection.collection);
	while( $it0.hasNext() ) {
		var target = $it0.next();
		dtx.single.EventManagement.off(target,BneventType,listener);
	}
	return targetCollection;
}
dtx.collection.EventManagement.one = function(targetCollection,BneventType,listener) {
	var $it0 = HxOverrides.iter(targetCollection.collection);
	while( $it0.hasNext() ) {
		var target = $it0.next();
		dtx.single.EventManagement.one(target,BneventType,listener);
	}
	return targetCollection;
}
dtx.collection.EventManagement.mousedown = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"mousedown",listener);
}
dtx.collection.EventManagement.mouseenter = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"mouseenter",listener);
}
dtx.collection.EventManagement.mouseleave = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"mouseleave",listener);
}
dtx.collection.EventManagement.mousemove = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"mousemove",listener);
}
dtx.collection.EventManagement.mouseout = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"mouseout",listener);
}
dtx.collection.EventManagement.mouseover = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"mouseover",listener);
}
dtx.collection.EventManagement.mouseup = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"mouseup",listener);
}
dtx.collection.EventManagement.keydown = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"keydown",listener);
}
dtx.collection.EventManagement.keypress = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"keypress",listener);
}
dtx.collection.EventManagement.keyup = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"keyup",listener);
}
dtx.collection.EventManagement.hover = function(targetCollection,listener1,listener2) {
	var $it0 = HxOverrides.iter(targetCollection.collection);
	while( $it0.hasNext() ) {
		var node = $it0.next();
		dtx.single.EventManagement.hover(node,listener1,listener2);
	}
	return targetCollection;
}
dtx.collection.EventManagement.submit = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"submit",listener);
}
dtx.collection.EventManagement.toggleClick = function(targetCollection,listenerFirstClick,listenerSecondClick) {
	var $it0 = HxOverrides.iter(targetCollection.collection);
	while( $it0.hasNext() ) {
		var target = $it0.next();
		dtx.single.EventManagement.toggleClick(target,listenerFirstClick,listenerSecondClick);
	}
	return targetCollection;
}
dtx.collection.EventManagement.blur = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"blur",listener);
}
dtx.collection.EventManagement.change = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"change",listener);
}
dtx.collection.EventManagement.click = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"click",listener);
}
dtx.collection.EventManagement.dblclick = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"dblclick",listener);
}
dtx.collection.EventManagement.focus = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"focus",listener);
}
dtx.collection.EventManagement.focusIn = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"focusIn",listener);
}
dtx.collection.EventManagement.focusOut = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"focusOut",listener);
}
dtx.collection.EventManagement.resize = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"resize",listener);
}
dtx.collection.EventManagement.scroll = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"scroll",listener);
}
dtx.collection.EventManagement.select = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"select",listener);
}
dtx.collection.EventManagement.load = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"load",listener);
}
dtx.collection.EventManagement.unload = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"unload",listener);
}
dtx.collection.EventManagement.error = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"error",listener);
}
dtx.collection.EventManagement.ready = function(target,listener) {
	return dtx.collection.EventManagement.on(target,"ready",listener);
}
dtx.collection.Style = $hxClasses["dtx.collection.Style"] = function() { }
dtx.collection.Style.__name__ = ["dtx","collection","Style"];
dtx.collection.Style.setCSS = function(collection,property,value) {
	var $it0 = HxOverrides.iter(collection.collection);
	while( $it0.hasNext() ) {
		var node = $it0.next();
		dtx.single.Style.setCSS(node,property,value);
	}
}
dtx.collection.Traversing = $hxClasses["dtx.collection.Traversing"] = function() { }
dtx.collection.Traversing.__name__ = ["dtx","collection","Traversing"];
dtx.collection.Traversing.children = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new dtx.DOMCollection();
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(dtx.single.ElementManipulation.isElement(node)) children.addNodeList(node.childNodes,elementsOnly);
		}
	}
	return children;
}
dtx.collection.Traversing.firstChildren = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new dtx.DOMCollection();
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(dtx.single.ElementManipulation.isElement(node)) {
				var e = node.firstChild;
				while(elementsOnly == true && e != null && dtx.single.ElementManipulation.isElement(e) == false) e = e.nextSibling;
				if(e != null) children.add(e);
			}
		}
	}
	return children;
}
dtx.collection.Traversing.lastChildren = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new dtx.DOMCollection();
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(dtx.single.ElementManipulation.isElement(node)) {
				var e = node.lastChild;
				while(elementsOnly == true && e != null && dtx.single.ElementManipulation.isElement(e) == false) e = e.previousSibling;
				if(e != null) {
					if(e != null) {
						if(Lambda.has(children.collection,e) == false) children.collection.push(e);
					}
					children;
				}
			}
		}
	}
	return children;
}
dtx.collection.Traversing.parent = function(query) {
	var parents = new dtx.DOMCollection();
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(node.parentNode != null && node != (function($this) {
				var $r;
				if(dtx.Tools.document == null) dtx.Tools.document = document;
				$r = dtx.Tools.document;
				return $r;
			}(this))) parents.add(node.parentNode);
		}
	}
	return parents;
}
dtx.collection.Traversing.parents = function(query) {
	return dtx.collection.Traversing.parent(query);
}
dtx.collection.Traversing.ancestors = function(query) {
	var ancestorList = dtx.collection.Traversing.parent(query);
	if(ancestorList.collection.length > 0) ancestorList.addCollection(dtx.collection.Traversing.ancestors(ancestorList));
	return ancestorList;
}
dtx.collection.Traversing.descendants = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var descendantList = new dtx.DOMCollection();
	var $it0 = HxOverrides.iter(query.collection);
	while( $it0.hasNext() ) {
		var node = $it0.next();
		var l = dtx.single.Traversing.descendants(node,elementsOnly);
		descendantList.addCollection(l);
	}
	return descendantList;
}
dtx.collection.Traversing.next = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var siblings = new dtx.DOMCollection();
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			var sibling = node.nextSibling;
			while(sibling != null && sibling.nodeType != dtx.DOMType.ELEMENT_NODE && elementsOnly) sibling = sibling.nextSibling;
			if(sibling != null) siblings.add(sibling);
		}
	}
	return siblings;
}
dtx.collection.Traversing.prev = function(query,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var siblings = new dtx.DOMCollection();
	if(query != null) {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			var sibling = node.previousSibling;
			while(sibling != null && sibling.nodeType != dtx.DOMType.ELEMENT_NODE && elementsOnly) sibling = sibling.previousSibling;
			if(sibling != null) siblings.add(sibling);
		}
	}
	return siblings;
}
dtx.collection.Traversing.find = function(query,selector) {
	var newDOMCollection = new dtx.DOMCollection();
	if(query != null && selector != null && selector != "") {
		var $it0 = HxOverrides.iter(query.collection);
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(dtx.single.ElementManipulation.isElement(node)) {
				var element = node;
				newDOMCollection.addNodeList(element.querySelectorAll(selector));
			}
		}
	}
	return newDOMCollection;
}
if(!dtx.single) dtx.single = {}
dtx.single.DOMManipulation = $hxClasses["dtx.single.DOMManipulation"] = function() { }
dtx.single.DOMManipulation.__name__ = ["dtx","single","DOMManipulation"];
dtx.single.DOMManipulation.append = function(parent,childNode,childCollection) {
	if(parent != null) {
		if(childNode != null) parent.appendChild(childNode);
		if(childCollection != null) {
			var $it0 = HxOverrides.iter(childCollection.collection);
			while( $it0.hasNext() ) {
				var child = $it0.next();
				parent.appendChild(child);
			}
		}
	}
	return parent;
}
dtx.single.DOMManipulation.prepend = function(parent,newChildNode,newChildCollection) {
	if(parent != null) {
		if(newChildNode != null) {
			if(parent.hasChildNodes()) dtx.single.DOMManipulation.insertThisBefore(newChildNode,parent.firstChild); else dtx.single.DOMManipulation.append(parent,newChildNode);
		}
		if(newChildCollection != null) dtx.collection.DOMManipulation.insertThisBefore(newChildCollection,parent.firstChild);
	}
	return parent;
}
dtx.single.DOMManipulation.appendTo = function(child,parentNode,parentCollection) {
	if(parentNode != null) dtx.single.DOMManipulation.append(parentNode,child);
	if(parentCollection != null) dtx.collection.DOMManipulation.append(parentCollection,child);
	return child;
}
dtx.single.DOMManipulation.prependTo = function(child,parentNode,parentCollection) {
	if(parentNode != null) {
		if(parentNode.hasChildNodes()) dtx.single.DOMManipulation.insertThisBefore(child,parentNode.firstChild,parentCollection); else dtx.single.DOMManipulation.append(parentNode,child);
	}
	if(parentCollection != null) dtx.collection.DOMManipulation.prepend(parentCollection,child);
	return child;
}
dtx.single.DOMManipulation.insertThisBefore = function(content,targetNode,targetCollection) {
	if(content != null) {
		if(targetNode != null) {
			var parent = targetNode.parentNode;
			parent.insertBefore(content,targetNode);
		}
		if(targetCollection != null) {
			var firstChildUsed = false;
			var $it0 = HxOverrides.iter(targetCollection.collection);
			while( $it0.hasNext() ) {
				var target = $it0.next();
				var childToInsert = firstChildUsed?content.cloneNode(true):content;
				var parent = target.parentNode;
				parent.insertBefore(childToInsert,target);
				firstChildUsed = true;
			}
		}
	}
	return content;
}
dtx.single.DOMManipulation.insertThisAfter = function(content,targetNode,targetCollection) {
	if(content != null) {
		if(targetNode != null) {
			var next = targetNode.nextSibling;
			if(next != null) {
				var parent = targetNode.parentNode;
				var next1 = targetNode.nextSibling;
				parent.insertBefore(content,next1);
			} else {
				var parent = targetNode.parentNode;
				parent.appendChild(content);
			}
		}
		if(targetCollection != null) {
			var firstChildUsed = false;
			var $it0 = HxOverrides.iter(targetCollection.collection);
			while( $it0.hasNext() ) {
				var target = $it0.next();
				var childToInsert = firstChildUsed?content.cloneNode(true):content;
				var next = target.nextSibling;
				if(next != null) {
					var parent = target.parentNode;
					parent.insertBefore(childToInsert,next);
				} else dtx.single.DOMManipulation.append(target.parentNode,childToInsert);
				firstChildUsed = true;
			}
		}
	}
	return content;
}
dtx.single.DOMManipulation.beforeThisInsert = function(target,contentNode,contentQuery) {
	if(target != null) {
		if(contentNode != null) dtx.single.DOMManipulation.insertThisBefore(contentNode,target);
		if(contentQuery != null) dtx.collection.DOMManipulation.insertThisBefore(contentQuery,target);
	}
	return target;
}
dtx.single.DOMManipulation.afterThisInsert = function(target,contentNode,contentQuery) {
	if(target != null) {
		if(contentNode != null) dtx.single.DOMManipulation.insertThisAfter(contentNode,target,null);
		if(contentQuery != null) dtx.collection.DOMManipulation.insertThisAfter(contentQuery,target);
	}
	return target;
}
dtx.single.DOMManipulation.remove = function(childToRemove) {
	if(childToRemove != null && childToRemove.parentNode != null) {
		var parent = childToRemove.parentNode;
		parent.removeChild(childToRemove);
	}
	return childToRemove;
}
dtx.single.DOMManipulation.removeFromDOM = function(nodesToRemove) {
	return dtx.single.DOMManipulation.remove(nodesToRemove);
}
dtx.single.DOMManipulation.removeChildren = function(parent,childToRemove,childrenToRemove) {
	if(parent != null) {
		if(childToRemove != null && childToRemove.parentNode == parent) parent.removeChild(childToRemove);
		if(childrenToRemove != null) {
			var $it0 = HxOverrides.iter(childrenToRemove.collection);
			while( $it0.hasNext() ) {
				var child = $it0.next();
				if(child.parentNode == parent) parent.removeChild(child);
			}
		}
	}
	return parent;
}
dtx.single.DOMManipulation.replaceWith = function(target,contentNode,contentQuery) {
	dtx.single.DOMManipulation.afterThisInsert(target,contentNode,contentQuery);
	dtx.single.DOMManipulation.remove(target);
	return target;
}
dtx.single.DOMManipulation.empty = function(container) {
	if(container != null) while(container.hasChildNodes()) container.removeChild(container.firstChild);
	return container;
}
dtx.single.ElementManipulation = $hxClasses["dtx.single.ElementManipulation"] = function() { }
dtx.single.ElementManipulation.__name__ = ["dtx","single","ElementManipulation"];
dtx.single.ElementManipulation.isElement = function(node) {
	return node != null && node.nodeType == dtx.DOMType.ELEMENT_NODE;
}
dtx.single.ElementManipulation.isComment = function(node) {
	return node != null && node.nodeType == dtx.DOMType.COMMENT_NODE;
}
dtx.single.ElementManipulation.isTextNode = function(node) {
	return node != null && node.nodeType == dtx.DOMType.TEXT_NODE;
}
dtx.single.ElementManipulation.isDocument = function(node) {
	return node != null && node.nodeType == dtx.DOMType.DOCUMENT_NODE;
}
dtx.single.ElementManipulation.toQuery = function(n) {
	return new dtx.DOMCollection(null,n);
}
dtx.single.ElementManipulation.index = function(n) {
	return Lambda.indexOf(dtx.single.Traversing.children(dtx.single.Traversing.parent(n),false),n);
}
dtx.single.ElementManipulation.attr = function(elm,attName) {
	var ret = "";
	if(dtx.single.ElementManipulation.isElement(elm)) {
		var element = elm;
		ret = element.getAttribute(attName);
		if(ret == null) ret = "";
	}
	return ret;
}
dtx.single.ElementManipulation.setAttr = function(elm,attName,attValue) {
	if(elm != null && elm.nodeType == dtx.DOMType.ELEMENT_NODE) {
		var element = elm;
		element.setAttribute(attName,attValue);
	}
	return elm;
}
dtx.single.ElementManipulation.removeAttr = function(elm,attName) {
	if(elm != null && elm.nodeType == dtx.DOMType.ELEMENT_NODE) {
		var element = elm;
		element.removeAttribute(attName);
	}
	return elm;
}
dtx.single.ElementManipulation.testForClass = function(elm,className) {
	return (" " + dtx.single.ElementManipulation.attr(elm,"class") + " ").indexOf(" " + className + " ") > -1;
}
dtx.single.ElementManipulation.hasClass = function(elm,className) {
	var hasClass = true;
	if(className.indexOf(" ") > -1) {
		var anyWhitespace = new EReg("\\s+","g");
		var _g = 0, _g1 = anyWhitespace.split(className);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			hasClass = (" " + dtx.single.ElementManipulation.attr(elm,"class") + " ").indexOf(" " + name + " ") > -1;
			if(hasClass == false) break;
		}
	} else hasClass = (" " + dtx.single.ElementManipulation.attr(elm,"class") + " ").indexOf(" " + className + " ") > -1;
	return hasClass;
}
dtx.single.ElementManipulation.addClass = function(elm,className) {
	var _g = 0, _g1 = className.split(" ");
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		if(dtx.single.ElementManipulation.hasClass(elm,className) == false) {
			var oldClassName = dtx.single.ElementManipulation.attr(elm,"class");
			var newClassName = oldClassName == ""?className:oldClassName + " " + className;
			dtx.single.ElementManipulation.setAttr(elm,"class",newClassName);
		}
	}
	return elm;
}
dtx.single.ElementManipulation.removeClass = function(elm,className) {
	var classes = dtx.single.ElementManipulation.attr(elm,"class").split(" ");
	var _g = 0, _g1 = className.split(" ");
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		HxOverrides.remove(classes,name);
	}
	var newClassValue = classes.join(" ");
	dtx.single.ElementManipulation.setAttr(elm,"class",newClassValue);
	return elm;
}
dtx.single.ElementManipulation.toggleClass = function(elm,className) {
	var _g = 0, _g1 = className.split(" ");
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		if(dtx.single.ElementManipulation.hasClass(elm,name)) dtx.single.ElementManipulation.removeClass(elm,name); else dtx.single.ElementManipulation.addClass(elm,name);
	}
	return elm;
}
dtx.single.ElementManipulation.tagName = function(elm) {
	return elm == null?"":elm.nodeName.toLowerCase();
}
dtx.single.ElementManipulation.val = function(node) {
	var val = "";
	if(node != null) switch(node.nodeType) {
	case dtx.DOMType.ELEMENT_NODE:
		val = Reflect.field(node,"value");
		if(val == null) val = dtx.single.ElementManipulation.attr(node,"value");
		break;
	default:
		val = node.nodeValue;
	}
	return val;
}
dtx.single.ElementManipulation.setVal = function(node,val) {
	if(node != null) switch(node.nodeType) {
	case dtx.DOMType.ELEMENT_NODE:
		node.value = val;
		break;
	default:
		node.nodeValue = val;
	}
	return node;
}
dtx.single.ElementManipulation.text = function(elm) {
	var text = "";
	if(elm != null) {
		if(dtx.single.ElementManipulation.isElement(elm)) text = elm.textContent; else text = elm.nodeValue;
	}
	return text;
}
dtx.single.ElementManipulation.setText = function(elm,text) {
	if(elm != null) {
		if(dtx.single.ElementManipulation.isElement(elm)) elm.textContent = text; else elm.nodeValue = text;
	}
	return elm;
}
dtx.single.ElementManipulation.innerHTML = function(elm) {
	var ret = "";
	if(elm != null) switch(elm.nodeType) {
	case dtx.DOMType.ELEMENT_NODE:
		var element = elm;
		ret = element.innerHTML;
		break;
	default:
		ret = elm.textContent;
	}
	return ret;
}
dtx.single.ElementManipulation.setInnerHTML = function(elm,html) {
	if(elm != null) switch(elm.nodeType) {
	case dtx.DOMType.ELEMENT_NODE:
		var element = elm;
		element.innerHTML = html;
		break;
	default:
		elm.textContent = html;
	}
	return elm;
}
dtx.single.ElementManipulation.clone = function(elm,deep) {
	if(deep == null) deep = true;
	return elm == null?null:elm.cloneNode(deep);
}
dtx.single.ElementManipulation.html = function(elm) {
	var div = dtx.Tools.create("div");
	dtx.single.DOMManipulation.append(div,elm == null?null:elm.cloneNode(true));
	return dtx.single.ElementManipulation.innerHTML(div);
}
dtx.single.EventManagement = $hxClasses["dtx.single.EventManagement"] = function() { }
dtx.single.EventManagement.__name__ = ["dtx","single","EventManagement"];
dtx.single.EventManagement.trigger = function(target,eventString) {
	bean.fire(target,eventString);
	return target;
}
dtx.single.EventManagement.on = function(target,eventType,listener) {
	bean.on(target,eventType,listener);
	return target;
}
dtx.single.EventManagement.off = function(target,eventType,listener) {
	bean.off(target,eventType,listener);
	return target;
}
dtx.single.EventManagement.one = function(target,eventType,listener) {
	bean.one(target,eventType,listener);
	return target;
}
dtx.single.EventManagement.mousedown = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"mousedown",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.mouseenter = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"mouseover",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.mouseleave = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"mouseout",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.mousemove = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"mousemove",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.mouseout = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"mouseout",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.mouseover = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"mouseover",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.mouseup = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"mouseup",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.keydown = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"keydown",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.keypress = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"keypress",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.keyup = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"keyup",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.hover = function(target,listener1,listener2) {
	bean.on(target,"mouseover",listener1);
	target;
	if(listener2 == null) {
		bean.on(target,"mouseout",listener1);
		target;
	} else {
		bean.on(target,"mouseout",listener2);
		target;
	}
	return target;
}
dtx.single.EventManagement.submit = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"submit",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.toggleClick = function(target,listenerFirstClick,listenerSecondClick) {
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
dtx.single.EventManagement.blur = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"blur",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.change = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"change",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.click = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"click",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.dblclick = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"dblclick",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.focus = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"focus",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.focusIn = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"focusIn",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.focusOut = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"focusOut",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.resize = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"resize",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.scroll = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"scroll",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.select = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"select",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.load = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"load",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.unload = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"unload",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.error = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"error",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.EventManagement.ready = function(target,listener) {
	return (function($this) {
		var $r;
		bean.on(target,"ready",listener);
		$r = target;
		return $r;
	}(this));
}
dtx.single.Style = $hxClasses["dtx.single.Style"] = function() { }
dtx.single.Style.__name__ = ["dtx","single","Style"];
dtx.single.Style.getComputedStyle = function(node) {
	var style = null;
	if(dtx.single.ElementManipulation.isElement(node)) {
	}
	return style;
}
dtx.single.Style.css = function(node,property) {
	dtx.single.Style.getComputedStyle(node).getPropertyValue("property");
}
dtx.single.Style.setCSS = function(node,property,value) {
	if(dtx.single.ElementManipulation.isElement(node)) {
		var style = node.style;
		style[property] = value;
	}
}
dtx.single.Style.innerWidth = function(node) {
	var style = dtx.single.Style.getComputedStyle(node);
	if(style != null) {
	}
	return 0;
}
dtx.single.Traversing = $hxClasses["dtx.single.Traversing"] = function() { }
dtx.single.Traversing.__name__ = ["dtx","single","Traversing"];
dtx.single.Traversing.children = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var children = new dtx.DOMCollection();
	if(node != null && dtx.single.ElementManipulation.isElement(node)) children.addNodeList(node.childNodes,elementsOnly);
	return children;
}
dtx.single.Traversing.firstChildren = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var firstChild = null;
	if(node != null && dtx.single.ElementManipulation.isElement(node)) {
		var e = node.firstChild;
		while(elementsOnly == true && e != null && dtx.single.ElementManipulation.isElement(e) == false) e = e.nextSibling;
		if(e != null) firstChild = e;
	}
	return firstChild;
}
dtx.single.Traversing.lastChildren = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var lastChild = null;
	if(node != null && dtx.single.ElementManipulation.isElement(node)) {
		var e = node.lastChild;
		while(elementsOnly == true && e != null && dtx.single.ElementManipulation.isElement(e) == false) e = e.previousSibling;
		if(e != null) lastChild = e;
	}
	return lastChild;
}
dtx.single.Traversing.parent = function(node) {
	var p = null;
	if(node != null && node.parentNode != null && node != (function($this) {
		var $r;
		if(dtx.Tools.document == null) dtx.Tools.document = document;
		$r = dtx.Tools.document;
		return $r;
	}(this))) p = node.parentNode;
	return p;
}
dtx.single.Traversing.parents = function(node) {
	return dtx.single.Traversing.parent(node);
}
dtx.single.Traversing.ancestors = function(node) {
	var ancestorsList = new dtx.DOMCollection();
	var parent = dtx.single.Traversing.parent(node);
	if(parent != null) {
		if(Lambda.has(ancestorsList.collection,parent) == false) ancestorsList.collection.push(parent);
	}
	ancestorsList;
	if(ancestorsList.collection.length > 0) {
		var ancestorsOfThisParent = dtx.single.Traversing.ancestors(parent);
		ancestorsList.addCollection(ancestorsOfThisParent);
	}
	return ancestorsList;
}
dtx.single.Traversing.descendants = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var descendantList = new dtx.DOMCollection();
	var $it0 = HxOverrides.iter(dtx.single.Traversing.children(node,elementsOnly).collection);
	while( $it0.hasNext() ) {
		var child = $it0.next();
		if(child != null) {
			if(Lambda.has(descendantList.collection,child) == false) descendantList.collection.push(child);
		}
		descendantList;
		descendantList.addCollection(dtx.single.Traversing.descendants(child,elementsOnly));
	}
	return descendantList;
}
dtx.single.Traversing.next = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var sibling = node != null?node.nextSibling:null;
	while(sibling != null && elementsOnly && sibling.nodeType != dtx.DOMType.ELEMENT_NODE) sibling = sibling.nextSibling;
	return sibling;
}
dtx.single.Traversing.prev = function(node,elementsOnly) {
	if(elementsOnly == null) elementsOnly = true;
	var sibling = node != null?node.previousSibling:null;
	while(sibling != null && elementsOnly && sibling.nodeType != dtx.DOMType.ELEMENT_NODE) sibling = sibling.previousSibling;
	return sibling;
}
dtx.single.Traversing.find = function(node,selector) {
	var newDOMCollection = new dtx.DOMCollection();
	if(node != null && dtx.single.ElementManipulation.isElement(node)) {
		var element = node;
		newDOMCollection.addNodeList(element.querySelectorAll(selector));
	}
	return newDOMCollection;
}
dtx.widget.WidgetTools = $hxClasses["dtx.widget.WidgetTools"] = function() { }
dtx.widget.WidgetTools.__name__ = ["dtx","widget","WidgetTools"];
var erazor = erazor || {}
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
	parse: function(template) {
		var output = new Array();
		this.bracketStack = [];
		this.conditionalStack = 0;
		while(template != "") {
			this.context = this.parseContext(template);
			var block = this.parseBlock(template);
			if(block.block != null) output.push(block.block);
			template = HxOverrides.substr(template,block.length,null);
		}
		if(this.bracketStack.length != 0) throw erazor.Parser.bracketMismatch;
		return output;
	}
	,escapeLiteral: function(input) {
		return StringTools.replace(input,erazor.Parser.at + erazor.Parser.at,erazor.Parser.at);
	}
	,parseLiteral: function(template) {
		var len = template.length;
		var i = -1;
		while(++i < len) {
			var $char = template.charAt(i);
			switch($char) {
			case erazor.Parser.at:
				if(len > i + 1 && template.charAt(i + 1) != erazor.Parser.at) return { block : erazor.TBlock.literal(this.escapeLiteral(HxOverrides.substr(template,0,i))), length : i};
				++i;
				break;
			case "}":
				if(this.bracketStack.length > 0) {
					switch( (this.bracketStack[this.bracketStack.length - 1])[1] ) {
					case 1:
						return { block : erazor.TBlock.literal(this.escapeLiteral(HxOverrides.substr(template,0,i))), length : i};
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
	,parseString: function(str,modifier,throwAtEnd) {
		var insideSingleQuote = false;
		var insideDoubleQuote = false;
		var i = -1;
		while(++i < str.length) {
			var $char = str.charAt(i);
			if(!insideDoubleQuote && !insideSingleQuote) {
				switch( (modifier($char))[1] ) {
				case 1:
					return HxOverrides.substr(str,0,i + 1);
				case 2:
					return HxOverrides.substr(str,0,i);
				case 0:
					break;
				}
				if($char == "\"") insideDoubleQuote = true; else if($char == "'") insideSingleQuote = true;
			} else if(insideDoubleQuote && $char == "\"" && str.charAt(i - 1) != "\\") insideDoubleQuote = false; else if(insideSingleQuote && $char == "'" && str.charAt(i - 1) != "\\") insideSingleQuote = false;
		}
		if(throwAtEnd) throw "Failed to find a closing delimiter: " + HxOverrides.substr(str,0,100);
		return str;
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
		var str = this.parseScriptPart(HxOverrides.substr(template,1,null),startBrace,endBrace);
		var noBraces = StringTools.trim(HxOverrides.substr(str,1,str.length - 2));
		if(startBrace == "{") return { block : erazor.TBlock.codeBlock(noBraces), length : str.length + 1}; else return { block : erazor.TBlock.printBlock(noBraces), length : str.length + 1};
	}
	,parseVariableChar: function($char) {
		return this.variableChar.match($char)?erazor._Parser.ParseResult.keepGoing:erazor._Parser.ParseResult.doneSkipCurrent;
	}
	,parseVariable: function(template) {
		var output = "";
		var $char = null;
		var part = null;
		template = HxOverrides.substr(template,1,null);
		do {
			part = this.acceptIdentifier(template);
			template = HxOverrides.substr(template,part.length,null);
			output += part;
			$char = this.peek(template);
			while($char == "(" || $char == "[") {
				part = this.acceptBracket(template,$char);
				template = HxOverrides.substr(template,part.length,null);
				output += part;
				$char = this.peek(template);
			}
			if($char == "." && this.isIdentifier(this.peek(template,1))) {
				template = HxOverrides.substr(template,1,null);
				output += ".";
			} else break;
		} while($char != null);
		return { block : erazor.TBlock.printBlock(output), length : output.length + 1};
	}
	,peek: function(template,offset) {
		if(offset == null) offset = 0;
		return template.length > offset?template.charAt(offset):null;
	}
	,parseConditional: function(template) {
		var str = this.parseScriptPart(template,"","{");
		return { block : erazor.TBlock.codeBlock(HxOverrides.substr(str,1,null)), length : str.length};
	}
	,parseBlock: function(template) {
		return this.context == erazor._Parser.ParseContext.code?this.parseCodeBlock(template):this.parseLiteral(template);
	}
	,acceptBracket: function(template,bracket) {
		return this.parseScriptPart(template,bracket,bracket == "("?")":"]");
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
	,isIdentifier: function($char,first) {
		if(first == null) first = true;
		return first?$char >= "a" && $char <= "z" || $char >= "A" && $char <= "Z" || $char == "_":$char >= "a" && $char <= "z" || $char >= "A" && $char <= "Z" || $char >= "0" && $char <= "9" || $char == "_";
	}
	,accept: function(template,acceptor,throwAtEnd) {
		return this.parseString(template,function(chr) {
			return acceptor(chr)?erazor._Parser.ParseResult.keepGoing:erazor._Parser.ParseResult.doneSkipCurrent;
		},throwAtEnd);
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
				if(stack == 0) return HxOverrides.substr(template,0,i + 1);
				if(stack < 0) throw "Unbalanced braces for block: " + HxOverrides.substr(template,0,100) + " ...";
				break;
			case "\"":
				insideDoubleQuote = true;
				break;
			case "'":
				insideSingleQuote = true;
				break;
			} else if(insideDoubleQuote && $char == "\"" && template.charAt(i - 1) != "\\") insideDoubleQuote = false; else if(insideSingleQuote && $char == "'" && template.charAt(i - 1) != "\\") insideSingleQuote = false;
		}
		throw "Failed to find a closing delimiter for the script block: " + HxOverrides.substr(template,0,100);
	}
	,conditionalStack: null
	,bracketStack: null
	,context: null
	,variableChar: null
	,inConditionalMatch: null
	,condMatch: null
	,__class__: erazor.Parser
}
erazor.ScriptBuilder = $hxClasses["erazor.ScriptBuilder"] = function(context) {
	this.context = context;
};
erazor.ScriptBuilder.__name__ = ["erazor","ScriptBuilder"];
erazor.ScriptBuilder.prototype = {
	blockToString: function(block) {
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
	,build: function(blocks) {
		var buffer = new StringBuf();
		var _g = 0;
		while(_g < blocks.length) {
			var block = blocks[_g];
			++_g;
			buffer.b += Std.string(this.blockToString(block));
		}
		return buffer.b;
	}
	,context: null
	,__class__: erazor.ScriptBuilder
}
erazor.TBlock = $hxClasses["erazor.TBlock"] = { __ename__ : ["erazor","TBlock"], __constructs__ : ["literal","codeBlock","printBlock"] }
erazor.TBlock.literal = function(s) { var $x = ["literal",0,s]; $x.__enum__ = erazor.TBlock; $x.toString = $estr; return $x; }
erazor.TBlock.codeBlock = function(s) { var $x = ["codeBlock",1,s]; $x.__enum__ = erazor.TBlock; $x.toString = $estr; return $x; }
erazor.TBlock.printBlock = function(s) { var $x = ["printBlock",2,s]; $x.__enum__ = erazor.TBlock; $x.toString = $estr; return $x; }
erazor.Template = $hxClasses["erazor.Template"] = function(template) {
	this.template = template;
};
erazor.Template.__name__ = ["erazor","Template"];
erazor.Template.prototype = {
	setInterpreterVars: function(interp,content) {
		if(js.Boot.__instanceof(content,Hash)) {
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
		return buffer.b;
	}
	,variables: null
	,template: null
	,__class__: erazor.Template
}
var hscript = hscript || {}
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
	cnew: function(cl,args) {
		return Type.createInstance(Type.resolveClass(cl),args);
	}
	,call: function(o,f,args) {
		return f.apply(o,args);
	}
	,set: function(o,f,v) {
		if(o == null) throw hscript.Error.EInvalidAccess(f);
		o[f] = v;
		return v;
	}
	,get: function(o,f) {
		if(o == null) throw hscript.Error.EInvalidAccess(f);
		return Reflect.field(o,f);
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
	,makeIterator: function(v) {
		try {
			v = $iterator(v)();
		} catch( e ) {
		}
		if(v.hasNext == null || v.next == null) throw hscript.Error.EInvalidIterator(v);
		return v;
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
	,restore: function(old) {
		while(this.declared.length > old) {
			var d = this.declared.pop();
			this.locals.set(d.n,d.old);
		}
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
	,execute: function(expr) {
		this.locals = new Hash();
		return this.exprReturn(expr);
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
	,assignOp: function(op,fop) {
		var me = this;
		this.binops.set(op,function(e1,e2) {
			return me.evalAssignOp(op,fop,e1,e2);
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
		this.binops.set("=",$bind(this,this.assign));
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
	,declared: null
	,binops: null
	,locals: null
	,variables: null
	,__class__: hscript.Interp
}
if(!erazor.hscript) erazor.hscript = {}
erazor.hscript.EnhancedInterp = $hxClasses["erazor.hscript.EnhancedInterp"] = function() {
	hscript.Interp.call(this);
};
erazor.hscript.EnhancedInterp.__name__ = ["erazor","hscript","EnhancedInterp"];
erazor.hscript.EnhancedInterp.__super__ = hscript.Interp;
erazor.hscript.EnhancedInterp.prototype = $extend(hscript.Interp.prototype,{
	call: function(o,f,args) {
		args = args.concat([null,null,null,null,null]);
		return f.apply(o,args);
	}
	,get: function(o,f) {
		if(o == null) throw hscript.Error.EInvalidAccess(f);
		return Reflect.field(o,f);
	}
	,__class__: erazor.hscript.EnhancedInterp
});
haxe.FastCell = $hxClasses["haxe.FastCell"] = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
haxe.FastCell.__name__ = ["haxe","FastCell"];
haxe.FastCell.prototype = {
	next: null
	,elt: null
	,__class__: haxe.FastCell
}
haxe.FastList = $hxClasses["haxe.FastList"] = function() {
};
haxe.FastList.__name__ = ["haxe","FastList"];
haxe.FastList.prototype = {
	toString: function() {
		var a = new Array();
		var l = this.head;
		while(l != null) {
			a.push(l.elt);
			l = l.next;
		}
		return "{" + a.join(",") + "}";
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
	,isEmpty: function() {
		return this.head == null;
	}
	,pop: function() {
		var k = this.head;
		if(k == null) return null; else {
			this.head = k.next;
			return k.elt;
		}
	}
	,first: function() {
		return this.head == null?null:this.head.elt;
	}
	,add: function(item) {
		this.head = new haxe.FastCell(item,this.head);
	}
	,head: null
	,__class__: haxe.FastList
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
	js.Lib.onerror = haxe.Firebug.onError;
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
	onStatus: function(status) {
	}
	,onError: function(msg) {
	}
	,onData: function(data) {
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
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(this.params.get(p));
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
	,setPostData: function(data) {
		this.postData = data;
	}
	,setParameter: function(param,value) {
		this.params.set(param,value);
	}
	,setHeader: function(header,value) {
		this.headers.set(header,value);
	}
	,params: null
	,headers: null
	,postData: null
	,async: null
	,url: null
	,__class__: haxe.Http
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
	if((x >> 30 & 1) != x >>> 31) throw "Overflow " + Std.string(x);
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
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
}
haxe.Int32.div = function(a,b) {
	return a / b | 0;
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
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
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
	serializeException: function(e) {
		this.buf.b += Std.string("x");
		this.serialize(e);
	}
	,serialize: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			this.buf.b += Std.string("n");
			break;
		case 1:
			if(v == 0) {
				this.buf.b += Std.string("z");
				return;
			}
			this.buf.b += Std.string("i");
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += Std.string("k"); else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += Std.string("d");
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
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
				this.buf.b += Std.string("a");
				var l = v.length;
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += Std.string("n"); else {
								this.buf.b += Std.string("u");
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += Std.string("n"); else {
						this.buf.b += Std.string("u");
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += Std.string("h");
				break;
			case List:
				this.buf.b += Std.string("l");
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += Std.string("h");
				break;
			case Date:
				var d = v;
				this.buf.b += Std.string("v");
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case Hash:
				this.buf.b += Std.string("b");
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case IntHash:
				this.buf.b += Std.string("q");
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += Std.string(":");
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += Std.string("s");
				this.buf.b += Std.string(chars.length);
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += Std.string("C");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += Std.string("g");
				} else {
					this.buf.b += Std.string("c");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += Std.string("o");
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += Std.string(":");
			var l = v.length;
			this.buf.b += Std.string(l - 2);
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
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += Std.string("g");
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += Std.string("r");
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += Std.string("R");
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += Std.string("y");
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += Std.string(":");
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,useEnumIndex: null
	,useCache: null
	,scount: null
	,shash: null
	,cache: null
	,buf: null
	,__class__: haxe.Serializer
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = $hxClasses["haxe.Stack"] = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.Stack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
}
haxe.Stack.exceptionStack = function() {
	return [];
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += Std.string("\nCalled from ");
		haxe.Stack.itemToString(b,s);
	}
	return b.b;
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += Std.string("a C function");
		break;
	case 1:
		var m = $e[2];
		b.b += Std.string("module ");
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b += Std.string(" (");
		}
		b.b += Std.string(file);
		b.b += Std.string(" line ");
		b.b += Std.string(line);
		if(s1 != null) b.b += Std.string(")");
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += Std.string(".");
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += Std.string("local function #");
		b.b += Std.string(n);
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
}
haxe.TypeTools = $hxClasses["haxe.TypeTools"] = function() { }
haxe.TypeTools.__name__ = ["haxe","TypeTools"];
haxe.TypeTools.getClassNames = function(value) {
	var result = new List();
	var valueClass = js.Boot.__instanceof(value,Class)?value:Type.getClass(value);
	while(null != valueClass) {
		result.add(Type.getClassName(valueClass));
		valueClass = Type.getSuperClass(valueClass);
	}
	return result;
}
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
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
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
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
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
				var c = this.buf.charCodeAt(this.pos);
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
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new Hash();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new IntHash();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntHash format";
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
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
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
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
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
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
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,getResolver: function() {
		return this.resolver;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,resolver: null
	,scache: null
	,cache: null
	,length: null
	,pos: null
	,buf: null
	,__class__: haxe.Unserializer
}
if(!haxe.exception) haxe.exception = {}
haxe.exception.Exception = $hxClasses["haxe.exception.Exception"] = function(message,innerException,numberOfStackTraceShifts) {
	this.message = null == message?"Unknown exception":message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
};
haxe.exception.Exception.__name__ = ["haxe","exception","Exception"];
haxe.exception.Exception.prototype = {
	toString: function() {
		return this.message + haxe.Stack.toString(this.stackTraceArray);
	}
	,getBaseException: function() {
		var result = this;
		while(null != result.innerException) result = result.innerException;
		return result;
	}
	,generateStackTrace: function(numberOfStackTraceShifts) {
		this.stackTraceArray = haxe.Stack.callStack().slice(numberOfStackTraceShifts + 1);
		var exceptionClass = Type.getClass(this);
		while(haxe.exception.Exception != exceptionClass) {
			this.stackTraceArray.shift();
			exceptionClass = Type.getSuperClass(exceptionClass);
		}
	}
	,stackTraceArray: null
	,stackTrace: null
	,message: null
	,innerException: null
	,baseException: null
	,__class__: haxe.exception.Exception
	,__properties__: {get_baseException:"getBaseException"}
}
haxe.exception.ArgumentNullException = $hxClasses["haxe.exception.ArgumentNullException"] = function(argumentName,numberOfStackTraceShifts) {
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
};
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
haxe.exception.ArgumentNullException.prototype = $extend(haxe.exception.Exception.prototype,{
	__class__: haxe.exception.ArgumentNullException
});
if(!haxe.io) haxe.io = {}
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
		var c = s.charCodeAt(i);
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
	getData: function() {
		return this.b;
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,toString: function() {
		return this.readString(0,this.length);
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
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
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
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,get: function(pos) {
		return this.b[pos];
	}
	,b: null
	,length: null
	,__class__: haxe.io.Bytes
}
haxe.io.BytesBuffer = $hxClasses["haxe.io.BytesBuffer"] = function() {
	this.b = new Array();
};
haxe.io.BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe.io.BytesBuffer.prototype = {
	getBytes: function() {
		var bytes = new haxe.io.Bytes(this.b.length,this.b);
		this.b = null;
		return bytes;
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
	,add: function(src) {
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0, _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,addByte: function($byte) {
		this.b.push($byte);
	}
	,b: null
	,__class__: haxe.io.BytesBuffer
}
haxe.io.Input = $hxClasses["haxe.io.Input"] = function() { }
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype = {
	getDoubleSig: function(bytes) {
		return Std.parseInt((((bytes[1] & 15) << 16 | bytes[2] << 8 | bytes[3]) * Math.pow(2,32)).toString()) + Std.parseInt(((bytes[4] >> 7) * Math.pow(2,31)).toString()) + Std.parseInt(((bytes[4] & 127) << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7]).toString());
	}
	,readString: function(len) {
		var b = haxe.io.Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		return this.bigEndian?(ch1 << 8 | ch2) << 16 | (ch3 << 8 | ch4):(ch4 << 8 | ch3) << 16 | (ch2 << 8 | ch1);
	}
	,readUInt30: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if((this.bigEndian?ch1:ch4) >= 64) throw haxe.io.Error.Overflow;
		return this.bigEndian?ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24:ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
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
	,readUInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		return this.bigEndian?ch3 | ch2 << 8 | ch1 << 16:ch1 | ch2 << 8 | ch3 << 16;
	}
	,readInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var n = this.bigEndian?ch3 | ch2 << 8 | ch1 << 16:ch1 | ch2 << 8 | ch3 << 16;
		if((n & 8388608) != 0) return n - 16777216;
		return n;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		return this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n = this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
		if((n & 32768) != 0) return n - 65536;
		return n;
	}
	,readInt8: function() {
		var n = this.readByte();
		if(n >= 128) return n - 256;
		return n;
	}
	,readDouble: function() {
		var bytes = [];
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		if(this.bigEndian) bytes.reverse();
		var sign = 1 - (bytes[0] >> 7 << 1);
		var exp = (bytes[0] << 4 & 2047 | bytes[1] >> 4) - 1023;
		var sig = this.getDoubleSig(bytes);
		if(sig == 0 && exp == -1023) return 0.0;
		return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
	}
	,readFloat: function() {
		var bytes = [];
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		if(this.bigEndian) bytes.reverse();
		var sign = 1 - (bytes[0] >> 7 << 1);
		var exp = (bytes[0] << 1 & 255 | bytes[1] >> 7) - 127;
		var sig = (bytes[1] & 127) << 16 | bytes[2] << 8 | bytes[3];
		if(sig == 0 && exp == -127) return 0.0;
		return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp);
	}
	,readLine: function() {
		var buf = new StringBuf();
		var last;
		var s;
		try {
			while((last = this.readByte()) != 10) buf.b += String.fromCharCode(last);
			s = buf.b;
			if(HxOverrides.cca(s,s.length - 1) == 13) s = HxOverrides.substr(s,0,-1);
		} catch( e ) {
			if( js.Boot.__instanceof(e,haxe.io.Eof) ) {
				s = buf.b;
				if(s.length == 0) throw e;
			} else throw(e);
		}
		return s;
	}
	,readUntil: function(end) {
		var buf = new StringBuf();
		var last;
		while((last = this.readByte()) != end) buf.b += String.fromCharCode(last);
		return buf.b;
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
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
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
	,setEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,close: function() {
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
	,readByte: function() {
		return (function($this) {
			var $r;
			throw "Not implemented";
			return $r;
		}(this));
	}
	,bigEndian: null
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
	readBytes: function(buf,pos,len) {
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
	,readByte: function() {
		if(this.len == 0) throw new haxe.io.Eof();
		this.len--;
		return this.b[this.pos++];
	}
	,len: null
	,pos: null
	,b: null
	,__class__: haxe.io.BytesInput
});
haxe.io.Output = $hxClasses["haxe.io.Output"] = function() { }
haxe.io.Output.__name__ = ["haxe","io","Output"];
haxe.io.Output.prototype = {
	writeString: function(s) {
		var b = haxe.io.Bytes.ofString(s);
		this.writeFullBytes(b,0,b.length);
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
	,prepare: function(nbytes) {
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
	,writeInt24: function(x) {
		if(x < -8388608 || x >= 8388608) throw haxe.io.Error.Overflow;
		this.writeUInt24(x & 16777215);
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
	,writeInt16: function(x) {
		if(x < -32768 || x >= 32768) throw haxe.io.Error.Overflow;
		this.writeUInt16(x & 65535);
	}
	,writeInt8: function(x) {
		if(x < -128 || x >= 128) throw haxe.io.Error.Overflow;
		this.writeByte(x & 255);
	}
	,writeDouble: function(x) {
		if(x == 0.0) {
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			return;
		}
		var exp = Math.floor(Math.log(Math.abs(x)) / haxe.io.Output.LN2);
		var sig = Math.floor(Math.abs(x) / Math.pow(2,exp) * Math.pow(2,52));
		var sig_h = sig & 34359738367;
		var sig_l = Math.floor(sig / Math.pow(2,32));
		var b1 = exp + 1023 >> 4 | (exp > 0?x < 0?128:64:x < 0?128:0), b2 = exp + 1023 << 4 & 255 | sig_l >> 16 & 15, b3 = sig_l >> 8 & 255, b4 = sig_l & 255, b5 = sig_h >> 24 & 255, b6 = sig_h >> 16 & 255, b7 = sig_h >> 8 & 255, b8 = sig_h & 255;
		if(this.bigEndian) {
			this.writeByte(b8);
			this.writeByte(b7);
			this.writeByte(b6);
			this.writeByte(b5);
			this.writeByte(b4);
			this.writeByte(b3);
			this.writeByte(b2);
			this.writeByte(b1);
		} else {
			this.writeByte(b1);
			this.writeByte(b2);
			this.writeByte(b3);
			this.writeByte(b4);
			this.writeByte(b5);
			this.writeByte(b6);
			this.writeByte(b7);
			this.writeByte(b8);
		}
	}
	,writeFloat: function(x) {
		if(x == 0.0) {
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			return;
		}
		var exp = Math.floor(Math.log(Math.abs(x)) / haxe.io.Output.LN2);
		var sig = Math.floor(Math.abs(x) / Math.pow(2,exp) * 8388608) & 8388607;
		var b1 = exp + 127 >> 1 | (exp > 0?x < 0?128:64:x < 0?128:0), b2 = exp + 127 << 7 & 255 | sig >> 16 & 127, b3 = sig >> 8 & 255, b4 = sig & 255;
		if(this.bigEndian) {
			this.writeByte(b4);
			this.writeByte(b3);
			this.writeByte(b2);
			this.writeByte(b1);
		} else {
			this.writeByte(b1);
			this.writeByte(b2);
			this.writeByte(b3);
			this.writeByte(b4);
		}
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
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
	,setEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,close: function() {
	}
	,flush: function() {
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
	,writeByte: function(c) {
		throw "Not implemented";
	}
	,bigEndian: null
	,__class__: haxe.io.Output
	,__properties__: {set_bigEndian:"setEndian"}
}
haxe.io.BytesOutput = $hxClasses["haxe.io.BytesOutput"] = function() {
	this.b = new haxe.io.BytesBuffer();
};
haxe.io.BytesOutput.__name__ = ["haxe","io","BytesOutput"];
haxe.io.BytesOutput.__super__ = haxe.io.Output;
haxe.io.BytesOutput.prototype = $extend(haxe.io.Output.prototype,{
	getBytes: function() {
		return this.b.getBytes();
	}
	,writeBytes: function(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	,writeByte: function(c) {
		this.b.b.push(c);
	}
	,b: null
	,__class__: haxe.io.BytesOutput
});
haxe.io.Eof = $hxClasses["haxe.io.Eof"] = function() {
};
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
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
haxe.io.StringInput = $hxClasses["haxe.io.StringInput"] = function(s) {
	haxe.io.BytesInput.call(this,haxe.io.Bytes.ofString(s));
};
haxe.io.StringInput.__name__ = ["haxe","io","StringInput"];
haxe.io.StringInput.__super__ = haxe.io.BytesInput;
haxe.io.StringInput.prototype = $extend(haxe.io.BytesInput.prototype,{
	__class__: haxe.io.StringInput
});
if(!haxe.macro) haxe.macro = {}
haxe.macro.Context = $hxClasses["haxe.macro.Context"] = function() { }
haxe.macro.Context.__name__ = ["haxe","macro","Context"];
haxe.macro.Constant = $hxClasses["haxe.macro.Constant"] = { __ename__ : ["haxe","macro","Constant"], __constructs__ : ["CInt","CFloat","CString","CIdent","CRegexp","CType"] }
haxe.macro.Constant.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CIdent = function(s) { var $x = ["CIdent",3,s]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CRegexp = function(r,opt) { var $x = ["CRegexp",4,r,opt]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CType = function(s) { var $x = ["CType",5,s]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Binop = $hxClasses["haxe.macro.Binop"] = { __ename__ : ["haxe","macro","Binop"], __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval"] }
haxe.macro.Binop.OpAdd = ["OpAdd",0];
haxe.macro.Binop.OpAdd.toString = $estr;
haxe.macro.Binop.OpAdd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMult = ["OpMult",1];
haxe.macro.Binop.OpMult.toString = $estr;
haxe.macro.Binop.OpMult.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpDiv = ["OpDiv",2];
haxe.macro.Binop.OpDiv.toString = $estr;
haxe.macro.Binop.OpDiv.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpSub = ["OpSub",3];
haxe.macro.Binop.OpSub.toString = $estr;
haxe.macro.Binop.OpSub.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssign = ["OpAssign",4];
haxe.macro.Binop.OpAssign.toString = $estr;
haxe.macro.Binop.OpAssign.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpEq = ["OpEq",5];
haxe.macro.Binop.OpEq.toString = $estr;
haxe.macro.Binop.OpEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpNotEq = ["OpNotEq",6];
haxe.macro.Binop.OpNotEq.toString = $estr;
haxe.macro.Binop.OpNotEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGt = ["OpGt",7];
haxe.macro.Binop.OpGt.toString = $estr;
haxe.macro.Binop.OpGt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGte = ["OpGte",8];
haxe.macro.Binop.OpGte.toString = $estr;
haxe.macro.Binop.OpGte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLt = ["OpLt",9];
haxe.macro.Binop.OpLt.toString = $estr;
haxe.macro.Binop.OpLt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLte = ["OpLte",10];
haxe.macro.Binop.OpLte.toString = $estr;
haxe.macro.Binop.OpLte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAnd = ["OpAnd",11];
haxe.macro.Binop.OpAnd.toString = $estr;
haxe.macro.Binop.OpAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpOr = ["OpOr",12];
haxe.macro.Binop.OpOr.toString = $estr;
haxe.macro.Binop.OpOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpXor = ["OpXor",13];
haxe.macro.Binop.OpXor.toString = $estr;
haxe.macro.Binop.OpXor.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolAnd = ["OpBoolAnd",14];
haxe.macro.Binop.OpBoolAnd.toString = $estr;
haxe.macro.Binop.OpBoolAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolOr = ["OpBoolOr",15];
haxe.macro.Binop.OpBoolOr.toString = $estr;
haxe.macro.Binop.OpBoolOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShl = ["OpShl",16];
haxe.macro.Binop.OpShl.toString = $estr;
haxe.macro.Binop.OpShl.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShr = ["OpShr",17];
haxe.macro.Binop.OpShr.toString = $estr;
haxe.macro.Binop.OpShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpUShr = ["OpUShr",18];
haxe.macro.Binop.OpUShr.toString = $estr;
haxe.macro.Binop.OpUShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMod = ["OpMod",19];
haxe.macro.Binop.OpMod.toString = $estr;
haxe.macro.Binop.OpMod.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = haxe.macro.Binop; $x.toString = $estr; return $x; }
haxe.macro.Binop.OpInterval = ["OpInterval",21];
haxe.macro.Binop.OpInterval.toString = $estr;
haxe.macro.Binop.OpInterval.__enum__ = haxe.macro.Binop;
haxe.macro.Unop = $hxClasses["haxe.macro.Unop"] = { __ename__ : ["haxe","macro","Unop"], __constructs__ : ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] }
haxe.macro.Unop.OpIncrement = ["OpIncrement",0];
haxe.macro.Unop.OpIncrement.toString = $estr;
haxe.macro.Unop.OpIncrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpDecrement = ["OpDecrement",1];
haxe.macro.Unop.OpDecrement.toString = $estr;
haxe.macro.Unop.OpDecrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNot = ["OpNot",2];
haxe.macro.Unop.OpNot.toString = $estr;
haxe.macro.Unop.OpNot.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNeg = ["OpNeg",3];
haxe.macro.Unop.OpNeg.toString = $estr;
haxe.macro.Unop.OpNeg.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNegBits = ["OpNegBits",4];
haxe.macro.Unop.OpNegBits.toString = $estr;
haxe.macro.Unop.OpNegBits.__enum__ = haxe.macro.Unop;
haxe.macro.ExprDef = $hxClasses["haxe.macro.ExprDef"] = { __ename__ : ["haxe","macro","ExprDef"], __constructs__ : ["EConst","EArray","EBinop","EField","EParenthesis","EObjectDecl","EArrayDecl","ECall","ENew","EUnop","EVars","EFunction","EBlock","EFor","EIn","EIf","EWhile","ESwitch","ETry","EReturn","EBreak","EContinue","EUntyped","EThrow","ECast","EDisplay","EDisplayNew","ETernary","ECheckType","EType"] }
haxe.macro.ExprDef.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EArray = function(e1,e2) { var $x = ["EArray",1,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EBinop = function(op,e1,e2) { var $x = ["EBinop",2,op,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EField = function(e,field) { var $x = ["EField",3,e,field]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EParenthesis = function(e) { var $x = ["EParenthesis",4,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EObjectDecl = function(fields) { var $x = ["EObjectDecl",5,fields]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EArrayDecl = function(values) { var $x = ["EArrayDecl",6,values]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ECall = function(e,params) { var $x = ["ECall",7,e,params]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ENew = function(t,params) { var $x = ["ENew",8,t,params]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EUnop = function(op,postFix,e) { var $x = ["EUnop",9,op,postFix,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EVars = function(vars) { var $x = ["EVars",10,vars]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EFunction = function(name,f) { var $x = ["EFunction",11,name,f]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EBlock = function(exprs) { var $x = ["EBlock",12,exprs]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EFor = function(it,expr) { var $x = ["EFor",13,it,expr]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EIn = function(e1,e2) { var $x = ["EIn",14,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EIf = function(econd,eif,eelse) { var $x = ["EIf",15,econd,eif,eelse]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EWhile = function(econd,e,normalWhile) { var $x = ["EWhile",16,econd,e,normalWhile]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ESwitch = function(e,cases,edef) { var $x = ["ESwitch",17,e,cases,edef]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ETry = function(e,catches) { var $x = ["ETry",18,e,catches]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EReturn = function(e) { var $x = ["EReturn",19,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EBreak = ["EBreak",20];
haxe.macro.ExprDef.EBreak.toString = $estr;
haxe.macro.ExprDef.EBreak.__enum__ = haxe.macro.ExprDef;
haxe.macro.ExprDef.EContinue = ["EContinue",21];
haxe.macro.ExprDef.EContinue.toString = $estr;
haxe.macro.ExprDef.EContinue.__enum__ = haxe.macro.ExprDef;
haxe.macro.ExprDef.EUntyped = function(e) { var $x = ["EUntyped",22,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EThrow = function(e) { var $x = ["EThrow",23,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ECast = function(e,t) { var $x = ["ECast",24,e,t]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EDisplay = function(e,isCall) { var $x = ["EDisplay",25,e,isCall]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EDisplayNew = function(t) { var $x = ["EDisplayNew",26,t]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ETernary = function(econd,eif,eelse) { var $x = ["ETernary",27,econd,eif,eelse]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ECheckType = function(e,t) { var $x = ["ECheckType",28,e,t]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EType = function(e,field) { var $x = ["EType",29,e,field]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ComplexType = $hxClasses["haxe.macro.ComplexType"] = { __ename__ : ["haxe","macro","ComplexType"], __constructs__ : ["TPath","TFunction","TAnonymous","TParent","TExtend","TOptional"] }
haxe.macro.ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TOptional = function(t) { var $x = ["TOptional",5,t]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.TypeParam = $hxClasses["haxe.macro.TypeParam"] = { __ename__ : ["haxe","macro","TypeParam"], __constructs__ : ["TPType","TPExpr"] }
haxe.macro.TypeParam.TPType = function(t) { var $x = ["TPType",0,t]; $x.__enum__ = haxe.macro.TypeParam; $x.toString = $estr; return $x; }
haxe.macro.TypeParam.TPExpr = function(e) { var $x = ["TPExpr",1,e]; $x.__enum__ = haxe.macro.TypeParam; $x.toString = $estr; return $x; }
haxe.macro.Access = $hxClasses["haxe.macro.Access"] = { __ename__ : ["haxe","macro","Access"], __constructs__ : ["APublic","APrivate","AStatic","AOverride","ADynamic","AInline"] }
haxe.macro.Access.APublic = ["APublic",0];
haxe.macro.Access.APublic.toString = $estr;
haxe.macro.Access.APublic.__enum__ = haxe.macro.Access;
haxe.macro.Access.APrivate = ["APrivate",1];
haxe.macro.Access.APrivate.toString = $estr;
haxe.macro.Access.APrivate.__enum__ = haxe.macro.Access;
haxe.macro.Access.AStatic = ["AStatic",2];
haxe.macro.Access.AStatic.toString = $estr;
haxe.macro.Access.AStatic.__enum__ = haxe.macro.Access;
haxe.macro.Access.AOverride = ["AOverride",3];
haxe.macro.Access.AOverride.toString = $estr;
haxe.macro.Access.AOverride.__enum__ = haxe.macro.Access;
haxe.macro.Access.ADynamic = ["ADynamic",4];
haxe.macro.Access.ADynamic.toString = $estr;
haxe.macro.Access.ADynamic.__enum__ = haxe.macro.Access;
haxe.macro.Access.AInline = ["AInline",5];
haxe.macro.Access.AInline.toString = $estr;
haxe.macro.Access.AInline.__enum__ = haxe.macro.Access;
haxe.macro.FieldType = $hxClasses["haxe.macro.FieldType"] = { __ename__ : ["haxe","macro","FieldType"], __constructs__ : ["FVar","FFun","FProp"] }
haxe.macro.FieldType.FVar = function(t,e) { var $x = ["FVar",0,t,e]; $x.__enum__ = haxe.macro.FieldType; $x.toString = $estr; return $x; }
haxe.macro.FieldType.FFun = function(f) { var $x = ["FFun",1,f]; $x.__enum__ = haxe.macro.FieldType; $x.toString = $estr; return $x; }
haxe.macro.FieldType.FProp = function(get,set,t,e) { var $x = ["FProp",2,get,set,t,e]; $x.__enum__ = haxe.macro.FieldType; $x.toString = $estr; return $x; }
haxe.macro.TypeDefKind = $hxClasses["haxe.macro.TypeDefKind"] = { __ename__ : ["haxe","macro","TypeDefKind"], __constructs__ : ["TDEnum","TDStructure","TDClass"] }
haxe.macro.TypeDefKind.TDEnum = ["TDEnum",0];
haxe.macro.TypeDefKind.TDEnum.toString = $estr;
haxe.macro.TypeDefKind.TDEnum.__enum__ = haxe.macro.TypeDefKind;
haxe.macro.TypeDefKind.TDStructure = ["TDStructure",1];
haxe.macro.TypeDefKind.TDStructure.toString = $estr;
haxe.macro.TypeDefKind.TDStructure.__enum__ = haxe.macro.TypeDefKind;
haxe.macro.TypeDefKind.TDClass = function(extend,implement,isInterface) { var $x = ["TDClass",2,extend,implement,isInterface]; $x.__enum__ = haxe.macro.TypeDefKind; $x.toString = $estr; return $x; }
haxe.macro.Error = $hxClasses["haxe.macro.Error"] = function(m,p) {
	this.message = m;
	this.pos = p;
};
haxe.macro.Error.__name__ = ["haxe","macro","Error"];
haxe.macro.Error.prototype = {
	pos: null
	,message: null
	,__class__: haxe.macro.Error
}
haxe.macro.Format = $hxClasses["haxe.macro.Format"] = function() { }
haxe.macro.Format.__name__ = ["haxe","macro","Format"];
haxe.macro.Type = $hxClasses["haxe.macro.Type"] = { __ename__ : ["haxe","macro","Type"], __constructs__ : ["TMono","TEnum","TInst","TType","TFun","TAnonymous","TDynamic","TLazy"] }
haxe.macro.Type.TMono = function(t) { var $x = ["TMono",0,t]; $x.__enum__ = haxe.macro.Type; $x.toString = $estr; return $x; }
haxe.macro.Type.TEnum = function(t,params) { var $x = ["TEnum",1,t,params]; $x.__enum__ = haxe.macro.Type; $x.toString = $estr; return $x; }
haxe.macro.Type.TInst = function(t,params) { var $x = ["TInst",2,t,params]; $x.__enum__ = haxe.macro.Type; $x.toString = $estr; return $x; }
haxe.macro.Type.TType = function(t,params) { var $x = ["TType",3,t,params]; $x.__enum__ = haxe.macro.Type; $x.toString = $estr; return $x; }
haxe.macro.Type.TFun = function(args,ret) { var $x = ["TFun",4,args,ret]; $x.__enum__ = haxe.macro.Type; $x.toString = $estr; return $x; }
haxe.macro.Type.TAnonymous = function(a) { var $x = ["TAnonymous",5,a]; $x.__enum__ = haxe.macro.Type; $x.toString = $estr; return $x; }
haxe.macro.Type.TDynamic = function(t) { var $x = ["TDynamic",6,t]; $x.__enum__ = haxe.macro.Type; $x.toString = $estr; return $x; }
haxe.macro.Type.TLazy = function(f) { var $x = ["TLazy",7,f]; $x.__enum__ = haxe.macro.Type; $x.toString = $estr; return $x; }
haxe.macro.ClassKind = $hxClasses["haxe.macro.ClassKind"] = { __ename__ : ["haxe","macro","ClassKind"], __constructs__ : ["KNormal","KTypeParameter","KExtension","KExpr","KGeneric","KGenericInstance","KMacroType"] }
haxe.macro.ClassKind.KNormal = ["KNormal",0];
haxe.macro.ClassKind.KNormal.toString = $estr;
haxe.macro.ClassKind.KNormal.__enum__ = haxe.macro.ClassKind;
haxe.macro.ClassKind.KTypeParameter = ["KTypeParameter",1];
haxe.macro.ClassKind.KTypeParameter.toString = $estr;
haxe.macro.ClassKind.KTypeParameter.__enum__ = haxe.macro.ClassKind;
haxe.macro.ClassKind.KExtension = function(cl,params) { var $x = ["KExtension",2,cl,params]; $x.__enum__ = haxe.macro.ClassKind; $x.toString = $estr; return $x; }
haxe.macro.ClassKind.KExpr = function(expr) { var $x = ["KExpr",3,expr]; $x.__enum__ = haxe.macro.ClassKind; $x.toString = $estr; return $x; }
haxe.macro.ClassKind.KGeneric = ["KGeneric",4];
haxe.macro.ClassKind.KGeneric.toString = $estr;
haxe.macro.ClassKind.KGeneric.__enum__ = haxe.macro.ClassKind;
haxe.macro.ClassKind.KGenericInstance = function(cl,params) { var $x = ["KGenericInstance",5,cl,params]; $x.__enum__ = haxe.macro.ClassKind; $x.toString = $estr; return $x; }
haxe.macro.ClassKind.KMacroType = ["KMacroType",6];
haxe.macro.ClassKind.KMacroType.toString = $estr;
haxe.macro.ClassKind.KMacroType.__enum__ = haxe.macro.ClassKind;
haxe.macro.FieldKind = $hxClasses["haxe.macro.FieldKind"] = { __ename__ : ["haxe","macro","FieldKind"], __constructs__ : ["FVar","FMethod"] }
haxe.macro.FieldKind.FVar = function(read,write) { var $x = ["FVar",0,read,write]; $x.__enum__ = haxe.macro.FieldKind; $x.toString = $estr; return $x; }
haxe.macro.FieldKind.FMethod = function(k) { var $x = ["FMethod",1,k]; $x.__enum__ = haxe.macro.FieldKind; $x.toString = $estr; return $x; }
haxe.macro.VarAccess = $hxClasses["haxe.macro.VarAccess"] = { __ename__ : ["haxe","macro","VarAccess"], __constructs__ : ["AccNormal","AccNo","AccNever","AccResolve","AccCall","AccInline","AccRequire"] }
haxe.macro.VarAccess.AccNormal = ["AccNormal",0];
haxe.macro.VarAccess.AccNormal.toString = $estr;
haxe.macro.VarAccess.AccNormal.__enum__ = haxe.macro.VarAccess;
haxe.macro.VarAccess.AccNo = ["AccNo",1];
haxe.macro.VarAccess.AccNo.toString = $estr;
haxe.macro.VarAccess.AccNo.__enum__ = haxe.macro.VarAccess;
haxe.macro.VarAccess.AccNever = ["AccNever",2];
haxe.macro.VarAccess.AccNever.toString = $estr;
haxe.macro.VarAccess.AccNever.__enum__ = haxe.macro.VarAccess;
haxe.macro.VarAccess.AccResolve = ["AccResolve",3];
haxe.macro.VarAccess.AccResolve.toString = $estr;
haxe.macro.VarAccess.AccResolve.__enum__ = haxe.macro.VarAccess;
haxe.macro.VarAccess.AccCall = function(m) { var $x = ["AccCall",4,m]; $x.__enum__ = haxe.macro.VarAccess; $x.toString = $estr; return $x; }
haxe.macro.VarAccess.AccInline = ["AccInline",5];
haxe.macro.VarAccess.AccInline.toString = $estr;
haxe.macro.VarAccess.AccInline.__enum__ = haxe.macro.VarAccess;
haxe.macro.VarAccess.AccRequire = function(r) { var $x = ["AccRequire",6,r]; $x.__enum__ = haxe.macro.VarAccess; $x.toString = $estr; return $x; }
haxe.macro.MethodKind = $hxClasses["haxe.macro.MethodKind"] = { __ename__ : ["haxe","macro","MethodKind"], __constructs__ : ["MethNormal","MethInline","MethDynamic","MethMacro"] }
haxe.macro.MethodKind.MethNormal = ["MethNormal",0];
haxe.macro.MethodKind.MethNormal.toString = $estr;
haxe.macro.MethodKind.MethNormal.__enum__ = haxe.macro.MethodKind;
haxe.macro.MethodKind.MethInline = ["MethInline",1];
haxe.macro.MethodKind.MethInline.toString = $estr;
haxe.macro.MethodKind.MethInline.__enum__ = haxe.macro.MethodKind;
haxe.macro.MethodKind.MethDynamic = ["MethDynamic",2];
haxe.macro.MethodKind.MethDynamic.toString = $estr;
haxe.macro.MethodKind.MethDynamic.__enum__ = haxe.macro.MethodKind;
haxe.macro.MethodKind.MethMacro = ["MethMacro",3];
haxe.macro.MethodKind.MethMacro.toString = $estr;
haxe.macro.MethodKind.MethMacro.__enum__ = haxe.macro.MethodKind;
haxe.remoting.Macros = $hxClasses["haxe.remoting.Macros"] = function() { }
haxe.remoting.Macros.__name__ = ["haxe","remoting","Macros"];
haxe.rtti.Meta = $hxClasses["haxe.rtti.Meta"] = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.obj == null?{ }:meta.obj;
}
haxe.rtti.Meta.getStatics = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.statics == null?{ }:meta.statics;
}
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.fields == null?{ }:meta.fields;
}
if(!haxe.xml) haxe.xml = {}
haxe.xml.Parser = $hxClasses["haxe.xml.Parser"] = function() { }
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
}
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.getNodeName()) throw "Expected </" + parent.getNodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProlog(str1));
				state = 1;
			}
			break;
		}
		c = str.charCodeAt(++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
}
haxe.xml.Parser.isValidChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45;
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
if(!hscript._Interp) hscript._Interp = {}
hscript._Interp.Stop = $hxClasses["hscript._Interp.Stop"] = { __ename__ : ["hscript","_Interp","Stop"], __constructs__ : ["SBreak","SContinue","SReturn"] }
hscript._Interp.Stop.SBreak = ["SBreak",0];
hscript._Interp.Stop.SBreak.toString = $estr;
hscript._Interp.Stop.SBreak.__enum__ = hscript._Interp.Stop;
hscript._Interp.Stop.SContinue = ["SContinue",1];
hscript._Interp.Stop.SContinue.toString = $estr;
hscript._Interp.Stop.SContinue.__enum__ = hscript._Interp.Stop;
hscript._Interp.Stop.SReturn = function(v) { var $x = ["SReturn",2,v]; $x.__enum__ = hscript._Interp.Stop; $x.toString = $estr; return $x; }
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
	tokenString: function(t) {
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
	,tokenComment: function(op,$char) {
		var c = HxOverrides.cca(op,1);
		var s = this.input;
		if(c == 47) {
			try {
				while($char != 10 && $char != 13) $char = s.readByte();
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
						$char = s.readByte();
					}
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
								var i = n | 0;
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
											if((n1 >> 30 & 1) != n1 >>> 31) throw "Overflow " + Std.string(n1);
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
						var i = n | 0;
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
							if(HxOverrides.cca(op,0) == 47) return this.tokenComment(op,$char);
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
	,readString: function(until) {
		var c;
		var b = new haxe.io.BytesOutput();
		var esc = false;
		var old = this.line;
		var s = this.input;
		while(true) {
			try {
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
						var $char = HxOverrides.cca(code,i);
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
	,readChar: function() {
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
	,incPos: function() {
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
	,parseFullExpr: function() {
		var e = this.parseExpr();
		var tk = this.token();
		if(tk != hscript.Token.TSemicolon && tk != hscript.Token.TEof) {
			if(this.isBlock(e)) this.tokens.add(tk); else this.unexpected(tk);
		}
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
	,mk: function(e,pmin,pmax) {
		return e;
	}
	,pmax: function(e) {
		return 0;
	}
	,pmin: function(e) {
		return 0;
	}
	,expr: function(e) {
		return e;
	}
	,ensure: function(tk) {
		var t = this.token();
		if(t != tk) this.unexpected(t);
	}
	,push: function(tk) {
		this.tokens.add(tk);
	}
	,unexpected: function(tk) {
		throw hscript.Error.EUnexpected(this.tokenString(tk));
		return null;
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
			this.ops[HxOverrides.cca(this.opChars,i)] = true;
		}
		var _g1 = 0, _g = this.identChars.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.idents[HxOverrides.cca(this.identChars,i)] = true;
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
	,parseString: function(s) {
		this.line = 1;
		return this.parse(new haxe.io.StringInput(s));
	}
	,invalidChar: function(c) {
		throw hscript.Error.EInvalidChar(c);
	}
	,error: function(err,pmin,pmax) {
		throw err;
	}
	,tokens: null
	,idents: null
	,ops: null
	,'char': null
	,input: null
	,allowTypes: null
	,allowJSON: null
	,unops: null
	,opRightAssoc: null
	,opPriority: null
	,identChars: null
	,opChars: null
	,line: null
	,__class__: hscript.Parser
}
var hsl = hsl || {}
if(!hsl.haxe) hsl.haxe = {}
hsl.haxe.Bond = $hxClasses["hsl.haxe.Bond"] = function() {
	this.halted = false;
};
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype = {
	resume: function() {
		this.halted = false;
	}
	,halt: function() {
		this.halted = true;
	}
	,destroyOnUse: function() {
		this.willDestroyOnUse = true;
		return this;
	}
	,destroy: function() {
	}
	,willDestroyOnUse: null
	,halted: null
	,__class__: hsl.haxe.Bond
}
hsl.haxe.Signaler = $hxClasses["hsl.haxe.Signaler"] = function() { }
hsl.haxe.Signaler.__name__ = ["hsl","haxe","Signaler"];
hsl.haxe.Signaler.prototype = {
	unbindVoid: null
	,unbindAdvanced: null
	,unbind: null
	,removeNotificationTarget: null
	,removeBubblingTarget: null
	,getIsListenedTo: null
	,dispatch: null
	,bindVoid: null
	,bindAdvanced: null
	,bind: null
	,addNotificationTarget: null
	,addBubblingTarget: null
	,subject: null
	,isListenedTo: null
	,__class__: hsl.haxe.Signaler
	,__properties__: {get_isListenedTo:"getIsListenedTo"}
}
hsl.haxe.DirectSignaler = $hxClasses["hsl.haxe.DirectSignaler"] = function(subject,rejectNullData) {
	if(null == subject) throw new haxe.exception.ArgumentNullException("subject",1);
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
};
hsl.haxe.DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl.haxe.DirectSignaler.__interfaces__ = [hsl.haxe.Signaler];
hsl.haxe.DirectSignaler.prototype = {
	unbindVoid: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,unbindAdvanced: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,unbind: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,removeNotificationTarget: function(value) {
		if(null != this.notificationTargets) this.notificationTargets.remove(value);
	}
	,removeBubblingTarget: function(value) {
		if(null != this.bubblingTargets) this.bubblingTargets.remove(value);
	}
	,verifyCaller: function(positionInformation) {
		if(null == this.subjectClassNames) this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
		var $it0 = this.subjectClassNames.iterator();
		while( $it0.hasNext() ) {
			var subjectClassName = $it0.next();
			if(subjectClassName == positionInformation.className) return;
		}
		throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
	}
	,getOrigin: function(origin) {
		return null == origin?this.subject:origin;
	}
	,getIsListenedTo: function() {
		return this.sentinel.getIsConnected();
	}
	,dispatch: function(data,origin,positionInformation) {
		if("dispatchNative" != positionInformation.methodName && "bubble" != positionInformation.methodName) this.verifyCaller(positionInformation);
		if(this.rejectNullData && null == data) throw new haxe.exception.Exception("Some data that was passed is null, but this signaler has been set to reject null data.",null,1);
		origin = null == origin?this.subject:origin;
		if(3 == this.sentinel.callListener(data,this.subject,origin,3)) {
			if(null != this.bubblingTargets) {
				var $it0 = this.bubblingTargets.iterator();
				while( $it0.hasNext() ) {
					var bubblingTarget = $it0.next();
					bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 109, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
			}
			if(null != this.notificationTargets) {
				var $it1 = this.notificationTargets.iterator();
				while( $it1.hasNext() ) {
					var notificationTarget = $it1.next();
					notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 114, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
			}
		}
	}
	,bubble: function(data,origin) {
		if(null != this.bubblingTargets) {
			var $it0 = this.bubblingTargets.iterator();
			while( $it0.hasNext() ) {
				var bubblingTarget = $it0.next();
				bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 109, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
		if(null != this.notificationTargets) {
			var $it1 = this.notificationTargets.iterator();
			while( $it1.hasNext() ) {
				var notificationTarget = $it1.next();
				notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 114, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
	}
	,bindVoid: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,bindAdvanced: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,bind: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,addNotificationTarget: function(value) {
		if(null == this.notificationTargets) this.notificationTargets = new List();
		this.notificationTargets.add(value);
	}
	,addBubblingTarget: function(value) {
		if(null == this.bubblingTargets) this.bubblingTargets = new List();
		this.bubblingTargets.add(value);
	}
	,subjectClassNames: null
	,subject: null
	,sentinel: null
	,rejectNullData: null
	,notificationTargets: null
	,isListenedTo: null
	,bubblingTargets: null
	,__class__: hsl.haxe.DirectSignaler
	,__properties__: {get_isListenedTo:"getIsListenedTo"}
}
if(!hsl.haxe._DirectSignaler) hsl.haxe._DirectSignaler = {}
hsl.haxe._DirectSignaler.LinkedBond = $hxClasses["hsl.haxe._DirectSignaler.LinkedBond"] = function() {
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
};
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
hsl.haxe._DirectSignaler.LinkedBond.prototype = $extend(hsl.haxe.Bond.prototype,{
	unlink: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,destroy: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,determineEquals: function(value) {
		return false;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		return 0;
	}
	,previous: null
	,next: null
	,destroyed: null
	,__class__: hsl.haxe._DirectSignaler.LinkedBond
});
hsl.haxe._DirectSignaler.SentinelBond = $hxClasses["hsl.haxe._DirectSignaler.SentinelBond"] = function() {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
};
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.SentinelBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	remove: function(value) {
		var node = this.next;
		while(node != this) {
			if(node.determineEquals(value)) {
				if(false == node.destroyed) {
					node.previous.next = node.next;
					node.next.previous = node.previous;
					node.destroyed = true;
				}
				break;
			}
			node = node.next;
		}
	}
	,getIsConnected: function() {
		return this.next != this;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		var node = this.next;
		while(node != this && 1 != propagationStatus) {
			propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
			node = node.next;
		}
		return propagationStatus;
	}
	,add: function(value) {
		value.next = this;
		value.previous = this.previous;
		return this.previous = this.previous.next = value;
	}
	,isConnected: null
	,__class__: hsl.haxe._DirectSignaler.SentinelBond
	,__properties__: {get_isConnected:"getIsConnected"}
});
hsl.haxe._DirectSignaler.RegularBond = $hxClasses["hsl.haxe._DirectSignaler.RegularBond"] = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.RegularBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener(data);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,listener: null
	,__class__: hsl.haxe._DirectSignaler.RegularBond
});
hsl.haxe._DirectSignaler.NiladicBond = $hxClasses["hsl.haxe._DirectSignaler.NiladicBond"] = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.NiladicBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener();
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,listener: null
	,__class__: hsl.haxe._DirectSignaler.NiladicBond
});
hsl.haxe._DirectSignaler.AdvancedBond = $hxClasses["hsl.haxe._DirectSignaler.AdvancedBond"] = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.AdvancedBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		if(this.halted == false) {
			var signal = new hsl.haxe.Signal(data,this,currentTarget,origin);
			this.listener(signal);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
			if(signal.immediatePropagationStopped) return 1; else if(signal.propagationStopped) return 2;
		}
		return propagationStatus;
	}
	,listener: null
	,__class__: hsl.haxe._DirectSignaler.AdvancedBond
});
hsl.haxe._DirectSignaler.PropagationStatus = $hxClasses["hsl.haxe._DirectSignaler.PropagationStatus"] = function() { }
hsl.haxe._DirectSignaler.PropagationStatus.__name__ = ["hsl","haxe","_DirectSignaler","PropagationStatus"];
hsl.haxe.Signal = $hxClasses["hsl.haxe.Signal"] = function(data,currentBond,currentTarget,origin) {
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
};
hsl.haxe.Signal.__name__ = ["hsl","haxe","Signal"];
hsl.haxe.Signal.prototype = {
	stopPropagation: function() {
		this.propagationStopped = true;
	}
	,stopImmediatePropagation: function() {
		this.immediatePropagationStopped = true;
	}
	,getData: function() {
		return this.data;
	}
	,propagationStopped: null
	,origin: null
	,immediatePropagationStopped: null
	,data1: null
	,data: null
	,currentTarget: null
	,currentBond: null
	,__class__: hsl.haxe.Signal
	,__properties__: {get_data1:"getData"}
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
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
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
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
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.document = null;
js.Lib.window = null;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
var pushstate = pushstate || {}
pushstate.PushState = $hxClasses["pushstate.PushState"] = function() {
	pushstate.PushState.onStateChange = new hsl.haxe.DirectSignaler(this);
};
pushstate.PushState.__name__ = ["pushstate","PushState"];
pushstate.PushState.inst = null;
pushstate.PushState.history = null;
pushstate.PushState.basePath = null;
pushstate.PushState.onStateChange = null;
pushstate.PushState.init = function(basePath) {
	if(basePath == null) basePath = "/";
	pushstate.PushState.inst = new pushstate.PushState();
	pushstate.PushState.history = Reflect.field(js.Lib.window,"history");
	pushstate.PushState.basePath = basePath;
	new js.JQuery(js.Lib.document).ready(function(e) {
		pushstate.PushState.handleOnPopState(null);
		new js.JQuery(js.Lib.document).delegate("a[rel=pushstate]","click",function(e1) {
			pushstate.PushState.push($(this).attr("href"));
			e1.preventDefault();
		});
		js.Lib.window.onpopstate = pushstate.PushState.handleOnPopState;
	});
}
pushstate.PushState.handleOnPopState = function(e) {
	var path = document.location.pathname;
	path = pushstate.PushState.stripURL(path);
	var state = { url : path};
	pushstate.PushState.onStateChange.dispatch(state,null,{ fileName : "PushState.hx", lineNumber : 101, className : "pushstate.PushState", methodName : "handleOnPopState"});
}
pushstate.PushState.stripURL = function(path) {
	if(HxOverrides.substr(path,0,pushstate.PushState.basePath.length) == pushstate.PushState.basePath) path = HxOverrides.substr(path,pushstate.PushState.basePath.length,null);
	return path;
}
pushstate.PushState.push = function(url) {
	var state = { url : pushstate.PushState.stripURL(url)};
	pushstate.PushState.history.pushState({ },"",url);
	pushstate.PushState.onStateChange.dispatch(state,null,{ fileName : "PushState.hx", lineNumber : 126, className : "pushstate.PushState", methodName : "push"});
}
pushstate.PushState.replace = function(url) {
	var state = { url : pushstate.PushState.stripURL(url)};
	pushstate.PushState.history.pushState({ },"",url);
	pushstate.PushState.onStateChange.dispatch(state,null,{ fileName : "PushState.hx", lineNumber : 148, className : "pushstate.PushState", methodName : "replace"});
}
pushstate.PushState.prototype = {
	__class__: pushstate.PushState
}
var server = server || {}
if(!server.api) server.api = {}
server.api.NotificationsProxy = $hxClasses["server.api.NotificationsProxy"] = function(c) {
	this._conn = c.resolve("server.api.NotificationsService");
};
server.api.NotificationsProxy.__name__ = ["server","api","NotificationsProxy"];
server.api.NotificationsProxy.prototype = {
	getTheFoo: function(fooId,cb) {
		this._conn.resolve("getTheFoo").call([fooId],cb);
	}
	,_conn: null
	,__class__: server.api.NotificationsProxy
}
server.api.SchedulerProxy = $hxClasses["server.api.SchedulerProxy"] = function(c) {
	this._conn = c.resolve("server.api.SchedulerService");
};
server.api.SchedulerProxy.__name__ = ["server","api","SchedulerProxy"];
server.api.SchedulerProxy.prototype = {
	getTheFoo: function(fooId,cb) {
		this._conn.resolve("getTheFoo").call([fooId],cb);
	}
	,_conn: null
	,__class__: server.api.SchedulerProxy
}
var tink = tink || {}
if(!tink.macro) tink.macro = {}
if(!tink.macro.tools) tink.macro.tools = {}
tink.macro.tools.MacroTools = $hxClasses["tink.macro.tools.MacroTools"] = function() { }
tink.macro.tools.MacroTools.__name__ = ["tink","macro","tools","MacroTools"];
tink.macro.tools.MacroTools.tempName = function(c,prefix) {
	if(prefix == null) prefix = "__tinkTmp";
	return prefix + Std.string(tink.macro.tools.MacroTools.idCounter++);
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(typeof(bean) == 'undefined') {
	/*!
  * Bean - copyright (c) Jacob Thornton 2011-2012
  * https://github.com/fat/bean
  * MIT license
  */
!function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=n(e,t):typeof define=="function"&&typeof define.amd=="object"?define(n):t[e]=n(e,t)}("bean",this,function(e,t){var n=window,r=t[e],i=/[^\.]*(?=\..*)\.|.*/,s=/\..*/,o="addEventListener",u="removeEventListener",a=document||{},f=a.documentElement||{},l=f[o],c=l?o:"attachEvent",h={},p=Array.prototype.slice,d=function(e,t){return e.split(t||" ")},v=function(e){return typeof e=="string"},m=function(e){return typeof e=="function"},g="click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll ",y="show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend textinputreadystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ",b=function(e,t,n){for(n=0;n<t.length;n++)t[n]&&(e[t[n]]=1);return e}({},d(g+(l?y:""))),w=function(){var e="compareDocumentPosition"in f?function(e,t){return t.compareDocumentPosition&&(t.compareDocumentPosition(e)&16)===16}:"contains"in f?function(e,t){return t=t.nodeType===9||t===window?f:t,t!==e&&t.contains(e)}:function(e,t){while(e=e.parentNode)if(e===t)return 1;return 0},t=function(t){var n=t.relatedTarget;return n?n!==this&&n.prefix!=="xul"&&!/document/.test(this.toString())&&!e(n,this):n==null};return{mouseenter:{base:"mouseover",condition:t},mouseleave:{base:"mouseout",condition:t},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}}}(),E=function(){var e=d("altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which propertyName"),t=e.concat(d("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement")),r=t.concat(d("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis")),i=e.concat(d("char charCode key keyCode keyIdentifier keyLocation location")),s=e.concat(d("data")),o=e.concat(d("touches targetTouches changedTouches scale rotation")),u=e.concat(d("data origin source")),l=e.concat(d("state")),c=/over|out/,h=[{reg:/key/i,fix:function(e,t){return t.keyCode=e.keyCode||e.which,i}},{reg:/click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,fix:function(e,n,r){n.rightClick=e.which===3||e.button===2,n.pos={x:0,y:0};if(e.pageX||e.pageY)n.clientX=e.pageX,n.clientY=e.pageY;else if(e.clientX||e.clientY)n.clientX=e.clientX+a.body.scrollLeft+f.scrollLeft,n.clientY=e.clientY+a.body.scrollTop+f.scrollTop;return c.test(r)&&(n.relatedTarget=e.relatedTarget||e[(r=="mouseover"?"from":"to")+"Element"]),t}},{reg:/mouse.*(wheel|scroll)/i,fix:function(){return r}},{reg:/^text/i,fix:function(){return s}},{reg:/^touch|^gesture/i,fix:function(){return o}},{reg:/^message$/i,fix:function(){return u}},{reg:/^popstate$/i,fix:function(){return l}},{reg:/.*/,fix:function(){return e}}],p={},v=function(e,t,r){if(!arguments.length)return;e=e||((t.ownerDocument||t.document||t).parentWindow||n).event,this.originalEvent=e,this.isNative=r,this.isBean=!0;if(!e)return;var i=e.type,s=e.target||e.srcElement,o,u,a,f,l;this.target=s&&s.nodeType===3?s.parentNode:s;if(r){l=p[i];if(!l)for(o=0,u=h.length;o<u;o++)if(h[o].reg.test(i)){p[i]=l=h[o].fix;break}f=l(e,this,i);for(o=f.length;o--;)!((a=f[o])in this)&&a in e&&(this[a]=e[a])}};return v.prototype.preventDefault=function(){this.originalEvent.preventDefault?this.originalEvent.preventDefault():this.originalEvent.returnValue=!1},v.prototype.stopPropagation=function(){this.originalEvent.stopPropagation?this.originalEvent.stopPropagation():this.originalEvent.cancelBubble=!0},v.prototype.stop=function(){this.preventDefault(),this.stopPropagation(),this.stopped=!0},v.prototype.stopImmediatePropagation=function(){this.originalEvent.stopImmediatePropagation&&this.originalEvent.stopImmediatePropagation(),this.isImmediatePropagationStopped=function(){return!0}},v.prototype.isImmediatePropagationStopped=function(){return this.originalEvent.isImmediatePropagationStopped&&this.originalEvent.isImmediatePropagationStopped()},v.prototype.clone=function(e){var t=new v(this,this.element,this.isNative);return t.currentTarget=e,t},v}(),S=function(e,t){return!l&&!t&&(e===a||e===n)?f:e},x=function(){var e=function(e,t,n,r){var i=function(n,i){return t.apply(e,r?p.call(i,n?0:1).concat(r):i)},s=function(n,r){return t.__beanDel?t.__beanDel.ft(n.target,e):r},o=n?function(e){var t=s(e,this);if(n.apply(t,arguments))return e&&(e.currentTarget=t),i(e,arguments)}:function(e){return t.__beanDel&&(e=e.clone(s(e))),i(e,arguments)};return o.__beanDel=t.__beanDel,o},t=function(t,n,r,i,s,o,u){var a=w[n],f;n=="unload"&&(r=A(O,t,n,r,i)),a&&(a.condition&&(r=e(t,r,a.condition,o)),n=a.base||n),this.isNative=f=b[n]&&!!t[c],this.customType=!l&&!f&&n,this.element=t,this.type=n,this.original=i,this.namespaces=s,this.eventType=l||f?n:"propertychange",this.target=S(t,f),this[c]=!!this.target[c],this.root=u,this.handler=e(t,r,null,o)};return t.prototype.inNamespaces=function(e){var t,n,r=0;if(!e)return!0;if(!this.namespaces)return!1;for(t=e.length;t--;)for(n=this.namespaces.length;n--;)e[t]==this.namespaces[n]&&r++;return e.length===r},t.prototype.matches=function(e,t,n){return this.element===e&&(!t||this.original===t)&&(!n||this.handler===n)},t}(),T=function(){var e={},t=function(n,r,i,s,o,u){var a=o?"r":"$";if(!r||r=="*")for(var f in e)f.charAt(0)==a&&t(n,f.substr(1),i,s,o,u);else{var l=0,c,h=e[a+r],p=n=="*";if(!h)return;for(c=h.length;l<c;l++)if((p||h[l].matches(n,i,s))&&!u(h[l],h,l,r))return}},n=function(t,n,r,i){var s,o=e[(i?"r":"$")+n];if(o)for(s=o.length;s--;)if(!o[s].root&&o[s].matches(t,r,null))return!0;return!1},r=function(e,n,r,i){var s=[];return t(e,n,r,null,i,function(e){return s.push(e)}),s},i=function(t){var n=!t.root&&!this.has(t.element,t.type,null,!1),r=(t.root?"r":"$")+t.type;return(e[r]||(e[r]=[])).push(t),n},s=function(n){t(n.element,n.type,null,n.handler,n.root,function(t,n,r){return n.splice(r,1),t.removed=!0,n.length===0&&delete e[(t.root?"r":"$")+t.type],!1})},o=function(){var t,n=[];for(t in e)t.charAt(0)=="$"&&(n=n.concat(e[t]));return n};return{has:n,get:r,put:i,del:s,entries:o}}(),N,C=function(e){arguments.length?N=e:N=a.querySelectorAll?function(e,t){return t.querySelectorAll(e)}:function(){throw new Error("Bean: No selector engine installed")}},k=function(e,t){if(!l&&t&&e&&e.propertyName!="_on"+t)return;var n=T.get(this,t||e.type,null,!1),r=n.length,i=0;e=new E(e,this,!0),t&&(e.type=t);for(;i<r&&!e.isImmediatePropagationStopped();i++)n[i].removed||n[i].handler.call(this,e)},L=l?function(e,t,n){e[n?o:u](t,k,!1)}:function(e,t,n,r){var i;n?(T.put(i=new x(e,r||t,function(t){k.call(e,t,r)},k,null,null,!0)),r&&e["_on"+r]==null&&(e["_on"+r]=0),i.target.attachEvent("on"+i.eventType,i.handler)):(i=T.get(e,r||t,k,!0)[0],i&&(i.target.detachEvent("on"+i.eventType,i.handler),T.del(i)))},A=function(e,t,n,r,i){return function(){r.apply(this,arguments),e(t,n,i)}},O=function(e,t,n,r){var i=t&&t.replace(s,""),o=T.get(e,i,null,!1),u={},a,f;for(a=0,f=o.length;a<f;a++)(!n||o[a].original===n)&&o[a].inNamespaces(r)&&(T.del(o[a]),!u[o[a].eventType]&&o[a][c]&&(u[o[a].eventType]={t:o[a].eventType,c:o[a].type}));for(a in u)T.has(e,u[a].t,null,!1)||L(e,u[a].t,!1,u[a].c)},M=function(e,t){var n=function(t,n){var r,i=v(e)?N(e,n):e;for(;t&&t!==n;t=t.parentNode)for(r=i.length;r--;)if(i[r]===t)return t},r=function(e){var r=n(e.target,this);r&&t.apply(r,arguments)};return r.__beanDel={ft:n,selector:e},r},_=l?function(e,t,r){var i=a.createEvent(e?"HTMLEvents":"UIEvents");i[e?"initEvent":"initUIEvent"](t,!0,!0,n,1),r.dispatchEvent(i)}:function(e,t,n){n=S(n,e),e?n.fireEvent("on"+t,a.createEventObject()):n["_on"+t]++},D=function(e,t,n){var r=v(t),o,u,a,f;if(r&&t.indexOf(" ")>0){t=d(t);for(f=t.length;f--;)D(e,t[f],n);return e}u=r&&t.replace(s,""),u&&w[u]&&(u=w[u].type);if(!t||r){if(a=r&&t.replace(i,""))a=d(a,".");O(e,u,n,a)}else if(m(t))O(e,null,t);else for(o in t)t.hasOwnProperty(o)&&D(e,o,t[o]);return e},P=function(e,t,n,r){var o,u,a,f,l,v,g;if(n===undefined&&typeof t=="object"){for(u in t)t.hasOwnProperty(u)&&P.call(this,e,u,t[u]);return}m(n)?(l=p.call(arguments,3),r=o=n):(o=r,l=p.call(arguments,4),r=M(n,o,N)),a=d(t),this===h&&(r=A(D,e,t,r,o));for(f=a.length;f--;)g=T.put(v=new x(e,a[f].replace(s,""),r,o,d(a[f].replace(i,""),"."),l,!1)),v[c]&&g&&L(e,v.eventType,!0,v.customType);return e},H=function(e,t,n,r){return P.apply(null,v(n)?[e,n,t,r].concat(arguments.length>3?p.call(arguments,5):[]):p.call(arguments))},B=function(){return P.apply(h,arguments)},j=function(e,t,n){var r=d(t),o,u,a,f,l;for(o=r.length;o--;){t=r[o].replace(s,"");if(f=r[o].replace(i,""))f=d(f,".");if(!f&&!n&&e[c])_(b[t],t,e);else{l=T.get(e,t,null,!1),n=[!1].concat(n);for(u=0,a=l.length;u<a;u++)l[u].inNamespaces(f)&&l[u].handler.apply(e,n)}}return e},F=function(e,t,n){var r=T.get(t,n,null,!1),i=r.length,s=0,o,u;for(;s<i;s++)r[s].original&&(o=[e,r[s].type],(u=r[s].handler.__beanDel)&&o.push(u.selector),o.push(r[s].original),P.apply(null,o));return e},I={on:P,add:H,one:B,off:D,remove:D,clone:F,fire:j,setSelectorEngine:C,noConflict:function(){return t[e]=r,this}};if(n.attachEvent){var q=function(){var e,t=T.entries();for(e in t)t[e].type&&t[e].type!=="unload"&&D(t[e].element,t[e].type);n.detachEvent("onunload",q),n.CollectGarbage&&n.CollectGarbage()};n.attachEvent("onunload",q)}return C(),I});
}
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.Prolog = "prolog";
Xml.Document = "document";
if(typeof($) == 'undefined') {
	/*! jQuery v1.6.4 http://jquery.com/ | http://jquery.org/license */
(function(a,b){function cu(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cr(a){if(!cg[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ch||(ch=c.createElement("iframe"),ch.frameBorder=ch.width=ch.height=0),b.appendChild(ch);if(!ci||!ch.createElement)ci=(ch.contentWindow||ch.contentDocument).document,ci.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),ci.close();d=ci.createElement(a),ci.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ch)}cg[a]=e}return cg[a]}function cq(a,b){var c={};f.each(cm.concat.apply([],cm.slice(0,b)),function(){c[this]=a});return c}function cp(){cn=b}function co(){setTimeout(cp,0);return cn=f.now()}function cf(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ce(){try{return new a.XMLHttpRequest}catch(b){}}function b$(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bZ(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bY(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bA.test(a)?d(a,e):bY(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bY(a+"["+e+"]",b[e],c,d);else d(a,b)}function bX(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bW(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bP,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bW(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bW(a,c,d,e,"*",g));return l}function bV(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bL),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function by(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bt:bu;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bv(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function bl(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bd,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bk(a){f.nodeName(a,"input")?bj(a):"getElementsByTagName"in a&&f.grep(a.getElementsByTagName("input"),bj)}function bj(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bi(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bh(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bg(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bf(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function V(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(Q.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function U(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function M(a,b){return(a&&a!=="*"?a+".":"")+b.replace(y,"`").replace(z,"&")}function L(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(w,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function J(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function D(){return!0}function C(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function K(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(K,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z]|[0-9])/ig,x=/^-ms-/,y=function(a,b){return(b+"").toUpperCase()},z=d.userAgent,A,B,C,D=Object.prototype.toString,E=Object.prototype.hasOwnProperty,F=Array.prototype.push,G=Array.prototype.slice,H=String.prototype.trim,I=Array.prototype.indexOf,J={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.4",length:0,size:function(){return this.length},toArray:function(){return G.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?F.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),B.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(G.apply(this,arguments),"slice",G.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:F,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;B.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!B){B=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",C,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",C),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&K()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):J[D.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!E.call(a,"constructor")&&!E.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||E.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(x,"ms-").replace(w,y)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:H?function(a){return a==null?"":H.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?F.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(!b)return-1;if(I)return I.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=G.call(arguments,2),g=function(){return a.apply(c,f.concat(G.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){J["[object "+b+"]"]=b.toLowerCase()}),A=e.uaMatch(z),A.browser&&(e.browser[A.browser]=!0,e.browser.version=A.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?C=function(){c.removeEventListener("DOMContentLoaded",C,!1),e.ready()}:c.attachEvent&&(C=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",C),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g+"With"](this===b?d:this,[h])}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.firstChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},m&&f.extend(p,{position:"absolute",left:"-1000px",top:"-1000px"});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0),o.innerHTML="",n.removeChild(o);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i=f.expando,j=typeof c=="string",k=a.nodeType,l=k?f.cache:a,m=k?a[f.expando]:a[f.expando]&&f.expando;if((!m||e&&m&&l[m]&&!l[m][i])&&j&&d===b)return;m||(k?a[f.expando]=m=++f.uuid:m=f.expando),l[m]||(l[m]={},k||(l[m].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?l[m][i]=f.extend(l[m][i],c):l[m]=f.extend(l[m],c);g=l[m],e&&(g[i]||(g[i]={}),g=g[i]),d!==b&&(g[f.camelCase(c)]=d);if(c==="events"&&!g[c])return g[i]&&g[i].events;j?(h=g[c],h==null&&(h=g[f.camelCase(c)])):h=g;return h}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e=f.expando,g=a.nodeType,h=g?f.cache:a,i=g?a[f.expando]:f.expando;if(!h[i])return;if(b){d=c?h[i][e]:h[i];if(d){d[b]||(b=f.camelCase(b)),delete d[b];if(!l(d))return}}if(c){delete h[i][e];if(!l(h[i]))return}var j=h[i][e];f.support.deleteExpando||!h.setInterval?delete h[i]:h[i]=null,j?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=j):g&&(f.support.deleteExpando?delete a[f.expando]:a.removeAttribute?a.removeAttribute(f.expando):a[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u,v;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(o);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(o);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(n," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;d=e.value;return typeof d=="string"?d.replace(p,""):d==null?"":d}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);j&&(c=f.attrFix[c]||c,i=f.attrHooks[c],i||(t.test(c)?i=v:u&&(i=u)));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j&&(h=i.get(a,c))!==null)return h;h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.attr(a,b,""),a.removeAttribute(b),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(u&&f.nodeName(a,"button"))return u.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(u&&f.nodeName(a,"button"))return u.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);i&&(c=f.propFix[c]||c,h=f.propHooks[c]);return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==null?g:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabIndex=f.propHooks.tabIndex,v={get:function(a,c){var d;return f.prop(a,c)===!0||(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},f.support.getSetAttribute||(u=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var w=/\.(.*)$/,x=/^(?:textarea|input|select)$/i,y=/\./g,z=/ /g,A=/[^\w\s.|`]/g,B=function(a){return a.replace(A,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=C;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=C);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),B).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete 
t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,M(a.origType,a.selector),f.extend({},a,{handler:L,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,M(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?D:C):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=D;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=D;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=D,this.stopPropagation()},isDefaultPrevented:C,isPropagationStopped:C,isImmediatePropagationStopped:C};var E=function(a){var b=a.relatedTarget,c=!1,d=a.type;a.type=a.data,b!==this&&(b&&(c=f.contains(this,b)),c||(f.event.handle.apply(this,arguments),a.type=d))},F=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?F:E,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?F:E)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="submit"||c==="image")&&f(b).closest("form").length&&J("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&J("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var G,H=function(a){var b=f.nodeName(a,"input")?a.type:"",c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},I=function(c){var d=c.target,e,g;if(!!x.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=H(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:I,beforedeactivate:I,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&I.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&I.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",H(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in G)f.event.add(this,c+".specialChange",G[c]);return x.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return x.test(this.nodeName)}},G=f.event.special.change.filters,G.focus=G.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var K={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||C,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=w.exec(h),k="",j&&(k=j[0],h=h.replace(w,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,K[h]?(a.push(K[h]+k),h=h+k):h=(K[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+M(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+M(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var N=/Until$/,O=/^(?:parents|prevUntil|prevAll)/,P=/,/,Q=/^.[^:#\[\.,]*$/,R=Array.prototype.slice,S=f.expr.match.POS,T={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(V(this,a,!1),"not",a)},filter:function(a){return this.pushStack(V(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=S.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=S.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(U(c[0])||U(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=R.call(arguments);N.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!T[a]?f.unique(e):e,(this.length>1||P.test(d))&&O.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|object|embed|option|style)/i,bb=/checked\s*(?:[^=]|=\s*.checked.)/i,bc=/\/(java|ecma)script/i,bd=/^\s*<!(?:\[CDATA\[|\-\-)/,be={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};be.optgroup=be.option,be.tbody=be.tfoot=be.colgroup=be.caption=be.thead,be.th=be.td,f.support.htmlSerialize||(be._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!be[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bb.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bf(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bl)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i;b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!ba.test(a[0])&&(f.support.checkClone||!bb.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean
(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bh(a,d),e=bi(a),g=bi(d);for(h=0;e[h];++h)g[h]&&bh(e[h],g[h])}if(b){bg(a,d);if(c){e=bi(a),g=bi(d);for(h=0;e[h];++h)bg(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=be[l]||be._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bk(k[i]);else bk(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bc.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bm=/alpha\([^)]*\)/i,bn=/opacity=([^)]*)/,bo=/([A-Z]|^ms)/g,bp=/^-?\d+(?:px)?$/i,bq=/^-?\d/,br=/^([\-+])=([\-+.\de]+)/,bs={position:"absolute",visibility:"hidden",display:"block"},bt=["Left","Right"],bu=["Top","Bottom"],bv,bw,bx;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bv(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=br.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bv)return bv(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return by(a,b,d);f.swap(a,bs,function(){e=by(a,b,d)});return e}},set:function(a,b){if(!bp.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bn.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bm,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bm.test(g)?g.replace(bm,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bv(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bw=function(a,c){var d,e,g;c=c.replace(bo,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bx=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bp.test(d)&&bq.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bv=bw||bx,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bz=/%20/g,bA=/\[\]$/,bB=/\r?\n/g,bC=/#.*$/,bD=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bE=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bF=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bG=/^(?:GET|HEAD)$/,bH=/^\/\//,bI=/\?/,bJ=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bK=/^(?:select|textarea)/i,bL=/\s+/,bM=/([?&])_=[^&]*/,bN=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bO=f.fn.load,bP={},bQ={},bR,bS,bT=["*/"]+["*"];try{bR=e.href}catch(bU){bR=c.createElement("a"),bR.href="",bR=bR.href}bS=bN.exec(bR.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bO)return bO.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bJ,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bK.test(this.nodeName)||bE.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bB,"\r\n")}}):{name:b.name,value:c.replace(bB,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?bX(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),bX(a,b);return a},ajaxSettings:{url:bR,isLocal:bF.test(bS[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bT},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bV(bP),ajaxTransport:bV(bQ),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?bZ(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=b$(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bD.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bC,"").replace(bH,bS[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bL),d.crossDomain==null&&(r=bN.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bS[1]&&r[2]==bS[2]&&(r[3]||(r[1]==="http:"?80:443))==(bS[3]||(bS[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bW(bP,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bG.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bI.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bM,"$1_="+x);d.url=y+(y===d.url?(bI.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bT+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bW(bQ,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){s<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bY(g,a[g],c,e);return d.join("&").replace(bz,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var b_=f.now(),ca=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+b_++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ca.test(b.url)||e&&ca.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ca,l),b.url===j&&(e&&(k=k.replace(ca,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cb=a.ActiveXObject?function(){for(var a in cd)cd[a](0,1)}:!1,cc=0,cd;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ce()||cf()}:ce,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cb&&delete cd[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cc,cb&&(cd||(cd={},f(a).unload(cb)),cd[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cg={},ch,ci,cj=/^(?:toggle|show|hide)$/,ck=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cl,cm=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cn;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cq("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cr(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cq("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cq("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cr(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cj.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=ck.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cq("show",1),slideUp:cq("hide",1),slideToggle:cq("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function g(a){return d.step(a)}var d=this,e=f.fx;this.startTime=cn||co(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,g.elem=this.elem,g()&&f.timers.push(g)&&!cl&&(cl=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cn||co(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cl),cl=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cs=/^t(?:able|d|h)$/i,ct=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cu(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cs.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=ct.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!ct.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cu(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cu(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a&&a.style?parseFloat(f.css(a,d,"padding")):null},f.fn["outer"+c]=function(a){var b=this[0];return b&&b.style?parseFloat(f.css(b,d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNaN(j)?i:j}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);;
}
var q = window.jQuery;
js.JQuery = q;
q.fn.iterator = function() {
	return { pos : 0, j : this, hasNext : function() {
		return this.pos < this.j.length;
	}, next : function() {
		return $(this.j[this.pos++]);
	}};
};
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
js.XMLHttpRequest = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
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
AppConfig.projectDir = "/home/jason/VoseProjects/";
client.Client.conn = haxe.remoting.HttpAsyncConnection.urlConnect("http://localhost:1337");
app.project.ProjectController.__meta__ = { fields : { archive : { route : ["projects/{}/archive/"]}, update : { route : ["projects/{}/edit/"]}, create : { route : ["projects/new/"]}, read : { route : ["projects/{}/"]}, list : { route : ["projects/"]}}};
app.project.ProjectController.projectAPI = new app.project.ProjectAPIProxy(client.Client.conn);
app.project.model.Project.__meta__ = { fields : { notes : { autoform : [{ required : false, title : "Notes for this unit", display : "textarea", description : "You can enter any notes related to this project.", placeholder : "eg. This is the VET level version of the unit recorded in 2009."}]}, semester : { autoform : [{ required : true, title : "Semester", placeholder : "eg. 1 or 2"}]}, year : { autoform : [{ required : true, title : "Year", placeholder : "eg. 2012"}]}, lecturer : { autoform : [{ required : true, title : "Lecturer Name", placeholder : "eg. Brian Harris"}]}, title : { autoform : [{ required : true, title : "Unit Title", display : "text", placeholder : "eg. Ministry Formation", description : "The full title, not including the code"}]}, id : { autoform : [{ required : true, title : "Unit Code", display : "text", placeholder : "eg. PC301"}]}}};
app.project.model.Project.__rtti = "<class path=\"app.project.model.Project\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<id public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"autoform\"><e>{required:true,title:Unit Code,display:text,placeholder:eg. PC301}</e></m></meta>\n\t</id>\n\t<title public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"autoform\"><e>{required:true,title:Unit Title,display:text,placeholder:eg. Ministry Formation,description:The full title, not including the code}</e></m></meta>\n\t</title>\n\t<lecturer public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"autoform\"><e>{required:true,title:Lecturer Name,placeholder:eg. Brian Harris}</e></m></meta>\n\t</lecturer>\n\t<year public=\"1\">\n\t\t<c path=\"Int\"/>\n\t\t<meta><m n=\"autoform\"><e>{required:true,title:Year,placeholder:eg. 2012}</e></m></meta>\n\t</year>\n\t<semester public=\"1\">\n\t\t<c path=\"Int\"/>\n\t\t<meta><m n=\"autoform\"><e>{required:true,title:Semester,placeholder:eg. 1 or 2}</e></m></meta>\n\t</semester>\n\t<notes public=\"1\">\n\t\t<c path=\"Array\"><c path=\"String\"/></c>\n\t\t<meta><m n=\"autoform\"><e>{required:false,title:Notes for this unit,display:textarea,description:You can enter any notes related to this project.,placeholder:eg. This is the VET level version of the unit recorded in 2009.}</e></m></meta>\n\t</notes>\n\t<new public=\"1\" set=\"method\" line=\"47\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
app.video.VideoController.__meta__ = { fields : { archive : { route : ["videos/archive/{}/"]}, update : { route : ["videos/edit/{}/"]}, create : { route : ["videos/new/"]}, read : { route : ["videos/{}/"]}, list : { route : ["videos"]}}};
app.video.VideoController.videoAPI = new app.video.VideoAPIProxy(client.Client.conn);
app.video.model.Video.__meta__ = { fields : { notes : { autoform : [{ required : false, title : "Notes for this unit", display : "textarea", description : "You can enter any notes related to this video.", placeholder : "eg. Only 1st hour recorded.  The rest was a group discussion."}]}, lecturer : { autoform : [{ required : true, title : "Lecturer Name", placeholder : "eg. Brian Harris"}]}, name : { autoform : [{ required : true, title : "Video Name", display : "text", placeholder : "eg. Week01"}]}, projectID : { autoform : [{ required : true, title : "Project ID", display : "text", placeholder : "eg. PC301"}]}}};
app.video.model.Video.__rtti = "<class path=\"app.video.model.Video\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<projectID public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"autoform\"><e>{required:true,title:Project ID,display:text,placeholder:eg. PC301}</e></m></meta>\n\t</projectID>\n\t<name public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"autoform\"><e>{required:true,title:Video Name,display:text,placeholder:eg. Week01}</e></m></meta>\n\t</name>\n\t<lecturer public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"autoform\"><e>{required:true,title:Lecturer Name,placeholder:eg. Brian Harris}</e></m></meta>\n\t</lecturer>\n\t<notes public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"autoform\"><e>{required:false,title:Notes for this unit,display:textarea,description:You can enter any notes related to this video.,placeholder:eg. Only 1st hour recorded.  The rest was a group discussion.}</e></m></meta>\n\t</notes>\n\t<new public=\"1\" set=\"method\" line=\"34\"><f a=\"project\">\n\t<c path=\"app.project.model.Project\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
autoform.AbstractField.__meta__ = { obj : { template : ["<div></div"]}};
autoform.AutoForm.__meta__ = { obj : { template : ["<div></div>"]}};
autoform.AutoForm.formIDIncrement = 0;
autoform.ui.Button.__meta__ = { obj : { template : ["<button class='btn'></button>"]}};
autoform.ui.CheckBox.__meta__ = { obj : { template : ["<div></div>"]}};
autoform.ui.HiddenField.__meta__ = { obj : { template : ["<div></div>"]}};
autoform.ui.TextArea.__meta__ = { obj : { template : ["<div></div>"]}};
autoform.ui.TextField.__meta__ = { obj : { template : ["<div></div>"]}};
client.ui.basic.Table.__meta__ = { obj : { template : ["<table></table>"]}};
client.ui.basic.ActionTable.__meta__ = { obj : { template : [""]}};
client.ui.basic.Link.__meta__ = { obj : { template : ["<a></a>"]}};
client.ui.menu.Menu.__meta__ = { obj : { template : ["<ul></ul>"]}};
client.ui.menu.MenuItem.__meta__ = { obj : { template : ["<li></li>"]}};
client.ui.menu.NavBar.__meta__ = { obj : { template : ["<div></div>"]}};
dtx.DOMType.DOCUMENT_NODE = 9;
dtx.DOMType.ELEMENT_NODE = 1;
dtx.DOMType.TEXT_NODE = 3;
dtx.DOMType.COMMENT_NODE = 8;
dtx.single.ElementManipulation.NodeTypeElement = 1;
dtx.single.ElementManipulation.NodeTypeAttribute = 2;
dtx.single.ElementManipulation.NodeTypeText = 3;
dtx.single.ElementManipulation.NodeTypeComment = 8;
dtx.single.ElementManipulation.NodeTypeDocument = 9;
erazor.Parser.at = "@";
erazor.Parser.bracketMismatch = "Bracket mismatch! Inside template, non-paired brackets, '{' or '}', should be replaced by @{'{'} and @{'}'}.";
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
haxe.io.Output.LN2 = Math.log(2);
hscript.Parser.p1 = 0;
hscript.Parser.readPos = 0;
hscript.Parser.tokenMin = 0;
hscript.Parser.tokenMax = 0;
hsl.haxe._DirectSignaler.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe._DirectSignaler.PropagationStatus.STOPPED = 2;
hsl.haxe._DirectSignaler.PropagationStatus.UNDISTURBED = 3;
js.Lib.onerror = null;
tink.macro.tools.MacroTools.idCounter = 0;
client.Client.main();
