import { test, expect } from '@playwright/test';

test.describe('Marketplace Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display and interact with featured carousel', async ({ page }) => {
    const carousel = page.locator('[data-testid="featured-carousel"]');
    await expect(carousel).toBeVisible();
    
    // Wait for carousel to be fully loaded
    await page.waitForTimeout(1000);
    
    // Check if carousel dots are visible for navigation
    const dots = page.locator('.ant-carousel .slick-dots');
    await expect(dots).toBeVisible();
    
    // Try clicking next slide (if arrow navigation exists)
    const nextArrow = page.locator('.slick-next');
    if (await nextArrow.isVisible()) {
      await nextArrow.click();
      await page.waitForTimeout(1000);
    }
    
    // Take screenshot after interaction
    await expect(carousel).toHaveScreenshot('carousel-interaction.png');
  });

  test('should filter services by category', async ({ page }) => {
    // Open category filter dropdown
    const categorySelect = page.locator('.ant-select').first();
    await categorySelect.click();
    
    // Select a specific category
    await page.locator('.ant-select-item').filter({ hasText: 'SmartICO Plugins' }).click();
    
    // Wait for filtering to take effect
    await page.waitForTimeout(500);
    
    // Check if services are filtered
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    await expect(serviceGrid).toHaveScreenshot('filtered-services-smartico.png');
  });

  test('should search services by keyword', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search services"]');
    
    // Enter search term
    await searchInput.fill('gaming');
    await searchInput.press('Enter');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    // Take screenshot of search results
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    await expect(serviceGrid).toHaveScreenshot('search-results-gaming.png');
  });

  test('should interact with marketplace tiles', async ({ page }) => {
    const firstTile = page.locator('[data-testid="marketplace-tile"]').first();
    await expect(firstTile).toBeVisible();
    
    // Hover over tile to check hover effects
    await firstTile.hover();
    await page.waitForTimeout(300);
    
    // Take screenshot of hovered state
    await expect(firstTile).toHaveScreenshot('marketplace-tile-hover.png');
    
    // Check if action buttons are visible
    const viewButton = firstTile.locator('button').filter({ hasText: 'View Details' });
    const purchaseButton = firstTile.locator('button').filter({ hasText: 'Get Started' });
    
    await expect(viewButton).toBeVisible();
    await expect(purchaseButton).toBeVisible();
  });

  test('should clear filters and search', async ({ page }) => {
    // Apply a filter first
    const categorySelect = page.locator('.ant-select').first();
    await categorySelect.click();
    await page.locator('.ant-select-item').first().click();
    
    // Add search term
    const searchInput = page.locator('input[placeholder*="Search services"]');
    await searchInput.fill('test');
    await searchInput.press('Enter');
    
    await page.waitForTimeout(500);
    
    // Clear search
    await searchInput.clear();
    await searchInput.press('Enter');
    
    // Reset category filter
    await categorySelect.click();
    await page.locator('.ant-select-item').filter({ hasText: 'All Categories' }).click();
    
    await page.waitForTimeout(500);
    
    // Take screenshot of cleared state
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    await expect(serviceGrid).toHaveScreenshot('cleared-filters.png');
  });

  test('should display service categories correctly', async ({ page }) => {
    const categorySelect = page.locator('.ant-select').first();
    await categorySelect.click();
    
    // Check if all expected categories are present
    await expect(page.locator('.ant-select-item').filter({ hasText: 'All Categories' })).toBeVisible();
    await expect(page.locator('.ant-select-item').filter({ hasText: 'SmartICO Plugins' })).toBeVisible();
    await expect(page.locator('.ant-select-item').filter({ hasText: 'SEON Fraud Protection' })).toBeVisible();
    await expect(page.locator('.ant-select-item').filter({ hasText: 'iGaming Servers' })).toBeVisible();
    await expect(page.locator('.ant-select-item').filter({ hasText: 'Tournament Systems' })).toBeVisible();
    
    // Take screenshot of category dropdown
    const dropdown = page.locator('.ant-select-dropdown');
    await expect(dropdown).toHaveScreenshot('category-dropdown.png');
  });
});
