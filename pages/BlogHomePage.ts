import {Page, Locator, expect} from '@playwright/test';
import {SearchResultPage} from './SearchResultPage';

export class BlogHomePage{
    readonly page: Page;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly searchSubmitButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.searchButton = page.getByRole('button', {name: /search/i});
        this.searchInput = page.locator('input[name="s"]');
        this.searchSubmitButton = page.locator('#search_submit');
    }

    async goto() {
        await this.page.goto('/');       
    }

    async openSearch(){
        await this.searchButton.click();
        await expect(this.searchInput).toBeVisible();
    }

    async fillSearch(term: string){
        await this.searchInput.fill(term);
    }

    async submitSearch(){
        await this.searchSubmitButton.click();
    }

    async searchFor(term: string):Promise<SearchResultPage>{
        await this.openSearch();
        await this.fillSearch(term);
        await this.submitSearch();

        const searchResultPage = new SearchResultPage(this.page);
        await searchResultPage.expectSearchResultsUrl();

        return searchResultPage;
    }
}