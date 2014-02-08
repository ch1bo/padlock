Polymer("padlock-select", {
    //* Determines wheter the select options are shown or not
    open: false,
    //* Text shown if no option is selected
    label: "tap to select",
    //* The selected element
    selected: null,
    //* If _true_, options will expand upwards instead of downwards
    openUpwards: false,
    attached: function() {
        // Initially select the first item with the _selected_ attribute
        for (var i=0; i<this.children.length; i++) {
            if (this.children[i].getAttribute("selected")) {
                this.selected = this.children[i];
                break;
            }
        }
    },
    openChanged: function() {
        require(["padlock/util"], function(util) {
            var options = this.children,
                prefix = util.getVendorPrefix().css,
                // We're assuming all rows have the same height
                rowHeight = options[0] && options[0].offsetHeight || 0,
                gutterWidth = 5;

            // Show all options except the selected one by making them opaque
            // and lining them up via a css transform
            for (var i=0, j=0, o; i<options.length; i++) {
                o = options[i];

                // If we are showing the options, skip the selected one
                if (!this.open || o != this.selected) {
                    var y = (j + 1) * (rowHeight + gutterWidth);
                    y = this.openUpwards ? -y : y;
                    var trans = this.open ? "translate(0, " + y + "px)" : "";
                    o.style[prefix + "transform"] = trans;
                    o.style.opacity = this.open ? 1 : 0;
                    j++;
                }
            }
        }.bind(this));
    },
    //* Toggles the open state
    toggleOpen: function() {
        this.open = !this.open;
    },
    optionTap: function(event) {
        this.selected = event.target;
        this.open = false;
    }
});