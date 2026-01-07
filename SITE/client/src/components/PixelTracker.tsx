import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useQuiz } from "@/contexts/QuizContext";

declare global {
    interface Window {
        fbq: any;
    }
}

/**
 * PixelTracker v3 - Rastreio robusto de rotas e etapas internas.
 * Envia "Virtual PageViews" para que cada etapa do quiz apareça como uma página no Meta.
 */
export default function PixelTracker() {
    const [location] = useLocation();
    const { currentStep } = useQuiz();

    // Usamos ref para evitar loops infinitos ou disparos duplicados desnecessários
    const lastTracked = useRef<string>("");

    useEffect(() => {
        const track = () => {
            if (typeof window.fbq !== 'function') {
                console.warn("[Meta Pixel] fbq não encontrado. Verifique se o script no index.html está correto.");
                return;
            }

            // Definimos um "caminho virtual" para que o Meta trate cada etapa como uma página
            let virtualPath = location;
            if (location === "/" || location === "") {
                virtualPath = `/quiz/step-${currentStep}`;
            }

            // Evita disparar exatamente a mesma coisa duas vezes seguidas no mesmo render
            const trackKey = `${virtualPath}`;
            if (lastTracked.current === trackKey) return;
            lastTracked.current = trackKey;

            // 1. Dispara o PageView Padrão, mas com a URL virtual
            window.fbq("track", "PageView", {
                page_path: virtualPath
            });

            // 2. Dispara eventos específicos baseados na localização
            if (virtualPath.includes("/quiz/step-")) {
                window.fbq("trackCustom", "QuizStage", {
                    step: currentStep,
                    path: virtualPath
                });
            }

            if (location === "/sales") {
                // Quando chega na página de vendas, é um evento de visualização importante
                window.fbq("track", "ViewContent", {
                    content_name: "Sales Page",
                    content_category: "Quiz Funnel"
                });
                // Também disparar InitiateCheckout como é comum em funis de venda direta
                window.fbq("track", "InitiateCheckout");
            }

            if (location === "/thank-you") {
                window.fbq("track", "Purchase", {
                    value: 149.00,
                    currency: "MXN"
                });
            }

            console.log(`[Meta Pixel] Rastreio concluído: ${virtualPath}`);
        };

        // Pequeno delay para garantir que o roteador e o estado do Quiz estão sincronizados
        const timer = setTimeout(track, 600);
        return () => clearTimeout(timer);
    }, [location, currentStep]);

    return null;
}
