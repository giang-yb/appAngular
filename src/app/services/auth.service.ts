export class AuthService {
    loggedIn: boolean = false;

    logIn() {
        this.loggedIn = true;
    }

    logOut() {
        this.loggedIn = false;
    }
    
    isAuthenticated() {
        return this.loggedIn;
    }
}