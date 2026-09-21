# Contato, WhatsApp e lista de solicitações

## Resultado
- Após a recomendação, abrir o WhatsApp com comprimento, gramatura, cor, objetivo e produto indicado já preenchidos.
- Criar uma página pública de contato com nome, e-mail, comprimento, gramatura e objetivo; ao enviar, registrar a solicitação, encaminhá-la por e-mail e abrir o WhatsApp com os mesmos dados.
- Criar uma área privada para visualizar, em ordem cronológica, solicitações da consultoria e do contato.

## Segurança e acesso
- Manter a lista invisível ao público e acessível somente após login administrativo.
- O primeiro acesso administrativo será feito com e-mail/senha ou Google; a lista exige sessão válida no servidor.
- O formulário público pode somente adicionar solicitações; não pode ler, alterar ou excluir dados.

## Detalhes técnicos
- Usar a tabela privada de solicitações já criada no Lovable Cloud, com políticas restritas.
- Enviar e-mails pelo Gmail conectado, somente no servidor, para o e-mail comercial configurado.
- Validar todos os campos antes de salvar e enviar; se o e-mail falhar, manter a solicitação salva e mostrar uma mensagem clara.
- Criar rotas `/contato`, `/auth` e `/solicitacoes`, com metadados próprios e navegação integrada.
- Testar consultoria, formulário, WhatsApp, login, lista, celular e computador.
