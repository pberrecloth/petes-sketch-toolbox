// Context
var app = NSApplication.sharedApplication(),
    selection,
    plugin,
    command,
    doc,
    page,
    artboard

function initContext(context) {
  sketch = context.api(),
    doc = context.document,
        plugin = context.plugin,
        command = context.command,
        page = doc.currentPage(),
        pages = doc.pages(),
        artboard = page.currentArtboard(),
        selection = context.selection
    }
