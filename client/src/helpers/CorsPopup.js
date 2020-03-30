class CorsPopup {
    constructor({
        url, checkMethod, features, params, target, onClose,
    }) {
        this._url = url;
        this._checkMethod = checkMethod;
        this._target = target;
        this._features = features;
        this._params = params;
        this._onClose = onClose;
        this._window = null;

        this.check = this.check.bind(this);
    }

    open() {
        this._window = window.open(
            this._url,
            this._target,
            this._params,
            this._features,
        );

        setTimeout(this.check, 1000);
    }

    close() {
        this._onClose();
        this._window.close();
    }

    check() {
        console.log('check', this._window.closed);
        if (!this._window.closed) {
            if (this._checkMethod()) {
                this.close();
                return true;
            }
            setTimeout(this.check, 2000);
        }

        return false;
    }
}

export default CorsPopup;
