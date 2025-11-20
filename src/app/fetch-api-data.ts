import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moviefy-288671c73ad6.herokuapp.com/'

/**
 * UserRegistrationService handles all interactions with the backend API related to user accounts and movie data.
 * 
 * Provides methods for:
 *- User registration and login.
 *- Fetching movies, genres, and directors.
 *- Managing user favorites.
 *- Updating and deleting users.
*/
@Injectable({
  providedIn: 'root',
})

export class UserRegistrationService {

  /**
   * Creates an instance of UserRegistrationService, injecting the HttpClient module to the consturctor params.
   * Provides HttpClient to the entire class, making it available via this.http.
   * @param http Angular HttpClient for making HTTP requests.
  */
  constructor(private http: HttpClient) {
  }
  
  /**
   * API call for User registration, registering a new user with the backend.
   * @param userDetails Object containing Username, Password, Email, Birthday.
   * @returns Observable emitting the server response.
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${error.error}`);
        JSON.stringify(error.error, null, 2);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
 
  /**
   * API call to log in a user.
   * @param userDetails Object containing Username and Password.
   * @returns Observable emitting the server response with token and user info.
  */
  public userLogin(userDetails: any): Observable<any> {
    const payload = {
      Username: userDetails.Username,
      Password: userDetails.Password
    }
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', payload).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * API call to fetch all movies from the backend.
   * @returns Observable emitting an array of movies.
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies`, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
   * API call to fetch a single movie by title.
   * @param Title Movie title.
   * @returns Observable emitting the movie object.
  */
  getMovie(Title: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/${Title}`, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 
  /**
   * API call to fetch a single director by name.
   * @param directorName Director's name.
   * @returns Observable emitting the director object.
  */
  getDirector(directorName: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}directors/${directorName}`, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call to fetch a single genre by name.
   * @param genreName Genre name.
   * @returns Observable emitting the genre object.
  */
  getGenre(genreName: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}genres/${genreName}`, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call to fetch a single user by username.
   * @param username User's username.
   * @returns Observable emitting the user object.
  */
  getUser(username: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call to fetch a user's favorite movies.
   * @param username User's username.
   * @returns Observable emitting an array of movies.
  */
  getUserFavorites(username: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/${username}/movies`, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call to add a movie to a user's favorites.
   * @param username User's username.
   * @param movieID Movie ID.
   * @returns Observable emitting the updated favorites.
  */
  addFavorites(username: string, movieID: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      `${apiUrl}users/${username}/movies/${movieID}`, 
      {},
      {
        headers: new HttpHeaders ({
          Authorization: 'Bearer ' + token,
        }),
      }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call to remove a movie from the user's favorites.
   * @param username User's username.
   * @param movieID Movie ID.
   * @returns Observable emitting the updated favorites.
  */
  removeFavorites(username: string, movieID: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}/movies/${movieID}`, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call to update a user's account information.
   * @param username User's username.
   * @param updatedUser Object with updated user fields.
   * @returns Observable emitting the updated user object.
  */
  editUser(username: string, updatedUser: any): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}users/${username}`, updatedUser, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call to delete a user account.
   * @param username User's username.
   * @returns Observable emitting a success message.
  */
  deleteUser(username: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }
  
    /**
     * Extracts data from HTTP response.
     * @param res HTTP response.
     * @returns Response body or empty object.
    */
    private extractResponseData(res: any): any {
      const body = res;
      return body || { }; 
    }
}
