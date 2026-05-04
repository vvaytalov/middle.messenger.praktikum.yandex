import { expect, test } from '@playwright/test';

test.describe('SPA routes', () => {
    test('renders auth pages on direct navigation', async ({ page }) => {
        let response = await page.goto('/sign-in');
        expect(response?.status()).toBe(200);
        await expect(page.locator('.auth__title')).toHaveText('Вход');
        await expect(page.getByPlaceholder('Логин')).toBeVisible();

        response = await page.goto('/sign-up');
        expect(response?.status()).toBe(200);
        await expect(page.locator('.auth__title')).toHaveText('Регистрация');
        await expect(page.getByPlaceholder('Почта')).toBeVisible();
    });

    test('renders server error page on direct navigation', async ({ page }) => {
        const response = await page.goto('/500');

        expect(response?.status()).toBe(200);
        await expect(page.locator('.error__title')).toHaveText('500');
        await expect(page.getByText('Мы уже фиксим')).toBeVisible();
    });

    test('serves production CSP without unsafe inline script allowances', async ({ page }) => {
        const response = await page.goto('/sign-in');
        const csp = response?.headers()['content-security-policy'] || '';

        expect(csp).toContain("script-src 'self'");
        expect(csp).not.toContain("'unsafe-inline'");
        expect(csp).not.toContain("'unsafe-eval'");
    });
});
