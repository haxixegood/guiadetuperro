import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-primary w-8 h-8" />
      <h1 className="text-2xl font-bold">Página de Exemplo</h1>
      <p className="text-muted-foreground">O quiz está ativo no roteamento principal.</p>
      <Button variant="default" onClick={() => window.location.href = '/'}>Ir para o Quiz</Button>
    </div>
  );
}
