@import "_includes.js";
@import "../layer-tools/src/sort.js";

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
var displayLayerCount = function(context) {
  initContext(context);
  var selectionCount = selection.count();
  doc.showMessage(selectionCount + " layer(s) selected");

}




function buttUpSelection(context) {

  // For this to work properly, you must run sort > by vertical position first.
  initContext(context);
  var selectionCount = selection.count();
  var processCount = 0;



  if (selectionCount <= 1) {
    doc.showMessage("Select at least two layers to shunt");
    } else {
      var sortVertically = [NSSortDescriptor sortDescriptorWithKey:"absoluteRect.rulerY" ascending:1]
      var sortedLayers = [selection sortedArrayUsingDescriptors:[sortVertically]];
      sortSelectedLayersInList(sortedLayers);

    for (var i=0; i<selectionCount; i++) {
      var layer = sortedLayers[i]
      // Get layer properties
      var layerFrame = layer.frame();
      var layerWidth = layerFrame.width();
      var layerHeight = layerFrame.height();
      var layerX = layerFrame.x();
      var layerY = layerFrame.y();

      if (!lastLayer){
        var lastLayer = layer
        var lastLayerFrame = lastLayer.frame();
        var lastLayerWidth = lastLayerFrame.width();
        var lastLayerHeight = lastLayerFrame.height();
        var lastLayerX = lastLayerFrame.x();
        var lastLayerY = lastLayerFrame.y();
        var lastLayerBottomY = lastLayerY;
      } else {
        var lastLayerFrame = lastLayer.frame();
        var lastLayerWidth = lastLayerFrame.width();
        var lastLayerHeight = lastLayerFrame.height();
        var lastLayerX = lastLayerFrame.x();
        var lastLayerY = lastLayerFrame.y();
        var lastLayerBottomY = lastLayerY + lastLayerHeight;
      }


      layerFrame.setY(lastLayerBottomY);


      var lastLayer = layer;
      var lastLayerFrame = lastLayer.frame();
      var lastLayerWidth = lastLayerFrame.width();
      var lastLayerHeight = lastLayerFrame.height();
      var lastLayerX = lastLayerFrame.x();
      var lastLayerY = lastLayerFrame.y();
      // lastLayerY = lastLayerY + 20;
      processCount++
    }
    lastLayer = null;
    lastLayerBottomY = null;
    doc.showMessage("Processed " + processCount + " layer(s)");
  }

}

// ------------------------- UTILS ----------------------- //

// sorts selected layers in layer list
var sortSelectedLayersInList = function(sortedLayers){

  // make sure we have multiple layers in the same group
  if (!isMultipleSelectionInOneGroup()) {
    notify("Please select multiple layers in one group");
    return;
  }

  // save layer indices
  var parent = selection[0].parentGroup();
  var layerIndices = [];
  var loop = [selection objectEnumerator], layer;
  while (layer = [loop nextObject]){
    layerIndices.push(parent.indexOfLayer(layer));
  }
  [page deselectAllLayers];

  // remove layers from parent
  var removeLoop = [selection objectEnumerator], layerToRemove;
  while (layerToRemove = [removeLoop nextObject]){
    [layerToRemove removeFromParent];
  }

  // insert them at the corresponding index
  for (var i = 0; i < layerIndices.length; i++) {
    var index = layerIndices[i];
    var sortedLayer = sortedLayers[i];
    var layerArray = [NSArray arrayWithObject:sortedLayer];
    [parent insertLayers:layerArray atIndex:index];
    [sortedLayer select:true byExpandingSelection:true];
  }
}

// loops over selection to check if they're multiple, and part of the same group
var isMultipleSelectionInOneGroup = function(){
  if (selection.count() < 2) {
    return false;
  }
  var parent = selection[0].parentGroup();
  var loop = [selection objectEnumerator], layer;
  while (layer = [loop nextObject]){
    if (layer.parentGroup() != parent) {
      return false;
    }
  }
  return true;
}
