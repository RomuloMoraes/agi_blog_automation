import {test} from '@playwright/test';
import { BlogHomePage } from '../pages/BlogHomePage';

test.describe('Blog search', () => {
    test('busca por termo válido', async ({page}) => {
        const blogHomePage:BlogHomePage = new BlogHomePage(page);

        await blogHomePage.goto();
        const searchResultsPage = await blogHomePage.searchFor('fgts');
        
        await searchResultsPage.expectResultsTitleToContain('fgts');
        await searchResultsPage.expectResultsToBeVisible();
        await searchResultsPage.expectFirstResultToContain('fgts');
    });
});