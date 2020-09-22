# Mgid

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Modify and update rating component

1. Modify rating library (`projects/star-rating`).
2. Run `npm run rating:build` to rebuild the library.
3. Run `npm run rating:pack` to package (if you need) all files of rating module to single archive (`dist/rating/rating-0.0.1.tgz`).

## Options

1. `starsQuantity: number` (default 5)
2. `color: ThemePalette` from Angular Material (default 'primary')
3. `size: number` (default 25)
4. `value: number` (if not use FormControl)
5. `label: boolean` (default false)
6. `labelSize: number` (default 20)
7. `labelPosition: 'before' || 'after'` (default 'before')
8. `emptyIcon: string` from Material Icon (default 'star_border')
9. `halfIcon: string` from Material Icon (default 'star_half')
10. `fullIcon: string` from Material Icon (default 'star')
11. `static: boolean` (default true)
