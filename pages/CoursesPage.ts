
import { expect, Locator, Page } from '@playwright/test';

export class CoursesPage {
  readonly page: Page;
  readonly courseCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.courseCards = page.getByTestId('course-card');
  }

  async open() {
    await this.page.goto('/apps/lms/courses');
  }

  async enrollAndOpenCourse(courseTitle: string, courseId: string) {
    const continueLink = this.page.getByTestId(`continue-${courseId}`);

    // If already enrolled, continue directly
    if (await continueLink.isVisible().catch(() => false)) {
      await continueLink.click();
    } else {
      // Find the requested course card
      const courseCard = this.courseCards.filter({
        hasText: courseTitle,
      });

      await expect(courseCard).toBeVisible();

      const enrollButton = courseCard.getByRole('button', {
        name: 'Enroll for free',
      });

      await enrollButton.click();

      await expect(continueLink).toBeVisible();
      await continueLink.click();
    }

    await expect(this.page).toHaveURL(
      new RegExp(`/apps/lms/course/${courseId}$`)
    );
  }
}
