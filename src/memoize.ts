import { memoizeWith, curry, toString, AnyFunction } from 'ramda';

export default <T extends AnyFunction>(fn: T) =>
    memoizeWith(getKeyInStore, fn);

const getKey = curry((store: any[], data: any) => {
    const index = store.indexOf(data);
    if (index >= 0) {
        return toString(index);
    }
    store = [...store, data];
    return toString(store.length - 1);
});

const getKeyInStore = getKey([]);
