import Ext;

class ExtInterface
{
	public static function main()
	{
		Ext.onReady(function () 
		{
			var tabPanel = new ext.tab.Panel(
			{
				width: js.Lib.window.innerWidth,
				height: js.Lib.window.innerHeight,
				enableTabScroll: true,
				renderTo: js.Lib.document.body,
				items: [
				{
					title: 'Foo',
					itemId: 'home',
					html: "<p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p<p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p<p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p<p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p><p>Woohoo!</p>"
				}, 
				{
					title: 'Bar',
					tabConfig: 
					{
						title: 'Custom Title',
						tooltip: 'A button tooltip'
					}
				}]
			});
			//var tab:ext.tab.Tab = untyped tabPanel.child("#home").tab;
			
			var form = new ext.form.Basic(tabPanel, {
			    title: 'Basic Form',
			    bodyPadding: 5,
			    width: 350,
			    renderTo: tabPanel,
			    // Any configuration items here will be automatically passed along to
			    // the Ext.form.Basic instance when it gets created.

			    // The form will submit an AJAX request to this URL when submitted
			    url: 'save-form.php',

			    items: [{
			        fieldLabel: 'Field',
			        name: 'theField'
			    }],

			    buttons: [{
			        text: 'Submit',
			        handler: function() {
			            // The getForm() method returns the Ext.form.Basic instance:
			            /*var form = this.up('form').getForm();
			            if (form.isValid()) {
			                // Submit the Ajax request and handle the response
			                form.submit({
			                    success: function(form, action) {
			                       Ext.Msg.alert('Success', action.result.msg);
			                    },
			                    failure: function(form, action) {
			                        Ext.Msg.alert('Failed', action.result.msg);
			                    }
			                });
			            }*/
			            js.Lib.alert("Hey");
			        }
			    }]
			});

			//tabPanel.add(form);
			
		});
	}
}
