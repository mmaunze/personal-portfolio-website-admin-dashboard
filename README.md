# Dashboard de Administração - Blog

## Visão Geral

O Dashboard de Administração é uma interface web moderna e responsiva desenvolvida em React para gerir o blog pessoal. O dashboard oferece uma experiência de utilizador intuitiva com suporte completo a dark mode e funcionalidades avançadas de gestão de conteúdo.

## Características Principais

### Interface Moderna e Responsiva
- Design limpo e profissional usando Tailwind CSS
- Totalmente responsivo para desktop, tablet e mobile
- Componentes UI de alta qualidade com shadcn/ui
- Ícones consistentes com Lucide React

### Suporte a Dark Mode
- Alternância automática entre modo claro e escuro
- Persistência da preferência do utilizador
- Detecção automática da preferência do sistema
- Transições suaves entre temas

### Menu Lateral Inteligente
- Navegação intuitiva com ícones e labels
- Modo colapsado para economizar espaço
- Indicador visual da página ativa
- Menu mobile com overlay

### Gestão Completa de Posts
- **Listagem**: Tabela com filtros, pesquisa e paginação
- **Criação**: Formulário completo com validação
- **Edição**: Edição inline de posts existentes
- **Eliminação**: Confirmação de segurança
- **Editor WYSIWYG**: TinyMCE com funcionalidades avançadas
- **Categorias e Tags**: Gestão organizada de metadados
- **Estados**: Rascunho, Publicado, Arquivado
- **Imagens**: Upload e redimensionamento automático

### Sistema de Upload de Ficheiros
- **Drag & Drop**: Interface intuitiva de arrastar e soltar
- **Múltiplos Formatos**: Suporte a documentos, imagens, vídeos, áudio
- **Validação**: Verificação de tipo e tamanho de ficheiro
- **Progresso**: Indicador visual de upload
- **Gestão**: CRUD completo de ficheiros
- **Categorização**: Organização por categorias
- **Metadados**: Título, descrição, tags, autor

### Autenticação e Autorização
- Sistema de login seguro
- Gestão de tokens JWT
- Controlo de acesso baseado em roles
- Persistência de sessão

## Tecnologias Utilizadas

### Frontend
- **React 19**: Framework JavaScript moderno
- **Vite**: Build tool rápido e eficiente
- **React Router**: Navegação SPA
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes UI de alta qualidade
- **Lucide React**: Ícones consistentes e modernos

### Editor e Upload
- **TinyMCE**: Editor WYSIWYG profissional
- **React Dropzone**: Componente de drag & drop
- **React Hook Form**: Gestão de formulários
- **Zod**: Validação de schemas

### Estado e API
- **Axios**: Cliente HTTP
- **React Hot Toast**: Notificações
- **Context API**: Gestão de estado global

## Estrutura do Projeto

```
blog-admin-dashboard/
├── public/                 # Ficheiros estáticos
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── ui/            # Componentes UI base (shadcn/ui)
│   │   ├── Layout.jsx     # Layout principal
│   │   ├── Sidebar.jsx    # Menu lateral
│   │   ├── WysiwygEditor.jsx  # Editor WYSIWYG
│   │   └── FileUpload.jsx # Componente de upload
│   ├── contexts/          # Contextos React
│   │   └── ThemeContext.jsx   # Contexto do tema
│   ├── hooks/             # Hooks personalizados
│   │   └── useAuth.js     # Hook de autenticação
│   ├── pages/             # Páginas da aplicação
│   │   ├── Dashboard.jsx  # Página inicial
│   │   ├── PostsPage.jsx  # Listagem de posts
│   │   ├── PostForm.jsx   # Formulário de posts
│   │   └── UploadsPage.jsx    # Gestão de uploads
│   ├── services/          # Serviços de API
│   │   └── api.js         # Cliente API
│   ├── App.jsx            # Componente principal
│   ├── App.css            # Estilos globais
│   └── main.jsx           # Ponto de entrada
├── .env                   # Variáveis de ambiente
├── package.json           # Dependências
└── README.md              # Documentação
```

## Funcionalidades Detalhadas

### Dashboard Principal

A página inicial oferece uma visão geral do blog com:

- **Estatísticas**: Cards com métricas importantes
  - Total de posts publicados
  - Número de uploads
  - Utilizadores registados
  - Mensagens de contacto

