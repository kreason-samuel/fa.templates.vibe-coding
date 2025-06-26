import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should render homepage layout correctly', async ({ page }) => {
    // Check if main layout elements are present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Take full page screenshot for visual regression
    await expect(page).toHaveScreenshot('homepage-full.png', { fullPage: true });
  });

  test('should display header with all navigation elements', async ({ page }) => {
    const header = page.locator('header');
    
    // Check logo/brand
    await expect(header.locator('[data-testid="brand-logo"]')).toBeVisible();
    
    // Check navigation menu
    await expect(header.locator('nav')).toBeVisible();
    
    // Check theme toggle button
    await expect(header.locator('[data-testid="theme-toggle"]')).toBeVisible();
    
    // Check auth buttons
    await expect(header.locator('button').filter({ hasText: 'Sign In' })).toBeVisible();
    await expect(header.locator('button').filter({ hasText: 'Sign Up' })).toBeVisible();

    // Take header screenshot
    await expect(header).toHaveScreenshot('header-light.png');
  });

  test('should display featured carousel', async ({ page }) => {
    const carousel = page.locator('[data-testid="featured-carousel"]');
    
    await expect(carousel).toBeVisible();
    
    // Check if carousel items are present
    await expect(carousel.locator('.ant-carousel-track')).toBeVisible();
    
    // Wait for carousel to be interactive
    await page.waitForTimeout(1000);
    
    // Take carousel screenshot
    await expect(carousel).toHaveScreenshot('featured-carousel.png');
  });

  test('should display service grid with filtering', async ({ page }) => {
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    
    await expect(serviceGrid).toBeVisible();
    
    // Check search functionality
    const searchInput = page.locator('input[placeholder*="Search services"]');
    await expect(searchInput).toBeVisible();
    
    // Check category filters
    await expect(page.locator('.ant-select')).toBeVisible();
    
    // Check service tiles
    const tiles = page.locator('[data-testid="marketplace-tile"]');
    await expect(tiles.first()).toBeVisible();
    
    // Take service grid screenshot
    await expect(serviceGrid).toHaveScreenshot('service-grid.png');
  });

  test('should display footer with all sections', async ({ page }) => {
    const footer = page.locator('footer');
    
    await expect(footer).toBeVisible();
    
    // Check footer sections
    await expect(footer.locator('text=Gaming Solutions')).toBeVisible();
    await expect(footer.locator('text=Developer Tools')).toBeVisible();
    await expect(footer.locator('text=Enterprise')).toBeVisible();
    await expect(footer.locator('text=Company')).toBeVisible();
    
    // Take footer screenshot
    await expect(footer).toHaveScreenshot('footer.png');
  });
});
