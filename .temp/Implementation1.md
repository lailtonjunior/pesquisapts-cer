# Plano de Implementação: Atualização de Identidade Visual (Cores APAE)

## Objetivo
Atualizar o aspecto visual da aplicação para refletir a nova paleta de cores fornecida (Identidade APAE). A aplicação atualmente usa tons genéricos de cinza (`zinc`). Vamos aplicar as cores vibrantes propostas para modernizar e trazer aderência à marca.

## Cores Fornecidas
1. **Azul**: RGB(0, 60, 255) `->` HEX: `#003CFF`
2. **Verde**: RGB(0, 200, 0) `->` HEX: `#00C800`
3. **Vermelho**: RGB(255, 0, 0) `->` HEX: `#FF0000`
4. **Amarelo**: RGB(255, 200, 0) `->` HEX: `#FFC800`
5. **Vermelho Escuro**: RGB(135, 6, 6) `->` HEX: `#870606`

---

## Modificações Propostas

### 1. Inclusão das Cores no Tailwind (index.css)
Iremos registrar as novas cores oficiais diretamente no arquivo global para disponibilizá-las em todo o projeto.
```css
@theme {
  --color-apae-blue: #003CFF;
  --color-apae-green: #00C800;
  --color-apae-red: #FF0000;
  --color-apae-yellow: #FFC800;
  --color-apae-darkred: #870606;
}
```

### 2. Mapeamento de UI (Componentes e Telas)
Para garantir um layout "Premium" visivelmente agradável sem sobrecarregar a visão:
* **Ações Principais (Botões de Avançar, Seletores Ativos, Barra de Progresso):** Trocarão de `bg-zinc-900` para `bg-apae-blue`. Adicionaremos gradientes sutis ou brilhos modernos.
* **Ações de Sucesso (Botão de Gerar PDF, Finalizar PTS, Ícone de Sucesso):** Utilizarão o `apae-green`.
* **Avisos e Destaques (Toasts de aviso, alertas):** Utilizarão o `apae-yellow`.
* **Erros (Mensagens de validação de formulário, mensagens de erro):** Utilizarão o `apae-red`.
* **Textos Principais:** Manteremos um tom escuro neutro para legibilidade (ex: texto principal, bordas de input não focadas), porém os estados de foco (Focus) e ícones das seções receberão um toque do `apae-blue`.

> [!TIP]
> **Aestética Moderna**
> Não vamos apenas "pintar" tudo de azul e verde. Vamos empregar as cores em botões, destaques, barras de progresso e ícones para que a tela continue limpa (clean), mas com a identidade visual forte nos elementos interativos.

### 3. Execução Técnica
Como existem muitos arquivos (aproximadamente 25 componentes) utilizando as tags antigas (`zinc-900`, `zinc-500`), criarei um script automatizado (`refactor-colors.js`) que:
1. Altera classes de interação principal para `apae-blue`.
2. Altera a tela de Início (Dashboard / Step Selector) para usar um visual hero com botões nas cores oficiais.
3. Insere a paleta no `index.css`.

---

## 🙋 Perguntas em Aberto (Aguardando Aprovação)

> [!IMPORTANT]
> 1. Você está de acordo com o mapeamento das cores? (ex: Azul como cor primária em botões, Verde para sucesso/botão de salvar).
> 2. Posso seguir com a refatoração maciça via script para garantir que todas as telas sejam atualizadas de uma só vez?

Aguardando sua confirmação para executar essas mudanças.
