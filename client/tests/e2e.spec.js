import { test, expect } from '@playwright/test';

const BASE_URL = 'https://client-tawny-six-64.vercel.app';
const TEST_USER = {
  name: 'Playwright Tester',
  email: `tester-${Date.now()}@example.com`,
  password: 'password123'
};

test.setTimeout(60000); // 60 seconds

test.describe('Golf Charity Platform E2E', () => {

  test('User Registration and Dashboard Access', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/GolfCharity/);

    await page.click('text=Get Started');
    await expect(page).toHaveURL(/.*register/);

    await page.waitForSelector('[placeholder="John Doe"]');
    await page.fill('[placeholder="John Doe"]', TEST_USER.name);
    await page.fill('[placeholder="you@example.com"]', TEST_USER.email);
    await page.fill('[placeholder="••••••••"]', TEST_USER.password);
    
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button:has-text("Create Account")')
    ]);

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText(TEST_USER.name);

    await page.fill('[placeholder="Enter score (1-45)"]', '18');
    await page.click('button:has-text("Add Score")');
    
    await expect(page.locator('text=18')).toBeVisible();
  });

  test('Admin Login and Draw Access', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    await page.waitForSelector('[placeholder="you@example.com"]');
    await page.fill('[placeholder="you@example.com"]', 'pr9068124@gmail.com');
    await page.fill('[placeholder="••••••••"]', 'password123');
    
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button:has-text("Sign In")')
    ]);

    await expect(page).toHaveURL(/.*dashboard/);
    
    // Check if it's admin (it should show Admin link)
    const adminLink = page.locator('text=Admin');
    await expect(adminLink).toBeVisible();
    await adminLink.click();
    
    await expect(page).toHaveURL(/.*admin/);
    await expect(page.locator('h1')).toContainText('Admin Terminal');
    
    // Run Simulation Draw - Wait for it to be visible/enabled
    const simButton = page.locator('button:has-text("Test Simulation")');
    await expect(simButton).toBeVisible();
    await simButton.click();
    
    await expect(page.locator('text=Draw Sequence Generated')).toBeVisible();
  });

});
