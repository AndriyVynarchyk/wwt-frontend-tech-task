// jsdom does not implement the modal dialog API yet
HTMLDialogElement.prototype.showModal = function () {
	this.open = true
}

HTMLDialogElement.prototype.close = function () {
	if (!this.open) {
		return
	}

	this.open = false
	this.dispatchEvent(new Event('close'))
}
