class CorsPopup {
    constructor({
        url, finalPath, features, params, target, onClose,
    }) {
        this._url = url;
        this._finalPath = finalPath;
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
        if (!this._window.closed) {
            if (this._window.location.pathname === this._finalPath) {
                this.close();
                return true;
            }
            setTimeout(this.check, 1000);
        }

        return false;
    }
}

export default CorsPopup;
