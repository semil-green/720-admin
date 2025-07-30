import { NextResponse } from 'next/server'
export function middleware(request) {
    const token = request.cookies.get('token')?.value;

    const protectedRoutes = [
        '/dashboard',
        '/orders',
        '/items',
        '/collections',
        '/categories',
        '/inventories',
        '/inward-items',
        '/order-request',
        '/store-orders',
        '/discount',
        '/customer',
        '/wallet-configuration',
        '/stores',
        '/packaging-stores',
        '/vendors',
        '/users',
        '/pincodeWiseSlot'
    ];

    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/orders/:path*', '/items/:path*', '/collections/:path*', '/categories/:path*', '/inventories/:path*', '/inward-items/:path*', '/order-request/:path*', '/store-orders/:path*', '/discount/:path*', '/customer/:path*', '/wallet-configuration/:path*', '/stores/:path*', '/packaging-stores/:path*', '/vendors/:path*', '/users/:path*', '/pincodeWiseSlot/:path*']
};
