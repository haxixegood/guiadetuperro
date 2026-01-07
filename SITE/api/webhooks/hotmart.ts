/**
 * Vercel Serverless Function para o Webhook da Hotmart.
 * Este arquivo substitui a rota do Express para funcionar nativamente na Vercel.
 */
export default function handler(req: any, res: any) {
    // Se for GET (navegador), mostramos uma mensagem amigável em vez de 404
    if (req.method === 'GET') {
        return res.status(200).json({
            status: "Ativo",
            message: "Este é o endpoint para o Webhook da Hotmart. Para testar, use o botão 'Envio de Teste' no painel da Hotmart.",
            endpoint: "POST /api/webhooks/hotmart"
        });
    }

    // A Hotmart envia os dados via POST
    if (req.method === 'POST') {
        const data = req.body;
        console.log(`[Hotmart Webhook] Recebido! Evento: ${data.event}`);

        // Aqui você pode processar os dados (venda aprovada, boleto, etc)
        // Por enquanto, apenas confirmamos o recebimento
        return res.status(200).send("OK");
    }

    // Outros métodos não são permitidos
    return res.status(405).send("Method Not Allowed");
}
