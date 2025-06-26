import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display correctly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Check if header adapts to mobile
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check if mobile menu exists or navigation is collapsed
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Take full page screenshot on mobile
    await expect(page).toHaveScreenshot('mobile-homepage.png', { fullPage: true });
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    // Check layout on tablet
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    await expect(serviceGrid).toBeVisible();
    
    // Take full page screenshot on tablet
    await expect(page).toHaveScreenshot('tablet-homepage.png', { fullPage: true });
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    // Check layout on desktop
    const carousel = page.locator('[data-testid="featured-carousel"]');
    await expect(carousel).toBeVisible();
    
    // Take full page screenshot on desktop
    await expect(page).toHaveScreenshot('desktop-homepage.png', { fullPage: true });
  });

  test('should handle service grid responsively', async ({ page }) => {
    // Test mobile grid layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    await expect(serviceGrid).toHaveScreenshot('service-grid-mobile.png');
    
    // Test tablet grid layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    await expect(serviceGrid).toHaveScreenshot('service-grid-tablet.png');
    
    // Test desktop grid layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    await expect(serviceGrid).toHaveScreenshot('service-grid-desktop.png');
  });

  test('should handle header responsively', async ({ page }) => {
    const header = page.locator('header');
    
    // Test mobile header
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(header).toHaveScreenshot('header-mobile.png');
    
    // Test tablet header
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await expect(header).toHaveScreenshot('header-tablet.png');
    
    // Test desktop header
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    await expect(header).toHaveScreenshot('header-desktop.png');
  });

  test('should handle carousel responsively', async ({ page }) => {
    const carousel = page.locator('[data-testid="featured-carousel"]');
    
    // Test mobile carousel
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await expect(carousel).toHaveScreenshot('carousel-mobile.png');
    
    // Test tablet carousel
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    await expect(carousel).toHaveScreenshot('carousel-tablet.png');
    
    // Test desktop carousel
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    await expect(carousel).toHaveScreenshot('carousel-desktop.png');
  });

  test('should handle auth modal responsively', async ({ page }) => {
    // Test modal on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveScreenshot('auth-modal-mobile.png');
    
    // Close modal
    await page.locator('.ant-modal-close').click();
    
    // Test modal on tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    await expect(modal).toBeVisible();
    await expect(modal).toHaveScreenshot('auth-modal-tablet.png');
  });
});
