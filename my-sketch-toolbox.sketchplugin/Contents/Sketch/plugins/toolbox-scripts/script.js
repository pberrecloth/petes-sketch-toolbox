@import "_includes.js";

var convertLayerNamestoLowercase = function(context) {

    initContext(context);
    var selectionCount = selection.count();
    var processCount = 0;

    if (selectionCount == 0) {
      alert('No layers selected');
    	doc.showMessage("Select at least one layer");
      } else {

      for (var i=0; i<selectionCount; i++) {
        var layer = selection[i]
        var name = [layer name]
        // convert to lowercase
        var name = name.toLowerCase()
        [layer setName:name]
        processCount++
      }

      doc.showMessage("Processed " + processCount + " layer(s)");
    }
}
