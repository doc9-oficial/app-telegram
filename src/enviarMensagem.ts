import docgo from "docgo-sdk";

interface EnviarMensagemParams {
  chatId: string;
  mensagem: string;
  parseMode?: "HTML" | "Markdown" | "MarkdownV2";
  replyToMessageId?: number; // Para responder a uma mensagem específica
  disableWebPagePreview?: boolean;
  disableNotification?: boolean;
}

async function enviarMensagemTelegram(
  params: EnviarMensagemParams
): Promise<any> {
  const token = docgo.getEnv("TELEGRAM_BOT_TOKEN") || docgo.getEnv("botToken");
  if (!token) {
    throw new Error(
      "Token do Telegram não configurado. Configure a variável TELEGRAM_BOT_TOKEN"
    );
  }

  const baseUrl =
    docgo.getEnv("TELEGRAM_BASE_URL") || "https://api.telegram.org";

  const url = `${baseUrl}/bot${token}/sendMessage`;

  const payload: any = {
    chat_id: params.chatId,
    text: params.mensagem,
  };

  // Adicionar parâmetros opcionais se fornecidos
  if (params.parseMode) {
    payload.parse_mode = params.parseMode;
  }

  if (params.replyToMessageId) {
    payload.reply_to_message_id = params.replyToMessageId;
  }

  if (params.disableWebPagePreview !== undefined) {
    payload.disable_web_page_preview = params.disableWebPagePreview;
  }

  if (params.disableNotification !== undefined) {
    payload.disable_notification = params.disableNotification;
  }

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Falha HTTP ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.ok) {
    throw new Error(`Erro do Telegram: ${result.description}`);
  }

  return result;
}

async function enviarMensagem(params: EnviarMensagemParams): Promise<void> {
  try {
    if (Array.isArray(params) && params.length === 1 && typeof params[0] === 'object') {
      params = params[0];
    }
    // Validar parâmetros obrigatórios
    if (!params.chatId) {
      console.log(docgo.result(false, null, "É necessário informar o chat_id"));
      return;
    }

    if (!params.mensagem) {
      console.log(
        docgo.result(false, null, "É necessário informar a mensagem")
      );
      return;
    }

    // Enviar mensagem para o Telegram
    const resultado = await enviarMensagemTelegram(params);

    const resposta = {
      sucesso: true,
      chatId: params.chatId,
      mensagem: params.mensagem,
      messageId: resultado.result.message_id,
      date: resultado.result.date,
      from: {
        id: resultado.result.from.id,
        isBot: resultado.result.from.is_bot,
        firstName: resultado.result.from.first_name,
        username: resultado.result.from.username,
      },
      chat: {
        id: resultado.result.chat.id,
        type: resultado.result.chat.type,
        title: resultado.result.chat.title,
        username: resultado.result.chat.username,
      },
      telegramResponse: resultado,
    };

    console.log(docgo.result(true, resposta));
  } catch (error: any) {
    console.log(docgo.result(false, null, error.message));
  }
}

export default enviarMensagem;
