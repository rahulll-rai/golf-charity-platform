# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e.spec.js >> Golf Charity Platform E2E >> Admin Login and Draw Access
- Location: tests\e2e.spec.js:40:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text("Test Simulation")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text("Test Simulation")')

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
        - link "Dashboard" [ref=e18] [cursor=pointer]:
          - /url: /dashboard
        - link "Admin" [active] [ref=e19] [cursor=pointer]:
          - /url: /admin
        - button "Logout" [ref=e20]
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e23]:
        - generic [ref=e24]:
          - heading "Admin Terminal" [level=1] [ref=e25]
          - paragraph [ref=e26]:
            - img [ref=e27]
            - text: Authorized access only • Secure Session Active
        - generic [ref=e30]:
          - generic [ref=e31]: System Live
          - button [ref=e33]:
            - img [ref=e34]
      - generic [ref=e38]:
        - generic [ref=e41]:
          - img [ref=e43]
          - generic [ref=e48]:
            - paragraph [ref=e49]: Active Users
            - paragraph [ref=e50]: "2"
        - generic [ref=e53]:
          - img [ref=e55]
          - generic [ref=e57]:
            - paragraph [ref=e58]: Total Contributions
            - paragraph [ref=e59]: $250
        - generic [ref=e62]:
          - img [ref=e64]
          - generic [ref=e70]:
            - paragraph [ref=e71]: Prizes Awarded
            - paragraph [ref=e72]: $0.00
        - generic [ref=e75]:
          - img [ref=e77]
          - generic [ref=e79]:
            - paragraph [ref=e80]: Completed Draws
            - paragraph [ref=e81]: "2"
      - generic [ref=e82]:
        - generic [ref=e84]:
          - heading "Execute Draw" [level=2] [ref=e85]:
            - img [ref=e86]
            - text: Execute Draw
          - generic [ref=e89]:
            - generic [ref=e90]:
              - generic [ref=e91]:
                - text: Month
                - spinbutton [ref=e92]: "5"
              - generic [ref=e93]:
                - text: Year
                - spinbutton [ref=e94]: "2026"
            - generic [ref=e95]:
              - text: Algorithm Strategy
              - combobox [ref=e96] [cursor=pointer]:
                - option "Secure Random" [selected]
                - option "Verifiable Algorithmic"
            - generic [ref=e97] [cursor=pointer]:
              - checkbox "Simulation Mode" [ref=e98]
              - generic [ref=e99]: Simulation Mode
            - button "Publish Official Draw" [ref=e100]:
              - img [ref=e101]
              - text: Publish Official Draw
        - generic [ref=e107]:
          - generic [ref=e108]:
            - heading "Registered Users" [level=2] [ref=e109]:
              - img [ref=e110]
              - text: Registered Users
            - generic [ref=e115]:
              - img [ref=e116]
              - textbox "Search golfers..." [ref=e119]
          - table [ref=e121]:
            - rowgroup [ref=e122]:
              - row "Identity Status Privileges Metrics" [ref=e123]:
                - columnheader "Identity" [ref=e124]
                - columnheader "Status" [ref=e125]
                - columnheader "Privileges" [ref=e126]
                - columnheader "Metrics" [ref=e127]
            - rowgroup
      - generic [ref=e128]:
        - generic [ref=e129]:
          - heading "Charity Management" [level=2] [ref=e130]:
            - img [ref=e131]
            - text: Charity Management
          - table [ref=e137]:
            - rowgroup [ref=e138]:
              - row "Organization Impact Action" [ref=e139]:
                - columnheader "Organization" [ref=e140]
                - columnheader "Impact" [ref=e141]
                - columnheader "Action" [ref=e142]
            - rowgroup [ref=e143]:
              - row "Golf Fore Africa $250 Remove" [ref=e144]:
                - cell "Golf Fore Africa" [ref=e145]:
                  - generic [ref=e147]: Golf Fore Africa
                - cell "$250" [ref=e148]:
                  - generic [ref=e149]: $250
                - cell "Remove" [ref=e150]:
                  - button "Remove" [ref=e151]
              - row "First Tee $0 Remove" [ref=e152]:
                - cell "First Tee" [ref=e153]:
                  - generic [ref=e155]: First Tee
                - cell "$0" [ref=e156]:
                  - generic [ref=e157]: $0
                - cell "Remove" [ref=e158]:
                  - button "Remove" [ref=e159]
              - row "Audubon International $0 Remove" [ref=e160]:
                - cell "Audubon International" [ref=e161]:
                  - generic [ref=e163]: Audubon International
                - cell "$0" [ref=e164]:
                  - generic [ref=e165]: $0
                - cell "Remove" [ref=e166]:
                  - button "Remove" [ref=e167]
              - row "Make-A-Wish Foundation $0 Remove" [ref=e168]:
                - cell "Make-A-Wish Foundation" [ref=e169]:
                  - generic [ref=e171]: Make-A-Wish Foundation
                - cell "$0" [ref=e172]:
                  - generic [ref=e173]: $0
                - cell "Remove" [ref=e174]:
                  - button "Remove" [ref=e175]
              - row "St. Jude Children's Research Hospital $0 Remove" [ref=e176]:
                - cell "St. Jude Children's Research Hospital" [ref=e177]:
                  - generic [ref=e179]: St. Jude Children's Research Hospital
                - cell "$0" [ref=e180]:
                  - generic [ref=e181]: $0
                - cell "Remove" [ref=e182]:
                  - button "Remove" [ref=e183]
              - row "PGA HOPE $0 Remove" [ref=e184]:
                - cell "PGA HOPE" [ref=e185]:
                  - generic [ref=e187]: PGA HOPE
                - cell "$0" [ref=e188]:
                  - generic [ref=e189]: $0
                - cell "Remove" [ref=e190]:
                  - button "Remove" [ref=e191]
        - generic [ref=e192]:
          - heading "Score Logs" [level=2] [ref=e193]:
            - img [ref=e194]
            - text: Score Logs
          - table [ref=e197]:
            - rowgroup [ref=e198]:
              - row "User Score Date Action" [ref=e199]:
                - columnheader "User" [ref=e200]
                - columnheader "Score" [ref=e201]
                - columnheader "Date" [ref=e202]
                - columnheader "Action" [ref=e203]
            - rowgroup
      - generic [ref=e204]:
        - heading "Winner Verification Pipeline" [level=2] [ref=e206]:
          - img [ref=e207]
          - text: Winner Verification Pipeline
        - table [ref=e214]:
          - rowgroup [ref=e215]:
            - row "Champion Draw Ref Reward Verification Governance" [ref=e216]:
              - columnheader "Champion" [ref=e217]
              - columnheader "Draw Ref" [ref=e218]
              - columnheader "Reward" [ref=e219]
              - columnheader "Verification" [ref=e220]
              - columnheader "Governance" [ref=e221]
          - rowgroup
      - generic [ref=e222]:
        - heading "Historic Draw Registry" [level=2] [ref=e223]:
          - img [ref=e224]
          - text: Historic Draw Registry
        - table [ref=e229]:
          - rowgroup [ref=e230]:
            - row "Period Sequence Capital Pool Strategy Timestamp" [ref=e231]:
              - columnheader "Period" [ref=e232]
              - columnheader "Sequence" [ref=e233]
              - columnheader "Capital Pool" [ref=e234]
              - columnheader "Strategy" [ref=e235]
              - columnheader "Timestamp" [ref=e236]
          - rowgroup [ref=e237]:
            - 'row "5/2026 43 12 37 40 41 $20.00 Rollover: $20.00 Random 5/10/2026" [ref=e238]':
              - cell "5/2026" [ref=e239]:
                - generic [ref=e240]: 5/2026
              - cell "43 12 37 40 41" [ref=e241]:
                - generic [ref=e242]:
                  - generic [ref=e243]: "43"
                  - generic [ref=e244]: "12"
                  - generic [ref=e245]: "37"
                  - generic [ref=e246]: "40"
                  - generic [ref=e247]: "41"
              - 'cell "$20.00 Rollover: $20.00" [ref=e248]':
                - paragraph [ref=e249]: $20.00
                - paragraph [ref=e250]: "Rollover: $20.00"
              - cell "Random" [ref=e251]
              - cell "5/10/2026" [ref=e252]
            - 'row "5/2026 12 29 42 19 11 $20.00 Rollover: $12.00 Random 5/10/2026" [ref=e253]':
              - cell "5/2026" [ref=e254]:
                - generic [ref=e255]: 5/2026
              - cell "12 29 42 19 11" [ref=e256]:
                - generic [ref=e257]:
                  - generic [ref=e258]: "12"
                  - generic [ref=e259]: "29"
                  - generic [ref=e260]: "42"
                  - generic [ref=e261]: "19"
                  - generic [ref=e262]: "11"
              - 'cell "$20.00 Rollover: $12.00" [ref=e263]':
                - paragraph [ref=e264]: $20.00
                - paragraph [ref=e265]: "Rollover: $12.00"
              - cell "Random" [ref=e266]
              - cell "5/10/2026" [ref=e267]
  - contentinfo [ref=e268]:
    - generic [ref=e269]:
      - generic [ref=e270]:
        - generic [ref=e271]:
          - heading "GolfCharity" [level=2] [ref=e272]
          - paragraph [ref=e273]: Empowering golfers to make a difference. Track your scores, enter monthly draws, and support your favorite charities.
        - generic [ref=e274]:
          - link "Home" [ref=e275] [cursor=pointer]:
            - /url: /
          - link "Charities" [ref=e276] [cursor=pointer]:
            - /url: /charities
          - link "Terms" [ref=e277] [cursor=pointer]:
            - /url: "#"
          - link "Privacy" [ref=e278] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e279]:
        - paragraph [ref=e280]: © 2026 GolfCharity Platform. All rights reserved.
        - generic [ref=e281]:
          - img [ref=e283] [cursor=pointer]
          - img [ref=e290] [cursor=pointer]
          - img [ref=e294] [cursor=pointer]
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
  16 |     await expect(page).toHaveTitle(/GolfCharity/);
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
> 64 |     await expect(simButton).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  65 |     await simButton.click();
  66 |     
  67 |     await expect(page.locator('text=Draw Sequence Generated')).toBeVisible();
  68 |   });
  69 | 
  70 | });
  71 | 
```