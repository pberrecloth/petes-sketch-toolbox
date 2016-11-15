// Mostly functions used to change the view
function centerViewOnSelection(layer) {
  doc.currentView().centerRect_(layer.rect());
}
var displayLayerCount = function(context) {
  initContext(context);
  doc.showMessage(selectionCount + " layer(s) selected");
}
