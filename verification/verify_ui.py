
from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile Viewport
        page = browser.new_page(viewport={"width": 375, "height": 812})

        try:
            page.goto("http://localhost:4321")
            page.wait_for_selector("text=Energía del Día")

            # Screenshot mobile
            page.screenshot(path="verification/mobile_view.png")
            print("Screenshot taken: verification/mobile_view.png")

            # Desktop Viewport
            page.set_viewport_size({"width": 1280, "height": 800})
            page.reload()
            page.wait_for_selector("text=Energía del Día")
            page.screenshot(path="verification/desktop_view.png")
            print("Screenshot taken: verification/desktop_view.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_ui()
