
from playwright.sync_api import sync_playwright

def verify_homepage():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:4321")
            # Wait for the main content to load
            page.wait_for_selector("text=Fecha Sincronaria")

            # Take a screenshot
            page.screenshot(path="verification/homepage.png")
            print("Screenshot taken: verification/homepage.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_homepage()