- **Posts Recentes**: Lista dos artigos mais recentes com:
  - Título e resumo
  - Estado de publicação
  - Número de visualizações
  - Data de criação

- **Ações Rápidas**: Botões para:
  - Criar novo post
  - Fazer upload de ficheiro
  - Ver mensagens não lidas

### Gestão de Posts

#### Listagem de Posts
- **Tabela Responsiva**: Exibição organizada de todos os posts
- **Filtros Avançados**:
  - Pesquisa por título e conteúdo
  - Filtro por estado (Publicado, Rascunho, Arquivado)
  - Filtro por categoria
  - Filtro por autor
- **Ordenação**: Por data, título, visualizações
- **Paginação**: Navegação eficiente para grandes volumes
- **Ações**: Editar, visualizar, eliminar cada post

#### Editor de Posts
- **Formulário Completo**:
  - Título (obrigatório)
  - Slug (gerado automaticamente)
  - Resumo (opcional)
  - Conteúdo completo (obrigatório)
  - Autor
  - Categoria
  - Tags
  - Imagem de destaque
  - Data de publicação
  - Estado de publicação

- **Editor WYSIWYG TinyMCE**:
  - Formatação rica de texto
  - Inserção de imagens com redimensionamento
  - Inserção de links e media
  - Tabelas e listas
  - Código e blocos de citação
  - Templates pré-definidos
  - Preview em tempo real
  - Suporte a HTML personalizado

- **Validação**:
  - Campos obrigatórios
  - Formato de slug
  - URLs válidas
  - Tamanho de conteúdo

### Sistema de Upload

#### Interface de Upload
- **Drag & Drop**: Área visual para arrastar ficheiros
- **Seleção Manual**: Botão para escolher ficheiros
- **Múltiplos Ficheiros**: Upload simultâneo (máximo 5)
- **Validação de Tipo**: Suporte a:
  - Imagens: JPEG, PNG, GIF, WebP
  - Documentos: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
  - Vídeos: MP4, AVI, MOV
  - Áudio: MP3, WAV, OGG
  - Arquivos: ZIP, RAR

#### Gestão de Ficheiros
- **Grid Responsivo**: Exibição em cards organizados
- **Informações Detalhadas**:
  - Nome e tipo do ficheiro
  - Tamanho e data de upload
  - Número de downloads
  - Estado de publicação
  - Categoria e tags

- **Filtros e Pesquisa**:
  - Pesquisa por nome e descrição
  - Filtro por categoria
  - Filtro por tipo de ficheiro
  - Ordenação personalizada

- **Ações**:
  - Editar metadados
  - Download direto
  - Visualização (quando aplicável)
  - Eliminação com confirmação

### Autenticação e Segurança

#### Sistema de Login
- **Autenticação JWT**: Tokens seguros
- **Persistência**: Sessão mantida entre visitas
- **Refresh Tokens**: Renovação automática
- **Logout Seguro**: Limpeza completa de dados

#### Controlo de Acesso
- **Roles de Utilizador**:
  - **Admin**: Acesso total
  - **Editor**: Gestão de conteúdo
  - **Viewer**: Apenas visualização

- **Proteção de Rotas**: Verificação automática de permissões
- **UI Condicional**: Elementos mostrados conforme role

## Configuração e Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm
- API Backend em funcionamento

### Passos de Instalação

1. **Clonar o Repositório**
```bash
git clone https://github.com/mmaunze/personal-portfolio-website-admin-dashboard.git
cd personal-portfolio-website-admin-dashboard
```

2. **Instalar Dependências**
```bash
pnpm install
```

3. **Configurar Ambiente**
```bash
cp .env.example .env
# Editar .env com as configurações adequadas
```

4. **Iniciar Desenvolvimento**
```bash
pnpm run dev
```

5. **Build para Produção**
```bash
pnpm run build
```

### Variáveis de Ambiente

```env
# URL da API Backend
VITE_API_URL=http://localhost:3000/api

# Chave da API TinyMCE (opcional para desenvolvimento)
VITE_TINYMCE_API_KEY=no-api-key

# Configurações de Upload
VITE_MAX_FILE_SIZE=5242880  # 5MB
VITE_MAX_FILES=5

# Modo de Desenvolvimento
VITE_DEV_MODE=true
```

## Integração com API

