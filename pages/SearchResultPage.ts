import{Page, Locator, expect} from '@playwright/test';

export class SearchResultPage{
    readonly page: Page;
    readonly results: Locator;
    readonly noResultsSection: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page){
        this.page = page;
        this.results = page.locator('article');
        this.noResultsSection = page.locator('section.no-results');
        this.pageTitle = page.locator('h1,.page-title').filter({hasText: /Resultados encontrados para/i});
    }

    async expectSearchResultsUrl() {
        await expect(this.page).toHaveURL(/search|s=/);  
    }

    async expectResultsToBeVisible(){
        await expect (this.results.first()).toBeVisible();
    }

    async expectFirstResultToContain(term: string){
        await expect(this.results.first()).toContainText(new RegExp(term, 'i'));
    }

    async expectResultsTitleToContain(term: string){
        await expect(this.page.getByText(new RegExp(`Resultados encontrados para:\\s*${term}`, 'i'))).toBeVisible();
    }

    async expectNoResultsMessage() {
        await expect(this.noResultsSection).toBeVisible();
        await expect(this.noResultsSection).toContainText(
        'Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.');
    }

    async expectNoArticles() {
        await expect(this.results).toHaveCount(0);
    }

}