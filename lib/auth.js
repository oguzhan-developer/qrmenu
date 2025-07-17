import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AUTH_COOKIE_NAME = 'admin_auth';
const AUTH_DURATION = 20 * 60 * 1000; // 20 dakika

export async function setAuthCookie() {
    const cookieStore = await cookies();
    const expiresAt = new Date(Date.now() + AUTH_DURATION);
    
    cookieStore.set(AUTH_COOKIE_NAME, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: expiresAt,
        path: '/'
    });
}

export async function getAuthCookie() {
    const cookieStore = await cookies();
    return cookieStore.get(AUTH_COOKIE_NAME);
}

export async function removeAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function isAuthenticated() {
    const authCookie = await getAuthCookie();
    return !!authCookie?.value;
}

export async function requireAuth(redirectTo = '/yonetim/login') {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        redirect(redirectTo);
    }
}