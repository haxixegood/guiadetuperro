import { useEffect } from "react";
import { useLocation } from "wouter";

// Declaração para evitar erros de tipo com o código global do Facebook Pixel
declare global {
    interface Window {
        fbq: any;
    }
}

/**
 * Componente que monitora mudanças de rota e dispara o evento PageView do Meta Pixel.
 * Deve ser incluído dentro do roteador da aplicação.
 */
export default function PixelTracker() {
    const [location] = useLocation();

    useEffect(() => {
        if (window.fbq) {
            // Pequeno atraso para garantir que o título da página/conteúdo foi atualizado
            const timer = setTimeout(() => {
                window.fbq("track", "PageView");
                console.log(`[Meta Pixel] PageView tracked for: ${location}`);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [location]);

    return null; // Este componente não renderiza nada visualmente
}
