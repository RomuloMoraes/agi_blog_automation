import { test, expect } from '@playwright/test';

test.describe('Blog search - smoke', () => {

  test('busca por termo válido', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /search/i }).click();

    const searchInput = page.locator('input[name="s"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('fgts');

    await page.locator('#search_submit').click();

    await expect(page).toHaveURL(/search|s=/);

    const results = page.locator('article');

    await expect(results.first()).toBeVisible();
    await expect(results.first()).toContainText(/fgts/i);
  });

  test('busca por termo inválido', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /search/i }).click();

    const searchInput = page.locator('input[name="s"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('!@#$');

    await page.locator('#search_submit').click();

    await expect(page).toHaveURL(/search|s=/);

   const noResultsSection = page.locator('section.no-results');

    await expect(noResultsSection).toBeVisible();
    await expect(noResultsSection).toContainText(
      'Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.'
    );

    await expect(page.locator('article')).toHaveCount(0);
  });

});