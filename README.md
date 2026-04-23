# agi_blog_automation
Agi bank blog automation

Automação de testes da funcionalidade de busca do blog utilizando Playwright.

## Cenários de testes

- Busca por termo válido  
  * Deve retornar artigos relacionados ao termo pesquisado

- Busca por termo inválido  
  * Deve exibir mensagem de nenhum resultado

## Estrutura das pastas

- tests/ -> testes automatizados  
- pages/ -> Page Objects (Home e Resultados)  
- playwright.config.ts -> configuração do projeto  

## Stack utilizada

- Playwright  
- TypeScript  
- GitHub Actions  

## Instalação

bash -> 
npm install
npx playwright install

## Execução dos testes
npx playwright test

# Rodar com navegador visível:
npx playwright test --headed

## Relatório
npx playwright show-report

## CI
Os testes são executados automaticamente via GitHub Actions em cada push na branch main.

## Abordagem
Foi utilizado o padrão Page Object Model (POM) para separar ações da interface e validações dos cenários
A automação cobre os fluxos da busca (positivo e negativo), priorizando clareza e manutenção.
