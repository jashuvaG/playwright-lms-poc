
import { expect, Locator, Page } from '@playwright/test';

export class CoursePage {
  readonly page: Page;
  readonly lessonButtons: Locator;
  readonly playVideoButton: Locator;
  readonly videoProgress: Locator;
  readonly markCompleteButton: Locator;
  readonly startQuizLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.lessonButtons = page.locator(
      'aside ol li button[data-testid^="lesson-"]'
    );

    this.playVideoButton = page.getByTestId('play-video');
    this.videoProgress = page.getByTestId('video-progress');
    this.markCompleteButton = page.getByTestId('mark-complete');
    this.startQuizLink = page.getByTestId('start-quiz');
  }

  async completeAllLessons() {
    const lessonCount = await this.lessonButtons.count();

    expect(lessonCount).toBeGreaterThan(0);
    console.log(`Found ${lessonCount} lessons`);

    for (let i = 0; i < lessonCount; i++) {
      // Select the next lesson
      await this.lessonButtons.nth(i).click();

      const title = (
        await this.page.getByTestId('lesson-title').innerText()
      ).trim();

      console.log(`Starting lesson ${i + 1}: ${title}`);

      // Play the lesson video
      await this.playVideoButton.click();

      // Wait for video completion
      await expect(this.videoProgress).toHaveAttribute(
        'aria-valuenow',
        '100',
        { timeout: 180000 }
      );

      // Mark the lesson complete
      await expect(this.markCompleteButton).toBeEnabled();
      await this.markCompleteButton.click();

      console.log(`Completed lesson: ${title}`);
    }

    // Verify the final quiz becomes available
    await expect(this.startQuizLink).toBeVisible({
      timeout: 15000,
    });

    console.log('All discovered lessons completed; quiz unlocked.');
  }
}
