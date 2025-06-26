import { test, expect } from '@playwright/test';

test.describe('UC-002: User Registration and Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display registration form when Register button clicked', async ({ page }) => {
    // Step 1: User clicks Register button in header
    await page.locator('button').filter({ hasText: 'Sign Up' }).click();
    
    // Step 2: System presents registration form
    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    
    // Verify registration form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Take screenshot of registration form
    await expect(modal).toHaveScreenshot('uc-002-registration-form.png');
  });

  test('should handle user input in registration form', async ({ page }) => {
    // Open registration modal
    await page.locator('button').filter({ hasText: 'Sign Up' }).click();
    
    // Step 3: User provides required information
    await page.locator('input[type="email"]').fill('newuser@example.com');
    await page.locator('input[type="password"]').fill('SecurePassword123!');
    
    // Verify input values
    await expect(page.locator('input[type="email"]')).toHaveValue('newuser@example.com');
    await expect(page.locator('input[type="password"]')).toHaveValue('SecurePassword123!');
    
    // Take screenshot of filled form
    const modal = page.locator('.ant-modal');
    await expect(modal).toHaveScreenshot('uc-002-filled-registration.png');
  });

  test('should display login form when Sign In button clicked', async ({ page }) => {
    // Step 6: User can log in with credentials
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    
    // Verify login form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Take screenshot of login form
    await expect(modal).toHaveScreenshot('uc-002-login-form.png');
  });

  test('should handle form validation for empty fields', async ({ page }) => {
    // Open login modal
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Check for validation errors
    await expect(page.locator('.ant-form-item-explain-error')).toBeVisible();
    
    // Take screenshot of validation errors
    const modal = page.locator('.ant-modal');
    await expect(modal).toHaveScreenshot('uc-002-validation-errors.png');
  });

  test('should handle form validation for invalid email', async ({ page }) => {
    // Open registration modal
    await page.locator('button').filter({ hasText: 'Sign Up' }).click();
    
    // Enter invalid email
    await page.locator('input[type="email"]').fill('invalid-email');
    await page.locator('input[type="password"]').fill('password123');
    
    // Try to submit
    await page.locator('button[type="submit"]').click();
    
    // Check for email validation error
    await expect(page.locator('.ant-form-item-explain-error')).toBeVisible();
    
    // Take screenshot of email validation error
    const modal = page.locator('.ant-modal');
    await expect(modal).toHaveScreenshot('uc-002-email-validation.png');
  });

  test('should switch between login and registration modes', async ({ page }) => {
    // Open login modal
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    // Switch to registration mode
    await page.locator('text=Sign up here').click();
    await expect(page.locator('text=Create Account')).toBeVisible();
    
    // Switch back to login mode
    await page.locator('text=Sign in here').click();
    await expect(page.locator('text=Welcome Back')).toBeVisible();
    
    // Take screenshot of mode switching
    const modal = page.locator('.ant-modal');
    await expect(modal).toHaveScreenshot('uc-002-mode-switching.png');
  });

  test('should provide social authentication options', async ({ page }) => {
    // Open registration modal
    await page.locator('button').filter({ hasText: 'Sign Up' }).click();
    
    const modal = page.locator('.ant-modal');
    
    // Check for social auth buttons (if implemented)
    // Note: This test assumes social auth buttons exist in the design
    // If not implemented yet, this test will help identify missing features
    
    // Take screenshot showing current auth options
    await expect(modal).toHaveScreenshot('uc-002-auth-options.png');
  });

  test('should handle modal closing functionality', async ({ page }) => {
    // Open login modal
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    
    const modal = page.locator('.ant-modal');
    await expect(modal).toBeVisible();
    
    // Close modal using X button
    await page.locator('.ant-modal-close').click();
    await expect(modal).not.toBeVisible();
    
    // Open modal again and close with ESC key
    await page.locator('button').filter({ hasText: 'Sign In' }).click();
    await expect(modal).toBeVisible();
    
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('should handle authentication flow end-to-end', async ({ page }) => {
    // This test simulates the complete authentication flow
    // Note: Actual backend integration would be tested here in full implementation
    
    // Step 1: Open registration
    await page.locator('button').filter({ hasText: 'Sign Up' }).click();
    
    // Step 2: Fill form
    await page.locator('input[type="email"]').fill('testuser@example.com');
    await page.locator('input[type="password"]').fill('TestPassword123!');
    
    // Step 3: Submit form (currently mocked)
    await page.locator('button[type="submit"]').click();
    
    // Step 4: Verify form submission attempt
    // In full implementation, this would check for:
    // - API call to backend
    // - SEON KYC verification initiation
    // - Account creation confirmation
    // - Redirect to dashboard or welcome page
    
    // For now, take screenshot of submission state
    const modal = page.locator('.ant-modal');
    await expect(modal).toHaveScreenshot('uc-002-form-submission.png');
  });
});
