import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ListausuariosItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ListausuariosItem[] = [
  {id: 1, name: 'Ivana'},
  {id: 2, name: 'João'},
  {id: 3, name: 'Renan'},
  {id: 4, name: 'Renato'},
  {id: 5, name: 'Marisa'},
  {id: 6, name: 'Vivi'},
  {id: 7, name: 'Pedro Henrique'},
  {id: 8, name: 'Luiz'},
  {id: 9, name: 'Matheus'},
  {id: 10, name: 'Zé Neon'},
  {id: 11, name: 'Maria Sodium'},
  {id: 12, name: 'Zé Magnesium'},
  {id: 13, name: 'Maria Aluminum'},
  {id: 14, name: 'Zé Silicon'},
  {id: 15, name: 'Maria Phosphorus'},
  {id: 16, name: 'Zé Sulfur'},
  {id: 17, name: 'maria Chlorine'},
  {id: 18, name: 'Zé Argon'},
  {id: 19, name: 'Maria Potassium'},
  {id: 20, name: 'Zé Calcium'},
];

/**
 * Data source for the Listausuarios view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListausuariosDataSource extends DataSource<ListausuariosItem> {
  data: ListausuariosItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListausuariosItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListausuariosItem[]): ListausuariosItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListausuariosItem[]): ListausuariosItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
