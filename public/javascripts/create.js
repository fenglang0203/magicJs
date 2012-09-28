KISSY.use('core', function(S){
    var DOM = S.DOM, Event = S.Event, IO = S.IO;
    Event.on('#J_TSubmit', 'click', function(e){
        e.halt();
        DOM.val('#editor_content', editor.getValue());
        DOM.removeClass('.loading', 'hidden');
        IO({
            type:"get",
            form:"#J_TCreateMD",
            url: DOM.get('#J_TCreateMD').action,
            success: function(data){
                console.log(data);
            },
            error: function(data){
                console.log(data);
            }
        });
    })
})