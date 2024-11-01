import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Ignorar arquivos internos do Next.js e arquivos estáticos
    '/((?!_next|static|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executar para rotas API
    '/api(.*)',
    '/trpc(.*)', // Inclua isso se estiver usando TRPC
  ],
};
