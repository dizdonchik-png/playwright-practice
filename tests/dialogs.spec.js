const { test, expect } = require('@playwright/test');

test.describe('Интерактивные элементы: Уведомления и Модальные окна', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://lms.threadqa.ru/xpath-practice-hub'); 
    });

    test('Работа с уведомлениями (Показать/Скрыть)', async ({ page }) => {
        const toggleButton = page.locator("//button[@data-testid='show-alert-button']");
        const alertMessage = page.locator("//div[@data-testid='alert-message']");

        await toggleButton.click();

        await expect(alertMessage).toBeVisible();

        await expect(toggleButton).toHaveText('Скрыть уведомление');

        await toggleButton.click();

        await expect(alertMessage).not.toBeVisible();
        
        await expect(toggleButton).toHaveText('Показать уведомление');
    });

    const openModalBtnSelector = "//button[@data-testid='open-modal-button']";
    const closeBtnSelector = "//button[@data-testid='modal-close-button']";
    const cancelBtnSelector = "//button[@data-testid='modal-cancel-button']";
    const confirmBtnSelector = "//button[@data-testid='modal-confirm-button']";

    test('Модальное окно: Открытие и закрытие кнопками', async ({ page }) => {
        const openBtn = page.locator(openModalBtnSelector);
        
        await openBtn.click();

        await expect(page.locator(closeBtnSelector)).toBeVisible();

        await page.locator(closeBtnSelector).click();
        await expect(page.locator(closeBtnSelector)).not.toBeVisible();

        await openBtn.click();
        await page.locator(cancelBtnSelector).click();
        await expect(page.locator(cancelBtnSelector)).not.toBeVisible();

        const infoAlert = page.locator("//*[@data-testid='notification-info']");
        await expect(infoAlert).toBeVisible();
        await expect(infoAlert).toHaveText("Действие отменено");

        await openBtn.click();
        await page.locator(confirmBtnSelector).click();
        await expect(page.locator(confirmBtnSelector)).not.toBeVisible();

        const successAlert = page.locator("//*[@data-testid='notification-success']");
        await expect(successAlert).toBeVisible();
        await expect(successAlert).toHaveText("Действие подтверждено!");
    });

    test('Модальное окно: Закрытие кликом вне окна (Overlay)', async ({ page }) => {
        await page.locator(openModalBtnSelector).click();
        await expect(page.locator(closeBtnSelector)).toBeVisible();

        await page.mouse.click(10, 10); 

        await expect(page.locator(closeBtnSelector)).not.toBeVisible();
    });

    test('Типы уведомлений: Проверка всех 4 вариантов', async ({ page }) => {
        const notifications = [
            { type: 'Успех', button: "//button[@data-testid='notify-success']", alert: "//*[@data-testid='notification-success']" },
            { type: 'Ошибка', button: "//button[@data-testid='notify-error']", alert: "//*[@data-testid='notification-error']" },
            { type: 'Предупреждение', button: "//button[@data-testid='notify-warning']", alert: "//*[@data-testid='notification-warning']" },
            { type: 'Инфо', button: "//button[@data-testid='notify-info']", alert: "//*[@data-testid='notification-info']" }
        ];

        for (const item of notifications) {
            await page.locator(item.button).click();

            const alert = page.locator(item.alert).first();
            await expect(alert).toBeVisible();
        }
    });

});