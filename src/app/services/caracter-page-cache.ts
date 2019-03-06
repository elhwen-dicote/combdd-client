import { LruCache } from '../util/lru-cache';
import { Caracter } from '../model/caracter.model';
import { CaracterPageMeta, CaracterPage, CaracterPageRequest } from '../model/caracter-page.model';

class RequestEntry {
    constructor(
        public meta: CaracterPageMeta,
        public ids: string[],
    ) { }
}

export class CaracterPageCache {

    private caracterCache = new LruCache<Caracter>(30);
    private requestCache = new LruCache<RequestEntry>(300);

    public getPage(key: string): CaracterPage {
        let page = null;
        const rqe = this.requestCache.get(key);
        label:
        if (rqe) {
            const cars = [];
            for (const id of rqe.ids) {
                const c = this.caracterCache.get(id);
                if (!c) {
                    break label;
                } else {
                    cars.push(c);
                }
            }
            page = {
                page: cars,
                meta: rqe.meta,
            }
        }
        return page;
    }

    public putPage(key: string, carPage: CaracterPage) {
        const cars = carPage.page;
        cars.forEach((car) => {
            this.caracterCache.put(car._id, car);
        });
        this.requestCache.put(key, {
            meta: carPage.meta,
            ids: cars.map((car) => car._id),
        });
    }

    public getCaracter(id:string) : Caracter {
        return this.caracterCache.get(id) || null;
    }

    public invalidate() {
        this.caracterCache.flush();
        this.requestCache.flush();
    }

}