import { PageMeta, Caracter, Group, Page } from "../model";
import { LruCache } from '../util/lru-cache';
import { Injectable } from '@angular/core';

class PageEntry {
    constructor(
        public meta: PageMeta,
        public ids: string[],
    ) { }
}

class GroupEntry {
    constructor(
        public _id: string,
        public name: string,
        public memberIds: string[],
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class DataCacheService {

    private caracters = new LruCache<Caracter>(30);
    private groups = new LruCache<GroupEntry>(100);
    private caracterPages = new LruCache<PageEntry>(300);
    private groupPages = new LruCache<PageEntry>(300);

    public getCaracter(id: string) {
        return this.caracters.get(id) || null;
    }

    public putCaracter(car: Caracter): void {
        this.caracters.set(car._id, car);
    }

    public deleteCaracter(id: string): void {
        this.caracters.delete(id);
        this.caracterPages.clear();
    }

    public getCaracterPage(key: string): Page<Caracter> {
        let page: Page<Caracter> = null;
        let pageEntry = this.caracterPages.get(key);
        if (pageEntry) {
            const caracters = this.getCaracters(pageEntry.ids);
            if (caracters) {
                page = {
                    page: caracters,
                    meta: pageEntry.meta,
                }
            }
        }
        return page;
    }

    public putCaracterPage(key: string, page: Page<Caracter>) {
        const cars = page.page;
        cars.forEach((car) => {
            this.caracters.set(car._id, car);
        });
        this.caracterPages.set(key, {
            meta: page.meta,
            ids: cars.map(car => car._id),
        });
    }

    public getGroup(id: string): Group {
        let group: Group = null;
        const groupEntry = this.groups.get(id);
        if (groupEntry) {
            const cars = this.getCaracters(groupEntry.memberIds);
            if (cars) {
                group = {
                    _id: groupEntry._id,
                    name: groupEntry.name,
                    members: cars,
                }
            }
        }
        return group;
    }

    public putGroup(g: Group) {
        const cars = g.members;
        cars.forEach(c => {
            this.caracters.set(c._id, c);
        });
        this.groups.set(g._id, {
            _id: g._id,
            name: g.name,
            memberIds: cars.map(c => c._id),
        });
    }

    public savedGroup(g:Group):void{
        this.putGroup(g);
        this.groupPages.clear();
    }

    public deleteGroup(id: string): void {
        this.groups.delete(id);
        this.groupPages.clear();
    }

    public getGroupPage(key: string): Page<Group> {
        let page: Page<Group> = null;
        let pageEntry = this.groupPages.get(key);
        if (pageEntry) {
            const groups = this.getGroups(pageEntry.ids);
            if (groups) {
                page = {
                    page: groups,
                    meta: pageEntry.meta,
                }
            }
        }
        return page;
    }

    public putGroupPage(key: string, page: Page<Group>) {
        const groups = page.page;
        groups.forEach(g => {
            this.putGroup(g);
        });
        this.groupPages.set(key, {
            meta: page.meta,
            ids: groups.map(g => g._id),
        })
    }

    public invalidate() :void{
        this.caracters.clear();
        this.caracterPages.clear();
    }

    private getCaracters(ids: string[]): Caracter[] {
        let caracters = [];
        for (const id of ids) {
            const c = this.getCaracter(id);
            if (c) {
                caracters.push(c);
            } else {
                caracters = null;
                break;
            }
        }
        return caracters;
    }

    private getGroups(ids: string[]): Group[] {
        let groups = [];
        for (const id of ids) {
            const g = this.getGroup(id);
            if (g) {
                groups.push(g);
            } else {
                groups = null;
                break;
            }
        }
        return groups;
    }

}

