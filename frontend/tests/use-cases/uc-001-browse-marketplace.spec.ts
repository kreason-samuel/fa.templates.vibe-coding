import { test, expect } from '@playwright/test';

test.describe('UC-001: Browse Marketplace Products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to marketplace homepage and display products', async ({ page }) => {
    // Step 1: User navigates to the marketplace homepage
    await expect(page).toHaveURL('/');
    
    // Step 2: System displays categorized product tiles with visual assets
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    await expect(serviceGrid).toBeVisible();
    
    // Check that marketplace tiles are displayed
    const tiles = page.locator('[data-testid="marketplace-tile"]');
    await expect(tiles.first()).toBeVisible();
    
    // Take screenshot for visual verification
    await expect(page).toHaveScreenshot('uc-001-marketplace-homepage.png', { fullPage: true });
  });

  test('should filter products by categories', async ({ page }) => {
    // Step 3: User can filter by categories
    const categorySelect = page.locator('.ant-select').first();
    await categorySelect.click();
    
    // Select SmartICO plugins category
    await page.locator('.ant-select-item').filter({ hasText: 'SmartICO Plugins' }).click();
    await page.waitForTimeout(500);
    
    // Verify filtering works
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    await expect(serviceGrid).toHaveScreenshot('uc-001-filtered-smartico.png');
  });

  test('should view featured items in carousel', async ({ page }) => {
    // Step 4: User can view featured items in the carousel
    const carousel = page.locator('[data-testid="featured-carousel"]');
    await expect(carousel).toBeVisible();
    
    // Wait for carousel to load
    await page.waitForTimeout(1000);
    
    // Check carousel functionality
    const dots = page.locator('.ant-carousel .slick-dots');
    await expect(dots).toBeVisible();
    
    // Take screenshot of featured carousel
    await expect(carousel).toHaveScreenshot('uc-001-featured-carousel.png');
  });

  test('should switch between themes', async ({ page }) => {
    // Step 5: User can switch between dark/light themes
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    
    // Test light theme (default)
    await expect(page.locator('body')).not.toHaveClass(/dark/);
    await expect(page).toHaveScreenshot('uc-001-light-theme.png', { fullPage: true });
    
    // Switch to dark theme
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    // Verify dark theme is applied
    await expect(page.locator('body')).toHaveClass(/dark/);
    await expect(page).toHaveScreenshot('uc-001-dark-theme.png', { fullPage: true });
  });

  test('should access detailed product information', async ({ page }) => {
    // Step 6: User can access detailed product information
    const firstTile = page.locator('[data-testid="marketplace-tile"]').first();
    await expect(firstTile).toBeVisible();
    
    // Hover over tile to see details
    await firstTile.hover();
    await page.waitForTimeout(300);
    
    // Check if View Details button is available
    const viewButton = firstTile.locator('button').filter({ hasText: 'View Details' });
    await expect(viewButton).toBeVisible();
    
    // Take screenshot of tile with details
    await expect(firstTile).toHaveScreenshot('uc-001-product-details.png');
    
    // Note: Actual navigation to detail page would be implemented in future iterations
  });

  test('should provide easy navigation and product discovery', async ({ page }) => {
    // Success Criteria: User can easily navigate and find relevant products
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder*="Search services"]');
    await searchInput.fill('gaming');
    await searchInput.press('Enter');
    await page.waitForTimeout(500);
    
    // Verify search results
    const serviceGrid = page.locator('[data-testid="service-grid"]');
    await expect(serviceGrid).toHaveScreenshot('uc-001-search-results.png');
    
    // Test category navigation
    const categorySelect = page.locator('.ant-select').first();
    await categorySelect.click();
    
    // Verify all categories are available
    await expect(page.locator('.ant-select-item').filter({ hasText: 'SmartICO Plugins' })).toBeVisible();
    await expect(page.locator('.ant-select-item').filter({ hasText: 'SEON Fraud Protection' })).toBeVisible();
    await expect(page.locator('.ant-select-item').filter({ hasText: 'iGaming Servers' })).toBeVisible();
    await expect(page.locator('.ant-select-item').filter({ hasText: 'Tournament Systems' })).toBeVisible();
    
    // Take screenshot of category options
    await expect(page.locator('.ant-select-dropdown')).toHaveScreenshot('uc-001-categories.png');
  });
});
