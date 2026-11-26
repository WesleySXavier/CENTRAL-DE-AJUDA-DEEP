# Central de Ajuda DEEP

Base de conhecimento interativa desenvolvida para a equipe de backoffice e operações de campo (projeto **Censo Rural SABESP**), organizando regras de auditoria, critérios de aprovação/reprovação de visitas e padrões de preenchimento por categorias.

## Funcionalidades

- **Navegação Hierárquica:** Organização em 8 categorias principais, subcategorias colapsáveis e tópicos detalhados com persistência de estado via `localStorage`.
- **Busca em Tempo Real:** Filtro instantâneo por palavras-chave com destaque visual (`<mark>`) nos títulos e descrições.
- **Controle e Monitoramento de Acesso:** Tela de identificação inicial com registro diário de visitas integrado ao **Supabase** (com fallback local).
- **Painel Administrativo e Dashboard:** Acesso restrito para consulta de métricas de visitantes únicos, total de acessos, ranking de usuários mais ativos no mês e histórico filtrável por período (*Hoje*, *Ontem*, *Últimos 7 dias*, *Este Mês*).

## Estrutura do Projeto

```text
central-de-ajuda-deep/
├── index.html          # Estrutura da interface, modais de acesso, login admin e dashboard
├── style.css           # Estilização completa (tema escuro, responsividade e componentes)
├── app.js              # Base de conhecimento, motor de busca, estado da UI e integração Supabase
├── img/
│   └── logo.png        # Identidade visual exibida no cabeçalho
├── docs/
│   └── ARQUITETURA.md  # Detalhamento técnico do fluxo de dados e tabelas
└── .gitignore          # Arquivos ignorados pelo controle de versão

## Licença e Direitos Autorais
Todos os direitos reservados. Este projeto possui uso restrito e não é autorizado copiar, modificar, distribuir, sublicenciar ou utilizar este código-fonte e sua documentação sem permissão expressa do autor/organização responsável.