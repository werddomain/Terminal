interface IDictionaryInitialiser<T> { key: string; value: T; }
class Dictionary<T> {

    private _keys: string[] = new Array<string>();
    private _values: T[] = new Array<T>();

    constructor(init?: IDictionaryInitialiser<T>[]) {
        if (init != null && init.length > 0)
            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
    }
    ToObject(): any
    {
        var ret = {};
        for (var i = 0; i < this._keys.length; i++)
        {
            var key = this._keys[i];
            var value = this._values[i];
            ret[key] = value;
        }
        return ret;
    }
    public getValue(key: string): T
    {
        var index = this._keys.indexOf(key, 0);
        if (index == -1)
            return null;
        return this._values[index];
    }
    public add(key: string, value: T) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }
    public addDictionary(items: Dictionary<T>)
    {
        var success = true;
        var tKeys = items.keys();
        for (var i = 0; i < tKeys.length; i++)
            this.add(tKeys[i], items.getValue(tKeys[i]));
    
    }
    public addRange(key: (item: T) => string, items: Array<T>):boolean
    {
        if (items == null)
            return false;
        var success = true;
        var temp = new Dictionary<T>();

        for (var i = 0; i < items.length; i++)
        {
            var k = key(items[i]);
            if (this.containsKey(k) == false)
                temp.add(k, items[i]);
            else
                success = false;
        }
        if (success)
            this.addDictionary(temp);
           
        return success;

    }
    public remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }
    public Count(): number {
        return this._keys.length;
    }
    public keys(): string[] {
        return this._keys;
    }

    public values(): T[] {
        return this._values;
    }
    public clear() {
        for (var i = 0; i < this.keys().length; i++)
        {
            this.remove(this.keys()[i]);
        }
    }
    public containsKey(key: string) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }
    public static FromObject(obj: any): Dictionary<any>
    {
        var ret = new Dictionary<any>();
        var keys = Object.keys(obj);

        for (var i = 0; i < keys.length; i++) {
            var val = obj[keys[i]];
            ret.add(keys[i], val);
        }
        return ret;
    }
}
