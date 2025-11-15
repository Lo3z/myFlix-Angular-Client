import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moviefy-288671c73ad6.herokuapp.com/'
@Injectable({
  providedIn: 'root',
})

export class UserRegistrationService {
 // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // API call for user registration
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
 
 // API call to log in
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

 // API call to get all movies
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
  
 // API call to get one movie
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
 
 // API call to get director
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

 // API call to get genre
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

 // API call to get user
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

 // API call to get favorite movies for a user
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

 // API call to add movie to favorites
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

 // API call to edit user info
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

 // API call to remove movie from favorites
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

 // API call to delete user
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
  
   // Non-typed response extraction
    private extractResponseData(res: any): any {
      const body = res;
      return body || { }; 
    }
}
