from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Navigate to the site
    # Wait longer for initial rendering and the lock screen to disappear if applicable
    page.goto("http://localhost:3000")
    page.wait_for_timeout(3000)

    # Click the "Buka Surat" button to start the flow
    # The button has text "Buka Surat"
    page.get_by_text("Buka Surat").click()
    page.wait_for_timeout(2000)

    # We are now on Card 1. Click "Lanjutkan" to go to Card 2.
    page.get_by_text("Lanjutkan").click()
    page.wait_for_timeout(2000)

    # We are now on Card 2. Click "Lanjutkan" to go to Card 3.
    page.get_by_text("Lanjutkan").click()
    page.wait_for_timeout(2000)

    # We are now on Card 3. This card should contain the updated texts.
    # We will wait and then take a screenshot of Card 3.
    page.screenshot(path="/home/jules/verification/screenshots/verification-card3.png")

    # Click "Lanjutkan" to go to Card 4.
    page.get_by_text("Lanjutkan").click()
    page.wait_for_timeout(2000)

    # We are now on Card 4. This card should contain the updated Doaku Untukmu text and Ilham signature.
    page.screenshot(path="/home/jules/verification/screenshots/verification-card4.png")

    # Click "Lanjutkan" to go to Card 5.
    page.get_by_text("Lanjutkan").click()
    page.wait_for_timeout(2000)

    # We are now on Card 5 (the summary card).
    # Take a screenshot of the final card.
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(2000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()  # MUST close context to save the video
            browser.close()
