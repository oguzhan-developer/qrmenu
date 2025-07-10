// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    
    // Yönetim sayfalarını kontrol et
    if (pathname.startsWith('/yonetim')) {
        const authCookie = request.cookies.get('admin_auth');
        
        // Login sayfasındaysa
        if (pathname === '/yonetim/giris') {
            // Auth cookie varsa ana yönetim sayfasına yönlendir
            if (authCookie) {
                const redirectTo = request.nextUrl.searchParams.get('redirect') || '/yonetim';
                return NextResponse.redirect(new URL(redirectTo, request.url));
            }
            // Auth cookie yoksa login sayfasında kalabilir
            return NextResponse.next();
        }
        
        // Diğer yönetim sayfaları için auth kontrolü
        if (!authCookie) {
            const loginUrl = new URL('/yonetim/giris', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/yonetim/:path*']
};