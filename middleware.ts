import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Vérifie si l'URL commence par /_next/static
    if (url.pathname.startsWith('/_next/static')) {
        // Permet de continuer sans traitement côté serveur
        // return NextResponse.next();
        return new Response(null, { status: 404 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*', // Applique le middleware à toutes les routes
};