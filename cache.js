class LRUCache {
    constructor(capacity){

        this.capacity = capacity;

        this.cache = new Map()
    }

    get(key){

        if(!this.cache.has(key)) {
            return null;
        }

        const value = this.cache.get(key);
        this.cache.delete(key)
        this.cache.set(key, value)

        return value;
    }

    put(key, value){

        if(this.cache.has(key)){
            this.cache.delete(key)
        } 
        

        this.cache.set(key, value)


        if(this.cache.size > this.capacity){
            const firstKey = this.cache.keys().next().value
            this.cache.delete(firstKey)
        }

    }

    clear(){
        this.cache.clear()
    }

    size(){
        return this.cache.size
    }

    has(key){
        return this.cache.has(key)
    }
}

const cache = new LRUCache(4);

module.exports = cache 