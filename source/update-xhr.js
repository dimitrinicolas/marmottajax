/**
 * update-xhr.js
 *
 * Update XMLHttpRequest result
 */

marmottajax.prototype.updateXhr = function () {

    var data = {

        lastResult: this.xhr.lastResult,

        json: this.xhr.json,
        binding: this.xhr.binding,

        callbacks: {

            then: this.xhr.callbacks.then,
            change: this.xhr.callbacks.change,
            error: this.xhr.callbacks.error

        }

    };

    this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    this.xhr.lastResult = data.lastResult;

    this.xhr.json = data.json;
    this.xhr.binding = data.binding;

    this.xhr.callbacks = {

        then: data.callbacks.then,
        change: data.callbacks.change,
        error: data.callbacks.error

    };

    this.xhr.call = function (categorie, result) {

        for (var i = 0; i < this.callbacks[categorie].length; i++) {

            if (typeof(this.callbacks[categorie][i]) === "function") {

                if (this.binding) {

                    this.callbacks[categorie][i].call(this.binding, result);

                }

                else {

                    this.callbacks[categorie][i](result);

                }

            }

        }

    };

    this.xhr.onreadystatechange = function () {

        if (this.readyState === 4 && this.xhr.okStatusCodes.contains(this.status)) {

            var result = this.responseText;

            if (this.json) {

                try {

                    result = JSON.parse(result);

                }

                catch (error) {

                    this.call("error", "invalid json");

                    return false;

                }

            }

            isDifferent = this.lastResult != result;

            try {

                isDifferent = (typeof this.lastResult !== "string" ? JSON.stringify(this.lastResult) : this.lastResult) != (typeof result !== "string" ? JSON.stringify(result) : result);

            }

            catch (error) {
            }

            if (isDifferent) {

                this.call("change", result);

            }

            this.lastResult = result;

        }

        else if (this.readyState === 4 && this.status == 404) {

            this.call("error", "404");

        }

        else if (this.readyState === 4) {

            this.call("error", "unknow");

        }

    };

    this.xhr.open(this.method, this.url, true);
    this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.xhr.send(typeof postData != "undefined" ? postData : null);

};