package client.ui.basic;

using Detox;
import client.ui.basic.Table;
import dtx.DOMCollection;
import autoform.ui.Button;
import autoform.ui.Button.ButtonType;

@template("")
class ActionTable<T, TypeOfId> extends Table<T>
{
	override public function new(type:Class<T>, ?list:Iterable<T>)
	{
		super(type, list);
	}

	override public function createTable()
	{
		super.createTable();

		var th = "th".create();
		th.setText("Actions");
		thead.append(th);

	}

	override public function populateTable(list:Iterable<T>)
	{
		super.populateTable(list);
	}

	public function addAction(label:String, action:String->Void, ?type:ButtonType = null)
	{
		// add action for each item.
		for (tr in tbody.find("tr"))
		{
			// Find the actions td, or create it
			var td = tr.find("td.actions");
			if (td.length == 0)
			{
				td = "td".create().toDOMCollection();
				td.addClass("actions");
				td.appendTo(tr);
			}

			// Create the buttons 
			var btn = new Button(label, type);
			btn.click(function (e) {
				// Pass ID to action
				var td = btn.parent();
				var tr = td.parent();
				var id = tr.attr("data-id");
				action(id);
			});

			// Add buttons to the TD
			td.append(btn);
		}
	}
}
