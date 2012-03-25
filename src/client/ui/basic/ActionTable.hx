package client.ui.basic;

using domtools.Tools;
import client.ui.basic.Table;
import domtools.Query;

class ActionTable<T> extends Table<T>
{
	override public function new(type:Class<T>, ?list:Iterable<T>)
	{
		super(type, list);
	}

	override public function createTable()
	{
		super.createTable();

		var th = Query.create("th");
		th.setText("Actions");
		thead.append(th);

	}

	override public function populateTable(list:Iterable<T>)
	{
		super.populateTable(list);

		// add action for each item.
		for (tr in tbody.find("tr"))
		{
			// Do something	
		}
		
	}
}
