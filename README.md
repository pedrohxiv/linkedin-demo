## Projeto Demo LinkedIn

## Descrição do Projeto

O LinkedIn demo é uma aplicação de rede social que replica algumas funcionalidades principais do LinkedIn, permitindo aos usuários criar e excluir posts, curtir e descurtir posts, e comentar em posts de outros usuários. Este projeto foi desenvolvido para demonstrar a integração de diversas tecnologias modernas, desde o backend até o frontend, proporcionando uma experiência completa de desenvolvimento de aplicativos web.

## Principais Funcionalidades

- **Criação/Exclusão de Postagens:** Capacidade de criar e excluir postagens na plataforma.

- **Curtir/Descurtir Postagens:** Funcionalidade para usuários curtirem e descurtirem postagens.

- **Comentários em Postagens:** Possibilidade de comentar em postagens de outros usuários.

- **Integração com MongoDB utilizando Prisma ORM:** Utilização de MongoDB em conjunto com Prisma ORM para fornecer uma solução escalável de armazenamento/banco de dados.

- **Upload/Download de Imagens com UploadThing:** Implementação segura de upload e download de imagens utilizando o UploadThing.

- **Autenticação com Clerk Authentication:** Implementação da autenticação de usuários do Google usando Clerk Authentication, incluindo middleware de autenticação para Next.js.

- **Server Actions e Caching em Next.js:** Utilização de Server Actions e caching em Next.js para criar uma experiência de usuário eficiente e otimizada.

- **Componentes Server e Client em Next.js 14:** Implementação de Next.js 14 Server Components e Client Components, aproveitando suas vantagens onde apropriado.

- **UI/UX com Shadcn e Tailwind CSS:** Criação de uma interface bonita e intuitiva no frontend utilizando Shadcn e Tailwind CSS.

- **Desenvolvimento com TypeScript:** Uso extensivo de TypeScript para reduzir o número de bugs e erros no código.

## Dependências

O projeto utiliza diversas dependências para garantir seu funcionamento suave:

- `@clerk/nextjs`: 5.1.6,
- `@prisma/client`: 5.16.1,
- `@radix-ui/react-avatar`: 1.1.0,
- `@radix-ui/react-slot`: 1.1.0,
- `@radix-ui/react-toast`: 1.2.1,
- `class-variance-authority`: 0.7.0,
- `clsx`: 2.1.1,
- `lucide-react`: 0.397.0,
- `next`: 14.2.4,
- `react`: 18,
- `react-dom`: 18,
- `react-timeago`: 7.2.0,
- `tailwind-merge`: 2.3.0,
- `tailwindcss-animate`: 1.0.7,
- `uploadthing`: 6.13.2,
- `@types/node`: 20,
- `@types/react`: 18,
- `@types/react-dom`: 18,
- `@types/react-timeago`: 4.1.7,
- `eslint`: 8,
- `eslint-config-next`: 14.2.4,
- `postcss`: 8,
- `prisma`: 5.16.1,
- `tailwindcss`: 3.4.1,
- `typescript`: ^5

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
3. Instale as dependências do projeto utilizando o seguinte comando:

```bash
npm install
# ou
yarn install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes chaves e seus respectivos valores:

```env
DATABASE_URL=seu_valor_aqui
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=seu_valor_aqui
CLERK_SECRET_KEY=seu_valor_aqui
UPLOADTHING_SECRET=seu_valor_aqui
UPLOADTHING_APP_ID=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

5. Inicie o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse a aplicação em `http://localhost:3000` e explore as funcionalidades completas do LinkedIn Demo e adapte-as conforme suas necessidades específicas.
