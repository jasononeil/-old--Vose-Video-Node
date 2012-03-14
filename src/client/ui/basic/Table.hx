package client.ui.basic;
using domtools.Tools;
import domtools.Query;

class Table<T> extends domtools.AbstractCustomElement
{
	public var type:Class<T>;
	public var fields:Hash<String>;
	var thead:Node;
	var tbody:Node;

	public function new(type:Class<T>, ?list:Iterable<T>)
	{
		super("table");

		fields = new Hash();
		this.type = type;
		createTable();

		// Basic classes for bootstrap
		this.addClass("table");
		this.addClass("table-striped");

		if (list != null)
		{
			populateTable(list);
		}
	}

	public function createTable()
	{
		// set up the thead and tbody
		thead = Query.create("thead");
		tbody = Query.create("tbody");
		this.append(thead);
		this.append(tbody);

		// Create the header rows
		for (field in Type.getInstanceFields(type))
		{
			var th = Query.create("th");
			th.setText(field);
			thead.append(th);
			fields.set(field, "Field: " + field);
		}
	}

	public function populateTable(list:Iterable<T>)
	{
		for (object in list)
		{
			// create a new row per object
			var tr = Query.create("tr");
			tbody.append(tr);

			for (field in fields.keys())
			{
				// create a new cell per field of the object
				var td = Query.create("td");
				var value = Reflect.field(object, field);
				td.setText(value);
				tr.append(td);
			}
		}
	}
}
