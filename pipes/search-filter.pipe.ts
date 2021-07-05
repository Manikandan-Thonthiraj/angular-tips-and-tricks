import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchFilter'
})

/**
 *  | searchFilter : 'Key Name' : searchText Value
 */

@Injectable()
export class SearchFilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) return [];
        if (!value || value == '') return items;
        return items.filter(function(item) {
            return item[field].match(new RegExp(value, 'gi')) && item[field].match(new RegExp(value, 'gi')).length;
        });
    }
}
