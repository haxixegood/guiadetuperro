import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuiz } from "@/contexts/QuizContext";

declare global {
    interface Window {
        fbq: any;
    }
}

/**
 * PixelTracker v4 - Ultra Robusto
 * Monitora rotas e ETAPAS do quiz para garantir que nada seja perdido no funil.
 */
export default function PixelTracker() {
    const [location] = useLocation();
    const { currentStep } = useQuiz();

    useEffect(() => {
        if (typeof window.fbq !== 'function') {
            console.warn("[Meta Pixel] fbq ainda não disponível.");
            return;
        }

        const track = () => {
            // 1. Determina o caminho virtual (para o Meta ver como "páginas" diferentes)
            let virtualPath = location;

            // Se estiver na home (/), tratamos cada step do quiz como uma subpágina
            if (location === "/" || location === "") {
                virtualPath = `/quiz/etapa-${currentStep}`;
            }

            // 2. Dispara o PageView principal
            window.fbq("track", "PageView", {
                page_path: virtualPath
            });

            // 3. Evento customizado para cada etapa do Quiz
            window.fbq("trackCustom", "QuizStage", {
                step: currentStep,
                path: virtualPath
            });

            // 4. Lógica específica para Venda e Checkout
            // Verificamos tanto a URL quanto se o Step é de vendas (fallback)
            if (location === "/sales") {
                window.fbq("track", "ViewContent", { content_name: "Página de Vendas" });
                window.fbq("track", "InitiateCheckout");
            }

            // Se for a página de obrigado
            if (location === "/thank-you") {
                window.fbq("track", "Purchase", { value: 149.0, currency: "MXN" });
            }

            console.log(`[Meta Pixel] Rastreando: ${virtualPath} (Step: ${currentStep})`);
        };

        // Pequeno delay para garantir que o DOM atualizou
        const timer = setTimeout(track, 300);
        return () => clearTimeout(timer);
    }, [location, currentStep]);

    return null;
}
