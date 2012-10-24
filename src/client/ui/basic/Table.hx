package client.ui.basic;
using Detox;
import dtx.DOMCollection;
import dtx.DOMNode;

@template("<table></table>")
class Table<T> extends dtx.widget.Widget
{
	public var type:Class<T>;
	public var fields:Hash<String>;
	var thead:DOMNode;
	var tbody:DOMNode;

	public function new(type:Class<T>, ?list:Iterable<T>)
	{
		super();

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
		thead = "thead".create();
		tbody = "tbody".create();
		this.append(thead);
		this.append(tbody);

		// Create the header rows
		for (field in Type.getInstanceFields(type))
		{
			trace ("I should check metadata here");
			if (field != "insert")
			{
				var th = "th".create();
				th.setText(field);
				thead.append(th);
				fields.set(field, "Field: " + field);
			}
		}
	}

	public function populateTable(list:Iterable<T>)
	{
		for (object in list)
		{
			// create a new row per object
			var tr = "tr".create();
			tbody.append(tr);

			for (field in fields.keys())
			{
				// create a new cell per field of the object
				var td = "td".create();
				var value = Reflect.field(object, field);
				td.setText(value);
				tr.append(td);

				// Add classes to make it easier to find data
				td.addClass(field);
				if (field == "id")
				{
					tr.setAttr("data-id", value);
				}
			}
		}
	}
}
