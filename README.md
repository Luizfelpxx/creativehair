# Creative Hair Showcase

Crie um site institucional/vitrine profissional para a "Creative Hair", uma marca que vende extensões e mega hair 100% humano, de doadora única, brasileiros e sem mistura de origens, com foco em qualidade premium. Vende tanto no varejo (consumidor final) quanto no atacado (profissionais de cabelo/salões), além de oferecer serviços de confecção sob encomenda.

IDENTIDADE VISUAL:

- Paleta de cores: tons neutros, nude e pastéis (ex: bege, off-white, nude rosado, marrom claro suave, dourado fosco como cor de destaque/detalhe)
- Estilo visual: elegante, sofisticado, "clean luxury" — muito espaço em branco, tipografia serifada ou serifada+sans combinadas para transmitir premium, fotos grandes de alta qualidade dos cabelos
- Use como referência de layout/estilo o site: https://www.luxuryextensions.com.br/ (mesma sensação de loja de beleza premium)
- Logo da marca será fornecida por mim — deixe um espaço de destaque no header e no footer para ela
- Design responsivo, mobile-first, com boa experiência em celular (maior parte do público deve acessar por lá)
- Microanimações discretas ao rolar (fade in / slide up), transições suaves

ESTRUTURA DO SITE:

1. Header fixo com logo, menu (Início, Produtos, Serviços, Atacado, Sobre, Contato) e ícone de carrinho

2. Hero section com imagem de destaque (cabelo humano premium), headline forte tipo "Cabelo 100% humano, de doadora única" e CTA "Ver Produtos"

3. Seção "Sobre a Creative Hair" com o texto: cabelos 100% humanos, de doadora única, 100% brasileiros, sem mistura de origens, qualidade premium, atendendo varejo e atacado

4. Seção de produtos em grid (catálogo), com:
   - Cabelo Brasileiro Castanho
   - Cabelo Brasileiro Loiro Mesclado
   - Cabelo Brasileiro Loiro Escuro
   - Cabelo Brasileiro Moreno Iluminado
   - Cabelo Brasileiro Cacheado
     Cada produto deve ter: foto, nome, descrição curta, e um seletor de tamanho com as opções: 45cm, 50cm, 55cm, 60cm, 65cm, 70cm, 75cm, 80cm, 85cm, 90cm (o preço pode variar por tamanho e por cor — deixe um campo de preço editável por tamanho, mesmo que eu preencha com valores fictícios por enquanto, pois a tabela real ainda será enviada pela cliente)
     Cada card também deve ter um botão secundário "Perguntar sobre este produto" (ícone de WhatsApp)

5. Seção "Serviços de Confecção" (separada do catálogo de produtos, com identidade visual própria dentro do mesmo estilo do site):
   - Título: "Confecção Personalizada"
   - Subtítulo: "Serviços sob encomenda para um acabamento perfeito"
   - Card 1: "Nano Slim" — confecção de mega hair no método nano slim, com descrição curta sobre o acabamento discreto e durabilidade
   - Card 2: "Topo de Cabelo Tic Tac" — confecção de topo de cabelo no método tic tac, com descrição curta sobre naturalidade e praticidade
   - Cada card com botão "Solicitar orçamento" (WhatsApp)
   - Como são serviços sob encomenda, NÃO entram no carrinho — o CTA vai direto para o WhatsApp com mensagem de orçamento

6. Seção "Atacado" destacando que atende profissionais/salões, com CTA "Solicitar tabela de atacado" (via WhatsApp)

7. Seção de diferenciais (ex: qualidade premium, doadora única, 100% brasileiro, sem mistura de origens, pagamento facilitado via Pix)

8. Rodapé com logo, e-mail comercial (eloandradede@gmail.com), forma de pagamento aceita (Pix) e créditos

FUNCIONALIDADE DE CARRINHO:

- Ícone de carrinho fixo no header mostrando quantidade de itens
- Ao adicionar um produto, é obrigatório selecionar o tamanho e a cor antes de confirmar
- Carrinho em drawer lateral, editável (aumentar/diminuir quantidade, trocar tamanho, trocar cor, remover item)
- Subtotal atualizado em tempo real
- Serviços de confecção (Nano Slim, Tic Tac) NÃO entram no carrinho, pois são sob orçamento

CHECKOUT VIA WHATSAPP (MUITO IMPORTANTE):

- NÃO implementar checkout/pagamento dentro do site
- Botão final do carrinho: "Finalizar Pedido pelo WhatsApp"
- Ao clicar, montar automaticamente uma mensagem de texto pré-formatada, como se fosse a própria cliente final falando, listando cada produto do carrinho com nome, tamanho, quantidade e preço, e o valor total. Exemplo:
  "Olá! Gostaria de finalizar meu pedido na Creative Hair:
  - Cabelo Brasileiro Loiro Mesclado, 60cm x1 - R$[Preço]
  - Cabelo Brasileiro Cacheado, 50cm x1 - R$[Preço]
  Total: R$[Total]
    Vocês aceitam Pix? Podem confirmar disponibilidade e prazo de entrega?"
- Redirecionar para: https://wa.me/[+5521999057833]?text=[MENSAGEM_CODIFICADA_EM_URL]
- Usar encodeURIComponent (ou equivalente) para montar a URL corretamente com quebras de linha e acentos
- Deixar o número de WhatsApp como uma constante única no início do código (ex: const WHATSAPP_NUMBER = "+5521999057833"), fácil de eu substituir depois em um único lugar

BOTÃO DE WHATSAPP EM CADA PRODUTO:

- Ao clicar em "Perguntar sobre este produto", abrir o WhatsApp com mensagem pré-formatada específica, como se fosse a cliente final perguntando. Exemplo:
  "Olá! Vi o [Nome do Produto] no site da Creative Hair e queria saber mais informações sobre tamanhos e preços. Vocês têm disponível?"

BOTÃO DE SERVIÇOS (NANO SLIM / TIC TAC):

- Ao clicar em "Solicitar orçamento" em um dos cards de serviço, gerar mensagem própria para WhatsApp, exemplo:
  "Olá! Gostaria de solicitar um orçamento para o serviço de [Nome do Serviço] da Creative Hair."

BOTÃO DE ATACADO:

- No CTA "Solicitar tabela de atacado", gerar mensagem própria para WhatsApp:
  "Olá! Sou profissional/salão e gostaria de solicitar a tabela de preços de atacado da Creative Hair."

REQUISITOS TÉCNICOS:

- Código limpo, organizado em componentes separados (Header, Hero, About, ProductCard, ServiceCard, Wholesale, Cart, Footer etc.), fácil de eu editar manualmente depois
- Sem dependências desnecessárias
- Otimizado para carregamento rápido de imagens
- SEO básico configurado (title, meta description, alt em imagens)

````

---

## Pendências antes de rodar
- **Preços**: a cliente ainda vai enviar a tabela por tamanho. Use placeholders (ex: "R$ 000") por enquanto.
- **Fotos dos produtos**: se ainda não tiver imagens reais, o Lovable vai gerar placeholders que você troca depois.
- **Logo**: você vai subir manualmente depois de gerado o site.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://creativehair.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/30167b4a-3576-44fe-9d30-07cef89b5d02).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
````