O dashboard está preparado para integrar com a API REST criada anteriormente. A integração inclui:

### Serviços Implementados
- **authService**: Autenticação e gestão de perfil
- **postsService**: CRUD completo de posts
- **uploadsService**: Gestão de ficheiros
- **usersService**: Gestão de utilizadores
- **contactsService**: Gestão de mensagens

### Interceptors HTTP
- **Request**: Adição automática de tokens de autenticação
- **Response**: Tratamento de erros e renovação de tokens

### Tratamento de Erros
- **Notificações**: Toast messages para feedback
- **Validação**: Mensagens de erro específicas
- **Fallbacks**: Comportamento gracioso em caso de falha

## Responsividade e Acessibilidade

### Design Responsivo
- **Mobile First**: Otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para tablet e desktop
- **Touch Friendly**: Elementos adequados para toque
- **Menu Mobile**: Navegação otimizada para pequenas telas

### Acessibilidade
- **Contraste**: Cores adequadas para visibilidade
- **Navegação por Teclado**: Suporte completo
- **Screen Readers**: Elementos semânticos
- **ARIA Labels**: Descrições adequadas

## Performance e Otimização

### Otimizações Implementadas
- **Code Splitting**: Carregamento sob demanda
- **Lazy Loading**: Componentes carregados quando necessário
- **Memoização**: Prevenção de re-renders desnecessários
- **Debouncing**: Otimização de pesquisas

### Métricas de Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Testes e Qualidade

### Estratégia de Testes
- **Testes Unitários**: Componentes individuais
- **Testes de Integração**: Fluxos completos
- **Testes E2E**: Cenários de utilizador

### Ferramentas de Qualidade
- **ESLint**: Análise estática de código
- **Prettier**: Formatação consistente
- **TypeScript**: Tipagem estática (opcional)

## Deployment

### Opções de Deployment
1. **Vercel**: Deploy automático via Git
2. **Netlify**: Hosting estático com CI/CD
3. **AWS S3 + CloudFront**: Solução escalável
4. **Servidor VPS**: Deploy tradicional

### Build de Produção
```bash
# Gerar build otimizado
pnpm run build

# Preview local do build
pnpm run preview

# Deploy (exemplo Vercel)
vercel --prod
```

### Configurações de Produção
- **Variáveis de Ambiente**: Configurar URLs de produção
- **HTTPS**: Certificados SSL obrigatórios
- **CDN**: Distribuição global de assets
- **Monitoring**: Logs e métricas de performance

## Manutenção e Atualizações

### Atualizações Regulares
- **Dependências**: Manter bibliotecas atualizadas
- **Segurança**: Patches de vulnerabilidades
- **Performance**: Otimizações contínuas
- **Funcionalidades**: Novas features baseadas em feedback

### Monitoring
- **Error Tracking**: Sentry ou similar
- **Analytics**: Google Analytics ou alternativas
- **Performance**: Web Vitals monitoring
- **Uptime**: Verificação de disponibilidade

## Suporte e Documentação

### Recursos Disponíveis
- **Documentação Técnica**: Este documento
- **Comentários no Código**: Explicações inline
- **README**: Instruções básicas
- **Changelog**: Histórico de alterações

### Suporte Técnico
- **Issues**: Reporte de bugs via GitHub
- **Discussões**: Fórum da comunidade
- **Email**: Suporte direto para questões críticas

## Roadmap Futuro

### Funcionalidades Planejadas
- **Dashboard Analytics**: Métricas avançadas
- **Editor Markdown**: Alternativa ao WYSIWYG
- **Gestão de Media**: Biblioteca de imagens
- **Comentários**: Sistema de moderação
- **SEO Tools**: Otimização automática
- **Backup**: Sistema de backup automático

### Melhorias Técnicas
- **PWA**: Progressive Web App
- **Offline Support**: Funcionalidade offline
- **Real-time**: Updates em tempo real
- **API GraphQL**: Migração para GraphQL

## Conclusão

O Dashboard de Administração oferece uma solução completa e moderna para gestão do blog. Com interface intuitiva, funcionalidades avançadas e arquitetura escalável, o dashboard está preparado para suportar o crescimento e evolução do blog.

A implementação segue as melhores práticas de desenvolvimento frontend, garantindo performance, acessibilidade e manutenibilidade a longo prazo.


