# Telegram App - DocGo

Aplicação para envio de mensagens via Telegram Bot API.

## 🚀 Funcionalidades

- ✅ Envio de mensagens para chats e canais do Telegram
- ✅ Suporte a formatação HTML e Markdown
- ✅ Resposta a mensagens específicas
- ✅ Controle de notificações
- ✅ Preview de links configurável
- ✅ Validação de parâmetros
- ✅ Tratamento de erros
- ✅ Integração com DocGo SDK

## 📋 Funções Disponíveis

### `enviarMensagem`

Envia uma mensagem via Telegram.

**Parâmetros:**

- `chatId` (obrigatório): ID do chat ou canal (ex: @canal_publico ou -1001234567890)
- `mensagem` (obrigatório): Texto da mensagem
- `parseMode` (opcional): Modo de formatação (HTML, Markdown, MarkdownV2)
- `replyToMessageId` (opcional): ID da mensagem para responder
- `disableWebPagePreview` (opcional): Desabilitar preview de links
- `disableNotification` (opcional): Enviar mensagem silenciosamente

## ⚙️ Configuração

### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente:

```bash
# Token do Bot do Telegram (obrigatório)
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

# URL base da API do Telegram (opcional, padrão: https://api.telegram.org)
TELEGRAM_BASE_URL=https://api.telegram.org
```

### Como Obter o Token do Bot

1. Abra o Telegram e procure por [@BotFather](https://t.me/botfather)
2. Inicie uma conversa e envie `/newbot`
3. Siga as instruções para criar seu bot
4. Copie o token fornecido pelo BotFather
5. Configure as permissões necessárias com `/setprivacy` e `/setjoingroups`

## 🏗️ Build

```bash
# Build do projeto
./build.sh

# Ou manualmente
npm install
npx tsc
```

## 📝 Exemplo de Uso

```typescript
import enviarMensagem from "./dist/enviarMensagem.js";

// Enviar mensagem simples
await enviarMensagem({
  chatId: "@meu_canal",
  mensagem: "Olá pessoal! 👋",
});

// Enviar mensagem formatada
await enviarMensagem({
  chatId: "-1001234567890",
  mensagem: "<b>Mensagem em negrito</b>\n<i>Texto em itálico</i>",
  parseMode: "HTML",
});

// Responder a uma mensagem específica
await enviarMensagem({
  chatId: "@meu_canal",
  mensagem: "Esta é uma resposta",
  replyToMessageId: 123,
});

// Enviar mensagem silenciosa
await enviarMensagem({
  chatId: "@meu_canal",
  mensagem: "Mensagem silenciosa",
  disableNotification: true,
});
```

## 🔧 Estrutura do Projeto

```
telegram/
├── src/
│   └── enviarMensagem.ts    # Função principal
├── dist/                    # Arquivos compilados
├── manifest.json           # Configuração do app
├── package.json           # Dependências
├── tsconfig.json          # Configuração TypeScript
├── build.sh              # Script de build
└── README.md             # Documentação
```

## 📊 Resposta da API

A função retorna:

```json
{
  "sucesso": true,
  "chatId": "@meu_canal",
  "mensagem": "Olá pessoal! 👋",
  "messageId": 123,
  "date": 1640995200,
  "from": {
    "id": 123456789,
    "isBot": true,
    "firstName": "Meu Bot",
    "username": "meu_bot"
  },
  "chat": {
    "id": -1001234567890,
    "type": "channel",
    "title": "Meu Canal",
    "username": "meu_canal"
  },
  "telegramResponse": {
    "ok": true,
    "result": { ... }
  }
}
```

## 🚨 Tratamento de Erros

A função trata os seguintes erros:

- **Token não configurado**: Verifica se `TELEGRAM_BOT_TOKEN` está definido
- **Parâmetros obrigatórios**: Valida chatId e mensagem
- **Erros HTTP**: Trata falhas de conexão
- **Erros da API Telegram**: Trata erros específicos do Telegram

## 📱 Tipos de Chat Suportados

### Chat ID Formatos

- **Chat privado**: `123456789` (número do usuário)
- **Grupo**: `-123456789` (ID negativo do grupo)
- **Canal público**: `@nome_do_canal` (username do canal)
- **Canal privado**: `-1001234567890` (ID do canal)

### Como Descobrir o Chat ID

1. **Para canais públicos**: Use o username com @ (ex: @meu_canal)
2. **Para grupos/canais privados**:
   - Adicione o bot ao grupo/canal
   - Envie uma mensagem no grupo
   - Use a API `getUpdates` para ver o chat_id
3. **Para chats privados**: Use o número do usuário

## 🎨 Formatação de Mensagens

### HTML

```html
<b>negrito</b>
<i>itálico</i>
<u>sublinhado</u>
<s>riscado</s>
<code>código</code>
<pre>bloco de código</pre>
<a href="https://example.com">link</a>
```

### Markdown

````markdown
**negrito**
_itálico_
**sublinhado**
~~riscado~~
`código`
`bloco de código`
[link](https://example.com)
````

### MarkdownV2

````markdown
_bold text_
_italic text_
**underline**
~strikethrough~
`code`
`code block`
[inline URL](https://example.com)
````

## 📚 Documentação da API Telegram

- [sendMessage](https://core.telegram.org/bots/api#sendmessage)
- [Bot API](https://core.telegram.org/bots/api)
- [BotFather](https://t.me/botfather)
- [Formatação](https://core.telegram.org/bots/api#formatting-options)
