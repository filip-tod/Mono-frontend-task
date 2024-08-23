import { makeObservable, observable, action, runInAction } from 'mobx';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { app } from '../services/firebaseConfig';

class AuthStore {
    user: User | null = null;
    loading: boolean = true;
    authError: string | null = null;
    private auth = getAuth(app);

    constructor() {
        makeObservable(this, {
            user: observable,
            loading: observable,
            authError: observable,
            login: action,
            register: action,
            logout: action,
            setUser: action,
            setLoading: action,
            setAuthError: action,
        });

        this.init();
    }

    private init() {
        onAuthStateChanged(this.auth, (user) => {
            runInAction(() => {
                this.user = user;
                this.loading = false;
            });
        });
    }

    setUser(user: User | null) {
        this.user = user;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setAuthError(error: string | null) {
        this.authError = error;
    }

    async login(email: string, password: string) {
        this.setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            runInAction(() => {
                this.setUser(userCredential.user);
                this.setAuthError(null);
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.setAuthError(error.message);
                });
            } else {
                runInAction(() => {
                    this.setAuthError("An unknown error occurred.");
                });
            }
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    }

    async register(email: string, password: string) {
        this.setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            runInAction(() => {
                this.setUser(userCredential.user);
                this.setAuthError(null);
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.setAuthError(error.message);
                });
            } else {
                runInAction(() => {
                    this.setAuthError("An unknown error occurred.");
                });
            }
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    }

    async logout() {
        this.setLoading(true);
        try {
            await signOut(this.auth);
            runInAction(() => {
                this.setUser(null);
                this.setAuthError(null);
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.setAuthError(error.message);
                });
            } else {
                runInAction(() => {
                    this.setAuthError("An unknown error occurred.");
                });
            }
        } finally {
            this.setLoading(false);
        }
    }
}

const authStore = new AuthStore();
export default authStore;
