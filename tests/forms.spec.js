const { test, expect } = require('@playwright/test');

test.describe('Проверка элементов формы', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://lms.threadqa.ru/xpath-practice-hub'); 
    });

    test('Текстовые поля: Имя и Email', async ({ page }) => {
        const username = page.locator(`//input[@data-testid='username-field']`);
        await expect(username).toBeEmpty();
        
        await username.fill('Диана Прохорова');
        
        await expect(username).toHaveValue('Диана Прохорова');

        const email = page.locator(`//input[@data-testid='email-field']`);
        await email.fill('dziyana.prokharava@innowise.com');
        await expect(email).toHaveValue('dziyana.prokharava@innowise.com');
        
        await expect(email).toHaveAttribute('type', 'email');
    });

    test('Проверка безопаности поля Пароль', async ({ page }) => {
        const passwordInput = page.locator(`//input[@data-testid='password-field']`);

        await expect(passwordInput).toHaveAttribute('type', 'password');
        await expect(passwordInput).toHaveAttribute('minlength', '8');

        // вводим короткий пароль
        await passwordInput.fill('12345');

        await expect(passwordInput).toHaveJSProperty('validity.valid', false);

        // вводим правильный пароль
        await passwordInput.fill('superSecret123');

        await expect(passwordInput).toHaveJSProperty('validity.valid', true);
        await expect(passwordInput).toHaveValue('superSecret123');
    });

    test('Многострочное текстовое поле', async ({ page }) => {
        const textarea = page.locator(`//textarea[@data-testid='comment-field']`);

        await expect(textarea).toHaveAttribute('maxlength', '500');

        const longText = 'Первая строка\nВторая строка\nТретья строка';

        await textarea.fill(longText);
        
        await expect(textarea).toHaveValue(longText);
    });

    test('Выбор страны из списка', async ({ page }) => {
        const countryDropdown = page.locator(`//button[@data-testid='country-dropdown']`);
        const russiaOption = page.locator("//div[@data-testid='country-russia']");

        await countryDropdown.click();

        await russiaOption.click();

        await expect(countryDropdown).toHaveText("🇷🇺 Россия");
    });

    test('Чекбокс "Согласен с условиями"', async ({ page }) => {
        const termsAgreement = page.locator(`//input[@type='checkbox' and @data-testid='terms-agreement']`); 

        await expect(termsAgreement).not.toBeChecked();

        await termsAgreement.check();

        await expect(termsAgreement).toBeChecked();
    });

    test('Радио-кнопки: Подписка на рассылку', async ({ page }) => {
        const subscribe = page.locator(`//input[@value='yes' and @data-testid='newsletter-yes']`);
        const doNotSubscribe = page.locator(`//input[@value='no' and @data-testid='newsletter-no']`);

        await subscribe.check();
        
        await expect(subscribe).toBeChecked();
        await expect(doNotSubscribe).not.toBeChecked();

        await doNotSubscribe.check();

        await expect(doNotSubscribe).toBeChecked();
        await expect(subscribe).not.toBeChecked();
    });
});