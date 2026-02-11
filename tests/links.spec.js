const { test, expect } = require('@playwright/test');

test.describe('Интерактивные элементы: Ссылки', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://lms.threadqa.ru/xpath-practice-hub'); 
    });

    test('Внешняя ссылка: Открытие в новой вкладке', async ({ page }) => {
        const externalLink = page.locator("//a[@data-testid='external-link']");

        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            externalLink.click()
        ]);

        await newPage.waitForLoadState();

        await expect(newPage).toHaveURL(/example\.com/);
    });

    test('Якорная ссылка: Переход к блоку', async ({ page }) => {
        const anchorLink = page.locator("//a[@data-testid='anchor-link']");

        await anchorLink.click();

        await expect(page).toHaveURL(/.*#practice-elements/);

        await expect(page.locator('#practice-elements')).toBeInViewport();
    });
});