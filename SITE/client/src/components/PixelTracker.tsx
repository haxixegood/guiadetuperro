import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuiz } from "@/contexts/QuizContext";

declare global {
    interface Window {
        fbq: any;
    }
}

/**
 * Componente que monitora mudanças de rota e etapas do quiz,
 * disparando o evento PageView do Meta Pixel a cada mudança.
 */
export default function PixelTracker() {
    const [location] = useLocation();
    const { currentStep } = useQuiz();

    useEffect(() => {
        // Função para disparar o rastreio
        const trackEvent = () => {
            if (typeof window.fbq === 'function') {
                // Dispara PageView padrão
                window.fbq("track", "PageView");

                // Dispara um evento customizado com o nome do passo para maior precisão no Meta
                window.fbq("trackCustom", "QuizStage", {
                    stage_index: currentStep,
                    url_path: location
                });

                console.log(`[Meta Pixel] Evento disparado: ${location} (Etapa: ${currentStep})`);
            } else {
                console.warn("[Meta Pixel] Script ainda não carregado ou bloqueado.");
            }
        };

        // Pequeno delay para garantir que o conteúdo da nova etapa foi renderizado
        const timer = setTimeout(trackEvent, 500);

        return () => clearTimeout(timer);
    }, [location, currentStep]);

    return null;
}
