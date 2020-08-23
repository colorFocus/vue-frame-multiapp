const DB_NAME = '_local_cache_';

export default {
    clear: function () {
        const len = window.sessionStorage.length;
        for (let i = len - 1; i > -1; i--) {
            const key = window.sessionStorage.key(i);
            if (key.includes(DB_NAME)) {
                window.sessionStorage.removeItem(key);
            }
        }
    },
    contain: function (key) {
        const cacheKey = DB_NAME + key;
        const value = window.sessionStorage.getItem(cacheKey);
        return !!value;
    },
    getJson: function (key) {
        const cacheKey = DB_NAME + key;
        const value = window.sessionStorage.getItem(cacheKey);
        if (!value) return null;
        return JSON.parse(value);
    },
    get: function (key) {
        const cacheKey = DB_NAME + key;
        const value = window.sessionStorage.getItem(cacheKey);
        return value;
    },
    getKeys: function () {
        const keys = [];
        for (let i = 0; i < window.sessionStorage.length; i++) {
            let key = window.sessionStorage.key(i);
            if (key.includes(DB_NAME)) {
                key = key.substring(DB_NAME.length);
                keys.push(key);
            }
        }
        return keys;
    },
    getLength: function () {
        let len = 0;
        for (let i = 0; i < window.sessionStorage.length; i++) {
            var key = window.sessionStorage.key(i);
            if (key.includes(DB_NAME)) {
                len++;
            }
        }
        return len;
    },
    pop: function (key) {
        const value = _.clone(this.get(key));
        this.remove(key);
        return value;
    },
    remove: function (key) {
        const cacheKey = DB_NAME + key;
        window.sessionStorage.removeItem(cacheKey);
    },
    set: function (key, value) {
        const cacheKey = DB_NAME + key;
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window.sessionStorage.setItem(cacheKey, value);
    }
}