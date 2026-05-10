# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e.spec.js >> Golf Charity Platform E2E >> User Registration and Dashboard Access
- Location: tests\e2e.spec.js:14:3

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /GolfCharity/
Received string:  "client"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    8 × unexpected value "client"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e6]:
      - link "GolfCharity" [ref=e8] [cursor=pointer]:
        - /url: /
        - img [ref=e9]
        - text: GolfCharity
      - generic [ref=e16]:
        - link "Charities" [ref=e17] [cursor=pointer]:
          - /url: /charities
        - link "Login" [ref=e18] [cursor=pointer]:
          - /url: /login
        - link "Get Started" [ref=e19] [cursor=pointer]:
          - /url: /register
  - main [ref=e20]:
    - generic [ref=e21]:
      - generic [ref=e27]:
        - generic [ref=e28]: Play For A Purpose
        - heading "Master the Green. Empower the World." [level=1] [ref=e29]:
          - text: Master the Green.
          - text: Empower the World.
        - paragraph [ref=e30]: The premium subscription platform for golfers. Track your scores, enter exclusive monthly draws, and support your favorite charities.
        - generic [ref=e31]:
          - link "Start Your Journey" [ref=e32] [cursor=pointer]:
            - /url: /register
          - link "How to Play" [ref=e33] [cursor=pointer]:
            - /url: "#how-to-play"
            - img [ref=e34]
            - text: How to Play
          - link "Explore Charities" [ref=e36] [cursor=pointer]:
            - /url: /charities
      - generic [ref=e38]:
        - generic [ref=e39]:
          - heading "How It Works" [level=2] [ref=e40]
          - paragraph [ref=e41]: Three simple steps to transform your golf game into a charitable engine.
        - generic [ref=e42]:
          - generic [ref=e44]:
            - img [ref=e46]
            - generic [ref=e48]: Step 1
            - heading "Play & Track" [level=3] [ref=e49]
            - paragraph [ref=e50]: Play your regular rounds of golf. Log your scores (between 1-45) on our platform after each game.
          - generic [ref=e51]:
            - img [ref=e53]
            - generic [ref=e57]: Step 2
            - heading "Match & Win" [level=3] [ref=e58]
            - paragraph [ref=e59]: Every month, an algorithm draws 5 numbers. Match 3, 4, or 5 of your recent scores to win premium prizes.
          - generic [ref=e60]:
            - img [ref=e62]
            - generic [ref=e67]: Step 3
            - heading "Give Back" [level=3] [ref=e68]
            - paragraph [ref=e69]: A significant portion of your subscription fee is directly donated to the charity of your choice.
      - generic [ref=e74]:
        - generic [ref=e75]: Fairness Guaranteed
        - heading "The Game Algorithm Explained" [level=2] [ref=e76]
        - paragraph [ref=e77]: We believe in total transparency. Our monthly draw algorithm is built on verifiable randomness to ensure every subscriber has a fair chance to win.
        - generic [ref=e78]:
          - generic [ref=e79]:
            - img [ref=e81]
            - generic [ref=e83]: Takes your 5 most recent golf scores (1-45).
          - generic [ref=e84]:
            - img [ref=e86]
            - generic [ref=e88]: A secure random number generator selects 5 winning numbers monthly.
          - generic [ref=e89]:
            - img [ref=e91]
            - generic [ref=e93]: If you match 3 numbers, you win Tier 3 prizes.
          - generic [ref=e94]:
            - img [ref=e96]
            - generic [ref=e98]: Match 4 for Tier 2, and all 5 for the Grand Prize.
          - generic [ref=e99]:
            - img [ref=e101]
            - generic [ref=e103]: Fully automated, untamperable, and transparently verified.
      - generic [ref=e106]:
        - img "Featured Charity" [ref=e110]
        - generic [ref=e111]:
          - generic [ref=e112]:
            - img [ref=e113]
            - text: Featured Charity of the Month
          - heading "Golf Fore Africa" [level=2] [ref=e115]
          - paragraph [ref=e116]: Bringing clean water to children and families in Africa.
          - generic [ref=e117]:
            - generic [ref=e118]:
              - paragraph [ref=e119]: Total Community Impact
              - paragraph [ref=e120]: \$250
            - generic [ref=e121]:
              - paragraph [ref=e122]: Active Supporters
              - paragraph [ref=e123]: 25+
          - link "Support Golf Fore Africa →" [ref=e124] [cursor=pointer]:
            - /url: /charities
            - text: Support Golf Fore Africa
            - generic [ref=e125]: →
      - generic [ref=e128]:
        - generic [ref=e129]:
          - generic [ref=e130]: 5,402
          - generic [ref=e131]: Global Subscribers
        - generic [ref=e132]:
          - generic [ref=e133]: 142k+
          - generic [ref=e134]: Scores Logged
        - generic [ref=e135]:
          - generic [ref=e136]: $89,200
          - generic [ref=e137]: Total Donations
        - generic [ref=e138]:
          - generic [ref=e139]: "342"
          - generic [ref=e140]: Prizes Awarded
      - generic [ref=e142]:
        - generic [ref=e143]:
          - heading "Elevate Your Game" [level=2] [ref=e144]
          - paragraph [ref=e145]: Everything you need to make your golf rounds more meaningful and rewarding.
        - generic [ref=e146]:
          - generic [ref=e147]:
            - img [ref=e149]
            - heading "Track Scores" [level=3] [ref=e151]
            - paragraph [ref=e152]: Log your 1-45 scores. We keep your latest 5 rounds to determine your draw entries.
          - generic [ref=e153]:
            - img [ref=e155]
            - heading "Monthly Draws" [level=3] [ref=e161]
            - paragraph [ref=e162]: Win premium prizes. Match 3, 4, or 5 of your recent scores with our monthly draw.
          - generic [ref=e163]:
            - img [ref=e165]
            - heading "Support Charities" [level=3] [ref=e167]
            - paragraph [ref=e168]: A portion of your subscription goes directly to the charity of your choice.
      - generic [ref=e172]:
        - heading "Ready to make every swing count?" [level=2] [ref=e173]
        - paragraph [ref=e174]: Join thousands of golfers who are winning prizes and supporting great causes globally.
        - link "Become a Member Today" [ref=e175] [cursor=pointer]:
          - /url: /register
  - contentinfo [ref=e176]:
    - generic [ref=e177]:
      - generic [ref=e178]:
        - generic [ref=e179]:
          - heading "GolfCharity" [level=2] [ref=e180]
          - paragraph [ref=e181]: Empowering golfers to make a difference. Track your scores, enter monthly draws, and support your favorite charities.
        - generic [ref=e182]:
          - link "Home" [ref=e183] [cursor=pointer]:
            - /url: /
          - link "Charities" [ref=e184] [cursor=pointer]:
            - /url: /charities
          - link "Terms" [ref=e185] [cursor=pointer]:
            - /url: "#"
          - link "Privacy" [ref=e186] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e187]:
        - paragraph [ref=e188]: © 2026 GolfCharity Platform. All rights reserved.
        - generic [ref=e189]:
          - img [ref=e191] [cursor=pointer]
          - img [ref=e198] [cursor=pointer]
          - img [ref=e202] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const BASE_URL = 'https://client-tawny-six-64.vercel.app';
  4  | const TEST_USER = {
  5  |   name: 'Playwright Tester',
  6  |   email: `tester-${Date.now()}@example.com`,
  7  |   password: 'password123'
  8  | };
  9  | 
  10 | test.setTimeout(60000); // 60 seconds
  11 | 
  12 | test.describe('Golf Charity Platform E2E', () => {
  13 | 
  14 |   test('User Registration and Dashboard Access', async ({ page }) => {
  15 |     await page.goto(BASE_URL);
> 16 |     await expect(page).toHaveTitle(/GolfCharity/);
     |                        ^ Error: expect(page).toHaveTitle(expected) failed
  17 | 
  18 |     await page.click('text=Get Started');
  19 |     await expect(page).toHaveURL(/.*register/);
  20 | 
  21 |     await page.waitForSelector('[placeholder="John Doe"]');
  22 |     await page.fill('[placeholder="John Doe"]', TEST_USER.name);
  23 |     await page.fill('[placeholder="you@example.com"]', TEST_USER.email);
  24 |     await page.fill('[placeholder="••••••••"]', TEST_USER.password);
  25 |     
  26 |     await Promise.all([
  27 |       page.waitForNavigation({ waitUntil: 'networkidle' }),
  28 |       page.click('button:has-text("Create Account")')
  29 |     ]);
  30 | 
  31 |     await expect(page).toHaveURL(/.*dashboard/);
  32 |     await expect(page.locator('h1')).toContainText(TEST_USER.name);
  33 | 
  34 |     await page.fill('[placeholder="Enter score (1-45)"]', '18');
  35 |     await page.click('button:has-text("Add Score")');
  36 |     
  37 |     await expect(page.locator('text=18')).toBeVisible();
  38 |   });
  39 | 
  40 |   test('Admin Login and Draw Access', async ({ page }) => {
  41 |     await page.goto(`${BASE_URL}/login`);
  42 |     
  43 |     await page.waitForSelector('[placeholder="you@example.com"]');
  44 |     await page.fill('[placeholder="you@example.com"]', 'pr9068124@gmail.com');
  45 |     await page.fill('[placeholder="••••••••"]', 'password123');
  46 |     
  47 |     await Promise.all([
  48 |       page.waitForNavigation({ waitUntil: 'networkidle' }),
  49 |       page.click('button:has-text("Sign In")')
  50 |     ]);
  51 | 
  52 |     await expect(page).toHaveURL(/.*dashboard/);
  53 |     
  54 |     // Check if it's admin (it should show Admin link)
  55 |     const adminLink = page.locator('text=Admin');
  56 |     await expect(adminLink).toBeVisible();
  57 |     await adminLink.click();
  58 |     
  59 |     await expect(page).toHaveURL(/.*admin/);
  60 |     await expect(page.locator('h1')).toContainText('Admin Terminal');
  61 |     
  62 |     // Run Simulation Draw - Wait for it to be visible/enabled
  63 |     const simButton = page.locator('button:has-text("Test Simulation")');
  64 |     await expect(simButton).toBeVisible();
  65 |     await simButton.click();
  66 |     
  67 |     await expect(page.locator('text=Draw Sequence Generated')).toBeVisible();
  68 |   });
  69 | 
  70 | });
  71 | 
```