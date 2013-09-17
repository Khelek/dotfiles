enyo.kind({
    name: "ekl.List.VirtualList",
    kind: enyo.VirtualList,
    
    published: {
        mousewheel: true,
        //Dampens mousewheel delta strength
        mousewheelDamp: 40.0
    },
    events: { 
    },
    
    create: function(){
        this.inherited(arguments);
        this.horizontalChanged();
    },
    
    horizontalChanged: function(){
        this.$.scroller.setHorizontal(this.horizontal);
        //this.$.scroller.setAutoHorizontal(this.horizontal);
    },
    
    mousewheelHandler: function(inSender, inEvent) {
        if (this.mousewheel) {
            //Clone event
            var dragTo = enyo.mixin({}, inEvent);
            //Apply delta to new event
            if (inEvent.delta !== undefined) {
                dragTo.pageX = inEvent.pageX + (inEvent.delta.x * this.mousewheelDamp);
                dragTo.pageY = inEvent.pageY + (inEvent.delta.y * this.mousewheelDamp);
            }

            //Simulate initiating a drag
            this.$.scroller.$.scroll.startDrag(inEvent);
            //Simulate dragging to a point
            this.$.scroller.$.scroll.drag(dragTo);
            //Simulate dropping a drag at the same point (prevents flick, lets OS provide accelleration)
            this.$.scroller.$.scroll.dragDrop(dragTo);
            //Simulate ending a drag
            this.$.scroller.$.scroll.dragFinish();
        }
    }
    
});