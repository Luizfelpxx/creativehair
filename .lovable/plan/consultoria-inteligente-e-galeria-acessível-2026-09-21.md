# Consultoria inteligente e galeria acessível

## Resultado
- Adicionar antes da vitrine uma consultoria curta com comprimento, gramatura, cor e objetivo de uso.
- Usar o catálogo e os preços atuais como fonte para a IA recomendar um único produto adequado.
- Mostrar a recomendação com produto, justificativa objetiva, resumo da escolha e link para encontrar o item na vitrine.
- Exibir erros claros e manter as escolhas preenchidas caso a recomendação não possa ser concluída.

## Galeria inicial
- Manter a troca automática atual, agora com miniaturas clicáveis das quatro fotos.
- Permitir arrastar horizontalmente com mouse ou dedo para avançar e voltar.
- Pausar a troca automática enquanto houver toque, arraste, foco ou ponteiro sobre a galeria; retomar depois da interação.
- Preservar setas, nome do modelo, progresso e adaptação para celular e computador.

## Acessibilidade
- Permitir navegação pelas teclas esquerda, direita, Home e End.
- Garantir foco visível nos botões, miniaturas e área interativa.
- Informar posição e nome da foto com rótulos acessíveis e anúncio discreto de mudanças manuais.
- Desativar troca automática e transições de movimento quando a pessoa preferir menos animação.

## Detalhes técnicos
- Fazer a recomendação no servidor com Lovable AI, mantendo credenciais e instruções fora do navegador.
- Validar as quatro respostas antes do envio e restringir a recomendação aos produtos existentes.
- Usar o modelo padrão `openai/gpt-6-astra` em resposta estruturada e manter o catálogo como contexto controlado.
- Não salvar dados pessoais nem criar conta: esta consultoria usa apenas as escolhas feitas no formulário.

## Verificação
- Testar recomendação válida, campos incompletos e erro do serviço.
- Conferir troca automática, clique em miniatura, setas, teclado, arraste e pausa.
- Conferir redução de movimento e visual em celular e computador.