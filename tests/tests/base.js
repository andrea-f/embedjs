// setup the test object
dojo.zoo = { a:1, c: { d:1 } };

tests.register("base", 
	[
		function mixin(t){
			t.assertEqual("object", typeof dojo.mixin());
			t.assertEqual("object", typeof dojo.mixin(undefined));
			t.assertEqual("object", typeof dojo.mixin(null));
			var src = {
				foo: function(){
					t.debug("foo");
				},
				bar: "bar"
			};
			var dest = {};
			dojo.mixin(dest, src);
			t.assertEqual("function", typeof dest["foo"]);
			t.assertEqual("string", typeof dest["bar"]);
		},
		
		function getBasic(t){
			var x = dojo.getObject('dojo.zoo.a');
			t.is(1, x);
		},
			
		function setObject2(t){
			dojo.setObject("dojo.zoo.foo.bar", 42);
			t.is(42, dojo.zoo.foo.bar);
		},
				
		function setWithContext(t){
			// c is already {}
			dojo.setObject("zoo.c.x", "foo!", dojo);
			t.is("foo!", dojo.zoo.c.x);
		},
				
		function getUndefined(t){
			var x = dojo.getObject('dojo.zoo.b');
			t.is(undefined, x);
		},
				
		function setDeep(t){
			dojo.setObject("dojo.zoo.c.e.f.g.h.i", 42);
			t.is(42, dojo.zoo.c.e.f.g.h.i);
		},
		
		function getDeep(t){
			dojo.getObject("dojo.zoo.bar.baz.bam", true);
			dojo.zoo.bar.baz.bam.x = 10;
			t.is(10, dojo.zoo.bar.baz.bam.x);
		}
	]
);