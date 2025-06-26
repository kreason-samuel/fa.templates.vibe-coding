import { test, expect } from '@playwright/test';

test.describe('Theme Switching Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should start with light theme by default', async ({ page }) => {
    // Check if body has light theme class
    const body = page.locator('body');
    await expect(body).not.toHaveClass(/dark/);
    
    // Take screenshot of light theme
    await expect(page).toHaveScreenshot('theme-light-default.png', { fullPage: true });
  });

  test('should switch to dark theme when toggle clicked', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    
    // Click theme toggle
    await themeToggle.click();
    
    // Wait for theme transition
    await page.waitForTimeout(500);
    
    // Check if dark theme is applied
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark/);
    
    // Take screenshot of dark theme
    await expect(page).toHaveScreenshot('theme-dark-toggled.png', { fullPage: true });
  });

  test('should persist theme preference on page reload', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    
    // Switch to dark theme
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if dark theme persists
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark/);
  });

  test('should apply theme to all components', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    
    // Switch to dark theme
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    // Check header in dark theme
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header-dark.png');
    
    // Check carousel in dark theme
    const carousel = page.locator('[data-testid="featured-carousel"]');
    await expect(carousel).toHaveScreenshot('carousel-dark.png');
    
    // Check service grid in dark theme
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    await expect(serviceGrid).toHaveScreenshot('service-grid-dark.png');
  });
});
