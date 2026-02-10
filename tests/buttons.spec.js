const { test, expect } = require('@playwright/test');

test.describe('Практика на тренажере ThreadQA. Проверка кнопок', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://lms.threadqa.ru/xpath-practice-hub'); 
    });

    test('Поиск Основной кнопки', async ({ page }) => {
        const button = page.locator("//button[@data-testid='primary-button']"); 
        
        await expect(button).toBeVisible();
        await expect(button).toHaveText('Основная');
        await button.click();
    });

    test('Поиск Вторичной кнопки', async ({ page }) => {
        const button = page.locator("//button[@data-testid='secondary-button']"); 
        
        await expect(button).toBeVisible();
        await expect(button).toHaveText('Вторичная');
        await button.click();
    });

    test('Поиск кнопки Успех', async ({ page }) => {
        const button = page.locator("//button[@data-testid='success-button']"); 
        
        await expect(button).toBeVisible();
        await expect(button).toHaveText('Успех');
        await button.click();
    });

    test('Поиск кнопки Опасность', async ({ page }) => {
        const button = page.locator("//button[@data-testid='danger-button']"); 
        
        await expect(button).toBeVisible();
        await expect(button).toHaveText('Опасность');
        await button.click();
    });
});