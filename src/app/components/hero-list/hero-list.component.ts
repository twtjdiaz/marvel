import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private heroService: HeroService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes(): void {
    this.heroService.getAllHeroes().subscribe((heroes: Hero[]) => {
      this.heroService.heroes = heroes;
      this.dataSource = new MatTableDataSource(this.heroService.heroes);
      this.dataSource.filterPredicate = (data, filter: string): boolean => {
        return data.name.toLowerCase().includes(filter);
      };
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogDelete(id: number): void {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      this.delete(id);
    });
  }

  delete(id: number): void {
    this.heroService.deleteHero(id).subscribe(() => {
      this.getAllHeroes();
    });
  }

}
