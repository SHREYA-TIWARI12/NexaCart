import { expect, test } from '@playwright/test'

test('desktop shopping flow works', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()

  await expect(page.getByRole('heading', { name: 'Recommended Products' })).toBeVisible()
  await expect(page.getByText(/products found/)).toBeVisible()

  await page.getByRole('button', { name: 'Add to Cart' }).first().click()
  await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible()
  await page.getByRole('button', { name: /close/i }).click()

  await page.getByRole('button', { name: 'Toggle wishlist' }).first().click()
  await page.getByRole('navigation').getByRole('link', { name: 'Wishlist' }).click()
  await expect(page.getByRole('heading', { name: 'Wishlist' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Electronics' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Add to Cart' }).first()).toBeVisible()

  await page.getByRole('link', { name: 'Shop' }).click()
  await expect(page.getByRole('button', { name: 'Electronics' })).toBeVisible()
  await page.getByPlaceholder('Search products').first().fill('mascara')
  await expect(page.getByText(/products found/)).toBeVisible()

  await page.getByRole('link', { name: /login/i }).click()
  await page.getByLabel('Email').fill('shreya@example.com')
  await page.getByLabel('Password').fill('password123')
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.getByRole('heading', { name: 'Recommended Products' })).toBeVisible()

  await page.getByPlaceholder('Search products').first().fill('')
  await page.getByRole('button', { name: 'Add to Cart' }).first().click()
  await page.locator('aside').getByRole('link', { name: 'Checkout' }).click()
  await page.getByLabel('Full name').fill('Shreya Tiwari')
  await page.getByLabel('Email').fill('shreya@example.com')
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByLabel('Address').fill('Chandigarh University')
  await page.getByLabel('City').fill('Mohali')
  await page.getByRole('button', { name: 'Next' }).click()
  const success = page.getByRole('heading', { name: 'Order placed successfully' })
  if (!(await success.isVisible())) {
    await page.getByRole('button', { name: 'Place Order' }).click({ force: true })
  }
  await expect(page.getByRole('heading', { name: 'Order placed successfully' })).toBeVisible()
  await expect(page.getByText('Production-ready responsive frontend demo.')).toHaveCount(0)
  await page.getByRole('link', { name: 'Shipping and delivery' }).click()
  await expect(page.getByRole('heading', { name: 'Shipping and Delivery' })).toBeVisible()
})

test('mobile layout has no horizontal overflow and menu works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('http://127.0.0.1:5173/')

  await expect(page.getByPlaceholder('Search products').nth(1)).toBeVisible()
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('button', { name: 'Electronics' })).toBeVisible()

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
  expect(hasOverflow).toBe(false)
  await expect(page.getByText('Store Promise')).toBeVisible()
})
