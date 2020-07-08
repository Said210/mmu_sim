controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    game.showLongText(n, DialogLayout.Bottom)
})
let n = ""
n = game.askForString("Ingresa la dirección en Hex 0x0000")
let valor = convertBase(n, 16, 10)
game.showLongText(valor, DialogLayout.Bottom)
game.showLongText(Bits.fn_convertBase(n, 16, 2), DialogLayout.Bottom)
