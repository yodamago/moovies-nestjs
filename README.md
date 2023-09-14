


## Swagger Test Tool

```
http://localhost:3000/documentation
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Implementation


While implementing, I thought of having 2 modules: genre and movies.

Genre has its own independent collection. However, when a movie is added, the entered genres also go through filters, and only non-existent genres are added to the genre database simultaneously.
When a genre is deleted, it is also removed from movies at the same time.

Another point I didn't consider when designing the system was time constraints, but it would have been better if it were like this.

When adding a movie, each genre could have been searched in the genre database, the IDs of existing genres obtained, and the non-existent ones added as ObjectId in the movies.genre array.

Added Exception for case of not found of genre from mongo id
Added class-validator for validating payload of dto
Added Middleware for request logging.

## Endpoints


### moovies

GET /moovies/list: paginated list of moovies
Query params : `limit, offset`

POST /moovies/add: it adds moovie 

    Body Payload: { "title": "string", "description": "string", "releaseDate": "2023-09-14T10:11:39.654Z", "genre": [ "comedy", "action" ] }

PATCH /moovies/{moovieId}/update : update existing moovie Id

    { "title": "string", "description": "string", "releaseDate": "2023-09-14T10:12:05.283Z", "genre": [ "comedy", "action" ] }

DELETE /moovies/{moovieId}/delete: deletes moovie

POST /moovies/search: paginated search

    Query Params : limit, offset 
    Body: { "title": "string", "genre": [ "history" ] }

### [](https://github.com/yodamago/moovies-nestjs/edit/master/README.md#genre)Genre

GET /genre/list: list of all added genres

POST /genre/add: add new genres
```json
{
  "name": "string"
}
```

DELETE /genre/delete: delete existing genres also deletes from moovies'
```json
{
  "name": "string"
}
```
