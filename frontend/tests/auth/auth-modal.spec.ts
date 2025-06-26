import { test, expect } from '@playwright/test';

test.describe('Authentication Modal Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should open login modal when Sign In clicked', async ({ page }) => {
    // Click Sign In button
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    // Check if modal is visible
    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    
    // Check if login form is displayed
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // Take screenshot of login modal
    await expect(modal).toHaveScreenshot('auth-modal-login.png');
  });

  test('should open register modal when Sign Up clicked', async ({ page }) => {
    // Click Sign Up button
    await page.locator('button').filter({ hasText: 'Sign Up' }).click();
    
    // Check if modal is visible
    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    
    // Check if register form is displayed
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // Take screenshot of register modal
    await expect(modal).toHaveScreenshot('auth-modal-register.png');
  });

  test('should switch between login and register modes', async ({ page }) => {
    // Open login modal
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    
    // Switch to register mode
    await page.locator('text=Sign up here').click();
    
    // Check if form switched to register
    await expect(page.locator('text=Create Account')).toBeVisible();
    
    // Switch back to login mode
    await page.locator('text=Sign in here').click();
    
    // Check if form switched back to login
    await expect(page.locator('text=Welcome Back')).toBeVisible();
  });

  test('should close modal when X button clicked', async ({ page }) => {
    // Open login modal
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    
    // Click close button
    await page.locator('.ant-modal-close').click();
    
    // Check if modal is closed
    await expect(modal).not.toBeVisible();
  });

  test('should show validation errors for empty form submission', async ({ page }) => {
    // Open login modal
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Check for validation messages
    await expect(page.locator('.ant-form-item-explain-error')).toBeVisible();
    
    // Take screenshot of validation errors
    const modal = page.locator('.ant-modal');
    await expect(modal).toHaveScreenshot('auth-modal-validation-errors.png');
  });

  test('should handle form input correctly', async ({ page }) => {
    // Open login modal
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    // Fill form
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.locator('input[type="password"]').fill('password123');
    
    // Check if values are entered
    await expect(page.locator('input[type="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[type="password"]')).toHaveValue('password123');
    
    // Take screenshot of filled form
    const modal = page.locator('.ant-modal');
    await expect(modal).toHaveScreenshot('auth-modal-filled-form.png');
  });
});
